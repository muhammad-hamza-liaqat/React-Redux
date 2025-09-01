import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { loginUser, logoutUser, setNewSetup } from "../redux";
import { getAccessToken, setAccessToken, setRefreshToken } from "../providers";
import { Loader } from "../components";
import { getAccessFromRefresh, getUserData } from "../services";
import { clearQuizData } from "../redux/slices/quizSlice";

export function AuthProvider({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;
    const [loading, setLoading] = useState(true);

    const handleLogoutUser = async (redirect = true) => {
        dispatch(logoutUser());
        dispatch(clearQuizData());

        if (redirect) {
            navigate("/");
        }
        setLoading(false);
        setAccessToken("");
        setRefreshToken("");
    };

    // Helper function to dispatch Redux action for user info
    const setUserInfoAction = (userInfo) => {
        dispatch(loginUser(userInfo));
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

    const generateAccessToken = async () => {
        try {
            const response = await getAccessFromRefresh();
            setAccessToken(response?.access);
            setRefreshToken(response?.refresh);
            setTimeout(() => {
                getProfileInfo();
            }, 500);
        } catch (error) {
            console.log("error", error);
            handleLogoutUser();
        }
    };

    const fetchData = () => {
        if (pathname === "/new-password" || pathname === "/reset-password") {
            handleLogoutUser(false);
            return;
        }

        const accessToken = getAccessToken();
        try {
            const decodedToken = jwtDecode(accessToken);

            const expiry = decodedToken.exp;
            const expiryDate = new Date(expiry * 1000);
            const now = new Date();
            const oneDayFromNow = new Date(now.getTime() + 86400000);

            if (expiryDate > oneDayFromNow) {
                // Token is still valid for more than one day!
                getProfileInfo();
            } else {
                // Token has expired.
                generateAccessToken();
            }
        } catch (error) {
            console.error("Error decoding token:", error);
            handleLogoutUser();
        }
    };

    const handleNewSetup = () => {
        const params = new URLSearchParams(location.search);
        const token = params.get("token");

        try {
            const decodedToken = jwtDecode(token);

            const expiry = decodedToken.exp;
            const expiryDate = new Date(expiry * 1000);
            const now = new Date();

            if (expiryDate > now) {
                // Token is still valid
                setLoading(false);
                dispatch(setNewSetup(decodedToken));
            } else {
                // Token has expired.
                handleLogoutUser();
            }
        } catch (error) {
            console.error("Error decoding token:", error);
            handleLogoutUser();
        }
    };

    useEffect(() => {
        if (location.pathname.includes("organization-information")) {
            handleNewSetup();
        } else {
            fetchData();
        }
    }, []);

    return <React.Fragment>{loading ? <Loader /> : children}</React.Fragment>;
}