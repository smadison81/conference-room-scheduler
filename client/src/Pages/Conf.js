import React, { Component } from "react";
import moment from "moment";
import welcomeImage from "../images/welcome.svg";
import spinner from "../images/spinner.svg";
import API from "../utils/API";
import './style.css'
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";


export default class Conf extends Component {

  constructor(props) {
    super(props);
    this.state = {
      time: moment().format("dd, Do MMMM, h:mm A"),
      calendarEvent: [],
      isBusy: false,
      isEmpty: false,
      isLoading: true
    };
  }

  componentDidMount = () => {
    this.getEvents();
    setInterval(() => {
      this.tick();
    }, 1000);
    setInterval(() => {
      this.getEvents();
    }, 5000);
    document.body.classList.add('conf');
  };

  getEvents() {
    let that = this;
    API.getEvents().then(
      res => {
        this.setState({ calendarEvent: res.data });
        let events = res.data;
        let sortedEvents = events.sort(function(a, b) {
          return (
            moment(b.start.dateTime).format("YYYYMMDD") -
            moment(a.start.dateTime).format("YYYYMMDD")
          );
        });
        if (events.length > 0) {
          that.setState(
            {
              events: sortedEvents,
              isLoading: false,
              isEmpty: false
            },
            () => {
              that.setStatus();
            }
          );
        } else {
          that.setState({
            isBusy: false,
            isEmpty: true,
            isLoading: false
          });
        }
      },
      function(reason) {
        console.log(reason);
      }
    );
  }

  tick = () => {
    let time = moment().format("dddd, Do MMMM, h:mm A");
    this.setState({
      time: time
    });
  };

  setStatus = () => {
    let now = moment();
    let events = this.state.events;
    for (var e = 0; e < events.length; e++) {
      var eventItem = events[e];
      if (
        moment(now).isBetween(
          moment(eventItem.start),
          moment(eventItem.end)
        )
      ) {
        this.setState({
          isBusy: true
        });
        return false;
      } else {
        this.setState({
          isBusy: false
        });
      }
    }
  };

  render() {
    const { time, calendarEvent } = this.state;

    let eventsList = calendarEvent.map(function(event) {
      return (
        <a
          className="list-group-item temp" style={{display: "block",
            padding: "16px 4px",
            color: "#4099ff",
            lineHeight: "22px",
            borderBottom: "1px solid #eee",
            fontSize: "18px",
          fontFamily: "Inter UI, Helvetica, Arial, sans-serif",}}
          target="_blank"
          key={event._id}
        >
          {event.title}{" "}
          <span className="badge">
            {moment(event.start).format("h:mm a")},{" "}
            {moment(event.end).diff(
              moment(event.start),
              "minutes"
            )}{" "}
            minutes, {moment(event.start).format("MMMM Do")}{" "}
          </span>
        </a>
      );
    });

    let emptyState = (
      <div className="empty">
        <img src={welcomeImage} alt="Welcome" />
        <h3>
          No meetings are scheduled for the day. 
        </h3>
      </div>
    );

    let loadingState = (
      <div className="loading conf">
        <img src={spinner} alt="Loading..." />
      </div>
    );

    return (
      <div className="container-fluid" style={{ paddingLeft: "0", paddingRight: "0"}}>
        <div
          className={
            this.state.isBusy ? "current-status busy" : "current-status open"
          }
        >
          <h1>{this.state.isBusy ? "BUSY" : "OPEN"}</h1>
        </div>
        <div className="upcoming-meetings">
          <div className="current-time">{time}, 2019</div>
          <h1>Upcoming Meetings</h1>
          <div className="list-group">
            {this.state.isLoading && loadingState}
            {calendarEvent.length > 0 && eventsList}
            {this.state.isEmpty && emptyState}
          </div>
        </div>
      </div>
    );
  }
}
