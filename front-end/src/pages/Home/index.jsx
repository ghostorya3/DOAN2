import Class from '../../components/Home/Class';
import Header from '../../components/Home/Header'
import SideBarLeft from '../../components/Home/SideBar';
export default function Home() {
    return (
        <div className='h-screen'>
            <Header></Header>
            <SideBarLeft></SideBarLeft>
            <div className='flex ml-[84px] gap-5 flex-wrap'>
                <Class></Class>
                <Class></Class>
                <Class></Class>
                <Class></Class>
                <Class></Class>
                <Class></Class>
                <Class></Class>
                <Class></Class>
            </div>
        </div>
    );
};