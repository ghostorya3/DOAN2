import News from '../../components/Class/News';
import SubHeader from '../../components/Class/SubHeader';
import Header from '../../components/Home/Header'
import SideBarLeft from '../../components/Home/SideBar';
import { Routes, Route, useParams } from 'react-router-dom';
import { POST } from '../../components/common';
import { useQuery } from '@tanstack/react-query';
import Excercise from '../../components/Class/Exercise';
import { useEffect, useState } from 'react';
import EveryBody from '../../components/Class/EveryBody/EveryBody';
import { useQueryClient } from '@tanstack/react-query';

export default function Class() {
    let { id } = useParams();

    const queryClient = useQueryClient();

    const [search, setSearch] = useState({
        name: '',
        startDate: '',
        endDate: '',
        status: ''
    })
    const getDetailClass = async () => {
        const data = await POST('/class/getDetailClass', { id });
        return data
    }

    const { data } = useQuery({ queryKey: ['getDetailClass'], queryFn: getDetailClass });

    const getWork = async () => {
        const data = await POST('/class/getWork', { id, search });
        return data
    }
    const { data: dataWork } = useQuery({ queryKey: ['getWork'], queryFn: getWork });

    const [page, setPage] = useState(0);

    useEffect(() => {
        queryClient.invalidateQueries('getWork')
    }, [search])
    return (
        <div className='h-screen overflow-x-hidden no-scrollbar' >
            <Header idClass={data?.data.classId} classNamee={data?.data?.className} isClass={true} isTeacher={data?.data?.isTeacher} id={id}></Header>
            <SideBarLeft></SideBarLeft>
            <SubHeader setPage={setPage} page={page}></SubHeader>
            {page === 0 && <News classNamee={data?.data?.className} ></News>}
            <div className='ml-[84px] overflow-hidden'>
                {page === 1 && <Excercise id={id} page={dataWork?.page} data={dataWork?.data} isTeacher={data?.data?.isTeacher} setSearch={setSearch} search={search}></Excercise>}
            </div>
            <div className='ml-[84px]'>
                {page === 2 && <EveryBody id={id} page={dataWork?.page} data={dataWork?.data} isTeacher={data?.data?.isTeacher}></EveryBody>}
            </div>
        </div>
    )
}