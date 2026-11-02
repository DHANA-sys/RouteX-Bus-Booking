import { useState, useEffect } from "react";
import axios from "axios";
import "./MyBookings.css"
import BackButton from "../components/BackButton";
import api from "../Services/api";

function MyBookings() {

    const [bookings, setBookings] = useState([]);
    const [buses, setBuses] = useState([]);

    // useEffect(() => {

    //     const userId = localStorage.getItem("userId");
    //     console.log("userId:", userId);
    //     if (userId) {
    //         axios.get(`http://localhost:8081/api/bookings/user/${userId}`)
    //             .then((response) => {
    //                 setBookings(response.data);
    //                 console.log("RESPONSE:", response.data)
    //             })

    //     }
    // }, []);


    // useEffect(() => {
    //     axios.get("http://localhost:8081/api/buses")
    //         .then((response) => {
    //             setBuses(response.data);
    //             // console.log("BUS RESPONSE:",response.data)
    //         })
    // })


    useEffect(() => {

    const userId = localStorage.getItem("userId");

    console.log("userId:", userId);

    if (userId) {
        api.get(`/bookings/user/${userId}`)
            .then((response) => {
                setBookings(response.data);
                console.log("RESPONSE:", response.data);
            })
            .catch((error) => {
                console.error("Booking Error:", error);
            });
    }

}, []);


useEffect(() => {

    api.get("/buses")
        .then((response) => {
            setBuses(response.data);
        })
        .catch((error) => {
            console.error("Bus Error:", error);
        });

}, []);


    return (
        <>
            <div className="contain">
                <BackButton/>
                <div>
                    <h1 className="title">My Bookings</h1>
                </div>

                {bookings.map((bookings) => {

                    const bus = buses.find((b) => b.id === bookings.busId);

                    // <div key={bookings.id} className="details">

                    return (
                        <div key={bookings.id} className="details">


                            <p className="p1">Booking ID:  {bookings.id}</p>
                            <p className="p2">Bus Name:  {bus ? bus.busName : "Bus details unavailable"}</p>
                            <p className="p3">Route:  {bus ? `${bus.fromCity} -to- ${bus.toCity}` : "Route Unavailable"}</p>
                            <p className="p4">Seat Number:  {bookings.seatNumber}</p>
                            <p className="p5">Booking Date:  {bookings.bookingDate}</p>
                            <p className="p6">Total Price:  {bookings.totalPrice}</p>
                            <p className="p7">Status:  {bookings.status}</p>

                        </div>
                    )

                })}
                <br></br>  <br></br>
            </div>
        </>
    )
}


export default MyBookings;