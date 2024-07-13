import React, { useState } from 'react';
import { Card, Space } from 'antd';
import ModalCreateClass from '../Modals/ModalCreateClass';
import ModalCreateWork from '../Modals/ModalCreateWork';
import ModalJoinClass from '../Modals/ModalJoinClass';

const App = ({ isClass, isTeacher, id }) => {
    const [showModalCreateClass, setShowModalCreateClass] = useState(false);
    const [showModalCreateWork, setShowModalCreateWork] = useState(false);
    const [showModalJoinClass, setShowModalJoinClass] = useState(false);
    return (
        <>
            <Space>
                <Card className='shadow-2xl w-[200px]'>
                    {!isClass &&
                        <>
                            <div className="font-medium hover:text-blue-600 cursor-pointer" onClick={() => setShowModalJoinClass(true)}>Tham gia lớp học</div>
                            <div className='font-medium mt-4 hover:text-blue-600 cursor-pointer' onClick={() => setShowModalCreateClass(true)}>Tạo lớp học</div>
                        </>
                    }
                    {isTeacher &&
                        <>
                            <div className='font-medium hover:text-blue-600 cursor-pointer' onClick={() => setShowModalCreateWork(true)}>Tạo bài tập</div>
                        </>
                    }
                </Card>
            </Space>
            <ModalCreateClass showModal={showModalCreateClass} setShowModal={setShowModalCreateClass}></ModalCreateClass>
            <ModalJoinClass showModal={showModalJoinClass} setShowModal={setShowModalJoinClass}></ModalJoinClass>
            <ModalCreateWork showModal={showModalCreateWork} setShowModal={setShowModalCreateWork} id={id}></ModalCreateWork>
        </>
    )
}


export default App;