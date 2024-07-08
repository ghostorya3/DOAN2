export default function SubHeader({ setPage, page }) {
    return (<>
        <div className="flex border-b-2">
            <div className={`ml-[84px] cursor-pointer hover:border-2 w-28 flex justify-center items-center h-14 hover:bg-zinc-300 border-zinc-300 ${page === 0 && 'border-b-2 border-b-blue-500'}`} onClick={() => setPage(0)}> Bảng tin</div>
            <div className={`cursor-pointer hover:border-2 w-28 flex justify-center items-center hover:bg-zinc-300 border-zinc-300 ${page === 1 && 'border-b-2 border-b-blue-500'}`} onClick={() => setPage(1)}>Bài tập</div>
            <div className={`cursor-pointer hover:border-2 w-28 flex justify-center items-center hover:bg-zinc-300 border-zinc-300 ${page === 2 && 'border-b-2 border-b-blue-500'}`} onClick={() => setPage(2)}> Mọi người</div>
        </div>
    </>)
}