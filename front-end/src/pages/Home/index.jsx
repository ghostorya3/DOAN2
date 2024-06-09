import Body from "../../components/Home/body";
import Header from "../../components/Home/header";
import Sidebar from "../../components/Home/sidebar";

export default function Home() {
    return (<div className="w-full">
        <Header></Header>
        <div className="flex items-start">
            <Sidebar></Sidebar>
            <Body></Body>
        </div>
    </div>
    )
}