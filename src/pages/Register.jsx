import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../provider/AuthContext';
import Swal from 'sweetalert2';
import useAxiosPublic from '../hooks/useAxiosPublic';

const Register = () => {
    const navigate = useNavigate()
    const { createNewUser, setUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState('');
    const axiosPublic = useAxiosPublic();

    const handleRegisterSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value;
        const email = form.email.value;
        const password = form.password.value;
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/
        if (!regex.test(password)) {
            setErrorMessage('password must have an Uppercase,a Lowercase & must be at least 6 character.')
            return;
        }
        createNewUser(email, password)
            .then(result => {
                const user = result.user;
                setUser(user)
                updateUserProfile({ displayName: name, photoURL: photo })
                    .then(() => {
                        const userInfo = {
                            name: name,
                            email: email
                        }
                        axiosPublic.post('/users',userInfo)
                        .then(res => {
                            console.log(res.data);
                            if(res.data.insertedId){
                                Swal.fire({
                                    title: 'success!',
                                    text: 'Register is successfully',
                                    icon: 'success',
                                    confirmButtonText: 'ok'
                                })
                                navigate('/')
                            }
                        })
                        
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })           
        }

    const handleGoogleRegister = () => {
        signInWithGoogle()
            .then(result => {
                setUser(result.user)
                const userInfo = {
                    email: result?.user.email,
                    name: result?.user.displayName
                }
                console.log(userInfo)
                axiosPublic.post('/users',userInfo)
                .then(res =>{
                    console.log(res.data);
                })
                Swal.fire({
                    title: 'success!',
                    text: 'Register is successfully',
                    icon: 'success',
                    confirmButtonText: 'ok'
                })
                navigate('/')                    
            })
            .catch(error => {
                console.log(error.message)
            })
    }



    return (
        <div className="bg-base-300 flex justify-center items-center">
            <div className="card bg-base-100 w-full max-w-lg shrink-0 rounded-none p-10">
                <h2 className="text-center mt-4 font-semibold text-2xl">Register Your Account</h2>
                <form onSubmit={handleRegisterSubmit} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" name="name" placeholder="name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo url</span>
                        </label>
                        <input type="text" name="photo" placeholder="Photo url" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>

                        <input type='password' name="password" placeholder="password" className="input input-bordered" required />
                    </div>
                    {
                        errorMessage && <p className="text-red-600">{errorMessage}</p>
                    }
                    <div className="form-control mt-6">
                        <button className="btn btn-neutral rounded-none">Register</button>
                    </div>
                    <div className="text-center">
                        <div onClick={handleGoogleRegister} className="btn">Google Login</div>
                    </div>
                </form>
                <p className="text-center font-semibold">Already Have An Account ? <Link className="text-red-500" to='/login'>Login</Link></p>
            </div>
        </div>
    );
};

export default Register;