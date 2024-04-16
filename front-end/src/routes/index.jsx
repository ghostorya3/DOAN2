import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import Root from './Root';

import ErrorPage from "../pages/Error";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        
    },
]);

const App = () => {
    return <RouterProvider router={router} />
}
export default App