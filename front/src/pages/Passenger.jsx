
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Passenger.css"
import BackButton from "../components/BackButton";



function Passenger() {

    const location = useLocation();
    const navigate = useNavigate();

    const {
        busId,
        userId,
        selectedSeats,
        bus,
        price,
        totalPrice
    } = location.state || {};

    console.log("selected seats:", selectedSeats)

    const [passengers, setPassengers] =
        useState(
            (selectedSeats || []).map(() => ({
                name: "",
                age: "",
                gender: ""
            }))
        );



    const handlePassenger = (index, field, value) => {
        const updatedPassengers = [...passengers];
        updatedPassengers[index][field] = value;

        setPassengers(updatedPassengers);
    }


    const handleProceed = () => {

        const isValid = passengers.some((passe) =>
            !passe.name.trim() || !passe.age || Number(passe.age) <= 0 || !passe.gender
        );

        if (isValid) {
            alert("Plese Fill all Passenger details");
            return;
        }

        alert("Passenger detail Completed!!!..")


        navigate("/Payment", {
            state: {
                busId,
                userId,
                selectedSeats,
                passengers,
                bus,
                price,
                totalPrice
            }
        })


    }





    return (
        <div className="all">
            <BackButton/>
            <h2 className="all-h2">Passenger Details</h2>

            <p className="all-p">Total Passengers:{selectedSeats?.length || 0}</p>

            {(selectedSeats || []).map((seat, index) =>
            (

                <div className="passe-card" key={seat.id}>
                    <h3>Passenger{index + 1}</h3>
                    <p>Seat Number:{seat.seatNumber}</p>


                    <div className="field">
                        <label className="passe-label">Passenger Name</label>
                        <input type="text" className="passe-input"
                            placeholder="Enter Passenger name"
                            value={passengers[index].name}
                            onChange={(e) => handlePassenger(index, "name", e.target.value)}

                        />

                    </div>

                    <div className="field">
                        <label className="passe-label">Age</label>
                        <input type="number" className="passe-input"
                            placeholder="Enter Passenger age"
                            value={passengers[index].age}
                            onChange={(e) => handlePassenger(index, "age", e.target.value)}

                        />
                    </div>

                    <div className="field">
                        <label className="passe-label">Gender</label>
                        <select className="passe-input" defaultValue=""
                            value={passengers[index].gender}
                            onChange={(e) => handlePassenger(index, "gender", e.target.value)}

                        >

                            <option value="" disabled>
                                Select Gender
                            </option>
                            <option value="Male">
                                Male
                            </option>
                            <option value="Female">
                                Female
                            </option>
                            <option value="Others">
                                Others
                            </option>


                        </select>

                    </div>
                </div>
            ))}

            <div className="passe-total">
                <h3>Total Passenger:{selectedSeats?.length || 0}</h3>
                <h2>Total Amount:₹{totalPrice}</h2>

                <button className="payment-btn" onClick={handleProceed}>
                    Proceed to Payment
                </button>

            </div>


        </div>
    )
}

export default Passenger;