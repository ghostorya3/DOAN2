import Image from "../../Image";
import { useMyContext } from "../../context";
import { IoAddSharp } from "react-icons/io5";
import Card from '../../Card/index'
import { useState } from "react";
export default function Header({ classNamee }) {
    const { user } = useMyContext();
    const [openCard, setOpenCard] = useState(false);
    return (
        <div className="border p-2 flex items-center justify-between h-16">
            <div className="flex items-center">
                <div className='w-12 h-10 ml-10'>
                    <Image src='/Google-Classroom.png'></Image>
                </div>
                <h1 className="text-2xl font-medium text-gray-500">Classroom</h1>
                {
                    classNamee && <div className="text-2xl font-medium text-gray-500">&nbsp; &gt; &nbsp;{classNamee}</div>
                }
            </div>
            <div className="relative flex items-center box-border">
                <div className="rounded-full hover:border p-2 flex justify-center items-center mr-5 hover:bg-slate-200" onClick={() => setOpenCard((item) => !item)}>
                    <IoAddSharp className="text-3xl cursor-pointer"></IoAddSharp>
                </div>
                <div className="absolute right-16 top-10 z-50">
                    {openCard && <Card></Card>}
                </div>
                <div className="group">
                    <div className='w-8 h-8 rounded-full cursor-pointer'>
                        <Image src={user ? user.avatar : '/277894110_720178642472643_59267636986975849_n.jpg'} attribute={'rounded-full'}></Image>
                    </div>
                    <div className="absolute group-hover:flex hidden top-10 right-2 border bg-slate-100 w-40 h-10  justify-center items-center rounded-md">
                        Đăng xuất
                    </div>
                </div>
            </div>
        </div>
    );
}