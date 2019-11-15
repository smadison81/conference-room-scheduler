import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import bootstrap from '@fullcalendar/bootstrap';
import momentPlugin from "@fullcalendar/moment";
import Col from "react-bootstrap/Col";

import "./style.css";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";



export default class Calendar extends React.Component {
  calendarComponentRef = React.createRef();
  state = {
    calendarWeekends: true,
    calendarEvents: [
      // initial event data
      { title: "Event Now", start: new Date() }
    ]
  };

  render() {
    return (
      <Col md="10" style={{backgroundColor:"white"}}>
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
          editable= "true"
          droppable= "true"
          navLinks="true"
          eventLimit="true"
          weekends={true}
          dateClick={this.handleDateClick}
          events={this.state.calendarEvents}
          ref={this.calendarComponentRef}
          
        />
        </div>
      </Col>
    );
  }

  gotoPast = () => {
    let calendarApi = this.calendarComponentRef.current.getApi();
    calendarApi.gotoDate("2000-01-01"); // call a method on the Calendar object
  };

  handleDateClick = arg => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Would you like to add an event to " + arg.dateStr + " ?")) {
      this.setState({
        // add new event data
        calendarEvents: this.state.calendarEvents.concat({
          // creates a new array
          title: "Poop Snake",
          start: arg.date,
          allDay: arg.allDay
        })
      });
    }
  };
}
