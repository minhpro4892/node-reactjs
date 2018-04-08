import React, { Component } from 'react';
import './ReservationList.style.css';
import PropTypes from 'prop-types';
import _ from "lodash";
import {
    Table,
    OverlayTrigger,
    Popover
} from "react-bootstrap";
import moment from "moment";
import { Time } from "../../constants/commonData";

const driverInfoLength = 460;
class ReservationList extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    getDayList(popoverClickRootClose, bookings) {
        var contentLength = this.refs.reservationContainer && this.refs.reservationContainer.offsetWidth ? (this.refs.reservationContainer.offsetWidth - driverInfoLength) : 0;
        var timeTitles = [];
        for (var i = 0; i < 24; i++) {
            if (i > 12) {
                timeTitles.push(i - 12 + 'PM');
            } else if (i == 12) {
                timeTitles.push(i + 'PM')
            } else {
                timeTitles.push(i + 'AM');
            }
        }

        return (
            <React.Fragment>
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th style={{ width: `${driverInfoLength}px` }}></th>
                            <th style={{ width: `${contentLength}px` }} className="header">
                                <div className="title-item">
                                    {
                                        _.map(timeTitles, (title, index) => {
                                            return (
                                                <p className="title" style={{ width: `${contentLength / 24}px` }} key={index}>{title}</p>
                                            )
                                        })
                                    }
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ width: `${driverInfoLength}px` }}></td>
                            <td style={{ width: `${contentLength}px` }} className="drawing-item">
                                {
                                    _.map(bookings, (booking, index) => {
                                        return (
                                            <OverlayTrigger
                                                trigger="click"
                                                rootClose
                                                placement="bottom"
                                                overlay={popoverClickRootClose(booking, contentLength)}
                                                key={index}
                                            >
                                                <div className="reservation-block" style={{
                                                    left: `${booking.positionStart * contentLength}px`,
                                                    width: `${booking.duration * contentLength}px`,
                                                    right: `${booking.positionEnd * contentLength}px`
                                                }}>
                                                </div>
                                            </OverlayTrigger>
                                        )
                                    })
                                }
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </React.Fragment>
        )
    }

    getWeekList(popoverClickWeek, bookings) {
        var contentLength = this.refs.reservationContainer && this.refs.reservationContainer.offsetWidth ? this.refs.reservationContainer.offsetWidth - driverInfoLength : 0;
        var dayOfWeek = [
            { name: "MONDAY", key: 0 },
            { name: "TUESDAY", key: 1 },
            { name: "WEDNESDAY", key: 2 },
            { name: "THURSDAY", key: 3 },
            { name: "FRIDAY", key: 4 },
            { name: "SATURDAY", key: 5 },
            { name: "SUNDAY", key: 6 }
        ]
        return (
            <React.Fragment>
                <Table striped bordered condensed hover classname="week-item">
                    <thead>
                        <tr>
                            <th style={{ width: `${driverInfoLength}px` }}></th>
                            {
                                _.map(dayOfWeek, (item, index) => {
                                    return (
                                        <th className="title" style={{ width: `${contentLength / 7}px` }} key={index}>{item.name}</th>
                                    )
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ width: `${driverInfoLength}px` }}></td>
                            {
                                _.map(dayOfWeek, (day, index) => {
                                    return (
                                        bookings[day.key] && bookings[day.key].length > 0 ? <OverlayTrigger
                                            trigger="click"
                                            rootClose
                                            placement="bottom"
                                            overlay={popoverClickWeek(bookings[day.key], contentLength)}
                                            key={index}>
                                            <td style={{ width: `${contentLength / 7}px` }}>
                                                <ul>
                                                    {
                                                        _.map(bookings[day.key], (booking, index) => {
                                                            return (
                                                                <li key={index}>{moment(booking.request.pickUpTime).format("hh:mm A")}</li>

                                                            )
                                                        })
                                                    }</ul>
                                            </td>

                                        </OverlayTrigger> : <td style={{ width: `${contentLength / 7}px` }}></td>
                                    )
                            })
                        }
                        </tr>
                    </tbody>
                </Table>
            </React.Fragment>
        )
    }

    render() {
        var { bookings } = this.props;
        const popoverClickWeek = (booking, contentLength) => {

        }
        const popoverClickRootClose = (booking, contentLength) => {
            <Popover id="popover-trigger-click-root-close" title="Popover bottom" style={{ width: "100px", height: "100px", color: "red" }}>
                <p>{'Position Start:' + booking.positionStart * contentLength}</p>
                <p>{'Duration:' + booking.duration * contentLength}</p>
                <p>{'Position Start:' + booking.positionEnd * contentLength}</p>
            </Popover>
        }

        return (
            <div className="reservation-list-container" ref="reservationContainer">
                {this.props.tab == Time.DAY ? this.getDayList(popoverClickRootClose, bookings)
                    : this.getWeekList(popoverClickWeek, bookings)
                }
            </div>
        )
    }
}

export default ReservationList;