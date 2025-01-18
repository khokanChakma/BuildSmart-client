import { useContext, useEffect, useState } from "react";
import AuthContext from "../provider/AuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";

const MakePayment = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const [filterData, setFilterData] = useState([]);
    const { data: payments = [],refetch } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/paymentsData?email=${user?.email}`);
            return res.data
        }
    });

    console.log(filterData)

    useEffect(() => {
        const agreementData = payments.filter(payment => payment.status === 'checked')
        setFilterData(agreementData);
        refetch
    }, [payments])

    return (
        
        <div className="p-10">
            <h2 className="text-2xl text-center font-semibold"> All Agreements</h2>
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
                                <td>{payment.rent}</td>
                                <td>{payment.requestDate}</td>
                                <td>{payment.status}</td>
                                <td>
                                    <button
                                        // onClick={() => handleDelete(payment)}
                                        className="btn">
                                        pay
                                    </button>
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