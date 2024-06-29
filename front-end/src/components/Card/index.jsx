import React, { useState } from 'react';
import { Card, Space } from 'antd';
import ModalCreateClass from '../Modals/ModalCreateClass';
import ModalCreateWork from '../Modals/ModalCreateWork';

const App = ({ isClass, isTeacher, id }) => {
    const [showModalCreateClass, setShowModalCreateClass] = useState(false);
    const [showModalCreateWork, setShowModalCreateWork] = useState(false);
    return (
        <>
            <Space Space direction="vertical" size={16} className='w-[200px]'>
                <Card className='shadow-2xl '>
                    {!isClass &&
                        <>
                            <div className="font-medium hover:border p-3 hover:bg-slate-100 cursor-pointer" >Tham gia lớp học</div>
                            <div className='font-medium mt-4 hover:border p-3 hover:bg-slate-100 cursor-pointer' onClick={() => setShowModalCreateClass(true)}>Tạo lớp học</div>
                        </>
                    }
                    {isTeacher &&
                        <>
                            <div className='font-medium hover:border p-3 hover:bg-slate-100 cursor-pointer' onClick={() => setShowModalCreateWork(true)}>Tạo bài tập</div>
                        </>
                    }
                </Card>
            </Space>
            <ModalCreateClass showModal={showModalCreateClass} setShowModal={setShowModalCreateClass}></ModalCreateClass>
            <ModalCreateWork showModal={showModalCreateWork} setShowModal={setShowModalCreateWork} id={id}></ModalCreateWork>
        </>
    )
}


export default App;