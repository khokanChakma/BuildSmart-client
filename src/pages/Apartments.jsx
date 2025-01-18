import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/useAxiosPublic";
import ApartmentCard from "../components/ApartmentCard";


const Apartments = () => {
    const axiosPublic = useAxiosPublic();

    const { data: apartments = [] } = useQuery({
        queryKey: ['apartments'],
        queryFn: async () => {
            const res = await axiosPublic.get('/apartments');
            // console.log(res.data);
            return res.data;
        }
    })


    return (
        <div>
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
                {
                    apartments.map(apartment => <ApartmentCard key={apartment._id} apartment={apartment}></ApartmentCard>)
                }
            </div>
        </div>
    );
};

export default Apartments;