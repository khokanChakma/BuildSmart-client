import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import ApartmentCard from "../components/ApartmentCard";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";


const Apartments = () => {
    const axiosPublic = useAxiosPublic();
    // const [search, setSearch] = useState('');
    // const [cardPerPage, setCardPerPage] = useState(6)
    const [apartments, setApartments] = useState([]);
    const cardPerPage = 6;
    const [currentPage, setCurrentPage] = useState(0)
    const { count } = useLoaderData();
    const numberOfPage = Math.ceil(count / cardPerPage);


    const pages = [...Array(numberOfPage).keys()];
    
    useEffect(() => {
        const fetchAllJobs = async () => {
            const { data } = await axiosPublic.get(`/apartments?page=${currentPage}&size=${cardPerPage}`);
            setApartments(data);
        }
        fetchAllJobs();
    }, [cardPerPage,currentPage])



    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }

    return (
        <div>
            <div className='flex p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300 my-8'>
                <input
                    className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                    type='text'
                    // onChange={(e) => setSearch(e.target.value)}
                    // value={search}
                    name='search'
                    placeholder='Enter blog Title'
                    aria-label='Enter blog Title'
                />

                <button className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'>
                    Search
                </button>
            </div>
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
                {
                    apartments.map(apartment => <ApartmentCard key={apartment._id} apartment={apartment}></ApartmentCard>)
                }
            </div>
            <div className="text-center mb-10 space-x-4">
                <p>current page : {currentPage}</p>
                <button onClick={handlePrevPage} className="btn">Prev</button>
                {
                    pages.map(page => <button
                        className={currentPage === page ? 'bg-orange-400 btn' : 'btn'}
                        onClick={() => setCurrentPage(page)}
                        key={page}
                    >{page}</button>)
                }
                <button onClick={handleNextPage} className="btn">Next</button>
            </div>
        </div>
    );
};

export default Apartments;