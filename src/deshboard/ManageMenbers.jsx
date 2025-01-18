import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { MdOutlineDelete } from "react-icons/md";
import Swal from "sweetalert2";


const ManageMenbers = () => {
    const axiosSecure = useAxiosSecure();


    const { data: members = [], refetch } = useQuery({
        queryKey: ['members'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data
        }
    });

    // for admin
    const handleMakeAdmin = (member) => {
        axiosSecure.patch(`/users/admin/${member._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: `${member.name} is an admin now`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    const handleDeleteUser = (member) => {
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

                axiosSecure.delete(`/users/${member._id}`)
                    .then(res => {
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
            <h2 className="text-2xl text-center font-semibold"> All Members( {members.length})</h2>
            <div className="">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            members.map((member, index) => <tr key={member._id}>
                                <th>{index + 1}</th>
                                <td>{member.name}</td>
                                <td>{member.email}</td>
                                <td>
                                    {member.role === 'admin' ? 'Admin' : <button
                                        onClick={() => handleMakeAdmin(member)}
                                        className="btn bg-orange-500">
                                        Make Admin
                                    </button>}
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteUser(member)}
                                        className="btn btn-ghost">
                                        <MdOutlineDelete className="text-red-600 text-4xl" />
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

export default ManageMenbers;