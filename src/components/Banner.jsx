import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import slide1 from '../assets/image1.jpg'
import slide2 from '../assets/image2.jpg'
import slide3 from '../assets/image3.jpg'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Banner = () => {
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide><img className='w-full h-96' src={slide1} alt="" /></SwiperSlide>
                <SwiperSlide><img className='w-full h-96' src={slide2} alt="" /></SwiperSlide>
                <SwiperSlide><img className='w-full h-96' src={slide3} alt="" /></SwiperSlide>
            </Swiper>
        </>
    );
};

export default Banner;