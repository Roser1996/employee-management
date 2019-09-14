import React, { Component } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import inlineStyle from '../../layout/style';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import CircularProgress from '@material-ui/core/CircularProgress';

import { connect } from 'react-redux';
import { getEmployeeAction, resetEmployeeAction, setSearchText, setSortOrder, setOrderField } from '../../redux/actions/getEmployees';
import { deleteEmployeeAction } from '../../redux/actions/deleteEmployee';
import { editEmployeeInfo } from '../../redux/actions/editEmployee';
import { getManagerAction } from '../../redux/actions/getManager';
import { getDirectReportAction } from '../../redux/actions/getDirectReport';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      headerRows: [
        { id: "name", numeric: false, disablePadding: true, label: "Name" },
        { id: "title", numeric: false, disablePadding: true, label: "Title"},
        { id: "sex", numeric: false, disablePadding: true, label: "Sex"},
        { id: "startDate", numeric: false, disablePadding: true, label: "Start Date"},
        { id: "officePhone", numeric: true, disablePadding: false, label: "Office Phone"},
        { id: "cellPhone", numeric: true, disablePadding: false, label: "Cell Phone"},
        { id: "sms", numeric: true, disablePadding: false, label: "SMS"},
        { id: "email", numeric: false, disablePadding: true, label: "Email"},
        { id: "manager", numeric: false, disablePadding: true, label: "Manager"},
        { id: "directReports", numeric: true, disablePadding: false, label: "# of DR"}
      ],
      order: "",
      orderBy: ""
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    const { data, search, sortOrder, sortField } = this.props.employeeList;
    if (this.props.employeeList.data.length === 0) {
      this.props.resetEmployeeList(0, 10, search, sortOrder, sortField);
    }
    else {
      this.setState({ searchText: search });
      this.props.resetEmployeeList(0, 10, search, sortOrder, sortField);
    }
  }

  loadMoreEmployees = () => {
    // this.props.getEmployeeList(this.props.employeeList.data.length, "");
  }

  handleSearchField = event => {
    const { data, sortOrder, sortField } = this.props.employeeList;
    this.setState({ searchText: event.target.value });
    this.props.setEmployeeSearchText(event.target.value);
    this.props.resetEmployeeList(0, 10, event.target.value, sortOrder, sortField);
  }

  handleResetBtn = () => {
    const { data } = this.props.employeeList;
    this.setState({ searchText: "" });
    this.setState({ order: "" });
    this.setState({ orderBy: "" });
    this.props.setEmployeeSearchText("");
    this.props.setEmployeeSortOrder("");
    this.props.setEmployeeSortField("");
    this.props.resetEmployeeList(0, 10, "", "", "");
  }

  handleEditBtn = (employeeInfo) => {
    this.props.setEmployeeInfo(employeeInfo);
    this.props.history.push('/edit');
  }

  handleDeleteBtn = (_id) => {
    const { data, search, sortOrder, sortField } = this.props.employeeList;
    this.props.deleteEmployeeList(_id, () => {
      this.props.resetEmployeeList(0, data.length - 1, search, sortOrder, sortField);
    });
  }

  handleClickManager = (managerId) => {
    this.props.getManagerById(managerId);
  }

  handleClickDirectReports = (directReports) => {
    console.log(directReports);
    this.props.getDirectReportById(directReports);
  }

  handleSortRequest = (rowId) => {
    const orderBy = rowId;
    let order = 'desc';
    if (this.state.orderBy === rowId && this.state.order === 'desc') {
      order = 'asc';
    }

    const { data, search } = this.props.employeeList;
    this.setState({ order, orderBy });
    this.props.setEmployeeSortOrder(order);
    this.props.setEmployeeSortField(orderBy);
    this.props.resetEmployeeList(0, 10, search, order, orderBy);
  }

  handleScroll = (event) => {
    console.log(window.screenY);
    console.log(window.innerHeight);
  }

  render() {

    const { searchText, headerRows, order, orderBy } = this.state;
    const { nameMap, isLoading } = this.props.employeeList;

    
    
    return (
      <div>
        <h1 className="header">Employee List</h1>
        <div  className="top-area">
          <TextField 
            style={inlineStyle.search}
            autoFocus={true}
            label="Search"
            placeholder="Type anything to search"
            variant="outlined"
            value={searchText}
            onChange={this.handleSearchField}
          />
          <div className="resetBtn">
            <Button 
              variant="contained"
              onClick={this.handleResetBtn}
            >
              <div>Reset Filter</div>
            </Button>
          </div>
          <Link to="/add" className="link">
            <Button 
              style={inlineStyle.button}
              variant="contained" 
            >
              <div>Add New Employee</div>
            </Button>
          </Link>
        </div>
        <div className="table">
          <Paper style={inlineStyle.paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={inlineStyle.tableHeader} align="center">Avatar</TableCell>
                  {
                    headerRows.map(row => (
                      <TableCell
                        style={inlineStyle.tableHeader}
                        key={row.id}
                        variant="head"
                        align="center"
                        padding={row.disablePadding ? "none": "default"}
                        sortDirection={orderBy === row.id ? order : false }
                      >
                        <Tooltip
                          title="Sort"
                          placement={row.numeric ? "bottom-end" : "bottom-start"}
                          enterDelay={300}
                        >
                          <TableSortLabel
                            active={orderBy === row.id}
                            direction={order}
                            onClick={() => this.handleSortRequest(row.id)}
                          >
                            {row.label}
                          </TableSortLabel>
                        </Tooltip>
                      </TableCell>
                    ))
                  }
                  <TableCell style={inlineStyle.tableHeader} align="center">Edit</TableCell>
                  <TableCell style={inlineStyle.tableHeader} align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  isLoading ? 
                  <CircularProgress className="progress" /> :
                  this.props.employeeList.data.map((elem, index) => (
                    <TableRow key={index}>
                      <TableCell align="center" variant="body">
                        <Grid container justify="center" alignItems="center">
                          <Avatar alt="Error" src={elem.avatarUrl} style={inlineStyle.avatar}/>
                        </Grid>
                      </TableCell>
                      <TableCell align="center" variant="body">{elem.name}</TableCell>
                      <TableCell align="center" variant="body">{elem.title}</TableCell>
                      <TableCell align="center" variant="body">{elem.sex}</TableCell>
                      <TableCell align="center" variant="body">{elem.startDate.slice(0,10)}</TableCell>
                      <TableCell align="center" variant="body">
                        <a href={"tel:" + elem.officePhone} className="table-link">
                          {elem.officePhone}
                        </a>
                      </TableCell>
                      <TableCell align="center" variant="body">
                        <a href={"tel:" + elem.cellPhone} className="table-link">
                          {elem.cellPhone}  
                        </a>
                      </TableCell>
                      <TableCell align="center" variant="body">{elem.sms}</TableCell>
                      <TableCell align="center" variant="body">
                        <a href={"mailto:" + elem.email} className="table-link">
                          {elem.email}
                        </a>
                      </TableCell>
                      <TableCell 
                        align="center" 
                        variant="body"  
                      >
                        <div
                          className="table-link"
                          onClick={() => this.handleClickManager(elem.manager)}
                        >
                          {nameMap[elem.manager]}       
                        </div>
                      </TableCell>
                      <TableCell 
                        align="center" 
                        variant="body"
                      >
                        {
                          elem.directReports.length === 0 ?
                          <div>0</div> :
                          <div
                            className="table-link"
                            onClick={() => this.handleClickDirectReports(elem.directReports)}
                          >
                            {elem.directReports.length}
                          </div>
                        }
                      </TableCell>
                      <TableCell align="center" variant="body">
                        <Button variant="contained" color="primary" onClick={() => this.handleEditBtn(elem)}>
                          <i className="fas fa-user-edit"></i>
                        </Button>
                      </TableCell>
                      <TableCell align="center" variant="body">
                        <Button variant="contained" color="secondary" onClick={() => this.handleDeleteBtn(elem._id)}>
                          <i className="far fa-trash-alt"></i>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>  
            </Table>       
          </Paper>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    employeeList: state.getEmployee,
    editEmployeeState: state.editEmployee
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getEmployeeList: (num, search) => {
      dispatch(getEmployeeAction(num, search));
    },
    resetEmployeeList: (pageStart, employeeNum, search, sortOrder, sortField) => {
      dispatch(resetEmployeeAction(pageStart, employeeNum, search, sortOrder, sortField));
    },
    deleteEmployeeList: (_id, callback) => {
      dispatch(deleteEmployeeAction(_id, callback));
    },
    setEmployeeInfo: (employeeInfo) => {
      dispatch(editEmployeeInfo(employeeInfo));
    },
    getManagerById: (managerId) => {
      dispatch(getManagerAction(managerId));
    },
    getDirectReportById: (directReports) => {
      dispatch(getDirectReportAction(directReports));
    },
    setEmployeeSearchText: (text) => {
      dispatch(setSearchText(text));
    },
    setEmployeeSortOrder: (order) => {
      dispatch(setSortOrder(order));
    },
    setEmployeeSortField: (field) => {
      dispatch(setOrderField(field));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);