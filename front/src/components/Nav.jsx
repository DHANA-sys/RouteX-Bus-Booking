// import landing from "../assets/bus_land.png";
// import landing2 from "../assets/bus_land2.png";
// import logo from "../assets/bus_logo.png";
// import logo2 from "../assets/logo2.png";
// import logo3 from "../assets/logo3.png";
// import { Bus, ArrowLeftRight, Calendar, Search } from 'lucide-react';
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import "./Nav.css"
// export function Nav() {
//     const navigate = useNavigate();

//     const [isLogin, setIsLogin] = useState(
//         Boolean(localStorage.getItem("userId"))
//     )
//     return (
//         <div>

//             <div className="nav-bar">
//                 <img className="logo" src={logo3} alt="logo" />
//                 <div className="nav-items">
//                     <ul>
//                         <li><a href="/">Home</a></li>
//                         <li><a href="/buses">Buses</a></li>
//                         <li><a href="/Offers">Offers</a></li>
//                         <li><a href="/Help">Help</a></li>
//                     </ul>
//                 </div>
//                 <div className="nav-items2">
//                     <ul>
//                         <li className="icon"> <Search size={30} color="black" /></li>

//                         {!isLogin && (
//                             <>
//                                 <li><button onClick={() => navigate("/login")} >Login</button></li>
//                                 <li><button className="nav-btn" onClick={() => navigate("/Register")}>Sign Up</button></li>

//                             </>
//                         )}

//                         {isLogin && (
//                             <>
//                                 <li>
//                                     <button onClick={() => navigate("/MyBookings")}>
//                                         My Bookings
//                                     </button>
//                                 </li>

//                                 <li>
//                                     <button onClick={() => navigate("/Profile")}>
//                                         Profile
//                                     </button>
//                                 </li>

//                                 <li>
//                                     <button onClick={() => {
//                                         localStorage.removeItem("userId");
//                                         localStorage.removeItem("userEmail");
//                                         setIsLogin(false);
//                                         navigate("/")
//                                     }}>
//                                         Logout
//                                     </button>
//                                 </li>

//                             </>
//                         )}
//                     </ul>
//                 </div>

//             </div>

//             <img className="landing" src={landing} alt="Landing" />

//                         <div className="shadow">
//             <div className="land-content">
//                 <p className="land-text">Travel More , Worry Less</p>
//                 <h1 className="head2">Every Route</h1>
//                 <h1 className="head">One Journey</h1>
//                 <p className="land-des">Book Your Bus Ticket easily and travel <br></br> comfortably to your favorite destination. </p>
//             </div>
//             </div>

//         </div>
//     )
// }



















import landing from "../assets/bus_land.png";
import logo3 from "../assets/logo3.png";

