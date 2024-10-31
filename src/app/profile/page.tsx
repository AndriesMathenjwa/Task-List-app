"use client";
import "./profilePage.scss";
import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { auth } from "@/services/firebase";
import { updateProfile, updateEmail, updatePassword } from "firebase/auth";
import { db } from "@/services/firebase";
import { doc, setDoc } from "firebase/firestore";

const Profile = () => {
    const [formData, setFormData] = useState<{
        name: string;
        email: string;
        password: string;
        picture: string; 
    }>({
        name: "",
        email: "",
        password: "",
        picture: "", 
    });

    // New state for the selected file name
    const [fileName, setFileName] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Image = (reader.result as string).split(",")[1];
                setFormData({ ...formData, picture: base64Image });
            };
            reader.readAsDataURL(file);
            
            setFileName(file.name); 
        } else {
            setFormData({ ...formData, picture: "" });
            setFileName("");  
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        const user = auth.currentUser;
        if (!user) return;
    
        try {
            if (formData.name) {
                await updateProfile(user, { displayName: formData.name });
            }
    
            if (formData.email && formData.email !== user.email) {
                await updateEmail(user, formData.email);
            }
    
            if (formData.password) {
                await updatePassword(user, formData.password);
            }
    
            const apiResponse = await fetch("https://n8vz7jrx74.execute-api.eu-west-1.amazonaws.com/dev/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    image: formData.picture,
                    fileName: `${user.displayName || "user"}-image`
                }),
            });
    
            if (!apiResponse.ok) {
                throw new Error("Failed to upload image");
            }
    
            const responseData = await apiResponse.json(); 
            const imageUrl = responseData.url; 
    
            await setDoc(doc(db, "users", user.uid), {
                name: formData.name,
                email: user.email,
                profilePicture: imageUrl 
            });
    
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Error updating profile. Please try again.");
        }
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
                    <div className="file-upload">
                        <label htmlFor="file-upload" className="custom-file-upload">
                            <FaUpload /> 
                            Upload Picture
                        </label>
                        <input
                            type="file"
                            id="file-upload"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    {fileName && <p>{fileName}</p>}
                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
