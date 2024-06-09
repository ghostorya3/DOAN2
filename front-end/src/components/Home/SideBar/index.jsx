import Image from "../../Image";
import { FaPlus } from "react-icons/fa6";
import { TiHome } from "react-icons/ti";
import { FaRoad } from "react-icons/fa6";
import { FaNewspaper } from "react-icons/fa";

const Sidebar = () => {
    return (<>
        <div className="w-28 py-5 px-3 flex justify-center items-center flex-col gap-3">
            <div className="bg-blue-600 rounded-full border flex justify-center items-center cursor-pointer w-12 h-12">
                <FaPlus className="text-white hover:rotate-45 hover:scale-150 transition-all duration-300"></FaPlus>
            </div>
            <div className="flex flex-col items-center justify-center w-20 h-20 bg-stone-200 cursor-pointer rounded-2xl">
                <TiHome className="text-xl"></TiHome>
                <div className="text-xs font-medium mt-1">Trang chủ</div>
            </div>
            <div className="flex flex-col items-center justify-center w-20 h-20 hover:bg-stone-200 cursor-pointer rounded-2xl">
                <FaRoad className="text-xl"></FaRoad>
                <div className="text-xs font-medium mt-1">Lộ trình</div>
            </div>
            <div className="flex flex-col items-center justify-center w-20 h-20 hover:bg-stone-200 cursor-pointer rounded-2xl">
                <FaNewspaper className="text-xl"></FaNewspaper>
                <div className="text-xs font-medium mt-1">Bài viết</div>
            </div>
        </div>
    </>)
}

export default Sidebar

