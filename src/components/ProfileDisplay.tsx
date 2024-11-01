import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/services/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { FaUser, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import "./profileDisplay.scss";
import { LOGIN_ROUTE } from "@/constants/routes";

const ProfileDisplay = () => {
    const [profileData, setProfileData] = useState<{ profilePicture: string } | null>(null);
    const [showMenu, setShowMenu] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                await fetchProfileData(user.uid);
            }
        });

        const fetchProfileData = async (uid: string) => {
            try {
                const docRef = doc(db, "users", uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setProfileData(docSnap.data() as { profilePicture: string });
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        const handleProfileUpdated = () => {
            const user = auth.currentUser;
            if (user) {
                fetchProfileData(user.uid);
            }
        };

        window.addEventListener("profileUpdated", handleProfileUpdated);

        return () => {
            unsubscribe();
            window.removeEventListener("profileUpdated", handleProfileUpdated);
        };
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        router.push(LOGIN_ROUTE);
    };

    return (
        <div className="profile-display-container">
            {profileData ? (
                <>
                    <img
                        src={profileData.profilePicture}
                        className="profile-picture"
                        onClick={() => setShowMenu((prev) => !prev)}
                    />
                    {showMenu && (
                        <div className="menu">
                            <div className="menu-item" onClick={() => router.push("/profile")}>
                                <FaUserCircle className="menu-icon" />
                                <span>Profile</span>
                            </div>
                            <div className="menu-item" onClick={handleLogout}>
                                <FaSignOutAlt className="menu-icon" />
                                <span>Logout</span>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="no-profile-icon" onClick={() => setShowMenu((prev) => !prev)}>
                    <FaUser className="icon" />
                    {showMenu && (
                        <div className="menu">
                            <div className="menu-item" onClick={() => router.push("/profile")}>
                                <FaUserCircle className="menu-icon" />
                                <span>Profile</span>
                            </div>
                            <div className="menu-item" onClick={handleLogout}>
                                <FaSignOutAlt className="menu-icon" />
                                <span>Logout</span>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProfileDisplay;
