import Excercise from "../../components/Excercise";
import VsCode from '../../components/VsCode/index.jsx';
import ResultCompiler from "../../components/ResultCompiler";
import { useMutation } from '@tanstack/react-query';
import { useState, useEffect } from "react";
import { POST } from "../../components/common/index.js";
import { useMyContext } from "../../components/context/index";
export default function Work() {
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('js');
    // const [result, setResult] = useState([]
    const onSubmit = () => {
        setData('running code...')
        setTimeout(() => {
            mutation.mutate({ code, language, work: 10 })
        }, 1000);
    };
    const { socket } = useMyContext();
    const [data, setData] = useState();
    console.log("🚀 ~ Work ~ data:", data)
    useEffect(() => {
        if (socket) {
            console.log(socket);
            socket.on("serverSendResult", (data) => {
                setData(data)
            });
            return () => {
                socket.off("serverSendResult");
            };
        }
    }, [socket]);
    const mutation = useMutation({
        mutationFn: (data) => {
            return POST('/exec/executeCode', data)
        },
        onSuccess: () => {
            // queryClient.invalidateQueries({ queryKey: ['getProject'] })
        },
        onError: (error) => {
            handleEroor(error);
        },
    });

    return (
        <div className="flex h-screen">
            <div className="w-[30%]">
                <Excercise></Excercise>
            </div>
            <div className="w-[70%] relative h-1/3">
                <VsCode setCode={setCode}></VsCode>
                <ResultCompiler data={data}></ResultCompiler>
                <div className="absolute right-5 top-0 cursor-pointer flex gap-2 mt-1 items-center justify-center">
                    <select name="" id="" className="h-10 w-24" defaultValue={'js'} onChange={e => setLanguage(e.target.value)}>
                        <option value="js">Javascript</option>
                        <option value="cpp">C++</option>
                        <option value="ja">Java</option>
                        <option value="py">Python</option>
                    </select>
                    <div className="bg-amber-400 p-3 rounded-xl" onClick={onSubmit}>
                        Run code
                    </div>
                </div>
            </div>
        </div>
    );
}