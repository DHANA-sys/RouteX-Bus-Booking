import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import wheel from "../assets/steering.png";
import { BusFront, ArrowRight, Clock3 } from "lucide-react"; import "./seatSelection.css";
import Login from "./Login";
import BackButton from "../components/BackButton";
import api from "../Services/api";

function SeatSelection() {
    const { busId } = useParams();
    const navigate = useNavigate();

    const [seats, setSeats] = useState([]);
    const [selectSeats, setSelectSeats] = useState([]);
    const [bus, setBus] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [bookingLoading, setBookingLoading] = useState(false);

    const selectedSeatObjects = seats.filter((seat) =>
        selectSeats.includes(seat.id)
    );

    const price = Number(bus?.price || 0);
    const totalPrice = selectedSeatObjects.length * price;

    const isSleeper = (bus?.busType || "")
    .toUpperCase()
    .includes("SLEEPER");

    // Fetch bus details and seat details
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setLoading(true);

                // const [seatResponse, busResponse] = await Promise.all([
                //     axios.get(
                //         `http://localhost:8081/api/seats/bus/${busId}`
                //     ),
                //     axios.get("http://localhost:8081/api/buses")
                // ]);

                const [seatResponse, busResponse] = await Promise.all([
    api.get(`/seats/bus/${busId}`),
    api.get("/buses")
]);

                const sortedSeats = [...seatResponse.data].sort(
                      (a, b) => Number(a.seatNumber) - Number(b.seatNumber)
                );

                    setSeats(sortedSeats);

                // setSeats(seatResponse.data);

                const selectedBus = busResponse.data.find(
                    (item) => Number(item.id) === Number(busId)
                );

                setBus(selectedBus || null);
            } catch (error) {
                console.error("Error fetching details:", error);
                setMessage("Unable to load bus or seat details.");
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [busId]);

    // Select or unselect a seat
    const handleSeatClick = (seat) => {
        const status = seat.status?.toUpperCase();

        if (status === "BOOKED" || status === "RESERVED") {
            return;
        }

        setMessage("");

        setSelectSeats((previous) =>
            previous.includes(seat.id)
                ? previous.filter((id) => id !== seat.id)
                : [...previous, seat.id]
        );
    };


    // Book selected seats
    const handleBooking = () => {
        if (selectSeats.length === 0) {
            setMessage("Please select at least one seat.");
            return;
        }

        const userId = localStorage.getItem("userId");

        if (!userId) {
            <Login/>
            setMessage("Please login first.");
            return;
        }

        const selectedSeats = seats.filter((seat) =>
            selectSeats.includes(seat.id)
        );

        if (
            selectedSeats.some((seat) =>
                ["BOOKED", "RESERVED"].includes(
                    seat.status?.toUpperCase()
                )
            )
        ) {
            setMessage("One or more selected seats are no longer available.");
            return;
        }

        navigate("/Passenger", {
            state: {
                busId: Number(busId),
                userId: Number(userId),
                selectedSeats: selectedSeats,
                bus: bus,
                price: price,
                totalPrice: totalPrice
            }
        })

    };

    // Four seats per row: two left, aisle, two right

const seatRows = [];

for (let i = 0; i < seats.length; i += 4) {
    seatRows.push(seats.slice(i, i + 4));
}

// Sleeper bus: 18 Lower + 18 Upper
const lowerBerths = seats.filter(
    (seat) => Number(seat.seatNumber) >= 1 &&
              Number(seat.seatNumber) <= 18
);

