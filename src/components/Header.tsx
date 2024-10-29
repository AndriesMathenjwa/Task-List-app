"use client";
import Link from "next/link";
import { HOME_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTER_ROUTE } from "@/constants/routes";
import "./header.scss";

const Header = () => {
    const isLogin = false;

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
                            <Link href={HOME_ROUTE}><li>Logout</li></Link>
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
