import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';

const Router = createBrowserRouter([
    {
        path:'/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/'
            }
        ]
    }
])

export default Router;