"use client";
import Link from "next/link";
import { REGISTER_ROUTE } from "@/constants/routes";
import "./profilePage.scss";
import { useState } from "react";

const Profile = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
};

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-header">
                    <span className="login-title">Profile update</span>
                </div>
                <form className="login-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter Your full name..."
                name="name"
                aria-label="name"
                value={formData.name}
                onChange={handleChange}
            />
            <input
                type="text"
                placeholder="Enter Your Email Here..."
                name="email"
                aria-label="Email"
                value={formData.email}
                onChange={handleChange}
            />
            <input
                type="password"
                placeholder="Enter Your Password Here..."
                name="password"
                aria-label="Password"
                value={formData.password}
                onChange={handleChange}
            />
            <input
                type="password"
                placeholder="confirm password..."
                name="password"
                aria-label="Password"
                value={formData.password}
                onChange={handleChange}
            />
            <button type="submit">Update</button>
        </form>
            </div>
        </div>
    );
}

export default Profile;
