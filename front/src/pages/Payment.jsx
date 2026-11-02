import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Payment.css";
import api from "../Services/api";
import BackButton from "../components/BackButton";

function Payment() {

    const [loading, setLoading] = useState();
    const location = useLocation(false);
    const navigate = useNavigate();

    const [couponCode, setCouponCode] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [discount, setDiscount] = useState(0);
    const [couponMessage, setCouponMessage] = useState("");

    const {
        bus,
        busId,
        userId,
        selectedSeats,
        passengers,
        totalPrice
    } = location.state || {};




    const handleApplyCoupon = async () => {

        if (!couponCode.trim()) {
            setCouponMessage("Please enter coupon code");
            return;
        }

        try {

            const response = await api.post("/offers/validate", {
                couponCode: couponCode.trim(),
                bookingAmount: Number(totalPrice)
            });

            if (response.data.valid) {

                setAppliedCoupon(response.data);
                setDiscount(Number(response.data.discount));
                setCouponMessage("Coupon applied successfully!");

            } else {

                setDiscount(0);
                setAppliedCoupon(null);
                setCouponMessage(response.data.message);

            }

        } catch (error) {

            console.error("COUPON ERROR:", error);

            setDiscount(0);
            setAppliedCoupon(null);

            setCouponMessage(
                error.response?.data?.message || "Invalid coupon code"
            );

        }
    };


    const finalAmount = Math.max(
        0,
        Number(totalPrice || 0) - discount
    );




    const handlePayment = async () => {

        try {

            if (!totalPrice || Number(totalPrice) <= 0) {
                alert("Invalid Payment Amount")
                return;
            }
            setLoading(true)
            const response = await api.post("/payment/create-order", {
                amount:finalAmount 
            });

            const order = response.data
            console.log("ORDER: ".order);

            if (!window.Razorpay) {
                alert("Razorpay Checkout Script Did't load ")
                return;
            }

            const option = {
                key:
                    import.meta.env.VITE_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                name: "RouteX",
                description: "Bus Ticket Booking",
                order_id: order.id,

                handler: async function (paymentResponse) {
                    try {
                        const currentUserId =
                            userId || localStorage.getItem("userId");

                        const currentBusId = busId || bus?.id;

                        if (!currentUserId || !currentBusId) {
                            alert("User ID or Bus ID missing. Please login again.");
                            return;
                        }

                        for (let i = 0; i < selectedSeats.length; i++) {
                            const seat = selectedSeats[i];
                            const passenger = passengers[i];

                            // 1. Save booking in database
                            const bookingResponse = await api.post("/bookings", {
                                userId: Number(currentUserId),
                                busId: Number(currentBusId),
                                seatNumber: seat.seatNumber,
                                seatId: seat.id,
                                totalPrice:
                                    finalAmount / selectedSeats.length,
                                status: "CONFIRMED"
                            });

                            const savedBooking = bookingResponse.data;

                            // 2. Save passenger details
                            await api.post("/passengers", {
                                bookingId: savedBooking.id,
                                name: passenger.name,
                                age: Number(passenger.age),
                                gender: passenger.gender
                            });

                            // 3. Update seat status
                            await api.put(
                                `/seats/${seat.id}/status`,
                                null,
                                {
                                    params: { status: "BOOKED" }
                                }
                            );
                        }

                        console.log("Payment response:", paymentResponse);
                        alert("Booking successful!");

                        navigate("/MyBookings");

                    } catch (error) {
                        console.error("BOOKING ERROR:", error);
                        alert(
                            "Payment completed, but booking save failed. Please check your database."
                        );
                    }
                },
            }

            const razorpay = new window.Razorpay(option);
            razorpay.on("payment.failed", function (response) {
                console.error("payment failed: ", response.error)
                alert("payment failed...!!! . please try again")
            })

            razorpay.open();

        }
        catch (err) {
            console.error("PAYMENT ERROR: ".err)
            alert("Unable to create payment order!! please try again")
        } finally {
            setLoading(false)
        }

    }



    return (
        <div className="payment-page">
            <BackButton/>

            <div className="payment-container">

                <div className="payment-header">
                    <h1 className="payment-title">
                        Payment Summary
                    </h1>

                    <p className="payment-subtitle">
                        Review your journey details before payment.
                    </p>
                </div>

                {/* Bus Details */}
                <div className="payment-section bus-details-section">

                    <h2 className="payment-section-title">
                        Bus Details
                    </h2>

                    <p className="payment-info">
                        <span className="payment-label">
                            Bus Name:
                        </span>

                        <span className="payment-value">
                            {bus?.busName || "Not available"}
                        </span>
                    </p>

                </div>

                {/* Selected Seats */}
                <div className="payment-section seats-section">

                    <h2 className="payment-section-title">
                        Selected Seats
                    </h2>

                    <div className="payment-seats-list">
                        {selectedSeats?.length > 0
                            ? selectedSeats.map((seat) => (
                                <span
                                    className="payment-seat-badge"
                                    key={seat.id}
                                >
                                    {seat.seatNumber}
                                </span>
                            ))
                            : <p className="payment-empty-message">
                                No seats selected
                            </p>
                        }
                    </div>

                </div>

                {/* Passenger Details */}
                <div className="payment-section passengers-section">

                    <h2 className="payment-section-title">
                        Passenger Details
                    </h2>

                    <div className="payment-passengers-list">
                        {passengers?.map((passenger, index) => (

                            <div
                                className="payment-passenger-card"
                                key={index}
                            >
                                <h3 className="payment-passenger-title">
                                    Passenger {index + 1}
                                </h3>

                                <p className="payment-info">
                                    <span className="payment-label">
                                        Name:
                                    </span>

                                    <span className="payment-value">
                                        {passenger.name}
                                    </span>
                                </p>

                                <p className="payment-info">
                                    <span className="payment-label">
                                        Age:
                                    </span>

                                    <span className="payment-value">
                                        {passenger.age}
                                    </span>
                                </p>

                                <p className="payment-info">
                                    <span className="payment-label">
                                        Gender:
                                    </span>

                                    <span className="payment-value">
                                        {passenger.gender}
                                    </span>
                                </p>

                            </div>

                        ))}
                    </div>

                </div>

                {/* Passenger Details */}
                <div className="payment-section passengers-section">

                    {/* Existing passenger details code */}

                </div>


                {/* Apply Coupon */}
                <div className="payment-section coupon-section">

                    <h2 className="payment-section-title">
                        Apply Coupon
                    </h2>

                    <div className="coupon-input-group">

                        <input
                            type="text"
                            placeholder="Enter Coupon Code"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            disabled={!!appliedCoupon}
                        />

                        <button
                            type="button"
                            onClick={handleApplyCoupon}
                            disabled={!!appliedCoupon}
                        >
                            Apply
                        </button>

                    </div>

                    {couponMessage && (
                        <p className="coupon-message">
                            {couponMessage}
                        </p>
                    )}

                    {appliedCoupon && (
                        <button
                            type="button"
                            className="remove-coupon"
                            onClick={() => {
                                setAppliedCoupon(null);
                                setDiscount(0);
                                setCouponCode("");
                                setCouponMessage("");
                            }}
                        >
                            Remove Coupon
                        </button>
                    )}

                </div>




                {/* Total Amount */}
                {/* <div className="payment-total-section">

                    <p className="payment-total-label">
                        Total Amount
                    </p>

                    <h2 className="payment-total-amount">
                        ₹{totalPrice ?? 0}
                    </h2>

                </div> */}

                {/* Total Amount */}
                <div className="payment-total-section">

                    <p className="payment-total-label">
                        Ticket Amount
                    </p>

                    <h3>₹{totalPrice ?? 0}</h3>

                    {discount > 0 && (
                        <>
                            <p className="payment-total-label">
                                Coupon Discount
                            </p>

                            <h3 style={{ color: "green" }}>
                                - ₹{discount}
                            </h3>
                        </>
                    )}

                    <p className="payment-total-label">
                        Final Amount
                    </p>

                    <h2 className="payment-total-amount">
                        ₹{finalAmount}
                    </h2>

                </div>

                {/* Payment Button */}
                <div className="payment-actions">

                    <button
                        type="button"
                        className="pay-now-btn"
                        onClick={handlePayment}
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Pay Now"}
                    </button>

                    <p className="payment-security-note">
                        Review your details before proceeding.
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Payment;