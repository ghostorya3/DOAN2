export default function SubHeader() {
    return (<>
        <div className="flex border-b-2">
            <div className="ml-[84px] cursor-pointer hover:border w-28 flex justify-center items-center h-14 hover:bg-zinc-300">Bảng tin</div>
            <div className="cursor-pointer hover:border w-28 flex justify-center items-center hover:bg-zinc-300">Bài tập</div>
            <div className="cursor-pointer hover:border w-28 flex justify-center items-center hover:bg-zinc-300">Mọi người</div>
        </div>
    </>)
}