import React from 'react';
import aboutImg from '../assets/aboutBuilding.jpg'
const AboutBuilding = () => {
    return (
        <div className='flex object-cover'>
            <div>
                <img src={aboutImg} alt="" />
            </div>
            <div>
                <p>Located in the city’s bustling core, our building exemplifies modern design and sustainability. Its striking glass exterior and innovative architecture create a dynamic space for work and relaxation. Inside, a sunlit atrium welcomes you, leading to eco-friendly workspaces and vibrant communal areas. The rooftop garden offers stunning city views, providing a serene escape. With advanced technology and energy-efficient systems, this building meets the highest green standards. Conveniently situated near major transport links, it serves as a central hub for professionals and visitors, blending style, functionality, and sustainability in every detail.</p>
            </div>
        </div>
    );
};

export default AboutBuilding;