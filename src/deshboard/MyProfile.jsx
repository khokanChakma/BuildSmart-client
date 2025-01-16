import { useContext } from "react";
import AuthContext from "../provider/AuthContext";


const MyProfile = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className="flex flex-col min-h-screen items-center p-10 justify-start">
            <div>
                <img className="w-24 h-24 rounded-full" src={user?.photoURL} alt="" />
            </div>
            <p className="text-xl"><span className="text-xl font-semibold">User Name : </span> {user?.displayName}</p>
            <p className="text-xl"><span className="text-xl font-semibold">User Email : </span> {user?.email}</p>
        </div>
    );
};

export default MyProfile;