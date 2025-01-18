import React from 'react';

const AnnouncementCart = ({announcementData}) => {
    const {title,description} = announcementData
    return (
        <div>
            <h3 className='text-xl font-semibold'>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

export default AnnouncementCart;