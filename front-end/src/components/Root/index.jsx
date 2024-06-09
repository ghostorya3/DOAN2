import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";


export default function Root() {
    const navigate = useNavigate();

    return (
        <>
            <head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" />
            </head>
            <div className="w-screen h-screen box-border overflow-y-scroll overflow-x-hidden font-roboto">
                <Outlet></Outlet>
            </div>
        </>
    )
}