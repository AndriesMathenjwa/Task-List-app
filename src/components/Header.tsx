"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HOME_ROUTE, LOGIN_ROUTE, PROFILE_ROUTE, REGISTER_ROUTE } from "@/constants/routes";
import { auth } from "@/services/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter, usePathname } from "next/navigation";
import ProfileDisplay from "@/components/ProfileDisplay";
import "./header.scss";

const Header = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLogin(!!user);
            setLoading(false); 
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
                    {!loading && !isLogin && ( 
                        <>
                            <Link href={LOGIN_ROUTE}><li>Login</li></Link>
                            <Link href={REGISTER_ROUTE}><li>Register</li></Link>
                        </>
                    )}
                </ul>
            </nav>
            {(pathname === PROFILE_ROUTE || pathname === HOME_ROUTE) && (
                <ProfileDisplay />
            )}
        </header>
    );
};

export default Header;
