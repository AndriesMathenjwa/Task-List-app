"use client";
import Link from "next/link";
import { REGISTER_ROUTE } from "@/constants/routes";
import "./loginPage.scss";
import { useState } from "react";
import {auth} from '@/services/firebase';

const Login = () => {

  const [formData, setFormData] = useState({
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


// console.log("verify ", auth.config);
    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-header">
                    <span className="login-title">Welcome To SignIn</span>
                </div>
                <form className="login-form" onSubmit={handleSubmit}>
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
            <button type="submit">Login</button>
        </form>
                <div className="login-footer">
                    <span className="login-footer-text">
                        Don't have an account?
                        <Link href={REGISTER_ROUTE}>
                            <span className="register-link"> Register Here</span>
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Login;
