import { Navigate, createBrowserRouter } from "react-router-dom";
import Login from "./views/Login";
import Signup from "./views/Signup";
import NotFound from "./views/NotFound";
import DefaultLayout from "./layouts/DefaultLayout";
import GuestLayout from "./layouts/GuestLayout";
import Messages from "./views/Messages";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to={'/messages'} />,
            },
            {
                path: '/messages',
                element: <Messages />
            },
            {
                path: '/messages/:id',
                element: <Messages />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
])

export default router;
