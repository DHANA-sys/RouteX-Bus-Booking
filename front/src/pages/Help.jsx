import { useState } from "react";
import "./Help.css";
import BackButton from "../components/BackButton";

function Help() {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "How can I book a bus ticket?",
            answer: "Search for buses using your departure city, destination, and travel date. Choose a bus, select your seats, enter passenger details, and continue to payment."
        },
        {
            question: "How do I select my seats?",
            answer: "Open the seat selection page for your chosen bus. Select the available seats you want. Booked seats cannot be selected."
        },
        {
            question: "How can I check my booking?",
            answer: "Log in to your RouteX account and open My Bookings to view your booking details and current status."
        },
        {
            question: "How do I use a coupon code?",
            answer: "Choose an eligible offer and enter its coupon code during booking when coupon validation is available. The discount depends on the offer's conditions."
        },
        {
            question: "What should I do if payment fails?",
            answer: "Check your payment status before trying again. If money was deducted but your booking is not confirmed, keep your transaction details and contact the support team once official contact details are available."
        },
        {
            question: "Can I cancel my bus ticket?",
            answer: "Cancellation depends on the booking and cancellation policy. Check your booking details for available cancellation options. Cancellation functionality may need to be implemented in RouteX."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="help-page">
            <BackButton />
            <section className="help-hero">
                <span className="help-label">ROUTEX SUPPORT</span>

                <h1>How can we help you?</h1>

                <p>
                    Find answers to your questions and get help with your
                    bus booking journey.
                </p>
            </section>

            <section className="faq-section">
                <h2>Frequently Asked Questions</h2>

                <p className="faq-description">
                    Quick answers to help you travel with confidence.
                </p>

                <div className="faq-list">
                    {faqs.map((faq, index) => (
                        <div className="faq-item" key={index}>
                            <button
                                className="faq-question"
                                onClick={() => toggleFAQ(index)}
                                aria-expanded={openIndex === index}
                            >
                                <span>{faq.question}</span>

                                <span className="faq-icon">
                                    {openIndex === index ? "?" : "+"}6
                                </span>
                            </button>

                            {openIndex === index && (
                                <div className="faq-answer">
                                    <p>{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <section className="help-contact">
                <h2>Still need help?</h2>

                <p>
                    Need assistance with your journey? Contact our support
                    team when official contact details are available.
                </p>
            </section>
        </div>
    );
}

export default Help;