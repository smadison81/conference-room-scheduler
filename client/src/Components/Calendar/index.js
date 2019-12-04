import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import bootstrap from "@fullcalendar/bootstrap";
import Col from "react-bootstrap/Col";
import Modal from "react-responsive-modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import API from "../../utils/API";
import moment from "moment";
import DatePicker from "react-datepicker";
import Alert from "sweetalert2";
import Select from "react-select";

import "./style.css";

import "react-datepicker/dist/react-datepicker.css";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

export default class Calendar extends React.Component {
  calendarComponentRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      calendarWeekends: true,
      calendarEvent: [],
      start: "",
      end: "",
      title: "",
      description: "",
      id: "",
      modalIsOpen: false,
      room: ""
    };
  }

  handleStartDate(date) {
    this.setState({
      startDate: date
    });
  }

  getEvents = () => {
    API.getEvents()
      .then(res => {
        this.setState({ calendarEvent: res.data });
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  // add these two functions to your component
  calculateMinTime = date => {
    let isToday = moment(date).isSame(moment(), "day");
    if (isToday) {
      let nowAddOneHour = moment(new Date())
        .add({ hours: 0.5 })
        .toDate();
      return nowAddOneHour;
    }
    return moment()
      .startOf("day")
      .toDate(); // set to 12:00 am today
  };

  handleDateChange = date => {
    this.setState({
      closeDate: date,
      minTime: this.calculateMinTime(date)
    });
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
    console.log("hi");
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  handleStartChange = date => {
    this.setState({
      start: date
    });
  };

  handleEndChange = date => {
    this.setState({
      end: date
    });
  };

  handleChange = room => {
    this.setState({ room });
  };

  handleTitleChange = event => {
    this.setState({ title: event.target.value });
  };

  handleDescriptionChange = event => {
    this.setState({ description: event.target.value });
  };

  handleEventClick = calendarEvent => {
    console.log(calendarEvent.event);
    Alert.fire({
      title: calendarEvent.event.title,
      html:
        `<div class="table-responsive">
     <table class="table">
     <tbody>
     <tr >
     <td>Room</td>
     <td><strong>` +
        calendarEvent.event.extendedProps.room +
        ` <tr >
     <td>Description</td>
     <td><strong>` +
        calendarEvent.event.extendedProps.description +
        `</strong></td>
     </tr>
     <tr >
     <td>Start Time</td>
     <td><strong>
     ` +
        moment(calendarEvent.event.start).format("LLLL") +
        `
     </strong></td>
     </tr>
     <tr >
     <td>End Time</td>
     <td><strong>
     ` +
        moment(calendarEvent.event.end).format("LLLL") +
        `
     </strong></td>
     </tr>
     </tbody>
     </table>
     </div>`,

      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Remove Event",
      cancelButtonText: "Close"
    }).then(result => {
      if (result.value) {
        calendarEvent.event.remove(); // It will remove event from the calendar
        API.deleteEvent(calendarEvent.event.extendedProps._id).then(
          this.getEvents()
        );
        Alert.fire("Deleted!", "Your Event has been deleted.", "success");
      }
    });
  };

  add = e => {
    e.preventDefault();
    let end = this.state.end ? this.state.end : this.state.start;
    if (end < this.state.start) {
      end = this.state.start;
    }
    API.addEvent({
      title: this.state.title,
      start: this.state.start,
      end: end,
      description: this.state.description,
      room: this.state.room.label
    })
      .then(this.closeModal())
      .then(this.getEvents())
      .then(this.setState({ start: "", end: "", title: "", description: "" }))
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.getEvents();
  }

  render() {
    this.state.minTime = this.calculateMinTime(new Date());
    const { room } = this.state;
    const options = [
      { value: "purple", label: "FC 11.2017" },
      { value: "green", label: "FC 11.2037" }
    ];
    return (
      <Col md="10" style={{ backgroundColor: "white", maxWidth: "82%" }}>
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
                text: "Add Event",
                click: this.openModal
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
            dateClick={this.openModal}
            events={this.state.calendarEvent}
            ref={this.calendarComponentRef}
            eventClick={this.handleEventClick}
            nowIndicator="true"
            height="parent"
            eventDrop={this.drop}
            eventOverlap="false"
            disableDragging="true"
          />
          <Modal open={this.state.modalIsOpen} onClose={this.closeModal}>
            {" "}
            <Form>
              <div>
                <h2>Add Event</h2>
              </div>
              <hr />
              <div className="row">
                <div className="form-group">
                  <b>Start Date: </b>
                  <DatePicker
                    className="form-control"
                    selected={this.state.start}
                    excludeOutOfBoundTimes
                    onChange={this.handleStartChange}
                    showTimeSelect
                    dateFormat="Pp"
                    minDate={new Date()}
                    // minTime={this.state.minTime}
                    // maxTime={moment()
                    //   .endOf("day")
                    //   .toDate()}
                  />
                  {/* <br /> */}
                </div>

                <div className="form-group">
                  <b>End Date: </b>
                  <DatePicker
                    className="form-control"
                    excludeOutOfBoundTimes
                    selected={this.state.end}
                    onChange={this.handleEndChange}
                    showTimeSelect
                    dateFormat="Pp"
                    minDate={new Date()}
                    // minTime={this.state.minTime}
                    // maxTime={moment()
                    //   .endOf("day")
                    //   .toDate()}
                  />
                </div>
              </div>
              <br />
              <div className="form-group">
                <b>Event Title: </b>
                <input
                  className="form-control"
                  type="text"
                  value={this.state.title}
                  onChange={this.handleTitleChange}
                />
              </div>
              <br />
              <b>Conference Room: </b>
              <Select
                value={room}
                onChange={this.handleChange}
                options={options}
              />
              <br />

              <div className="form-group">
                <b>Event Description: </b>
                <textarea
                  className="form-control"
                  type="text"
                  value={this.state.description}
                  onChange={this.handleDescriptionChange}
                />
              </div>
              <br />
              <Button
                className=" btn-large hoverable grey darken-2"
                onClick={this.add}
                style={{
                  width: "150px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginTop: "1rem"
                }}
              >
                Add Event
              </Button>
            </Form>
          </Modal>
        </div>
      </Col>
    );
  }
}
