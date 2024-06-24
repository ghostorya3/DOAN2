
export default function ResultCompiler({ data }) {

    return (
        <div className="bg-black h-full w-full p-5 whitespace-pre-wrap">
            <div className="text-white">Kết quả biên dịch:&nbsp;&nbsp; {data}</div>
        </div>
    );
}