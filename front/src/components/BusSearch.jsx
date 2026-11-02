import React, { useState } from 'react';
import { Bus, ArrowLeftRight, Calendar, Search } from 'lucide-react';
import "./BusSearch.css"
import{useNavigate} from "react-router-dom";
import { searchBus } from "../Services/userService";

export function BusSearch() {
  const [from, setFrom] = useState('Chennai');
  const [to, setTo] = useState('Madurai');
  const [date, setDate] = useState('13 Oct, 2026');
  const [bus, setBus] = useState({});
  const [error, setError] = useState("");

  const navigate=useNavigate();

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSearch = async () => {

    try {
      setError("");

      const response = await searchBus(from, to);
      setBus(response.data);
      console.log("API RESPONSE:",response.data);
      navigate("/buses",{
        state:{
          myBus:response.data
        }
      })
     console.log("API RESPONSE:",response.data);
    } catch (err) {
      setError("Unable to fetch buses. Please try again.");
      console.error(err);
    }
  }

  return (
    <div className={`outer-container $ 
    {window.location.pathname==="/buses"?"buses-page-search":""}`}>
      <div className="card-container">

        <div className="input-group">
          <Bus size={22} color="#555" />
          <div className="text-container">
            <span className="label">From</span>
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="input-field"
            />
          </div>
        </div>

        <button onClick={handleSwap} className="swap-btn" title="Swap locations">
          <ArrowLeftRight size={16} color="#fff" />
        </button>

        <div className="input-group">
          <Bus size={22} color="#555" />
          <div className="text-container">
            <span className="label">To</span>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="input-field"
            />
          </div>
        </div>

        <div className="date-group">
          <Calendar size={22} color="#555" />
          <div className="text-container">
            <span className="label">Date of Journey</span>
            <div className="date-value-row">
              <span className="date-text">{date}</span>
              <span className="day-text">(Tmrw)</span>
            </div>
          </div>
          <div className="quick-date-btns">
            <button className="pill-btn">Today</button>
            <button className="pill-btn active-pill">Tomorrow</button>
          </div>
        </div>

        <div className="women-group">


          <label className="switch">

          </label>
        </div>

      </div>

      <button className="search-btn" onClick={handleSearch}>
        <Search size={20} color="#fff" />
        <span>Search buses</span>
      </button>
     
    </div>
    
  );
}