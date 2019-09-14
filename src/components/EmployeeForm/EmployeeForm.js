import React, { Component } from 'react';
import './EmployeeForm.css';
import userImageDefault from '../../Images/user_default.png';
import inlineStyle from '../../layout/style';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import { connect } from 'react-redux';
import { editEmployeeAction } from '../../redux/actions/editEmployee';
import { addEmployeeAction } from '../../redux/actions/addEmployee';
import { uploadAvatarAction } from '../../redux/actions/uploadAvatar';
import { getEmployeeIdAction } from '../../redux/actions/getEmployeeID';


class EmployeeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageTitle: "",
      buttonText: "",
      _id: "",
      avatarUrl: "",
      name: "",
      title: "",
      sex: "Male",
      date: "",
      officePhone: "",
      cellPhone: "",
      sms: "",
      email: "",
      manager: null,
      managerList: [{ _id: null, name: "None" }],
      imgFile: null,
      renderState: "init",
      imgSrc: "",
      nameError: false,
      titleError: false,
      officePhoneError: false,
      cellPhoneError: false,
      smsError: false,
      emailError: false,
    }
  }

  componentDidMount() {
    console.log(this.props.pageName);
    console.log(this.props.editEmployeeState.employee);
    const { employee } = this.props.editEmployeeState;
    if (this.props.pageName === "add") {
      this.setState({ pageTitle: "New Employee:" });
      this.setState({ buttonText: "Submit" });
      this.props.getEmployeeIdList("", () => {
        this.setState({ managerList: [...this.state.managerList, ...this.props.getEmployeeIdState.idList] });
      });
    }
    else {
      this.setState({ pageTitle: "Edit Employee:" });
      this.setState({ buttonText: "Modify" });
      this.setState({ _id: employee._id });
      this.setState({ avatarUrl: employee.avatarUrl });
      this.setState({ name: employee.name });
      this.setState({ title: employee.title });
      this.setState({ sex: employee.sex });
      this.setState({ date: employee.startDate.slice(0, 10) });
      this.setState({ officePhone: employee.officePhone });
      this.setState({ cellPhone: employee.cellPhone });
      this.setState({ sms: employee.sms });
      this.setState({ email: employee.email });
      this.props.getEmployeeIdList(employee._id, () => {
        this.setState({ managerList: [...this.state.managerList, ...this.props.getEmployeeIdState.idList]});
      })
    }
  }

  handleBackBtn = () => {
    this.props.history.push("/");
  }

  handleFieldChange = (event, propName) => {
    let value = event.target.value;
    if (propName === "name") {
      let regex = /[\W\d]/;
      if (regex.test(value)) {
        this.setState({ nameError: true });
      }
      else {
        this.setState({ [propName]: value });
        this.setState({ nameError: false });
      }
    }
    else if (propName === "title") {
      let regex = /^[ a-zA-Z]*$/;
      if (regex.test(value)) {
        this.setState({ [propName]: value });
        this.setState({ titleError: false });
      }
      else {
        this.setState({ titleError: true });
      }
    }
    else if (propName === "officePhone") {
      let regex = /[\D]+/;
      if (regex.test(value)) {
        this.setState({ officePhoneError: true });
      }
      else {
        this.setState({ [propName]: value });
        this.setState({ officePhoneError: false });
      }
    }
    else if (propName === "cellPhone") {
      let regex = /[\D]+/;
      if (regex.test(value)) {
        this.setState({ cellPhoneError: true });
      }
      else {
        this.setState({ [propName]: value });
        this.setState({ cellPhoneError: false });
      }
    }
    else if (propName === "sms") {
      let regex = /[\D]+/;
      if (regex.test(value)) {
        this.setState({ smsError: true });
      }
      else {
        this.setState({ [propName]: value });
        this.setState({ smsError: false });
      }
    }
    else if (propName === "email") {
      let regex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      this.setState({ [propName]: value });
      if (regex.test(value)) {
        this.setState({ emailError: false });
      }
      else {
        console.log("Hello");
        this.setState({ emailError: true });
      }
    }
    else {
      this.setState({ [propName]: value });
    }
  }

  handleRadioChange = event => {
    this.setState({ sex: event.target.value });
  }

  handleImgChange = event => {
    this.setState({ imgFile: event.target.files[0], renderState: "loading" }, () => {
      this.previewImg();
    });
  }

  previewImg = () => {
    const file = this.state.imgFile;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      this.setState({ renderState: "upload", imgSrc: reader.result });
    }
  }

  handleSubmitBtn = () => {
    if (this.checkValidation()) {
      const {
        avatarUrl,
        _id,
        name,
        title,
        sex,
        date,
        officePhone,
        cellPhone,
        sms,
        email,
        manager,
        imgFile
      } = this.state;
      let employeeInfo = {};
      employeeInfo._id = _id;
      employeeInfo.name = name;
      employeeInfo.title = title;
      employeeInfo.sex = sex;
      employeeInfo.startDate = date;
      employeeInfo.officePhone = officePhone;
      employeeInfo.cellPhone = cellPhone;
      employeeInfo.sms = sms;
      employeeInfo.email = email;
      employeeInfo.manager = manager;
      if (this.props.pageName === "add") {
        this.props.uploadEmployeeAvatar(employeeInfo, this.props.addEmployeeList, imgFile, "", () => {
          this.props.history.push('/');
        })
      }
      else {
        if (imgFile) {
          let avatarName = avatarUrl.split('=')[1];
          this.props.uploadEmployeeAvatar(employeeInfo, this.props.editEmployeeList, imgFile, avatarName, () => {
            this.props.history.push('/');
          })
        }
        else {
          this.props.editEmployeeList(employeeInfo, () => {
            this.props.history.push('/');
          });
        }
      }
    }
    else {
      alert("Please check your input and try again");
    }
  }

  checkValidation = () => {
    const {
      name,
      title, 
      date,
      officePhone,
      cellPhone,
      sms,
      email,
      nameError,
      titleError,
      officePhoneError,
      cellPhoneError,
      smsError,
      emailError,
    } = this.state;
    if ((name !== "" && !nameError ) &&
        (title !== "" && !titleError) &&
        (date !== "") &&
        (officePhone !== "" && officePhone.length === 10 && !officePhoneError) &&
        (cellPhone !== "" && cellPhone.length === 10 && !cellPhoneError) &&
        (sms !== "" && !smsError) &&
        (email !== "" && !emailError)) {
          return true;
        }
    else {
      return false;
    }
  }

  render() {
    const {
      pageTitle,
      buttonText,
      avatarUrl,
      name,
      title,
      sex,
      date,
      officePhone,
      cellPhone,
      sms,
      email,
      manager,
      managerList,
      renderState,
      imgSrc,
      nameError,
      titleError,
      officePhoneError,
      cellPhoneError,
      smsError,
      emailError,
    } = this.state;
    // console.log(date);
    // console.log(manager);

    return (
      <div>
        <div className="addTitle">
          <h1 className="title">{pageTitle}</h1>
          <Button
            style={inlineStyle.backBtn}
            color="default"
            onClick={this.handleBackBtn}
          >
            <i class="fas fa-chevron-left"></i>
            <div className="back">Back</div>
          </Button>
          <Button
            onClick={this.handleSubmitBtn}
            style={inlineStyle.submitBtn}
          >
            <div>{buttonText}</div>
          </Button>
        </div>
        <Paper style={inlineStyle.formPaper}>
          <div>
            {
              this.props.pageName === "add" ? 
              (
                renderState !== "upload" ? 
                <img src={userImageDefault} alt="Load Error" /> :
                <img src={imgSrc} alt="Load Error" />
              ) :
              (
                renderState !== "upload" ?
                <img alt="Load error" src={avatarUrl} /> :
                <img src={imgSrc} alt="Load Error" />
              )
            }
            {/* <form action="" method="POST" enctype="multipart/form-data">
            </form> */}
            <div className="photo-select">
              <div>Please select a photo as avatar</div>
              <input name="img" type="file" onChange={this.handleImgChange} />
            </div>
          </div>
          <div className="text">
            <FormControl>
              <TextField 
                required
                style={inlineStyle.textField}
                label="Name"
                placeholder="Type a name"
                margin="normal"
                variant="outlined"
                value={name}
                onChange={(event) => this.handleFieldChange(event, "name")}
              />
              {
                nameError &&
                <FormHelperText style={inlineStyle.errorMessage}>
                  Name only contains english letters!
                </FormHelperText>
              }
            </FormControl>
            <FormControl>
              <TextField 
                required
                style={inlineStyle.textField}
                label="Title"
                placeholder="Type a title"
                margin="normal"
                variant="outlined"
                value={title}
                onChange={(event) => this.handleFieldChange(event, "title")}
              />
              {
                titleError &&
                <FormHelperText style={inlineStyle.errorMessage}>
                  Title only contains english letters!
                </FormHelperText>
              }
            </FormControl>
            <FormControl style={inlineStyle.textField}>
              <FormLabel>Sex:</FormLabel>
              <RadioGroup
                row
                name="gender"
                value={sex}
                onChange={this.handleRadioChange}
              >
                <FormControlLabel 
                  value="Male" 
                  control={<Radio color="primary" />} 
                  label="Male"
                />
                <FormControlLabel 
                  value="Female" 
                  control={<Radio color="primary" />} 
                  label="Female" 
                />
              </RadioGroup>
            </FormControl>
            <FormControl>
              <TextField 
                required
                style={inlineStyle.textField}
                id="date"
                label="Start Data"
                type="date"
                InputLabelProps={{
                  shrink: true
                }}
                variant="outlined"
                value={date}
                onChange={(event) => this.handleFieldChange(event, "date")}
              />
            </FormControl>
            <FormControl>
              <TextField 
                required
                style={inlineStyle.textField}
                label="Office Phone"
                placeholder="Type a phone number"
                margin="normal"
                variant="outlined"
                value={officePhone}
                onChange={(event) => this.handleFieldChange(event, "officePhone")}
              />
              {
                officePhoneError &&
                <FormHelperText style={inlineStyle.errorMessage}>
                  Office Phone should only contain number!
                </FormHelperText>
              }
            </FormControl>
            <FormControl>
              <TextField 
                required
                style={inlineStyle.textField}
                label="Cell Phone"
                placeholder="Type a phone number"
                margin="normal"
                variant="outlined"
                value={cellPhone}
                onChange={(event) => this.handleFieldChange(event, "cellPhone")}
              />
              {
                cellPhoneError &&
                <FormHelperText style={inlineStyle.errorMessage}>
                  Cell Phone should only contain number!
                </FormHelperText>
              }
            </FormControl>
            <FormControl>
              <TextField 
                required
                style={inlineStyle.textField}
                label="SMS"
                placeholder="Type your SMS"
                margin="normal"
                variant="outlined"
                value={sms}
                onChange={(event) => this.handleFieldChange(event, "sms")}
              />
              {
                smsError &&
                <FormHelperText style={inlineStyle.errorMessage}>
                  SMS should only contain number!
                </FormHelperText>
              }
            </FormControl>
            <FormControl>
              <TextField 
                required
                style={inlineStyle.textField}
                label="Email"
                placeholder="Type your email"
                margin="normal"
                variant="outlined"
                value={email}
                onChange={(event) => this.handleFieldChange(event, "email")}
              />
              {
                emailError &&
                <FormHelperText style={inlineStyle.errorMessage}>
                  Email format is invalid!
                </FormHelperText>
              }
            </FormControl>
            <FormControl variant="outlined" style={inlineStyle.textField}>
              <InputLabel >Manager</InputLabel>
              <Select
                value={manager}
                onChange={(event) => this.handleFieldChange(event, "manager")}
                input={<OutlinedInput />}
              >
                {
                  managerList.map((elem, index) => (
                    elem.name === "None" ?
                    <MenuItem value={null}>{elem.name}</MenuItem>:
                    <MenuItem value={elem._id} key={index}>{elem.name}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </div>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    editEmployeeState: state.editEmployee,
    getEmployeeIdState: state.getEmployeeId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editEmployeeList: (employeeInfo, callback) => {
      dispatch(editEmployeeAction(employeeInfo, callback));
    },
    addEmployeeList: (employeeInfo, callback) => {
      dispatch(addEmployeeAction(employeeInfo, callback));
    },
    uploadEmployeeAvatar: (employeeInfo, operation, imageFile, preImage,callback) => {
      dispatch(uploadAvatarAction(employeeInfo, operation, imageFile, preImage,callback));
    },
    getEmployeeIdList: (employeeId, callback) => {
      dispatch(getEmployeeIdAction(employeeId, callback));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EmployeeForm));