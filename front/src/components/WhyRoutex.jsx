
import "./WhyRoutex.css";
import {ShieldCheck,Clock3, Armchair, Headset,} from "lucide-react";

function WhyRoutex() {

const features = [
    {
        icon: <ShieldCheck />,
        title: "Safe & Secure",
        description:
            "Travel with confidence through secure booking and a reliable journey experience.",
    },
    {
        icon: <Clock3 />,
        title: "On-Time Journey",
        description:
            "Plan your trips easily with convenient schedules and smooth booking.",
    },
    {
        icon: <Armchair />,
        title: "Comfortable Seats",
        description:
            "Choose your preferred seats and enjoy a comfortable travel experience.",
    },
    {
        icon: <Headset />,
        title: "Easy Support",
        description:
            "Get assistance whenever you need help with your booking or journey.",
    },
];


    return (

    
        
        <section className="why-routex">
            <div className="why-container">

                <div className="why-heading">
                    <span className="why-subtitle">
                        THE ROUTEX ADVANTAGE
                    </span>

                    <h2>
                        Why Choose <span>RouteX?</span>
                    </h2>

                    <p>
                        More than just a bus booking platform.
                        We make every journey simple, comfortable and reliable.
                    </p>
                </div>

                <div className="why-cards">
                    {features.map((feature, index) => (
                        <div className="why-card" key={index}>

                            <div className="why-icon">
                                {feature.icon}
                            </div>

                            <h3>{feature.title}</h3>

                            <p>{feature.description}</p>

                            <span className="why-number">
                                0{index + 1}
                            </span>

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default WhyRoutex;
