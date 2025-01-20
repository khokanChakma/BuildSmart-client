import React from 'react';

const AnnouncementCart = ({announcementData}) => {
    const {title,descripton,date} = announcementData;
    console.log(announcementData)
    return (
        <div>
            <h5 className='italic'>{date}</h5>
            <h3 className='text-xl font-semibold'>{title}</h3>
            <p>{descripton}</p>
        </div>
    );
};

export default AnnouncementCart;