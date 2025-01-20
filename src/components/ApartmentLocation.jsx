import React from 'react';
import SectionTitle from './SectionTitle';

const ApartmentLocation = () => {
    return (
        <div>
            <SectionTitle heading={'Apartment’s Location'}></SectionTitle>
            <div className='md:flex bg-[#eafcfa]'>
                <div className='flex-1 flex items-center justify-center'>
                    <h2 className='text-xl font-semibold'>Adress : Rangamati, Chittagong, Banglades</h2>
                </div>
                <div className='flex-1 w-full p-8'>
                    <iframe className='rounded' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58916.7113816942!2d92.13193481491962!3d22.642807304482094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3752b5a7b4c418f9%3A0xa63c343bd4a12112!2sRangamati!5e0!3m2!1sen!2sbd!4v1737361152641!5m2!1sen!2sbd" width='100%' height='300px' loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>
    );
};

export default ApartmentLocation;