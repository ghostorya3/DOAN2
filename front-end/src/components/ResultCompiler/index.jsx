import { useEffect, useState } from "react";
import { useMyContext } from "../context";
export default function ResultCompiler() {
    const { socket } = useMyContext();
    const [data, setData] = useState();
    useEffect(() => {
        if (socket) {
            console.log(socket);
            socket.on("result", (data) => {
                setData(data)
            });
            return () => {
                socket.off("result");
            };
        }
    }, [socket]);
    return (
        <div className="bg-black h-full w-full p-5">
            <div className="text-white">Kết quả biên dịch: {data}</div>
        </div>
    );
}