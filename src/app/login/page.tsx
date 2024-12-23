"use client";
import Link from "next/link";
import { REGISTER_ROUTE, HOME_ROUTE } from "@/constants/routes";
import "./loginPage.scss";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "@/services/firebase";

const Login = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState<string>("");
    const [isBlinking, setIsBlinking] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, formData.email, formData.password)
            .then(() => {
                router.push(HOME_ROUTE);
            })
            .catch((error) => {
                console.log("Login Error: ", error.message);
                setError("Invalid email or password");
                setIsBlinking(true);

                setTimeout(() => {
                    setIsBlinking(false);
                    setError("");
                }, 5000);
            });
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="login-header">
                    <span className="login-title">Welcome Sign In</span>
                </div>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Email"
                        name="email"
                        aria-label="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        aria-label="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <button type="submit">Login</button>
                    {error && (
                        <p className={`error ${isBlinking ? "blink" : ""}`}>
                            {error}
                        </p>
                    )}
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
};

export default Login;
