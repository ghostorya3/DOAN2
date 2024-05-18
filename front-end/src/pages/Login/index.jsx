import { toast } from "react-toastify";
import Image from "../../components/Image";
import { AuthWithGoogle } from "../../components/auth/auth_google_signin_popup";
import { POST } from "../../components/common";
import { useMyContext } from "../../components/context";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { login, setUserData } = useMyContext();
    const navigate = useNavigate();

    const handleLogin = async () => {
        const { user } = await AuthWithGoogle();
        if (user) {
            const response = await POST('/user/login', user);
            if (response.result) {
                toast('Đăng nhập thành công!');
                Cookies.set('token_classroom', response.token);
                setUserData(response.user);
                navigate('/Home');
                login();
            } else {
                toast('Đăng nhập thất bại!')
            }
        } else {
            toast('Có lỗi xảy ra!')
        }
    }
    return (<>
        <div className="flex flex-col h-screen p-5">
            <div className='flex justify-between'>
                <div className="text-3xl font-bold text-gray-500">Education</div>
                <div className='flex gap-5'>
                    <div className='cursor-pointer hover:bg-blue-600 border rounded py-3 text-white px-10 text-xl bg-blue-500'
                        onClick={() => handleLogin()}>Login with Google</div>
                </div>
            </div>
            <div className="flex p-10 justify-around mt-10">
                <div className="w-[40%]">
                    <div className='flex items-center'>
                        <div className='w-12 h-10'>
                            <Image src='/Google-Classroom.png'></Image>
                        </div>
                        <div className='text-3xl font-medium text-gray-500'>Classroom</div>
                    </div>
                    <div className="  text-6xl self-center font-bold text-slate-700 justify-items-center">
                        Where teaching and learning come together
                    </div>
                    <div className="text-xl font-normal mt-10 text-gray-800">Classroom helps educators create engaging learning experiences they can personalize, manage, and measure. Part of Google Workspace for Education, it empowers educators to enhance their impact and prepare students for the future.</div>
                    <div className='flex gap-5 mt-10'>
                        <div className='cursor-pointer hover:bg-blue-600 border rounded py-3 text-white px-10 text-xl bg-blue-500'
                            onClick={() => handleLogin()}
                        >Login with Google</div>
                    </div>
                </div>
                <div className="w-[40%]">
                    <Image src={'https://repository-images.githubusercontent.com/379983195/46a2f600-d535-11eb-86d6-5844b522cb4e'} attribute={'rounded'}></Image>
                </div>
            </div>
        </div>
    </>)
}