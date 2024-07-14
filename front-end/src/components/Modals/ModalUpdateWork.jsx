import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { POST } from '../common';
import moment from 'moment';


const App = ({ showModal, setShowModal, id }) => {
    const queryClient = useQueryClient();
    const [body, setBody] = useState({});

    const mutation = useMutation({
        mutationFn: (data) => {
            setShowModal(false)
            return POST('/class/updateWork', data)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['getWork'] });
            toast('Sửa bài tập thành công!')
        },
        onError: (error) => {
            toast(error?.response?.data?.message);
        },
    });

    const handleUpdateWork = async () => {
        if (!body.name || !body.content || !body.hannop) {
            return toast('Please check field input')
        }
        mutation.mutate({ ...body, id: id });
    }

    const handleSetData = (name, value) => {
        setBody((prev) => ({
            ...prev,
            [name]: value
        }))
    };

    useEffect(() => {
        getDetailWork()

    }, [id])

    const getDetailWork = async () => {
        const data = await POST('/class/getDetailWork', { id });
        if (data?.result) {
            setBody({
                name: data?.data?.name,
                content: data?.data?.content,
                hannop: data?.data?.hannop,
            })
        }
    }
    return (
        <>
            {body?.name && <Modal open={showModal} onCancel={() => setShowModal(false)} footer={false}>
                <div>
                    <div className='font-semibold text-2xl text-center'>Sửa bài tập</div>
                    <div className='font-semibold'>Tên bài tập:</div>
                    <input type="text" className='p-3 mt-1 border rounded-xl outline-none w-full'
                        value={body?.name} onChange={(e) => handleSetData('name', e.target.value)} />

                    <div className='font-semibold mt-3'>Nội dung:</div>
                    <textarea value={body?.content} type="text" className='p-3 mt-1 border rounded-xl outline-none w-full' onChange={(e) => handleSetData('content', e.target.value)} />

                    <div className='font-semibold mt-3'>Hạn nộp:</div>
                    <input value={moment(body?.hannop).format('YYYY-MM-DD')} type="date" className='p-3 mt-1 border rounded-xl outline-none w-full' onChange={(e) => handleSetData('hannop', e.target.value)} />

                    <div className='border rounded-2xl flex justify-center cursor-pointer items-center bg-green-500 text-white p-3 font-medium text-xl mt-5' onClick={handleUpdateWork}>Sửa bài tập</div>
                </div>
            </Modal>}
        </>
    );
};
export default App;