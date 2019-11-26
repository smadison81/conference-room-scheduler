import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import bootstrap from "@fullcalendar/bootstrap";
import momentPlugin from "@fullcalendar/moment";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import API from "../../utils/API"
import moment from "moment"


import "./style.css";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

export default class Calendar extends React.Component {
  calendarComponentRef = React.createRef();

  state = {
    calendarWeekends: true,
    calendarEvent: [],
    start: "",
    end: "",
    title: "",
    description: ""
  };

  componentDidMount() {
    API.getEvents(this.props.calendarEvent)
    .then(res => {
      this.setState({ calendarEvent: res.data });
      console.log({ calendarEvent: res.data });
    })
    .catch(function(error) {
      console.log(error); 
    });
  }



  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  handleEventClick = ({ event, el }) => {
    this.setState({event: event, modal: true})
  };

  handleDateClick = arg => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Would you like to add an event to " + moment(arg.dateStr).format('LLL') + " ?")) {
      this.setState({
        // add new event data
        calendarEvent: this.state.calendarEvent.concat({
          // creates a new array
          title: "New Event",
          start: arg.date,
          allDay: arg.allDay
        })
      });
    }
  };

  render() {
    return (
      <Col md="10" style={{ backgroundColor: "white" }}>
        <div id="loading">loading...</div>
        <div className="cal">
          <FullCalendar
            schedulerLicenseKey="0855724963-fcs-1571147580"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              resourceTimelinePlugin,
              resourceTimeGridPlugin,
              bootstrap
            ]}
            defaultView="timeGridWeek"
            customButtons={{
              myCustomButton: {
                text: "Reserve a Time",
                click: function() {
                  alert("clicked the custom button!");
                }
              }
            }}
            header={{
              left: "prev,next today,myCustomButton",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
            }}
            editable="true"
            droppable="true"
            navLinks="true"
            eventLimit="true"
            weekends={this.state.calendarWeekends}
            dateClick={this.handleDateClick}
            events={this.state.calendarEvent}
            ref={this.calendarComponentRef}
            eventClick={this.handleEventClick}
            nowIndicator='true'
            height='parent'
          />
        </div>
      </Col>
    );
  }
}
