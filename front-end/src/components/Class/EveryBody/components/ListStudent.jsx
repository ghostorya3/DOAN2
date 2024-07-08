import { useState } from "react"
import { CiMenuKebab } from "react-icons/ci";

export default function ListStudent({ isTeacher }) {
    const [open, setOpen] = useState(false)
    return (<>
        {isTeacher && <>

            <CiMenuKebab className='mt-5 cursor-pointer' onClick={() => setOpen((prev) => !prev)}></CiMenuKebab>
            {
                open && <div className='absolute right-0 w-40 border cursor-pointer bg-white p-2 justify-center items-center flex'>
                    Xoá khỏi lớp
                </div>
            }
        </>
        }
    </>)
} 