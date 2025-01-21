import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../provider/AuthContext";

const AgreementRequest = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [filterData, setFilterData] = useState([]);
    const { data: agreements = [], refetch } = useQuery({
        queryKey: ['agreements'],
        queryFn: async () => {
            const res = await axiosSecure.get('/agreements');
            return res.data;
        }
    });

    useEffect(() => {
        const agreementData = agreements.filter(agreement => agreement.status === 'pending');
        setFilterData(agreementData);
    }, [agreements]);

    const handleAcceptUser = (agreement) => {
        axiosSecure.patch(`/agreements/${agreement._id}`)
            .then(res => {
                console.log(res.data);
                refetch();
                Swal.fire({
                    icon: "success",
                    title: "successfully accepted",
                    showConfirmButton: false,
                    timer: 1500
                });
            });

        axiosSecure.patch(`/makeMember?email=${agreement.userEmail}`)
            .then(res => {
                console.log(res.data);
            });
    };

    const handleReject = (agreement) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Reject it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/reject/${agreement._id}`)
                    .then(res => {
                        console.log(res.data);
                        refetch();
                    });
                Swal.fire({
                    title: "Rejected!",
                    text: "Agreement has been rejected.",
                    icon: "success"
                });
            }
        });
    };

    return (
        <div className="p-10 min-h-screen">
            <h2 className="text-2xl text-center font-semibold">All Agreements Request</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra  text-sm md:text-base">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th className="hidden md:table-cell">Email</th>
                            <th>Floor</th>
                            <th className="hidden md:table-cell">Block</th>
                            <th>Apartment No</th>
                            <th className="hidden md:table-cell">Rent</th>
                            <th className="hidden md:table-cell">Request Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filterData.map((agreement, index) => (
                                <tr key={agreement._id}>
                                    <th>{index + 1}</th>
                                    <td>{agreement.userName}</td>
                                    <td className="hidden md:table-cell">{agreement.userEmail}</td>
                                    <td>{agreement.floor_no}</td>
                                    <td className="hidden md:table-cell">{agreement.block_name}</td>
                                    <td>{agreement.apartment_no}</td>
                                    <td className="hidden md:table-cell">{agreement.rent}</td>
                                    <td className="hidden md:table-cell">{agreement.requestDate}</td>
                                    <td>{agreement.status}</td>
                                    <td>
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => handleAcceptUser(agreement)}
                                                className="btn btn-sm">
                                                Accept
                                            </button>
                                            <button
                                                onClick={() => handleReject(agreement)}
                                                className="btn btn-sm">
                                                Reject
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AgreementRequest;
