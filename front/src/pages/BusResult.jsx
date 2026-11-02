import "./BusResult.css"
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { getAllBuses } from "../Services/userService";
import { BusSearch } from "../components/BusSearch";
import BackButton from "../components/BackButton";

function BusResult() {

    const navigate = useNavigate();

    const location = useLocation();

    const [buses, setBuses] = useState(Array.isArray(location.state?.myBus) ? location.state.myBus : []);    //RECEVIE DATA FROM busSearch.jsx -> API


    const [selectedTime, setSelectedTime] = useState("ALL");
    const [selectedAC, setSelectedAC] = useState("ALL");
    const [selectedSeatType, setSelectedSeatType] = useState("ALL");
    const [maxPrice, setMaxPrice] = useState(1500);

    const [showMobileFilters, setShowMobileFilters] = useState(false);

    useEffect(() => {
        if (Array.isArray(location.state?.myBus)) {

            setBuses(location.state.myBus)

        }
        else {
            getAllBuses()
                .then((response) => { setBuses(response.data) })
        }
    }, [location.state])

    console.log("Received data:", location.state);
    console.log("Bus list:", buses);

    console.log("Bus prices:", buses.map(bus => ({
    name: bus.busName,
    price: bus.price,
    numberPrice: Number(bus.price)
})));


const filteredBuses = buses.filter((bus) => {
    const type = (bus.busType || "").toUpperCase();



    const matchesAC =
        selectedAC === "ALL" ||
        (selectedAC === "AC" &&
            type.includes("AC") &&
            !type.includes("NON-AC")) ||
        (selectedAC === "NON-AC" &&
            type.includes("NON-AC"));

    const matchesSeatType =
        selectedSeatType === "ALL" ||
        type.includes(selectedSeatType);

    const matchesPrice = Number(bus.price) <= maxPrice;

   

    const time = bus.departureTime || "";

const hour = Number(time.split(":")[0]);

const matchesTime =
    selectedTime === "ALL" ||
    (selectedTime === "MORNING" && hour >= 5 && hour < 12) ||
    (selectedTime === "AFTERNOON" && hour >= 12 && hour < 17) ||
    (selectedTime === "EVENING" && hour >= 17 && hour < 21) ||
    (selectedTime === "NIGHT" && (hour >= 21 || hour < 5));

    return matchesAC && matchesSeatType && matchesPrice && matchesTime;
});

    console.log("CHECK: "," :",filteredBuses)
    return (
        <div className="bus-results">

            <div className="specification">
                     <BackButton/>
            </div>
           

            <div className="buses-page-search">
                <BusSearch />

            </div>
            <button
    className="mobile-filter-trigger"
    onClick={() => setShowMobileFilters(true)}
>
    ☷ Filter & Sort
</button>

            {/* <div className="bus-filters"> */}
            {showMobileFilters && (
    <div
        className="filter-backdrop"
        onClick={() => setShowMobileFilters(false)}
    ></div>
)}

<div className={`bus-filters ${showMobileFilters ? "mobile-filters-open" : ""}`}>

    <button
        className="mobile-filter-close"
        onClick={() => setShowMobileFilters(false)}
    >
        ✕ Close
    </button>

    {/* <h3>Filters</h3> */}
    <h3>Filters</h3>

    <h4>Air Conditioning</h4>

    <label>
        <input
            type="radio"
            name="ac"
            checked={selectedAC === "ALL"}
            onChange={() => setSelectedAC("ALL")}
        />
        All buses
    </label>

    <label>
        <input
            type="radio"
            name="ac"
            checked={selectedAC === "AC"}
            onChange={() => setSelectedAC("AC")}
        />
        AC
    </label>

    <label>
        <input
            type="radio"
            name="ac"
            checked={selectedAC === "NON-AC"}
            onChange={() => setSelectedAC("NON-AC")}
        />
        Non-AC
    </label>

    <h4>Seat Type</h4>

    <label>
        <input
            type="radio"
            name="seatType"
            checked={selectedSeatType === "ALL"}
            onChange={() => setSelectedSeatType("ALL")}
        />
        All types
    </label>

    <label>
        <input
            type="radio"
            name="seatType"
            checked={selectedSeatType === "SLEEPER"}
            onChange={() => setSelectedSeatType("SLEEPER")}
        />
        Sleeper
    </label>

    <label>
        <input
            type="radio"
            name="seatType"
            checked={selectedSeatType === "SEATER"}
            onChange={() => setSelectedSeatType("SEATER")}
        />
        Seater
    </label>

    
<h4>Maximum Price</h4>

<p className="filter-price">₹{maxPrice}</p>

<input
    type="range"
    min="300"
    max="3000"
    step="100"
    value={maxPrice}
    onChange={(e) => setMaxPrice(Number(e.target.value))}
    className="price-slider"
/>

<div className="price-labels">
    <span>₹300</span>
    <span>₹3000</span>
</div>


        
<h4>Departure Time</h4>

{[
    { label: "All times", value: "ALL" },
    { label: "Morning (5 AM - 12 PM)", value: "MORNING" },
    { label: "Afternoon (12 PM - 5 PM)", value: "AFTERNOON" },
    { label: "Evening (5 PM - 9 PM)", value: "EVENING" },
    { label: "Night (9 PM - 5 AM)", value: "NIGHT" }
].map((timeOption) => (
    <label key={timeOption.value}>
        <input
            type="radio"
            name="departureTime"
            checked={selectedTime === timeOption.value}
            onChange={() => setSelectedTime(timeOption.value)}
        />
        {timeOption.label}
    </label>
))}

</div>


                <div className="result-box">
    {filteredBuses.map((bus) => (
        <div key={bus.id} className="bus-card">
            
            {/* Top Section */}
            <div className="bus-card-top">
                <h3 className="b-name">{bus.busName}</h3>
                <h4 className="b-rating">⭐ {bus.rating}</h4>
            </div>

            {/* Type / Seats info */}
            <div className="bus-tags">
                <span className="b-type">{bus.busType}</span>
                <span className="seats-left">{bus.availableSeats} Seats Left</span>
            </div>

            {/* Timing & City Section */}
            <div className="bus-timing-section">
                <div className="time-block">
                    {/* Backend departureTime - e.g. 06:00:00 */}
                    <p className="starting-time">{bus.departureTime}</p>
                    <p className="from">{bus.fromCity}</p>
                </div>

                <div className="duration-block">
                    <span className="arrow">→</span>
                </div>

                <div className="time-block">
                    {/* Backend arrivalTime - e.g. 14:00:00 */}
                    <p className="ending-time">{bus.arrivalTime}</p>
                    <p className="to">{bus.toCity}</p>
                </div>
            </div>

            {/* Bottom Section (Price & Button) */}
            <div className="bus-card-bottom">
                <h2 className="price">
                    ₹{bus.price}
                    <span className="sup"><br />Starting from</span>
                </h2>
                <button className="seats-btn" onClick={() => navigate(`/seatSelection/${bus.id}`)}>
                    View Seats
                </button>
            </div>

        </div>
    ))}
</div>






        </div>
    )
}

export default BusResult;