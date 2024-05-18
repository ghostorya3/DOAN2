import React, { useState } from 'react';
import { Card, Space } from 'antd';
import ModalCreateClass from '../Modals/ModalCreateClass';

const App = () => {
    const [showModalCreateClass, setShowModalCreateClass] = useState(false);
    return (
        <>
            <Space Space direction="vertical" size={16} className='w-[200px]'>
                <Card className='shadow-2xl p-0'>
                    <div className="font-medium hover:border p-3 hover:bg-slate-100 cursor-pointer" >Tham gia lớp học</div>
                    <div className='font-medium mt-4 hover:border p-3 hover:bg-slate-100 cursor-pointer' onClick={() => setShowModalCreateClass(true)}>Tạo lớp học</div>
                </Card>
            </Space>
            <ModalCreateClass showModal={showModalCreateClass} setShowModal={setShowModalCreateClass}></ModalCreateClass>
        </>
    )
}


export default App;