import { GoPlus } from "react-icons/go";
import { CiLogout } from "react-icons/ci";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { LuHome } from "react-icons/lu";
import { FaCalendarDays } from "react-icons/fa6";

const SideBarLeft = () => {
    const navigate = useNavigate();

    return (<>
        <div className="h-full w-[64px] hover:w-[300px] p-2 transition-[width] duration-500 ease-in-out z-50 absolute flex flex-col gap-5 overflow-hidden border shadow-2xl bg-slate-50" >
            <div className="flex gap-2 rounded-3xl border ml-[-25px] p-2 bg-blue-100">
                <div className="w-max ml-5">
                    <LuHome className="text-2xl text-gray-500"></LuHome>
                </div>
                <div className="overflow-hidden whitespace-nowrap ml-5 text-xl cursor-pointer text-gray-500">Màn hình chính</div>
            </div>
            <div className="flex gap-2 hover:rounded-3xl hover:border ml-[-25px] p-2">
                <div className="w-max ml-5">
                    <FaCalendarDays className="text-2xl text-gray-500"></FaCalendarDays>
                </div>
                <div className="overflow-hidden whitespace-nowrap ml-5 text-xl cursor-pointer text-gray-500">Việc cần làm</div>
            </div>
        </div>
    </>)
}
export default SideBarLeft;