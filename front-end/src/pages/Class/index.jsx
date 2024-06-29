import News from '../../components/Class/News';
import SubHeader from '../../components/Class/SubHeader';
import Header from '../../components/Home/Header'
import SideBarLeft from '../../components/Home/SideBar';
import { Routes, Route, useParams } from 'react-router-dom';
import { POST } from '../../components/common';
import { useQuery } from '@tanstack/react-query';
import Excercise from '../../components/Class/Exercise';

export default function Class() {
    let { id } = useParams();
    const getDetailClass = async () => {
        const data = await POST('/class/getDetailClass', { id });
        return data
    }
    const { data } = useQuery({ queryKey: ['getDetailClass'], queryFn: getDetailClass });


    const getWork = async () => {
        const data = await POST('/class/getWork', { id });
        return data
    }
    const { data: dataWork } = useQuery({ queryKey: ['getWork'], queryFn: getWork });
    return (
        <div className='h-screen overflow-hidden' >
            <Header classNamee={data?.data?.className} isClass={true} isTeacher={data?.data?.isTeacher} id={id}></Header>
            <SideBarLeft></SideBarLeft>
            <SubHeader></SubHeader>
            {/* <News classNamee={data?.data?.className}></News> */}
            <div className='ml-[84px] overflow-hidden'>
                <Excercise id={id} page={dataWork.page} data={dataWork?.data} isTeacher={data?.data?.isTeacher}></Excercise>
            </div>
        </div>
    )
}