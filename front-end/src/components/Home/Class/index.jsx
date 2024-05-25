import Image from "../../Image";
import { useNavigate } from "react-router-dom";
export default function Class({ item }) {
    const navigate = useNavigate();
    return (
        <div className="w-[300px] h-[250px] rounded-2xl mt-2 relative border cursor-pointer" onClick={() => navigate(`/Class/${item._id}`)}>
            <div className="h-1/3 bg-[url('https://www.gstatic.com/classroom/themes/img_read.jpg')] p-3 rounded-t-2xl">
                <div className="text-white text-xl">{item.className}</div>
            </div>
            <div className="absolute top-10 right-5 rounded-full w-24 h-24">
                <Image src={item.avatar} attribute={'rounded-full'}></Image>
            </div>
        </div>
    )
}