import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../provider/AuthContext";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";



const CheckOutForm = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const [filterData, setFilterData] = useState([]);
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('');
    const { data: payments = [], refetch } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/paymentsData?email=${user?.email}`);
            return res.data
        }
    });

    useEffect(() => {
        const agreementData = payments.filter(payment => payment.status === 'checked')
        setFilterData(agreementData);
    }, [payments, setFilterData])
    const totalPrice = filterData.reduce((total, item) => total + item.rent, 0)


    useEffect(() => {
        if (totalPrice > 0) {
            axiosPublic.post('/create-payment-intent', { rent: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosPublic, totalPrice])


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement)
        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            console.log('payment error', error);
            setError(error.message)
        } else {
            console.log('payment method', paymentMethod);
            setError('')
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error')
        }
        else {
            console.log('payment intent', paymentIntent)
        }

        if (paymentIntent.status === 'succeeded') {
            // console.log('transaction id', paymentIntent.id);
            setTransactionId(paymentIntent.id);
        }

        // now save the payment in the database
        const payment = {
            email: user?.email,
            price: totalPrice,
            transactionId: paymentIntent.id,
            date: new Date(), // utc date convert. use moment js to 
            agreementIds: filterData.map(item => item._id),
            apartmentIds: filterData.map(item => item.apartmentID),
            status: 'pending'
        }

        const res = await axiosPublic.post('/payments', payment);
        console.log('payment saved', res.data);
        if (res.data?.paymentResult?.insertedId) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "payment is successfully",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/deshboard/paymentHistory')
        }




    }

    return (
        <div className="mt-6 p-6 bg-gray-200 border-2 border-gray-600">
            <form onSubmit={handleSubmit}>
                <CardElement 
                    className="border-2 border-gray-300 p-4 text-white"
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-sm btn-primary mt-4" type="submit" disabled={!stripe || !clientSecret}>
                    Confirm Pay
                </button>
                <p className="text-red-500">{error}</p>
                {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
            </form>
        </div>
    );
};

export default CheckOutForm;