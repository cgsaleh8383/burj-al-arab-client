import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    useEffect(() => {
        fetch('http://localhost:4000/bookings?email='+loggedInUser.email, {
            method: 'GET',
            headers: {
                    'Content-Type': 'application/json',
                  authorization: `Bearer ${sessionStorage.getItem('token')} `
                }
        })
        .then(res => res.json())
        .then(data => setBookings(data));
    }, [])

    return (
        <div>
            <h2>You Have Bookings: {bookings.length} </h2>
            {
                bookings.map(book => <p key={book._id}>{book.name}| From: {(new Date(book.checkIn).toDateString('dd/MM/yyy'))}| To: {(new Date(book.checkOut).toDateString('dd/MM/yyy'))}</p>)
            }
        </div>
    );
};

export default Bookings;