import News from '../../components/Class/News';
import SubHeader from '../../components/Class/SubHeader';
import Header from '../../components/Home/Header'
import SideBarLeft from '../../components/Home/SideBar';
export default function Class() {
    return (
        <div>
            <div className='h-screen' >
                <Header classNamee="lập trình phân tán"></Header>
                <SideBarLeft></SideBarLeft>
                <SubHeader></SubHeader>
                <News></News>
            </div>
        </div>
    )
}