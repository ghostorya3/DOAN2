import { useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { POST } from "../../components/common";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ModalChamDiem from '../../components/Modals/ModalChamDiem'
import Table from '../../components/ListStudentDoExcercise/Table'
import { useEffect, useState } from "react";
export default function ListStudentDoExcercise() {
    let { id } = useParams();
    const queryClient = useQueryClient();

    const navigate = useNavigate();
    const [status, setStatus] = useState('Tất cả')
    const [showModal, setShowModal] = useState(false)
    const [idRequest, setIdRequest] = useState('')

    const getListStudentDoExcercise = async () => {
        const data = await POST('/class/getListStudentDoExcercise', { id, status });
        return data
    }

    const { data } = useQuery({ queryKey: ['getListStudentDoExcercise'], queryFn: getListStudentDoExcercise });

    useEffect(() => {
        queryClient.invalidateQueries('getListStudentDoExcercise')
    }, [status])
    return (<>
        <div className="p-5 w-full">
            <div className="p-3 border rounded-full bg-black w-12 h-12 flex justify-center items-center cursor-pointer" onClick={() => navigate(-1)}>
                <IoMdArrowBack className="text-white text-2xl"></IoMdArrowBack>
            </div>
            <div className="w-full flex flex-col justify-center text-3xl font-semibold items-center">
                <div>Chi tiết bài tập</div>
                <div className="text-xl flex gap-5 justify-between w-full px-10">
                    <div className="text-xl flex flex-col gap-5 justify-start">
                        <div>Tên bài tập: <span className="font-normal">{data?.dataWork?.name}</span></div>
                        <div>Mã bài tập: <span className="font-normal">{data?.dataWork?._id}</span></div>
                    </div>
                    <div className="font-normal text-base flex items-end gap-3">

                        <div className="mb-1">Trạng thái:</div>
                        <select
                            className='px-2 border-[#e0e0e0] border outline-none rounded-md h-[30px] w-[200px] box-border mt-2'
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="Tất cả">Tất cả</option>
                            <option value="Chưa nộp">Chưa nộp</option>
                            <option value="Đã nộp">Đã nộp</option>
                            <option value="Nộp muộn">Nộp muộn</option>
                        </select>

                        <div className="border rounded-xl py-1 px-2 cursor-pointer mt-2 bg-green-500 text-white font-medium">
                            Xuất Excel
                        </div>
                    </div>
                </div>
                <Table data={data?.data} setIdRequest={setIdRequest} setShowModal={setShowModal} />
            </div>
            <ModalChamDiem showModal={showModal} setShowModal={setShowModal} id={idRequest} ></ModalChamDiem>
        </div>
    </>)
}