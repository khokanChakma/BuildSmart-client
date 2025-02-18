import AboutBuilding from "../components/AboutBuilding";
import ApartmentLocation from "../components/ApartmentLocation";
import Banner from "../components/Banner";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <div className="container mx-auto">
                <AboutBuilding></AboutBuilding>
            </div>
            <div className="container mx-auto">
                <ApartmentLocation></ApartmentLocation>
            </div>
            <div>
                <Contact></Contact>
            </div>
        </div>
    );
};

export default Home;