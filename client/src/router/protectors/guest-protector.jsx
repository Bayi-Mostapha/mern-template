import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as jwt_decode from "jwt-decode";
import { _ADMIN, _LOGIN } from "../urls";

export default function GuestProtector({ children }) {
    const navigate = useNavigate();
    const [isValid, setIsValid] = useState(null);

    const checkTokenValidity = () => {
        const token = localStorage.getItem('token');

        if (token) {
            try {
                const decoded = jwt_decode.jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decoded.exp > currentTime) {
                    navigate(_ADMIN);
                } else {
                    localStorage.removeItem('token');
                    setIsValid(true);
                }
            } catch (error) {
                console.error('Invalid token:', error);
                localStorage.removeItem('token');
                setIsValid(true);
            }
        } else {
            setIsValid(true);
        }
    };

    useEffect(() => {
        checkTokenValidity();
    }, [navigate]);

    if (isValid === null) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
}