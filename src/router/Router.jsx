import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Apartments from '../pages/Apartments';
import Deshboard from '../deshboard/Deshboard';
import MyProfile from '../deshboard/MyProfile';
import Anouncement from '../deshboard/Anouncement';
import MakePayment from '../deshboard/MakePayment';
import PaymentHistory from '../deshboard/PaymentHistory';

const Router = createBrowserRouter([
    {
        path:'/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/apartments',
                element: <Apartments></Apartments>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
        ]
    },
    {
        path: 'deshboard',
        element: <Deshboard></Deshboard>,
        children: [
            // for only user rout
            {
                path:'myProfile',
                element: <MyProfile></MyProfile>
            },
            {
                path:'announcements',
                element: <Anouncement></Anouncement>
            },
            // for only member rout
            {
                path:'makePayment',
                element: <MakePayment></MakePayment>
            },
            {
                path:'paymentHistory',
                element: <PaymentHistory></PaymentHistory>
            },
        ]
    }
])

export default Router;