import React, { useState } from 'react';
import { Modal } from 'antd';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { POST } from '../common';



const App = ({ showModal, setShowModal, id }) => {
    const [point, setPoint] = useState('')
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (data) => {
            return POST('/class/chamDiem', data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getListStudentDoExcercise'] });
            toast('Success!')
            setPoint('')
            setShowModal(false)
        },
        onError: (error) => {
            toast(error?.response?.data?.message);
        },
    })
    return (
        <>
            <Modal open={showModal} footer={[]} onCancel={() => setShowModal(false)}>
                <div>
                    <label htmlFor="name">Nhập điểm:</label>
                    <div className='border w-full'>
                        <input type="number" max={10} min={0} className='w-full p-3 outline-none' onChange={(e) => { setPoint(e.target.value) }} />
                    </div>
                    <div className='border rounded-2xl flex justify-center cursor-pointer items-center bg-green-500 text-white p-3 font-medium text-xl mt-5' onClick={() => mutation.mutate({ point, id })}>Chấm điểm</div>
                </div>
            </Modal>
        </>
    );
};
export default App;