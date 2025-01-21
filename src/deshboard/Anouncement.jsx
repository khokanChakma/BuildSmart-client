import React from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import AnnouncementCart from './AnnouncementCart';

const Anouncement = () => {

    const axiosPublic = useAxiosPublic();

    const { data: announcement = [] } = useQuery({
        queryKey: ['announcement'],
        queryFn: async () => {
            const res = await axiosPublic.get('/announcement');
            return res.data
        }
    });
    return (
        <div className='p-10 space-y-4 min-h-screen'>
            {
                announcement.map(announcementData => <AnnouncementCart key={announcementData._id} announcementData={announcementData}></AnnouncementCart>)
            }
        </div>
    );
};

export default Anouncement;