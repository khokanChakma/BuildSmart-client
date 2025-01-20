import { useContext } from "react";
import AuthContext from "../provider/AuthContext";


const AdminProfile = () => {
    const {user} = useContext(AuthContext);
    console.log(user)
    return (
        <div>
            <div>
                <img src={user?.photoURL} alt="" />
                <p>{user?.displayName}</p>
                <p>{user?.email}</p>
                <p></p>
            </div>
            <div>
                <p></p>
            </div>
        </div>
    );
};

export default AdminProfile;