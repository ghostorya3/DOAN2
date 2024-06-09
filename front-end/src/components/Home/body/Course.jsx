import Image from "../../Image";



const Course = ({ title, free }) => {

    const data = [
        {
            title: "HTML, CSS Pro",
            description: 'Cho người mới bắt đầu',
            money: '1299900',
            image: '/62f13d2424a47.png'
        },
        {
            title: "HTML, CSS Pro",
            description: 'Cho người mới bắt đầu',
            money: '1299900',
            image: '/62f13d2424a47.png'
        },
        {
            title: "HTML, CSS Pro",
            description: 'Cho người mới bắt đầu',
            money: '1299900',
            image: '/62f13d2424a47.png'
        },
        {
            title: "HTML, CSS Pro",
            description: 'Cho người mới bắt đầu',
            money: '1299900',
            image: '/62f13d2424a47.png'
        },
    ]
    const moneyFomat = (item) => {
        const format = item.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        return format
    }
    return (<>
        <div>
            <div className="text-3xl font-extrabold mt-10">{title}</div>
            <div className="flex mt-5 justify-between">
                {
                    data.map(item => (
                        <div>
                            <div style={{ backgroundImage: `url(${item.image})` }} className={`w-[300px] h-[170px] border rounded-2xl bg-contain`}> </div>
                            <div className="mt-2 text-base font-medium">{item.title}</div>
                            {!free && <div className="mt-2 text-sm text-orange-500">{moneyFomat(item.money)}đ</div>}
                        </div>
                    ))
                }
            </div>
        </div>
    </>)
}

export default Course

