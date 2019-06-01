import React, { Component } from 'react';
import './App.css';
import inlineStyle from './layout/style';
import Home from './components/Home/Home';
import AddEmployee from './components/AddEmployee/AddEmployee';
import EditEmployee from './components/EditEmployee/EditEmployee';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class App extends Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <AppBar position="static">
            <Tabs>
              <Link to="/" className="link">
                <Tab
                  label="Home"
                  style={inlineStyle.tabs}
                />
              </Link>
            </Tabs>
          </AppBar>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/add" component={AddEmployee} />
            <Route exact path="/edit" component={EditEmployee} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
