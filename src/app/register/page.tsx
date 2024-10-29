"use client";
import React, { useState } from 'react';
import Link from "next/link";
import { LOGIN_ROUTE, PROFILE_ROUTE } from "@/constants/routes";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./registerPage.scss";
import { useRouter } from "next/navigation";
import { auth } from "@/services/firebase";


const RegisterPage: React.FC = () => {
  const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then((response) => {
          alert("User Registered Successfully");
          setFormData({
            email: "",
            password: "",
            confirmPassword: ""
          });
          router.push(LOGIN_ROUTE);
        })
        .catch((e) => {
          console.log("Error: ", e.message);
          alert("Something went wrong, please try again");
        });
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <div className="register-header">
                    <span className="register-title">Create Your Account</span>
                </div>
                <form className="register-form" onSubmit={handleSubmit}>
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
                        placeholder="Confirm Your Password..."
                        name="confirmPassword"
                        aria-label="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    <button type="submit">Register</button>
                </form>
                <div className="register-footer">
                    <span className="register-footer-text">
                        Already have an account?
                        <Link href={LOGIN_ROUTE}>
                            <span className="login-link"> Login Here</span>
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
