import React, { useState } from 'react';
import { Modal } from 'antd';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { POST } from '../common';



const App = ({ showModal, setShowModal }) => {
    const [name, setName] = useState('')
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (data) => {
            return POST('/class/createClass', data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getClass'] });
            toast('Tạo lớp học thành công!')
        },
        onError: (error) => {
            toast(error?.response?.data?.message);
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
            <Modal title="Tạo lớp học" open={showModal} onOk={handleCreateClass} onCancel={() => setShowModal(false)}>
                <div>
                    <label htmlFor="name">Tên lớp học:</label>
                    <div className='border w-full'>
                        <input type="text" className='w-full p-3 outline-none' onChange={(e) => { setName(e.target.value) }} />
                    </div>
                </div>
            </Modal>
        </>
    );
};
export default App;