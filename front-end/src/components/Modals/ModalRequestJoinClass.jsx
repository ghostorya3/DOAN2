import React, { useState } from 'react';
import { Modal } from 'antd';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { POST } from '../common';
import Image from '../Image';
import { SiVerizon } from "react-icons/si";
import { ImCancelCircle } from "react-icons/im";



const App = ({ showModal, setShowModal, data }) => {
    const [name, setName] = useState('')
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (data) => {
            return POST('/class/createClass', data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getClass'] });
            toast('Xin vào lớp học thành công!')
        },
        onError: (error) => {
            toast(error);
        },
    });

    const handleCreateClass = async () => {
        setShowModal(false);
        if (!name) {
            toast('Vui lòng nhập tên lớp học!')
        }
        mutation.mutate({ name });
        setName('')
    }
    return (
        <>
            <Modal open={showModal} footer={false} onCancel={() => setShowModal(false)}>
                <div>
                    <div className='text-xl'>Danh sách</div>
                    {data?.map((item) => (
                        <div className='flex justify-between items-center border-b'>
                            <div className='flex items-center gap-3 mt-5 pb-2'>
                                <div className='w-10 h-10 '>
                                    <Image src={item?.users?.avatar} attribute={' rounded-full border'}></Image>
                                </div>
                                <div className='font-medium'>{item?.users?.userName}</div>
                            </div>
                            <div className='flex gap-2 mt-4'>
                                <div className='flex gap-2 items-center bg-green-500 h-8 p-2 cursor-pointer text-white rounded border'>
                                    <SiVerizon></SiVerizon>
                                    <div>Chấp nhận</div>
                                </div>
                                <div className='flex gap-2 items-center bg-red-500 h-8 p-2 text-white cursor-pointer rounded border'>
                                    <ImCancelCircle></ImCancelCircle>
                                    <div>Từ chối</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Modal>
        </>
    );
};
export default App;