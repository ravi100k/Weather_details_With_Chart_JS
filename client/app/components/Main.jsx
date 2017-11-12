import React, {Component} from 'react';
import Weather_Search from './Weather_search.js';


export default class Main extends Component {
  constructor(props){
    super(props);
    this.state={
    }

};

  render() {

    return (
      <div>
      <nav className="navbar navbar-light bg-light justify-content-between">
        <a className="navbar-brand">Weather Application</a>
        <form className="form-inline">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
        </nav>
        <Weather_Search/>
    </div>
    );
  }
}
