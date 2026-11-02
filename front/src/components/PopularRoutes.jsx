
import "./PopularRoutes.css";
import { ArrowRight, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { searchBus } from "../Services/userService";

function PopularRoutes() {

    const navigate = useNavigate();

    const routes = [
        {
            from: "Chennai",
            to: "Bangalore",
            image: "/images/c-b.jpg",
            price: "Explore available buses"
        },
        {
            from: "Chennai",
            to: "Madurai",
            image: "/images/c-m.avif",
            price: "Explore available buses"
        },
        {
            from: "Chennai",
            to: "Coimbatore",
            image: "/images/c-c.jpg",
            price: "Explore available buses"
        },
        {
            from: "Bangalore",
            to: "Chennai",
            image: "/images/b-c.jpg",
            price: "Explore available buses"
        },
        {
            from: "Madurai",
            to: "Coimbatore",
            image: "/images/c-c.jpg",
            price: "Explore available buses"
        },
        {
            from: "Coimbatore",
            to: "Bangalore",
            image: "/images/c-b.jpg",
            price: "Explore available buses"
        }
    ];

    const handleExplore = async (from, to) => {
        try {
            const response = await searchBus(from, to);

            navigate("/buses", {
                state: {
                    myBus: response.data
                }
            });

        } catch (error) {
            console.error("Route search error:", error);
            alert("Unable to fetch buses. Please try again.");
        }
    };

    return (
        <section className="popular-routes">

            <div className="popular-container">

                <div className="popular-heading">
                    <span>EXPLORE DESTINATIONS</span>

                    <h2>
                        Popular <strong>Routes</strong>
                    </h2>

                    <p>
                        Discover popular travel routes and find
                        your next journey with RouteX.
                    </p>
                </div>

                <div className="popular-grid">

                    {routes.map((route, index) => (

                        <div className="popular-card" key={index}>

                            <div className="popular-image">
                                <img
                                    src={route.image}
                                    alt={`${route.from} to ${route.to}`}
                                />

                                <div className="popular-image-overlay"></div>

                                <span className="popular-tag">
                                    POPULAR ROUTE
                                </span>
                            </div>

                            <div className="popular-card-content">

                                <div className="popular-route-name">
                                    <div>
                                        <span>FROM</span>
                                        <h3>{route.from}</h3>
                                    </div>

                                    <ArrowRight className="route-arrow" />

                                    <div>
                                        <span>TO</span>
                                        <h3>{route.to}</h3>
                                    </div>
                                </div>

                                <div className="popular-card-bottom">

                                    <span className="popular-price">
                                        <MapPin size={15} />
                                        {route.price}
                                    </span>

                                    <button
                                        onClick={() =>
                                            handleExplore(route.from, route.to)
                                        }
                                    >
                                        Explore
                                        <ArrowRight size={16} />
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}

export default PopularRoutes;
