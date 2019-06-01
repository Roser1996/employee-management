import React, { Component } from 'react';
import './AddEmployee.css';
import EmployeeForm from '../EmployeeForm/EmployeeForm';

class AddEmployee extends Component {
  render() {
    return (
      <div className="total">
        <EmployeeForm pageName="add" />
      </div>
    );
  }
}

export default AddEmployee;