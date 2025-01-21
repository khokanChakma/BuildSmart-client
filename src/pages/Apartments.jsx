import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import ApartmentCard from "../components/ApartmentCard";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";


const Apartments = () => {
    const axiosPublic = useAxiosPublic();
    const [apartments, setApartments] = useState([]);
    const cardPerPage = 6;
    const [currentPage, setCurrentPage] = useState(0)
    const { count } = useLoaderData();
    const numberOfPage = Math.ceil(count / cardPerPage);

    const [minRent, setMinRent] = useState('');
    const [maxRent, setMaxRent] = useState('');

    console.log(maxRent,minRent)

    const pages = [...Array(numberOfPage).keys()];

    useEffect(() => {
        const fetchAllJobs = async () => {
            const { data } = await axiosPublic.get(`/apartments?page=${currentPage}&size=${cardPerPage}&min=${minRent}&max=${maxRent}`);
            setApartments(data);
        }
        fetchAllJobs();
    }, [cardPerPage, currentPage,setApartments,maxRent,minRent])

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
                <div className="">
                    <h2 className="text-2xl font-semibold text-center mb-4">Search By Rent</h2>
                    <div className="flex items-center justify-center space-x-4">
                        <input
                            type="number"
                            placeholder="Min Rent"
                            value={minRent}
                            onChange={(e) => setMinRent(e.target.value)}
                            className="input w-36 input-bordered"
                        />
                        <input
                            type="number"
                            placeholder="Max Rent"
                            value={maxRent}
                            onChange={(e) => setMaxRent(e.target.value)}
                            className="input w-36 input-bordered"
                        />
                        <button className="btn btn-primary">Search</button>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
                {
                    apartments.map(apartment => <ApartmentCard key={apartment._id} apartment={apartment}></ApartmentCard>)
                }
            </div>
            <div className="text-center my-10 space-x-4">
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