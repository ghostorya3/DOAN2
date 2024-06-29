import Search from './components/Search'
import Table from './components/Table'
export default function Excercise({ data, isTeacher, page }) {
    return (
        <div className='max-w-[1334px] ml-10'>
            <Search></Search>
            <Table data={data} isTeacher={isTeacher} page={page}></Table>
        </div>
    )
}