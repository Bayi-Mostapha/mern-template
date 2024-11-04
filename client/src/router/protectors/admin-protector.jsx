import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as jwt_decode from "jwt-decode";
import { _LOGIN } from "../urls";

export default function AdminProtector({ children }) {
    const navigate = useNavigate();
    const [isValid, setIsValid] = useState(null);

    const checkTokenValidity = () => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate(_LOGIN);
            return;
        }

        try {
            const decoded = jwt_decode.jwtDecode(token);
            const currentTime = Date.now() / 1000;

            if (decoded.exp < currentTime) {
                navigate(_LOGIN);
            } else {
                setIsValid(true);
            }
        } catch (error) {
            console.error('Invalid token:', error);
            navigate(_LOGIN);
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