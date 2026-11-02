
import { useState } from "react";
import {
    Star,
    MapPin,
    Quote,
    ChevronLeft,
    ChevronRight
} from "lucide-react";

import "./Testimonials.css";

function Testimonials() {

    const reviews = [
        {
            name: "Arun Kumar",
            location: "Chennai",
            initial: "A",
            rating: 5,
            review:
                "Booking my bus ticket was very easy. The website is simple to use and the overall experience was smooth."
        },
        {
            name: "Priya S",
            location: "Coimbatore",
            initial: "P",
            rating: 5,
            review:
                "I really liked the seat selection feature. I could choose my preferred seat without any confusion."
        },
        {
            name: "Karthik R",
            location: "Madurai",
            initial: "K",
            rating: 4,
            review:
                "A clean and convenient booking experience. RouteX makes planning my travel much easier."
        },
        {
            name: "Vijay Kumar",
            location: "Bangalore",
            initial: "V",
            rating: 5,
            review:
                "The booking process was simple and quick. I had a comfortable experience using RouteX."
        },
        {
            name: "Meena S",
            location: "Salem",
            initial: "M",
            rating: 5,
            review:
                "Finding buses and selecting seats was easy. I loved the smooth booking experience."
        },
        {
            name: "Rahul M",
            location: "Trichy",
            initial: "R",
            rating: 4,
            review:
                "A convenient platform for planning trips. The website is easy to navigate and use."
        },
        {
            name: "Sanjay R",
            location: "Erode",
            initial: "S",
            rating: 5,
            review:
                "RouteX made my travel booking experience simple and hassle-free. I would use it again."
        },
        {
            name: "Divya K",
            location: "Tirunelveli",
            initial: "D",
            rating: 5,
            review:
                "The seat selection experience was clear and convenient. Booking my journey was easy."
        },
        {
            name: "Praveen S",
            location: "Vellore",
            initial: "P",
            rating: 4,
            review:
                "A neat and user-friendly website. I could find my bus and complete the booking easily."
        }
    ];

    const [activePage, setActivePage] = useState(0);

    const visibleReviews = reviews.slice(
        activePage * 3,
        activePage * 3 + 3
    );

    const totalPages = Math.ceil(reviews.length / 3);

    const previousPage = () => {
        setActivePage((prev) =>
            prev === 0 ? totalPages - 1 : prev - 1
        );
    };

    const nextPage = () => {
        setActivePage((prev) =>
            prev === totalPages - 1 ? 0 : prev + 1
        );
    };

    return (
        <section className="customer-testimonials">

            <div className="testimonial-overlay"></div>

            <div className="customer-testimonial-container">

                <div className="customer-testimonial-heading">

                    <span className="testimonial-label">
                        TRAVEL STORIES
                    </span>

                    <h2>
                        What Our Customers <strong>Say</strong>
                    </h2>

                    <p>
                        Real experiences make every journey meaningful.
                        <br />
                        Here's what our travellers think about RouteX.
                    </p>

                </div>

                <div className="customer-review-grid">

                    {visibleReviews.map((item, index) => (

                        <div className="customer-review-card" key={item.name}>

                            <div className="customer-review-top">

                                <div className="customer-profile">

                                    <div className="customer-avatar">
                                        {item.initial}
                                    </div>

                                    <div className="customer-details">
                                        <h3>{item.name}</h3>

                                        <span>
                                            <MapPin size={14} />
                                            {item.location}
                                        </span>
                                    </div>

                                </div>

                                <Quote className="customer-quote-icon" />

                            </div>

                            <div className="customer-stars">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        size={18}
                                        fill={
                                            star <= item.rating
                                                ? "currentColor"
                                                : "none"
                                        }
                                    />
                                ))}
                            </div>

                            <p className="customer-review-text">
                                {item.review}
                            </p>

                        </div>

                    ))}

                </div>

                <div className="testimonial-pagination">

                    <div className="pagination-line"></div>

                    <button
                        className="testimonial-arrow"
                        onClick={previousPage}
                        aria-label="Previous reviews"
                    >
                        <ChevronLeft />
                    </button>

                    <div className="testimonial-dots">

                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                className={
                                    activePage === index
                                        ? "testimonial-dot active"
                                        : "testimonial-dot"
                                }
                                onClick={() => setActivePage(index)}
                                aria-label={`Go to review page ${index + 1}`}
                            />
                        ))}

                    </div>

                    <button
                        className="testimonial-arrow"
                        onClick={nextPage}
                        aria-label="Next reviews"
                    >
                        <ChevronRight />
                    </button>

                    <div className="pagination-line"></div>

                </div>

            </div>

        </section>
    );
}

export default Testimonials;

