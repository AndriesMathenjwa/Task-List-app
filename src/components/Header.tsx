"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HOME_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTER_ROUTE } from "@/constants/routes";
import { auth } from "@/services/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import "./header.scss";

const Header = () => {
    const [isLogin, setIsLogin] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLogin(!!user);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        setIsLogin(false); 
        router.push(LOGIN_ROUTE); 
    };

    return (
        <header className="header">
            <nav className="nav">
                <Link href={HOME_ROUTE}>
                    <div className="logo">taskList</div>
                </Link>
                <ul className="nav-links">
                    {isLogin ? (
                        <>
                            <Link href={PROFILE_ROUTE}><li>Profile</li></Link>
                            <li onClick={handleLogout}>Logout</li>
                        </>
                    ) : (
                        <>
                            <Link href={LOGIN_ROUTE}><li>Login</li></Link>
                            <Link href={REGISTER_ROUTE}><li>Register</li></Link>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
