import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { Button } from '@material-ui/core';
import Bookings from '../Bookings/Bookings';

const Book = () => {
    const { bedType } = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const [selectedDate, setSelectedDate] = useState({
        checkIn: new Date(),
        checkOut: new Date()
    });

    const handleDateCheckIn = (date) => {
        const newDates = {...selectedDate}
        newDates.checkIn = date;
        setSelectedDate(newDates);
    };

    const handleDateCheckOut = (date) => {
        const newDates = { ...selectedDate }
        newDates.checkOut = date;
        setSelectedDate(newDates);
    };


    const handleBooking = () => {
        const newBooking = { ...loggedInUser, ...selectedDate};
        fetch('http://localhost:4000/addBooking', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newBooking)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
    }

    return (
        <div style={{ textAlign: 'center', margin: '100px' }}>
            <h1> Hello {loggedInUser.name} ! Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home"><Button variant="outlined" color="primary">
                Diffarent Room
            </Button></Link> </p>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Check In Date"
                        value={selectedDate.checkIn}
                        onChange={handleDateCheckIn}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }} />

                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="check Out date "
                        format="dd/MM/yyyy"
                        value={selectedDate.checkOut}
                        onChange={handleDateCheckOut}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
                <Button onClick={handleBooking} variant="contained" color="primary">
                    Book Now
                 </Button>
            </MuiPickersUtilsProvider>
            <Bookings></Bookings>
        </div>
    );
};

export default Book;