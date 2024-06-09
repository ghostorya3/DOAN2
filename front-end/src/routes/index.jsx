import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import Root from '../components/Root';
import Home from "../pages/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                path: "/",
                element: <Home />,
            }
        ]
    },

]);

const App = () => {
    return <RouterProvider router={router} />
}
export default App