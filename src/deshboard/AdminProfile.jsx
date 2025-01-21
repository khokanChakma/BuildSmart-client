import { useContext, useEffect, useState } from "react";
import AuthContext from "../provider/AuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";


const AdminProfile = () => {
    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState([])
    const [member, setMember] = useState([])
    const [rooms, setRooms] = useState([])
    const axiosSecure = useAxiosSecure();
    const { data: members = [], refetch } = useQuery({
        queryKey: ['members'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data
        }
    });

    useEffect(() => {
        const filterUser = members.filter(userData => userData.role === 'user')
        setUsers(filterUser);
    }, [members, setUsers])
    useEffect(() => {
        const filterMember = members.filter(memberData => memberData.role === 'member')
        setMember(filterMember);
    }, [members, setUsers])

    useEffect(() => {
        const fetchAllJobs = async () => {
            const { data } = await axiosSecure.get('/totalRoom');
            setRooms(data);
        }
        fetchAllJobs();
    }, [setRooms, axiosSecure])

    return (
        <div className="p-10 min-h-screen">
            <div className="flex flex-col items-center justify-center">
                <div className="">
                    <img className="h-24 w-24 rounded-full" src={user?.photoURL} alt="" />
                </div>
                <div className="text-xl my-8 space-y-2">
                    <p><span className="font-bold">Admin Name : </span>{user?.displayName}</p>
                    <p><span className="font-bold">Admin Email : </span>{user?.email}</p>
                    <p><span className="font-bold">Number of users : </span>{users.length}</p>
                    <p><span className="font-bold">Number of members : </span>{member.length}</p>
                    <p><span className="font-bold">Total number of rooms : </span>{rooms.length}</p>
                </div>
            </div>
            <div>
                <p></p>
            </div>
        </div>
    );
};

export default AdminProfile;