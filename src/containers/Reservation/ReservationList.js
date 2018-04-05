import React, { Component } from 'react';
import './ReservationList.style.css';
import PropTypes from 'prop-types';
import _ from "lodash";
import {
    Table
} from "react-bootstrap";
import moment, { duration } from "moment";

const driverInfoLength = 460;
var minutesDay = 24*60;
class ReservationList extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    prepareDayData() {
        var bookings = [
                {
                    bookId: "14281",
                    fleetId: "1111",
                    request: {
                        pickup: {
                            address: "126 Ông Ích Khiêm, Da Nang, Vietnam",
                            geo: [
                                108.21255,
                                16.075015
                            ],
                            zipCode: "Da Nang",
                            businessName: ""
                        },
                        destination: {
                            address: "2 Tháng 9, Hòa Cường Nam, Da Nang, Vietnam",
                            geo: [
                                108.2230984,
                                16.0294404
                            ],
                            zipCode: "",
                            businessName: "2 Tháng 9"
                        },
                        pickUpTime: "2015-08-27T17:00:00.000Z",
                        vehicleType: [
                            "Black carf"
                        ],
                        estimate: {
                            estimateValue: 0
                        }
                    }
                },
                {
                    bookId: "14281",
                    fleetId: "1111",
                    request: {
                        pickup: {
                            address: "126 Ông Ích Khiêm, Da Nang, Vietnam",
                            geo: [
                                108.21255,
                                16.075015
                            ],
                            zipCode: "Da Nang",
                            businessName: ""
                        },
                        destination: {
                            address: "2 Tháng 9, Hòa Cường Nam, Da Nang, Vietnam",
                            geo: [
                                108.2230984,
                                16.0294404
                            ],
                            zipCode: "",
                            businessName: "2 Tháng 9"
                        },
                        pickUpTime: "2015-08-27T20:00:00.000Z",
                        vehicleType: [
                            "Black carf"
                        ],
                        estimate: {
                            estimateValue: 120
                        }
                    }
                }
            ]

        var caculatedData = [];
        _.map(bookings, (booking, index) => {
            var pickUpTimeToDate = moment(booking.request.pickUpTime);
            var hour = pickUpTimeToDate.hours();
            var minutes = pickUpTimeToDate.minutes();
            var positionStart = hour + minutes;
            var duration = booking.request.estimate.estimateValue ? booking.request.estimate.estimateValue/60 : 0
            var positionEnd = positionStart + duration;
            // Change data to Percent
            var caculatedPosition = {
                positionStart: positionStart/minutesDay,
                duration: duration/minutesDay,
                positionEnd: positionEnd/minutesDay
            }
            caculatedData.push(caculatedPosition);
        });
        return caculatedData;    
    }

    getDayList () {
        var contentLength = this.refs.reservationContainer ? (this.refs.reservationContainer.offsetWidth - driverInfoLength) : 0;
        var timeTitles = [];
        for (var i=1; i<=24; i++) {
            if (i > 12) {
                timeTitles.push(i - 12 + 'PM');
            } else if (i == 12) {
                timeTitles.push(i + 'PM')
            } else {
                timeTitles.push(i + 'AM');
            }
        }

        var bookings = this.prepareDayData();

        return (
            <React.Fragment>
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th style={{ width: `${driverInfoLength}px`}}></th>
                            {
                                _.map(timeTitles, (title, index) => {
                                    return <th style={{ width: `${contentLength/24}px` }}>{title}</th>
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ width: `${driverInfoLength}px` }}></td>
                            { _.map(bookings, (booking, index) => {
                                <td style={{ width: `${contentLength}px` }}>
                                    <div style={{
                                        left: `${booking.positionStart * contentLength}px`,
                                        width: `${duration*contentLength}px`
                                    }}>

                                    </div>
                                </td>
                            })  
                            }
                        </tr>
                    </tbody>
                </Table>
            </React.Fragment>
        )
    }

    render() {
        return (
            <div className="reservation-list-container" ref="reservationContainer">
                {
                    this.getDayList()
                }
            </div>
        )
    }
}

export default ReservationList;