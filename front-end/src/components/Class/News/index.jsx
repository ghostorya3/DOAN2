import Image from "../../Image";
import { useMyContext } from "../../context";

export default function News({ classNamee, setPage }) {
    const { user } = useMyContext();

    return (
        <div className="w-screen flex justify-center items-center flex-col">
            <div className="w-[60%] mt-10 relative">
                <div className="bg-[url('https://www.gstatic.com/classroom/themes/img_read.jpg')] rounded-2xl h-60 w-full"></div>
                <div className="absolute bottom-5 left-5 text-white text-3xl font-semibold">{classNamee}</div>
            </div>
            <div className="flex border rounded-2xl shadow-xl gap-3 p-4 mt-5  justify-start items-center w-[60%]">
                <div className="w-10 h-10 ">
                    <Image src={user ? user.avatar : '/277894110_720178642472643_59267636986975849_n.jpg'} attribute={'border rounded-full'}></Image>
                </div>
                <div className="text-gray-500 text-base">Thông báo nội dung nào đó cho lớp học của bạn</div>
            </div>
        </div>
    );
}