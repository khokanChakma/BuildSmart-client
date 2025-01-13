import React, { useContext, useState } from 'react';
import AuthContext from '../provider/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
    const { userLogin, setUser, signInWithGoogle } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const handleLoginSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        userLogin(email, password)
            .then(result => {
                const user = result.user;
                setUser(user)
                Swal.fire({
                    title: 'success!',
                    text: 'Login is successfully',
                    icon: 'success',
                })
                navigate(location?.state ? location.state : '/')

            })
            .catch(error => {
                setErrorMessage('User email or Password doesn,t match. please try again')
            })
    }
    const handleGoogleLogin = async () => {
        signInWithGoogle()
            .then(result => {
                Swal.fire({
                    title: 'success!',
                    text: 'Login is successfully',
                    icon: 'success',
                })
                navigate(location?.state ? location?.state : '/')

            })
    }
    return (
        <div>
            <div className="bg-base-300 flex justify-center items-center">
                <div className="card bg-base-100 w-full max-w-lg shrink-0 rounded-none p-10">
                    <h2 className="text-center font-semibold text-2xl">Login Your Account</h2>
                    <form onSubmit={handleLoginSubmit} className="card-body">
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
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        {
                            errorMessage && <p className="text-red-600">{errorMessage}</p>
                        }
                        <div className="form-control mt-6">
                            <button className="btn btn-neutral rounded-none">Login</button>
                        </div>
                        <hr />
                        <div className="text-center">
                            <div onClick={handleGoogleLogin} className="btn">Google Login</div>
                        </div>
                    </form>
                    <p className="text-center font-semibold">Dont’t Have An Account ? <Link className="text-red-500" to='/register'>Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;