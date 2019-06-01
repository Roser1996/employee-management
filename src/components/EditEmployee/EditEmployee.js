import React, { Component } from 'react';
import EmployeeForm from '../EmployeeForm/EmployeeForm';

class EditEmployee extends Component {
  render() {
    return (
      <div className="total"> 
        <EmployeeForm pageName="edit" />
      </div>
    )
  }
}

export default EditEmployee;