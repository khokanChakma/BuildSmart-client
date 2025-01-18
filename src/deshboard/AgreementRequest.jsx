import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAxiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";


const AgreementRequest = () => {
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic()

    const { data: agreements = [], refetch } = useQuery({
        queryKey: ['agreements'],
        queryFn: async () => {
            const res = await axiosSecure.get('/agreements');
            return res.data
        }
    });
    console.log(agreements)

    const handleAcceptUser = (agreement) => {
        axiosPublic.post('/payments', agreement)
            .then(res => {
                console.log(res.data);
                Swal.fire({
                    // position: "top-center",
                    icon: "success",
                    title: "agreement accepted successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
            })

        axiosSecure.delete(`/agreements/${agreement._id}`)
            .then(res => {
                if (res.data.deletedCount > 0) {
                    refetch();
                }
            })
    }

    const handleDelete = (agreement) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/agreements/${agreement._id}`)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                    }
                })
                Swal.fire({
                    title: "Canceled!",
                    text: "Agreement has been canceled.",
                    icon: "success"
                });
            }
        });
    }

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
                            agreements.map((agreement, index) => <tr key={agreement._id}>
                                <th>{index + 1}</th>
                                <td>{agreement.userName}</td>
                                <td>{agreement.userEmail}</td>
                                <td>{agreement.floor_no}</td>
                                <td>{agreement.block_name}</td>
                                <td>{agreement.apartment_no}</td>
                                <td>{agreement.rent}</td>
                                <td>{agreement.requestDate}</td>
                                <td>{agreement.status}</td>
                                <td className="flex">
                                    <button
                                        onClick={() => handleAcceptUser(agreement)}
                                        className="btn">
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleDelete(agreement)}
                                        className="btn">
                                        reject
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

export default AgreementRequest;