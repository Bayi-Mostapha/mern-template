import { createBrowserRouter } from "react-router-dom";
import { _ADMIN, _LOGIN } from "./urls";
import Login from "@/pages/login";
import AdminLayout from "@/layouts/admin";
import AdminProtector from "./protectors/admin-protector";
import GuestProtector from "./protectors/guest-protector";

export const router = createBrowserRouter([
    {
        element: <AdminProtector><AdminLayout /></AdminProtector>,
        children: [
            {
                path: _ADMIN,
                element: <div>hi</div>
            },
        ]
    },
    {
        path: _LOGIN,
        element: <GuestProtector><Login /></GuestProtector>
    },
    {
        path: '*',
        element: <div>404</div>
    }
])