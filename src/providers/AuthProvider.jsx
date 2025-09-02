import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { setCredentials, logout } from "../redux/slices/authSlice";
import { getAccessToken } from "../providers";
import { getUserData } from "../services";

export function AuthProvider({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const [loading, setLoading] = useState(true);

    const handleLogoutUser = async (redirect = true) => {
        dispatch(logout());

        if (redirect) {
            navigate("/");
        }
        setLoading(false);
    };

    // Helper function to dispatch Redux action for user info
    const setUserInfoAction = (userInfo) => {
        dispatch(setCredentials({
            token: getAccessToken(),
            user: userInfo
        }));
        setLoading(false);
    };

    const getProfileInfo = async () => {
        try {
            const response = await getUserData();
            if (response?.status === "active") {
                setUserInfoAction(response);
            } else {
                handleLogoutUser();
            }
        } catch (error) {
            console.warn("Get Profile Info Api Error", error);
            handleLogoutUser();
        }
    };

    const fetchData = () => {
        if (pathname === "/new-password" || pathname === "/reset-password") {
            handleLogoutUser(false);
            return;
        }

        const accessToken = getAccessToken();
        if (!accessToken) {
            setLoading(false);
            return;
        }

        try {
            const decodedToken = jwtDecode(accessToken);

            const expiry = decodedToken.exp;
            const expiryDate = new Date(expiry * 1000);
            const now = new Date();

            if (expiryDate > now) {
                // Token is still valid
                getProfileInfo();
            } else {
                // Token has expired
                handleLogoutUser();
            }
        } catch (error) {
            console.error("Error decoding token:", error);
            handleLogoutUser();
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return <React.Fragment>{loading ? <div>Loading...</div> : children}</React.Fragment>;
}