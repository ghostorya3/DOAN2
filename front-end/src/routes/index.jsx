import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

// import Root from './Root';
// import ErrorPage from "../pages/Error";
import Login from '../pages/Login'
const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
 
]);

const App = () => {
    return <RouterProvider router={router} />
}
export default App