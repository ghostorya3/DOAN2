import { useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { POST } from "../../components/common";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation, useQuery } from '@tanstack/react-query';

export default function Excercise() {
    let { id } = useParams();
    const navigate = useNavigate();

    const handleDoWork = async () => {
        const res = await POST('/exec/executeCode', {
            idWork: id
        })
        if (res?.result)
            window.open(import.meta.env.VITE_URL_PROXY + '/?token=' + res.token + '&' + res.path)
    }

    const mutation = useMutation({
        mutationFn: (data) => {
            return POST('/exec/submitCode', {
                idWork: id
            })
        },
        onSuccess: () => {
            toast('Nộp bài thành công')
            navigate(-1)
        },
        onError: (error) => {
            toast(error?.response?.data?.message);
        },
    });

    const getDetailClass = async () => {
        const data = await POST('/class/getDetailWork', { id });
        return data
    }

    const { data } = useQuery({ queryKey: ['getDetailWork'], queryFn: getDetailClass });

    return (
        <div className="p-5 w-full">
            <div className="p-3 border rounded-full bg-black w-12 h-12 flex justify-center items-center cursor-pointer" onClick={() => navigate(-1)}>
                <IoMdArrowBack className="text-white text-2xl"></IoMdArrowBack>
            </div>
            <div className="text-3xl text-center font-semibold">Bài tập - {data?.data?.name}</div>

            <div className="w-full flex flex-col justify-center mt-5 text-2xl font-semibold items-center">
                <div>Đề bài: <span className="text-xl font-normal">{data?.data?.content}</span></div>
                <div className="flex gap-2">
                    <div className="mt-10 p-3 bg-green-500 text-white cursor-pointer border rounded-xl text-lg"
                        onClick={() => handleDoWork()}
                    >Làm bài</div>
                    <div className="mt-10 p-3 bg-yellow-500 text-white cursor-pointer border rounded-xl text-lg"
                        onClick={() => mutation.mutate()}
                    >Nộp bài</div>
                </div>
            </div>
        </div>
    )
}