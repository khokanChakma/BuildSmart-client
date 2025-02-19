import { Elements } from '@stripe/react-stripe-js';
import React from 'react';
import CheckOutForm from './CheckOutForm';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_publishable_key);
const Payment = () => {
    return (
        <div className='p-10'>
            <h2 className='text-2xl font-semibold text-center'>Payment</h2>
            <div className='md:w-6/12 mx-auto'>
                <Elements stripe={stripePromise}>
                    <CheckOutForm></CheckOutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;