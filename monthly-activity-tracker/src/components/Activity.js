import React from "react";

class Activity extends React.Component {
  constructor(props) {
    super(props)
  }

  getCurrentDate = () => {
    let date = new Date();
    let currentMonth = (date.getMonth()) + 1;
    let currentYear = (date.getFullYear());
    let daysInMonth = new Date(currentYear, currentMonth, 0);
    let monthName = date.toLocaleString('default', { month: 'long' })
    return {month:monthName, year:currentYear, days:daysInMonth.getDate()}
  }

  getAllDaysOfMonth = (days) => {
    let arr = [];
    for(let i = 0; i < days; i++) {
      arr.push(i+1)
    }
    return arr;
  }

  render() {
    let data = this.props.data;
    data = Object.keys(data);
    return (
      <>
      <ul className="all-activities-holder">
        {
          data.map((e, i) => {
            return (
              <li key = {i} className="activity">
                <div className="sidebar">
                    <span className="month">{this.getCurrentDate().month}</span>
                    <span className="name">{e}</span>
                </div>
                <ul>
                  <div className="month-holder">
                    {this.getAllDaysOfMonth(this.getCurrentDate().days).map((day, index) => {
                      return <li onClick={() => this.props.handleClick(e,index)} key={day} className={this.props.data[e] && this.props.data[e].includes(index) ?  "active date" : "date"}>{day}</li>  
          })
          };
                  </div>
                </ul>
                <div>
                  <span onClick={() => this.props.handleDelete(e)} className="delete-activity">X</span>
                </div>
              </li>
            )
          })
        }
      </ul>
      </>
    )
  }
}

export default Activity;