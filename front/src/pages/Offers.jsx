import { useEffect, useState } from "react";
// import { getAllActiveOffers } from "../services/userService";
import { getAllActiveOffers } from "../Services/userService";
import "./Offers.css"
import BackButton from "../components/BackButton";

function Offers() {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getAllActiveOffers()
            .then((response) => {
                setOffers(response.data);
            })
            .catch((error) => {
                console.error("Error fetching offers:", error);
                setError("Unable to load offers. Please try again later.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <h2>Loading offers...</h2>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="offers-page">
            <BackButton/>
            <h1>Available Offers</h1>

            {offers.length === 0 ? (
                <p>No offers available right now.</p>
            ) : (
                <div className="offers-list">
                    {offers.map((offer) => (
                        <div className="offer-card" key={offer.id}>
                            <h2>{offer.title}</h2>

                            <p>
                                Coupon Code: <strong>{offer.couponCode}</strong>
                            </p>

                            <p>
                                Discount:{" "}
                                {offer.discountType === "FLAT"
                                    ? `?${offer.discountValue} OFF`
                                    : `${offer.discountValue}% OFF`}
                            </p>

                            <p>
                                Minimum Booking: ?{offer.minimumBookingAmount}
                            </p>

                            <p>Valid Until: {offer.expiryDate}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Offers;