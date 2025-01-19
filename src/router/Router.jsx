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
import AdminProfile from '../deshboard/AdminProfile';
import ManageMenbers from '../deshboard/ManageMenbers';
import MakeAnnouncements from '../deshboard/MakeAnnouncements';
import AgreementRequest from '../deshboard/AgreementRequest';
import ManageCoupons from '../deshboard/ManageCoupons';
import Payment from '../deshboard/Payment';

const Router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/apartments',
                element: <Apartments></Apartments>,
                loader: ()=> fetch('http://localhost:5000/apartmentCount')
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
            // for only member rout
            {
                path: 'myProfile',
                element: <MyProfile></MyProfile>
            },
            {
                path: 'announcements',
                element: <Anouncement></Anouncement>
            },
            {
                path: 'makePayment',
                element: <MakePayment></MakePayment>
            },
            {
                path: 'payment',
                element: <Payment></Payment>
            },
            {
                path: 'paymentHistory',
                element: <PaymentHistory></PaymentHistory>
            },
            // for admin
            {
                path: 'adminProfile',
                element: <AdminProfile></AdminProfile>
            },
            {
                path: 'manageMembers',
                element: <ManageMenbers></ManageMenbers>
            },
            {
                path: 'makeAnnouncement',
                element: <MakeAnnouncements></MakeAnnouncements>
            },
            {
                path: 'agreementRequest',
                element: <AgreementRequest></AgreementRequest>
            },
            {
                path: 'manageCoupons',
                element: <ManageCoupons></ManageCoupons>
            },
        ]
    }
])

export default Router;