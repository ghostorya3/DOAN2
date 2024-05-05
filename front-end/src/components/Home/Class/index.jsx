import Image from "../../Image";

export default function Class() {
    return (
        <div className="w-[300px] h-[250px] rounded-2xl mt-2 relative border">
            <div className="h-1/3 bg-[url('https://www.gstatic.com/classroom/themes/img_read.jpg')] p-3 rounded-t-2xl">
                <div className="text-white text-xl">Lập trình phân tán</div>
            </div>
            <div className="absolute top-10 right-5 rounded-full w-24 h-24">
                <Image src='https://media-cdn-v2.laodong.vn/storage/newsportal/2023/8/26/1233821/Giai-Nhi-1--Nang-Tre.jpg' attribute={'rounded-full'}></Image>
            </div>
        </div>
    )
}