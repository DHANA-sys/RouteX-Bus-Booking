import { useState } from "react";
import "./Profile.css";
import BackButton from "../components/BackButton";

function Profile() {
    const [editing, setEditing] = useState(false);

   
    const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
    const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || "");
    const [userPhone, setUserPhone] = useState(localStorage.getItem("userPhone") || "");

  
    const [editName, setEditName] = useState(userName);
    const [editEmail, setEditEmail] = useState(userEmail);
    const [editPhone, setEditPhone] = useState(userPhone);

    const handleSave = () => {
        localStorage.setItem("userName", editName);
        localStorage.setItem("userEmail", editEmail);
        localStorage.setItem("userPhone", editPhone);

        
        setUserName(editName);
        setUserEmail(editEmail);
        setUserPhone(editPhone);

        setEditing(false);
    };

    const handleCancel = () => {
        // setEditName(userName);
        // setEditEmail(userEmail);
        // setEditPhone(userPhone);
        setEditing(false);
    };

    return (
        <div className="profile-container">

            <div className="profile-back">
                      <BackButton/>
            </div>
          
            <div className="profile-card">
                <h2 className="heading">My Profile</h2>

                <div className="profile-info">
                    <h2 className="name">Welcome, {userName || "User"}!</h2>
                    <p className="email">{userEmail || "No Email Added"}</p>
                    <p className="phone">Phone: {userPhone || "Not Added"}</p>
                </div>

                {editing && (
                    <div className="edit-form">
                        <div className="edit-name">
                            <label>Full Name</label>
                            <input 
                                type="text" 
                                value={editName} 
                                onChange={(e) => setEditName(e.target.value)} 
                            />
                        </div>

                        <div className="edit-email">
                            <label>Email Address</label>
                            <input 
                                type="email" 
                                value={editEmail}
                                onChange={(e) => setEditEmail(e.target.value)} 
                            />
                        </div>

                        <div className="edit-Phone">
                            <label>Phone Number</label>
                            <input 
                                type="text" 
                                value={editPhone}
                                onChange={(e) => setEditPhone(e.target.value)} 
                            />
                        </div>

                        <div className="button-group">
                            <button className="save-btn" onClick={handleSave}>
                                Save Changes
                            </button>

                            <button className="cancel-btn" onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {!editing && (
                    <button className="edit-btn" type="button" onClick={() => setEditing(true)}>
                        Edit Profile
                    </button>
                )}
            </div>
        </div>
    );
}

export default Profile;