import {
    Search,
    Menu,
    X,
    Home,
    Bus,
    Percent,
    CircleHelp,
    CalendarDays,
    UserRound,
    LogOut,
    UserPlus
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Nav.css";
import { BusSearch } from "./BusSearch";

export function Nav() {

    const navigate = useNavigate();

    const [isLogin, setIsLogin] = useState(
        Boolean(localStorage.getItem("userId"))
    );

    const [menuOpen, setMenuOpen] = useState(false);

    const goTo = (path) => {
        navigate(path);
        setMenuOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userName");
        localStorage.removeItem("userPhone");

        setIsLogin(false);
        setMenuOpen(false);

        navigate("/");
    };

    return (
        <div>

            {/* DESKTOP NAVBAR */}

            <div className="nav-bar desktop-navbar">

                <img
                    className="logo"
                    src={logo3}
                    alt="RouteX"
                    onClick={() => goTo("/")}
                />

                <div className="nav-items">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/buses">Buses</a></li>
                        <li><a href="/Offers">Offers</a></li>
                        <li><a href="/Help">Help</a></li>
                    </ul>
                </div>

                <div className="nav-items2">
                    <ul>

                        {/* <li
                            className="icon"
                            onClick={() => goTo("/buses")}
                        >
                            <Search size={30} color="black" />
                        </li> */}

                        {!isLogin && (
                            <>
                                <li>
                                    <button onClick={() => goTo("/login")}>
                                        Login
                                    </button>
                                </li>

                                <li>
                                    <button
                                        className="nav-btn"
                                        onClick={() => goTo("/Register")}
                                    >
                                        Sign Up
                                    </button>
                                </li>
                            </>
                        )}

                        {isLogin && (
                            <>
                                <li>
                                    <button onClick={() => goTo("/MyBookings")}>
                                        My Bookings
                                    </button>
                                </li>

                                <li>
                                    <button onClick={() => goTo("/Profile")}>
                                        Profile
                                    </button>
                                </li>

                                <li>
                                    <button onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}

                    </ul>
                </div>

            </div>


            {/* MOBILE TOP NAVBAR */}

            <div className="mobile-top-navbar">

                <img
                    src={logo3}
                    alt="RouteX"
                    className="mobile-logo"
                    onClick={() => goTo("/")}
                />

                <div className="mobile-top-actions">

                    <button onClick={() => goTo("/buses")}>
                        <Search size={23} />
                    </button>

                    <button
                        className="mobile-menu-btn"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? <X size={25} /> : <Menu size={25} />}
                    </button>

                </div>

            </div>


            {/* MOBILE MENU OVERLAY */}

            {menuOpen && (
                <div
                    className="mobile-menu-overlay"
                    onClick={() => setMenuOpen(false)}
                ></div>
            )}


            {/* MOBILE SIDE DRAWER */}

            <div className={`mobile-drawer ${menuOpen ? "drawer-open" : ""}`}>

                <div className="drawer-header">

                    <img src={logo3} alt="RouteX" />

                    <button onClick={() => setMenuOpen(false)}>
                        <X size={25} />
                    </button>

                </div>

                <div className="drawer-links">

                    <button onClick={() => goTo("/")}>
                        <Home size={21} />
                        Home
                    </button>

                    <button onClick={() => goTo("/buses")}>
                        <Bus size={21} />
                        Buses
                    </button>

                    <button onClick={() => goTo("/Offers")}>
                        <Percent size={21} />
                        Offers
                    </button>

                    <button onClick={() => goTo("/Help")}>
                        <CircleHelp size={21} />
                        Help
                    </button>

                    <div className="drawer-divider"></div>

                    {isLogin ? (
                        <>
                            <button onClick={() => goTo("/MyBookings")}>
                                <CalendarDays size={21} />
                                My Bookings
                            </button>

                            <button onClick={() => goTo("/Profile")}>
                                <UserRound size={21} />
                                Profile
                            </button>

                            <button onClick={handleLogout}>
                                <LogOut size={21} />
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => goTo("/login")}>
                                <UserRound size={21} />
                                Login
                            </button>

                            <button onClick={() => goTo("/Register")}>
                                <UserPlus size={21} />
                                Sign Up
                            </button>
                        </>
                    )}

                </div>

                <div className="drawer-footer">
                    <p>Safe Journey</p>
                    <span>WITH ROUTEX</span>
                </div>

            </div>


            {/* MOBILE BOTTOM NAVBAR */}

            <div className="mobile-bottom-navbar">

                <button onClick={() => goTo("/")}>
                    <Home size={22} />
                    <span>Home</span>
                </button>

                <button onClick={() => goTo("/buses")}>
                    <Bus size={22} />
                    <span>Buses</span>
                </button>

                <button onClick={() => goTo("/Offers")}>
                    <Percent size={22} />
                    <span>Offers</span>
                </button>

                <button onClick={() => goTo("/Help")}>
                    <CircleHelp size={22} />
                    <span>Help</span>
                </button>

                <button onClick={() => setMenuOpen(true)}>
                    <Menu size={22} />
                    <span>More</span>
                </button>

            </div>


            {/* HERO SECTION */}

            {/* <img className="landing" src={landing} alt="RouteX Bus" />

            <div className="shadow">

                <div className="land-content">

                    <p className="land-text">
                        Travel More, Worry Less
                    </p>

                    <h1 className="head2">
                        Every Route
                    </h1>

                    <h1 className="head">
                        One Journey
                    </h1>

                    <p className="land-des">
                        Book Your Bus Ticket easily and travel
                        <br />
                        comfortably to your favorite destination.
                    </p>

                </div>

            </div> */}

            {/* HERO SECTION */}

<section className="hero-section">

    <img
        className="landing"
        src={landing}
        alt="RouteX Bus"
    />

    <div className="shadow">
        <div className="land-content">

            <p className="land-text">
                Travel More, Worry Less
            </p>

            <h1 className="head2">
                Every Route
            </h1>

            <h1 className="head">
                One Journey
            </h1>

            <p className="land-des">
                Book Your Bus Ticket easily and travel
                comfortably to your favorite destination.
            </p>

        </div>
      
    </div>

</section>
                <div className="nav-search">
                         <BusSearch/>
                </div>
                 
        </div>
        
    );
}