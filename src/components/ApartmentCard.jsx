import React from 'react';

const ApartmentCard = ({ apartment }) => {
    const { min_rent, max_rent, image, apartment_no, floor_no, block_name } = apartment;
    return (
        <div>
            <div className="animate__animated animate__slideInUp">
                <div
                    className='w-full bg-white shadow-md'
                >
                    <div className=" card-compact bg-base-100 rounded w-full p-4 border shadow-xl">
                        <div className="flex justify-center items-center">
                            <img
                                className='object-cover rounded'
                                src={image}
                                alt="photo" />
                        </div>
                        <div className="flex flex-col space-y-1 mt-2 ">
                            <div className='flex justify-between'>
                                <p className="text-lg"><span className='font-semibold'>Apartment No : </span> {apartment_no}</p>
                                <p className="text-lg"><span className='font-semibold'>Block Name : </span> {block_name}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p className="text-lg"><span className='font-semibold'>Floor No : </span> {floor_no}</p>
                                <p className="text-lg"><span className='font-semibold'>Rent : </span> {apartment_no}</p>
                            </div>
                        </div>
                        <div>
                            <button className='btn'>Agreement</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApartmentCard;