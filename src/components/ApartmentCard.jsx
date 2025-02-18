import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../provider/AuthContext';
import useAxiosPublic from '../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';

const ApartmentCard = ({ apartment }) => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const { rent, image, apartment_no, floor_no, block_name, _id } = apartment;
    const requestDate = new Date();
    const agreementData = {
        userEmail: user?.email,
        userName: user?.displayName,
        floor_no: floor_no,
        block_name: block_name,
        apartment_no: apartment_no,
        rent: rent,
        requestDate: requestDate,
        apartmentID: _id,
        status: 'pending'
    }

    const { data: payments = [], refetch } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/paymentsData?email=${user?.email}`);
            return res.data
        }
    });

    const agreementRequestId = payments.map(payment => payment.apartmentID)

    const handleApartment = (id) => {

        const matchId = agreementRequestId.find(requestId => requestId === id)
        console.log(matchId)
        if (matchId) {
            return (
                Swal.fire({
                    // position: "top-center",
                    icon: "error",
                    title: "You already added the apartment",
                    showConfirmButton: false,
                    timer: 1500
                })
            )
        }

        axiosPublic.post('/agreements', agreementData)
            .then(res => {
                console.log(res.data)
                refetch();
                Swal.fire({
                    // position: "top-center",
                    icon: "success",
                    title: "agreement is successfully added",
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    }

    return (
        <div>
            <div className="animate__animated animate__slideInUp">
                <div
                    className='w-full bg-white shadow-md'
                >
                    <div className=" card-compact bg-base-100 rounded w-full p-4 border shadow-xl">
                        <div className="flex justify-center items-center">
                            <img
                                className='object-cover rounded w-full h-[250px]'
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
                                <p className="text-lg"><span className='font-semibold'>Rent : </span>${rent}</p>
                            </div>
                        </div>
                        <div>
                            <button onClick={() => handleApartment(_id)} className='btn'>Agreement</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApartmentCard;