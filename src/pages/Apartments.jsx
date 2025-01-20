import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import ApartmentCard from "../components/ApartmentCard";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";


const Apartments = () => {
    const axiosPublic = useAxiosPublic();
    // const [apartments, setApartments] = useState([]);
    const cardPerPage = 6;
    const [currentPage, setCurrentPage] = useState(0)
    const { count } = useLoaderData();
    const numberOfPage = Math.ceil(count / cardPerPage);

    const [minRent, setMinRent] = useState('');
    const [maxRent, setMaxRent] = useState('');
    const [filteredApartments, setFilteredApartments] = useState([]);

    console.log(filteredApartments)

    const pages = [...Array(numberOfPage).keys()];

    useEffect(() => {
        const fetchAllJobs = async () => {
            const { data } = await axiosPublic.get(`/apartments?page=${currentPage}&size=${cardPerPage}`);
            setFilteredApartments(data);
        }
        fetchAllJobs();
    }, [cardPerPage, currentPage,setFilteredApartments])


    

    const handleSearch = () => {
        const min = parseInt(minRent) || 0;
        const max = parseInt(maxRent) || Infinity;

        const filtered = setFilteredApartments.filter(
            apartment => apartment.rent >= min && apartment.rent <= max
        );
        setFilteredApartments(filtered);
    };




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
            <div className="my-10">
                <div>
                    <h2 className="text-2xl font-semibold text-center mb-4">Search By Rent</h2>
                    {/* <div className="md:flex gap-4 justify-center">
                        <input
                             onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            placeholder="Min rent"
                            className="input input-bordered w-full max-w-xs"
                        />
                        <input
                             onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            placeholder="Max rent"
                            className="input input-bordered w-full max-w-xs"
                        />

                        <button className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'>
                            Search
                        </button>
                    </div> */}
                    <div className="flex items-center space-x-4">
                        <input
                            type="number"
                            placeholder="Min Rent"
                            value={minRent}
                            onChange={(e) => setMinRent(e.target.value)}
                            className="input input-bordered"
                        />
                        <input
                            type="number"
                            placeholder="Max Rent"
                            value={maxRent}
                            onChange={(e) => setMaxRent(e.target.value)}
                            className="input input-bordered"
                        />
                        <button onClick={handleSearch} className="btn btn-primary">Search</button>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
                {
                    filteredApartments.map(apartment => <ApartmentCard key={apartment._id} apartment={apartment}></ApartmentCard>)
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