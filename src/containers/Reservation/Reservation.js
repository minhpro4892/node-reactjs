import React, { Component } from 'react';
import './Reservation.style.css';
import PropTypes from 'prop-types';
import _ from "lodash";
import {connect} from "react-redux";
import ReservationList from "./ReservationList";
import {
    ButtonToolbar,
    Button
} from "react-bootstrap";
import {Time, Bookings} from "../../constants/commonData";
import moment from "moment";
var minutesDay = 24 * 60;

class Reservation extends Component {
    constructor() {
        super();
        this.state = {
            tab: Time.DAY,
            bookings: []
        }
    }

    componentDidMount() {
    }

    handleSelectTime(value) {
        this.setState({ tab: value },
        () => {
            this.initReservationData();
        });
    }

    initReservationData() {
        var bookings = [];
        switch (this.state.tab) {
            case Time.DAY:
                bookings = this.prepareDayData();
                break;
            case Time.WEEK:
            bookings = this.prepareWeekData();
                break;
            default:
            bookings = this.prepareDayData();
                break;
        }
        this.setState({ bookings: bookings });
    }

    prepareWeekData() {
        var caculatedData = _.groupBy(Bookings, (booking, index) => moment(booking.request.pickUpTime).day());
        return caculatedData;
    }

    prepareDayData() {

        var caculatedData = [];
        _.map(Bookings, (booking, index) => {
            var pickUpTimeToDate = moment(booking.request.pickUpTime);
            var hour = pickUpTimeToDate.hours();
            var minutes = pickUpTimeToDate.minutes();
            var positionStart = hour * 60 + minutes;
            var duration = booking.request.estimate.estimateValue ? booking.request.estimate.estimateValue / 60 : 0
            var positionEnd = positionStart + duration;
            // Change data to Percent
            var caculatedPosition = {
                positionStart: positionStart / minutesDay,
                duration: duration / minutesDay,
                positionEnd: positionEnd / minutesDay
            }
            caculatedData.push(caculatedPosition);
        });
        return caculatedData;
    }

    render() {
        return (
            <div className="content">
                <ButtonToolbar>
                    <Button onClick={() => this.handleSelectTime("DAY")} bsStyle="default">Day</Button>
                    <Button onClick={() => this.handleSelectTime("WEEK")} bsStyle="info">Week</Button>
                </ButtonToolbar>
                <ReservationList tab={this.state.tab} bookings={this.state.bookings} />
            </div>
        )
    }
    
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Reservation);

