import { Outlet } from "react-router-dom";

function adminLayout() {
    return (
        <>
            <main className="min-h-screen flex justify-center items-center">
                <Outlet />
            </main>
        </>
    );
}

export default adminLayout;