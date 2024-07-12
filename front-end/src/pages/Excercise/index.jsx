import { useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

export default function Excercise() {
    let { id } = useParams();
    return (<div className="p-5 w-full">
        <div className="p-3 border rounded-full bg-black w-12 h-12 flex justify-center items-center cursor-pointer">
            <IoMdArrowBack className="text-white text-2xl"></IoMdArrowBack>
        </div>
        <div className="text-3xl text-center font-semibold">Bài tập - Tính tổng 2 số nguyên</div>

        <div className="w-full flex flex-col justify-center mt-5 text-2xl font-semibold items-center">
            <div>Đề bài: <span className="text-xl font-normal">Tính tổng toàn bộ số nguyên 3213 213213 21321 3213 213 213123</span></div>
            <div className="flex gap-2">
                <div className="mt-10 p-3 bg-green-500 text-white cursor-pointer border rounded-xl text-lg">Làm bài</div>
                <div className="mt-10 p-3 bg-yellow-500 text-white cursor-pointer border rounded-xl text-lg">Nộp bài</div>
            </div>
        </div>
    </div>)
}