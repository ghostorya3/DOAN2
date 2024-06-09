import Image from "../../Image";
import { Carousel } from 'antd';

const contentStyle = {
    margin: 0,
    height: '300px',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    border: '1px solid black',
    borderRadius: '24px'
};

const Slider = () => {
    return (<>
        <Carousel arrows infinite={false} className="w-full h-[300px]">
            <div className="w-full h-[300px]">
                <Image src={'/muc-dich-cua-banner-website-rat-quan-trong.png'} className='object-cover' attribute={'object-contain'}></Image>
            </div>
            <div>
                <h3 style={contentStyle}>2</h3>
            </div>
            <div>
                <h3 style={contentStyle}>3</h3>
            </div>
            <div>
                <h3 style={contentStyle}>4</h3>
            </div>
        </Carousel>
    </>)
}

export default Slider

