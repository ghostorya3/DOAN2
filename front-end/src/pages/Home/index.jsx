import Class from '../../components/Home/Class';
import Header from '../../components/Home/Header'
import SideBarLeft from '../../components/Home/SideBar';
import { useQuery } from '@tanstack/react-query';
import { POST } from '../../components/common';
import { toast } from 'react-toastify';
export default function Home() {
    const getClass = async () => {
        const data = await POST('/class/getListClass');
        return data
    }
    const { data, isError } = useQuery({ queryKey: ['getClass'], queryFn: getClass });
    // if (isError) {
    //     return <span>Error: {error.message}</span>
    // }
    return (
        <div className='h-screen overflow-hidden'>
            <Header></Header>
            <SideBarLeft></SideBarLeft>
            <div className='flex ml-[84px] gap-5 flex-wrap overflow-hidden'>
                {data?.data?.map(item => (
                    <Class item={item}></Class>
                ))}
            </div>
        </div>
    );
};