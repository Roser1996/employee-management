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

import { connect } from 'react-redux';
import { getEmployeeAction } from '../../redux/actions/getEmployees';
import { deleteEmployeeAction } from '../../redux/actions/deleteEmployee';
import { editEmployeeInfo } from '../../redux/actions/editEmployee';


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
      ]
    }
  }

  componentDidMount() {
    this.props.getEmployeeList(0);
  }

  handleSearchField = event => {
    this.setState({ searchText: event.target.value });
  }

  handleAddNewBtn = () => {

  }

  handleEditBtn = (employeeInfo) => {
    this.props.setEmployeeInfo(employeeInfo);
    this.props.history.push('/edit');
  }

  handleDeleteBtn = (_id) => {
    console.log(_id);
    this.props.deleteEmployeeList(_id);
  }

  render() {

    const { searchText, headerRows } = this.state;
    const { nameMap, isLoading } = this.props.employeeList;
    
    return (
      <div>
        <h1 className="header">Employee List</h1>
        <div>
          <TextField 
            style={inlineStyle.search}
            autoFocus={true}
            label="Search"
            placeholder="Type anything to search"
            variant="outlined"
            value={searchText}
            onChange={this.handleSearchField}
          />
          <Link to="/add" className="link">
            <Button 
              style={inlineStyle.button}
              variant="contained" 
              onClick={this.handleAddNewBtn}
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
                        >
                          {row.label}
                        </TableCell>
                      ))
                    }
                    <TableCell style={inlineStyle.tableHeader} align="center">Edit</TableCell>
                    <TableCell style={inlineStyle.tableHeader} align="center">Delete</TableCell>
                  </TableRow>
                </TableHead>
                {
                  isLoading ? <div>Loading...</div> :
                  <TableBody>
                    {
                      this.props.employeeList.data.map((elem, index) => (
                        <TableRow key={index}>
                          <TableCell align="center" variant="body">
                            <Grid container justify="center" alignItems="center">
                              <Avatar alt="Error" src={elem.avatarUrl} />
                            </Grid>
                          </TableCell>
                          <TableCell align="center" variant="body">{elem.name}</TableCell>
                          <TableCell align="center" variant="body">{elem.title}</TableCell>
                          <TableCell align="center" variant="body">{elem.sex}</TableCell>
                          <TableCell align="center" variant="body">{elem.startDate.slice(0,10)}</TableCell>
                          <TableCell align="center" variant="body">
                            <a href={"tel:" + elem.officePhone}>
                              {elem.officePhone}
                            </a>
                          </TableCell>
                          <TableCell align="center" variant="body">
                            <a href={"tel:" + elem.cellPhone}>
                              {elem.cellPhone}  
                            </a>
                          </TableCell>
                          <TableCell align="center" variant="body">{elem.sms}</TableCell>
                          <TableCell align="center" variant="body">
                            <a href={"mailto:" + elem.email}>
                              {elem.email}
                            </a>
                          </TableCell>
                          <TableCell align="center" variant="body">{nameMap[elem.manager]}</TableCell>
                          <TableCell align="center" variant="body">{elem.directReports.length}</TableCell>
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
                }
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
    getEmployeeList: (num) => {
      dispatch(getEmployeeAction(num));
    },
    deleteEmployeeList: (_id) => {
      dispatch(deleteEmployeeAction(_id));
    },
    setEmployeeInfo: (employeeInfo) => {
      dispatch(editEmployeeInfo(employeeInfo));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);