import Excercise from "../../components/Excercise";
import VsCode from '../../components/VsCode/index.jsx';
import ResultCompiler from "../../components/ResultCompiler";
export default function Work() {
    return (
        <div className="flex h-screen">
            <div className="w-[30%]">
                <Excercise></Excercise>
            </div>
            <div className="w-[70%] relative h-1/3">
                <VsCode></VsCode>
                <ResultCompiler></ResultCompiler>
                <div className="absolute right-5 top-0 cursor-pointer flex gap-2 mt-1 items-center justify-center">
                    <select name="" id="" className="h-10 w-24">
                        <option value="">Javascript</option>
                        <option value="">C++</option>
                        <option value="">Java</option>
                    </select>
                    <div className="bg-amber-400 p-3 rounded-xl">
                        Run code
                    </div>
                </div>
            </div>
        </div>
    );
}