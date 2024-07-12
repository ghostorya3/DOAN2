import { useState } from "react"
import { CiMenuKebab } from "react-icons/ci";
import { POST } from "../../../common";
import { useQueryClient, useMutation } from '@tanstack/react-query';

export default function ListStudent({ isTeacher, data, classId }) {
    const [open, setOpen] = useState(false)
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (data) => {
            return POST('/class/deleteJoinClass', data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getInfoClass'] });
            toast('Success')
        },
        onError: (error) => {
            toast(error);
        },
    });

    return (<>
        {isTeacher && <>

            <CiMenuKebab className='mt-5 cursor-pointer' onClick={() => setOpen((prev) => !prev)}></CiMenuKebab>
            {
                open && <div onClick={() => mutation.mutate({ sid: data?._id, classId })} className='absolute right-0 w-40 border cursor-pointer bg-white p-2 justify-center items-center flex'>
                    Xoá khỏi lớp
                </div>
            }
        </>
        }
    </>)
} 