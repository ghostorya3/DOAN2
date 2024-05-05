import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import Root from '../components/Root';
import ErrorPage from "../pages/Error";
import Login from '../pages/Login';
import Home from "../pages/Home";
import Work from "../pages/Work";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            // {
            //     path: "/Home",
            //     element: <Home />,
            // },
        ],
    },
    {
        path: "/Login",
        element: <Login />,
    },
    {
        path: "/Work",
        element: <Work />,
    },
    {
        path: "/Home",
        element: <Home />,
    },
]);

const App = () => {
    return <RouterProvider router={router} />
}
export default App