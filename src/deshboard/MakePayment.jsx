import { useContext, useEffect, useState } from "react";
import AuthContext from "../provider/AuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const MakePayment = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const [filterData, setFilterData] = useState([]);
    const { data: payments = [], refetch } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/paymentsData?email=${user?.email}`);
            console.log(res.data)
            return res.data
        }
    });

    useEffect(() => {
        const agreementData = payments.filter(payment => payment.status === 'checked')
        setFilterData(agreementData);
    }, [payments,setFilterData])
    console.log(filterData)

    const totalPrice = filterData.reduce((total, item) => total + item.rent, 0)

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosPublic.delete(`/deletePayment/${id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (

        <div className="p-10">
            <div className="flex items-center md:w-10/12 mx-auto justify-between">
                <h2 className="text-2xl text-center font-semibold"> Total Agreement : {filterData.length}</h2>
                <h2 className="text-2xl text-center font-semibold"> Total Price : ${totalPrice}</h2>
                {filterData.length ? <Link to='/deshboard/payment'>
                    <button className="btn text-2xl font-semibold">Pay</button>
                </Link>
                    : <button disabled className="btn text-2xl font-semibold">Pay</button>
                }
            </div>
            <div className="">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Floor</th>
                            <th>Block</th>
                            <th>Apartment No</th>
                            <th>Rent</th>
                            <th>Request Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filterData.map((payment, index) => <tr key={payment._id}>
                                <th>{index + 1}</th>
                                <td>{payment.userName}</td>
                                <td>{payment.userEmail}</td>
                                <td>{payment.floor_no}</td>
                                <td>{payment.block_name}</td>
                                <td>{payment.apartment_no}</td>
                                <td>${payment.rent}</td>
                                <td>{payment.requestDate}</td>
                                <td>{payment.status}</td>
                                <td>
                                    <button onClick={() => handleDelete(payment._id)} className="btn text-red-600 text-xl"><MdDelete /></button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MakePayment;