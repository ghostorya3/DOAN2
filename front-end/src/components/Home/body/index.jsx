import Image from "../../Image";
import { Carousel } from 'antd';
import Slider from "./Slider";
import Course from "./Course";

const contentStyle = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const Body = () => {
    return (<>
        <div className="w-[calc(100%-105px)] py-3 px-5 ">
            <Slider></Slider>
            <div className="w-full flex justify-center">
                <div className="w-[1300px]">
                    <Course title={'Khoá học Pro'}></Course>
                    <Course title={'Khoá học miễn phí'}></Course>
                </div>
            </div>
        </div>
    </>)
}

export default Body