const upperBerths = seats.filter(
    (seat) => Number(seat.seatNumber) >= 19 &&
              Number(seat.seatNumber) <= 36
);


    const renderSeat = (seat) => {
        if (!seat) {
            return <div className="seat-empty" key={Math.random()} />;
        }

        const status = seat.status?.toUpperCase();
        const isBooked = status === "BOOKED" || status === "RESERVED";
        const isSelected = selectSeats.includes(seat.id);

        const seatClass = isBooked
            ? "booked"
            : isSelected
                ? "selected"
                : "available";

        return (
              
            <button
                key={seat.id}
                type="button"
                className={`bus-seat ${seatClass} ${isSleeper ? "sleeper-berth" : ""}`}                disabled={isBooked || bookingLoading}
                onClick={() => handleSeatClick(seat)}
                title={
                    isBooked
                        ? "Booked"
                        : isSelected
                            ? "Selected"
                            : "Available"
                }
            >
                {/* A{seat.seatNumber}
                <svg className="w-8 h-8 mb-1" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8">
                    <rect x="20" y="15" width="60" height="55" rx="12" />
                    <path d="M 30 25 L 30 50 C 30 58, 70 58, 70 50 L 70 25" strokeLinecap="round" />
                </svg> */}


                
<span className="seat-number">
    {isSleeper
        ? (Number(seat.seatNumber) <= 18
            ? `L${seat.seatNumber}`
            : `U${Number(seat.seatNumber) - 18}`)
        : `A${seat.seatNumber}`}
</span>

{isSleeper ? (
    <svg
        className="berth-icon"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
    >
        <rect x="12" y="22" width="76" height="56" rx="8" />
        <path d="M22 34 H78" />
        <path d="M22 22 V78 M78 22 V78" />
    </svg>
) : (
    <svg
        className="seat-icon"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
    >
        <rect x="20" y="15" width="60" height="55" rx="12" />
        <path
            d="M30 25 L30 50 C30 58,70 58,70 50 L70 25"
            strokeLinecap="round"
        />
    </svg>
)}




            </button>
        );
    };

    if (loading) {
        return <div className="seat-page"><p>Loading bus seats...</p></div>;
    }

    return (
        <main className="seat-page">
            <BackButton/>
            <header className="seat-page-heading">
                <span className="routex-label">ROUTEX JOURNEYS</span>
                <h1>Select Your Seat</h1>
                <p>Choose your seats and get ready for your journey.</p>
            </header>

            {bus && (
                <section className="journey-card">
                    <div className="journey-bus">
                        <div className="bus-icon-wrap">
                            <BusFront size={26} />
                        </div>

                        <div>
                            <h2>{bus.busName}</h2>
                            <p>{bus.busType || "Bus service"}</p>
                        </div>
                    </div>

                    <div className="journey-times">
                        <div>
                            <span className="time-label">DEPARTURE</span>
                            <strong>{bus.departureTime || "--:--"}</strong>
                            <span className="city-name">{bus.fromCity}</span>
                        </div>

                        <div className="journey-arrow">
                            <ArrowRight size={22} />
                        </div>

                        <div className="arrival-time">
                            <span className="time-label">ARRIVAL</span>
                            <strong>{bus.arrivalTime || "--:--"}</strong>
                            <span className="city-name">{bus.toCity}</span>
                        </div>
                    </div>
                </section>
            )}

            <section className="seat-card">
                <div className="seat-legend">
                    <div>
                        <span className="legend-dot available-dot" />
                        <span>Available</span>
                    </div>

                    <div>
                        <span className="legend-dot booked-dot" />
                        <span>Reserved / Booked</span>
                    </div>

                    <div>
                        <span className="legend-dot selected-dot" />
                        <span>Selected</span>
                    </div>
                </div>

                <div className="bus-layout">
                    <div className="bus-front">
                        <span>FRONT</span>
                        <span className="steering-icon">◉</span>
                        {/* <img className="stee" src={wheel} alt="Steering Wheel"  /> */}
                    </div>

                    <div className="bus-divider" />

                    {seats.length === 0 ? (
                        <p className="empty-seats">
                            No seats found for this bus.
                        </p>
                    ) : (
 
<div className="seat-rows">
    {isSleeper ? (
        <div className="sleeper-decks">

            {/* LEFT SIDE - LOWER BERTHS */}
            <section className="sleeper-deck">
                <h3>LOWER BERTHS — 18</h3>

                {Array.from({ length: 6 }, (_, rowIndex) => {
                    const row = lowerBerths.slice(
                        rowIndex * 3,
                        rowIndex * 3 + 3
                    );

                    return (
                        <div className="seat-row sleeper-row" key={`L-${rowIndex}`}>
                            <div className="sleeper-single">
                                {renderSeat(row[0])}
                            </div>

                            <div className="walking-aisle">
                                {rowIndex === 2 ? "AISLE" : ""}
                            </div>

                            <div className="sleeper-double">
                                {renderSeat(row[1])}
                                {renderSeat(row[2])}
                            </div>
                        </div>
                    );
                })}
            </section>

            {/* RIGHT SIDE - UPPER BERTHS */}
            <section className="sleeper-deck">
                <h3>UPPER BERTHS — 18</h3>

                {Array.from({ length: 6 }, (_, rowIndex) => {
                    const row = upperBerths.slice(
                        rowIndex * 3,
                        rowIndex * 3 + 3
                    );

                    return (
                        <div className="seat-row sleeper-row" key={`U-${rowIndex}`}>
                            <div className="sleeper-single">
                                {renderSeat(row[0])}
                            </div>

                            <div className="walking-aisle">
                                {rowIndex === 2 ? "AISLE" : ""}
                            </div>

                            <div className="sleeper-double">
                                {renderSeat(row[1])}
                                {renderSeat(row[2])}
                            </div>
                        </div>
                    );
                })}
            </section>

        </div>
    ) : (
        seatRows.map((row, rowIndex) => (
            <div className="seat-row" key={rowIndex}>
                <div className="seat-pair">
                    {renderSeat(row[0])}
                    {renderSeat(row[1])}
                </div>

                <div className="walking-aisle">
                    {rowIndex === Math.floor(seatRows.length / 2)
                        ? "WALKWAY"
                        : ""}
                </div>

                <div className="seat-pair">
                    {renderSeat(row[2])}
                    {renderSeat(row[3])}
                </div>
            </div>
        ))
    )}
</div>




                    )}

                    <div className="bus-rear">REAR OF BUS</div>
                </div>

                <p className="seat-note">
                    <Clock3 size={14} />
                    Select an available seat to continue.
                </p>
            </section>

            <section className="booking-summary">
                <div className="summary-details">
                    <div>
                        <span>Selected seats</span>
                        <strong>
                            {selectedSeatObjects.length === 0
                                ? "None"
                                : selectedSeatObjects
                                    .map((seat) => seat.seatNumber)
                                    .join(", ")}
                        </strong>
                    </div>

                    <div>
                        <span>Seats count</span>
                        <strong>{selectedSeatObjects.length}</strong>
                    </div>

                    <div>
                        <span>Total price</span>
                        <strong className="total-price">
                            ₹{totalPrice.toFixed(2)}
                        </strong>
                    </div>
                </div>

                <button
                    className="book-seats-button"
                    onClick={handleBooking}
                    disabled={
                        selectSeats.length === 0
                        // bookingLoading
                    }
                >
                    {/* {bookingLoading ? "Booking..." : "Book Selected Seats"} */}
                    Continue to Passenger Details
                </button>

                {message && (
                    <p className="seat-message" role="status">
                        {message}
                    </p>
                )}
            </section>
        </main>
    );
}

export default SeatSelection;
