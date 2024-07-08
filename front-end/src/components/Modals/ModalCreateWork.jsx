import React, { useState } from 'react';
import { Modal } from 'antd';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { POST } from '../common';

import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

const App = ({ showModal, setShowModal, id }) => {
    const queryClient = useQueryClient();
    const [body, setBody] = useState({});

    const mutation = useMutation({
        mutationFn: (data) => {
            setShowModal(false)
            return POST('/class/createWork', data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getWork'] });
            toast('Tạo bài tập thành công!')
        },
        onError: (error) => {
            toast(error?.response?.data?.message);
        },
    });

    const handleCreateWork = async () => {
        if (!body.name || !body.content || !body.hannop) {
            return toast('Please check field input')
        }
        mutation.mutate({ ...body, idClass: id });
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
                    <div className='font-semibold text-2xl text-center'>Tạo bài tập</div>
                    <div className='font-semibold'>Tên bài tập:</div>
                    <input type="text" className='p-3 mt-1 border rounded-xl outline-none w-full'
                        onChange={(e) => handleSetData('name', e.target.value)} />

                    <div className='font-semibold mt-3'>Nội dung:</div>
                    <textarea type="text" className='p-3 mt-1 border rounded-xl outline-none w-full' onChange={(e) => handleSetData('content', e.target.value)} />

                    <div className='font-semibold mt-3'>Hạn nộp:</div>
                    <input type="date" className='p-3 mt-1 border rounded-xl outline-none w-full' onChange={(e) => handleSetData('hannop', e.target.value)} />

                    <div className='border rounded-2xl flex justify-center cursor-pointer items-center bg-green-500 text-white p-3 font-medium text-xl mt-5' onClick={handleCreateWork}>Tạo bài tập</div>
                </div>
            </Modal>
        </>
    );
};
export default App;