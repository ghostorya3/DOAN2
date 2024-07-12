import Image from '../../Image';
import ListStudent from './components/ListStudent';
import { MdOutlineNotificationsActive } from "react-icons/md";
import ModalRequestJoinClass from "../../Modals/ModalRequestJoinClass";
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Routes, Route, useParams } from 'react-router-dom';
import { POST } from '../../common';

const EveryBody = ({ isTeacher }) => {

    let { id } = useParams();

    const [openModal, setOpenModal] = useState(false);

    const getInfoClass = async () => {
        const data = await POST('/class/getInfoClass', { sid: id });
        return data
    }

    const { data } = useQuery({ queryKey: ['getInfoClass'], queryFn: getInfoClass });

    return (
        <div className="flex w-full justify-center ">
            <div className='w-1/2 mt-10'>
                {isTeacher && data?.countRequestToClass > 0 && <div onClick={() => setOpenModal(true)} className='flex items-center gap-2 mb-4 border w-max p-2 rounded-xl bg-slate-50 hover:bg-slate-200 cursor-pointer'>
                    <MdOutlineNotificationsActive className='text-xl text-red-500'></MdOutlineNotificationsActive>
                    <div>{data?.countRequestToClass} yêu cầu tham gia lớp học </div>
                </div>}
                <div className="w-full h-14  border-b border-black">
                    <div className="font-normal text-3xl">Giáo viên</div>
                </div>
                <div className='flex items-center gap-3 mt-5'>
                    <div className='w-10 h-10 '>
                        <Image src={data?.data?.createdBy?.avatar} attribute={' rounded-full border'}></Image>
                    </div>
                    <div className='font-medium'>{data?.data?.createdBy?.userName}</div>
                </div>
                <div className="w-full h-14 mt-10 border-b border-black flex justify-between">
                    <div className="font-normal text-3xl">Bạn học</div>
                    <div className="font-normal text-lg mt-2">{data?.count} học sinh</div>
                </div>
                {data?.arrStudent?.map(item => (
                    <div className=' border-b-2 flex justify-between items-center'>
                        <div className='flex items-center gap-3 mt-5 pb-2'>
                            <div className='w-10 h-10 '>
                                <Image src={item?.avatar} attribute={' rounded-full border'}></Image>
                            </div>
                            <div className='font-medium'>{item?.userName}</div>
                        </div>
                        <div className='relative'>
                            <ListStudent isTeacher={isTeacher} data={item} classId={id}></ListStudent>
                        </div>
                    </div>
                ))}
            </div>
            <ModalRequestJoinClass showModal={openModal} setShowModal={setOpenModal} data={data?.requestToClass}></ModalRequestJoinClass>
        </div>
    )

};
export default EveryBody