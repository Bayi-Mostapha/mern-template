import { createBrowserRouter } from "react-router-dom";
import { _LOGIN } from "./urls";
import Login from "@/pages/login";
import AdminLayout from "@/layouts/admin";

export const router = createBrowserRouter([
    {
        element: <AdminLayout />,
        children: [
            // {
            //     path: HOME,
            //     element: <Home />
            // },
        ]
    },
    {
        path: _LOGIN,
        element: <Login />
    },
    {
        path: '*',
        element: <div>404</div>
    }
])