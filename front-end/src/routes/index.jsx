import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import Root from '../components/Root';
import ErrorPage from "../pages/Error";
import Login from '../pages/Login';
import Home from "../pages/Home";
import Work from "../pages/Work";
import Class from "../pages/Class";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/Work",
                element: <Work />,
            },
            {
                path: "/Home",
                element: <Home />,
            },
            {
                path: "/Class/:id",
                element: <Class />,
            },
        ],
    },
    {
        path: "/Login",
        element: <Login />,
    },

]);

const App = () => {
    return <RouterProvider router={router} />
}
export default App