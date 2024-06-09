import Image from "../../Image";
import { IoSearchOutline } from "react-icons/io5";

const Header = () => {
    return (<>
        <div className="w-full px-8 py-3 flex justify-between items-center border-b-2">
            <div className="flex items-center gap-4 justify-center font-medium text-base">
                <div className="w-10 h-10">
                    <Image src={'https://fullstack.edu.vn/static/media/f8-icon.18cd71cfcfa33566a22b.png'} attribute={'rounded-lg'}></Image>
                </div>
                <div className="text-sm font-semibold">Học Lập Trình Để Đi Làm</div>
            </div>
            <div className="relative">
                <input type="text" className="w-[500px] text-sm outline-none rounded-3xl px-10 py-2 border-2" placeholder="Tìm kiếm khoá học, bài viết, video, ..."/>
                <IoSearchOutline className="absolute top-[8px] left-3 text-2xl text-gray-500"></IoSearchOutline>
            </div>
            <div className="flex gap-5 items-center">
                <div className="text-sm font-medium">Đăng nhập</div>
                <div className="border text-sm rounded-3xl bg-[#ff731f] text-white py-2 px-5 font-medium">Đăng ký</div>
            </div>
        </div>
    </>)
}

export default Header

