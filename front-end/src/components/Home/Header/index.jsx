import Image from "../../Image";

export default function Header({ classNamee }) {
    return (
        <div className="border p-2 flex items-center justify-between">
            <div className="flex items-center">
                <div className='w-12 h-10 ml-10'>
                    <Image src='/Google-Classroom.png'></Image>
                </div>
                <h1 className="text-2xl font-medium text-gray-500">Classroom</h1>
                {
                    classNamee && <div className="text-2xl font-medium text-gray-500">&nbsp; &gt; &nbsp;{classNamee}</div>
                }
            </div>
            <div className="relative group">
                <div className='w-10 h-10 rounded-full cursor-pointer'>
                    <Image src='/277894110_720178642472643_59267636986975849_n.jpg' attribute={'rounded-full'}></Image>
                </div>
                <div className="absolute group-hover:flex hidden top-10 right-2 border bg-slate-100 w-40 h-10  justify-center items-center rounded-md">
                    Đăng xuất
                </div>
            </div>
        </div>
    );
}