
import "./About.css";
import { ArrowUpRight, Route, ShieldCheck, Ticket } from "lucide-react";

function About() {
    return (
        <section className="about-routex">

            <div className="about-container">

                <div className="about-image">
                    <img
                        src="/images/RouteX%20Luxury%20Sleeper%20Cabin.png"
                        alt="RouteX luxury sleeper bus interior"
                    />

                    <div className="about-image-label">
                        <span>ROUTEX</span>
                        <p>Every Route, One Journey.</p>
                    </div>
                </div>

                <div className="about-content">

                    <span className="about-subtitle">
                        GET TO KNOW US
                    </span>

                    <h2>
                        Every Journey
                        <br />
                        Starts With <span>RouteX.</span>
                    </h2>

                    <p className="about-description">
                        RouteX is a bus booking platform designed to make
                        travel planning simple and convenient. From searching
                        buses to selecting your preferred seats, we bring
                        everything together in one place.
                    </p>

                    <p className="about-description">
                        Our goal is to create a smooth booking experience
                        that helps travellers plan their journeys with ease
                        and confidence.
                    </p>

                    <div className="about-features">

                        <div className="about-feature">
                            <div className="about-feature-icon">
                                <Route />
                            </div>

                            <div>
                                <h3>Explore Routes</h3>
                                <p>Find your preferred journey easily.</p>
                            </div>
                        </div>

                        <div className="about-feature">
                            <div className="about-feature-icon">
                                <Ticket />
                            </div>

                            <div>
                                <h3>Easy Booking</h3>
                                <p>Book your seats with a simple process.</p>
                            </div>
                        </div>

                        <div className="about-feature">
                            <div className="about-feature-icon">
                                <ShieldCheck />
                            </div>

                            <div>
                                <h3>Travel With Confidence</h3>
                                <p>A convenient and secure booking experience.</p>
                            </div>
                        </div>

                    </div>

                    <a href="/about" className="about-link">
                        Discover RouteX
                        <ArrowUpRight size={19} />
                    </a>

                </div>

            </div>

        </section>
    );
}

export default About;
