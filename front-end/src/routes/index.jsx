import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import Root from '../components/Root';
import ErrorPage from "../pages/Error";
import Login from '../pages/Login';
import Home from "../pages/Home";
import Class from "../pages/Class";
import Excercise from "../pages/Excercise";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/Home",
                element: <Home />,
            },
            {
                path: "/Class/:id",
                element: <Class />,
            },
            {
                path: "/Excercise/:id",
                element: <Excercise />,
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