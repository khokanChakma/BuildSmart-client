import React from 'react';
import aboutImg from '../assets/aboutBuilding.jpg'
import SectionTitle from './SectionTitle';
const AboutBuilding = () => {
    return (
        <div>
            <SectionTitle heading={'About The Building'}></SectionTitle>
            <div className='md:flex md:gap-6 space-y-6 bg-[#eafcfa] p-6 justify-center items-center'>
                <div className='flex-1'>
                    <img className='object-cover rounded' src={aboutImg} alt="" />
                </div>
                <div className='flex-1'>
                    <p className='text-justify text-[]'>Located in the city’s bustling core, our building exemplifies modern design and sustainability. Its striking glass exterior and innovative architecture create a dynamic space for work and relaxation. Inside, a sunlit atrium welcomes you, leading to eco-friendly workspaces and vibrant communal areas. The rooftop garden offers stunning city views, providing a serene escape. With advanced technology and energy-efficient systems, this building meets the highest green standards. Conveniently situated near major transport links, it serves as a central hub for professionals and visitors, blending style, functionality, and sustainability in every detail.</p>
                </div>
            </div>
        </div>
    );
};

export default AboutBuilding;