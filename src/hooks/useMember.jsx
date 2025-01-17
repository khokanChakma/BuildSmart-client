import { useContext } from "react";
import AuthContext from "../provider/AuthContext";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useMember = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: isMember, isPending: isMemberLoading } = useQuery({
        queryKey: [user?.email, 'isMember'],
        // enabled: !loading,
        queryFn: async () => {
            console.log('asking or checking is admin', user)
            const res = await axiosSecure.get(`/users/member/${user?.email}`);
            console.log(res.data);
            return res.data?.admin;
        }
    })
    console.log(isMember)
    return [isMember, isMemberLoading]
};

export default useMember;