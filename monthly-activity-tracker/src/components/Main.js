import React from "react";
import Activity from "./Activity";
class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      activities: {},
      activity: "",
    }
    this.eventId = null;
  }

  componentDidUpdate() {
    this.handleUpdateLocalStorage();
  }

  componentDidMount() {
    if (localStorage.length ) {
      this.setState({ activities: JSON.parse(localStorage.activities) })
    }
    this.eventId = window.addEventListener("beforeunload", this.handleUpdateLocalStorage);
  }

  componentWillUnmount() {
    window.removeEventListener(this.eventId);
  }

  handleUpdateLocalStorage = () => {
    localStorage.setItem("activities", JSON.stringify(this.state.activities));
  }

  handleChange = (event) => {
    this.setState({ activity: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let { activities, activity } = this.state;
    if (activity !== "") {
      activities[activity] = [];
      activity = "";
    }
    this.setState({ activities, activity });
  } 

  handleDelete = (val) => {
    let { activities } = this.state;
    delete activities[val];
    this.setState({activities});  
  }

  handleClick = (val,date) => {
    let { activities } = this.state;
    if(activities[val].includes(date)) {
      let a = activities[val].indexOf(date);
      activities[val].splice(a,1);
    } else {
      activities[val] = activities[val].concat(date);
    }
    this.setState({activities});  
  }

  render() {
    return ( 
      <div className="container">
        <h1>Monthly Activity Tracker</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input className="input" onChange={this.handleChange} type="text" name="text" value={this.state.activity}/>
            <input className="btn" type="submit" value="submit" />
          </form>
        </div>
        <div className="">
          <Activity data={this.state.activities} handleDelete = {this.handleDelete} handleClick = {this.handleClick} />
        </div>
      </div>

    )
  }
}

export default Main;