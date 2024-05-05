import Image from "../../Image";

export default function Header() {
    return (
        <div className="border p-5 flex items-center">
            <div className='w-12 h-10'>
                <Image src='/Google-Classroom.png'></Image>
            </div>
            <h1 className="text-3xl font-medium text-gray-500">Classroom</h1>
        </div>
    );
}