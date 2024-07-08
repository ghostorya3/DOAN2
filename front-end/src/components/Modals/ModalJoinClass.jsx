import React, { useState } from 'react';
import { Modal } from 'antd';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { POST } from '../common';

import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

const App = ({ showModal, setShowModal, id }) => {
    const [body, setBody] = useState({});

    const mutation = useMutation({
        mutationFn: (data) => {
            setShowModal(false)
            return POST('/class/requestJoinClass', data)
        },
        onSuccess: (data) => {
            toast(data.message)
        },
        onError: (error) => {
            toast(error?.response?.data?.message);
        },
    });

    const handleJoinClass = async () => {
        if (!body.id) {
            return toast('Please check field input')
        }
        mutation.mutate(body);
    }

    const handleSetData = (name, value) => {
        setBody((prev) => ({
            ...prev,
            [name]: value
        }))
    };


    return (
        <>
            <Modal open={showModal} onCancel={() => setShowModal(false)} footer={false}>
                <div>
                    <div className='font-semibold text-2xl text-center'>Tham gia lớp học</div>
                    <div className='font-semibold'>Mã lớp học</div>
                    <input type="text" className='p-3 mt-1 border rounded-xl outline-none w-full'
                        onChange={(e) => handleSetData('id', e.target.value)} />

                    <div className='border rounded-2xl flex justify-center cursor-pointer items-center bg-green-500 text-white p-3 font-medium text-xl mt-5' onClick={handleJoinClass}>Yêu cầu tham gia</div>
                </div>
            </Modal>
        </>
    );
};
export default App;