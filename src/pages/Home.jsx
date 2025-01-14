import AboutBuilding from "../components/AboutBuilding";
import Banner from "../components/Banner";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <div className="container mx-auto">
                <AboutBuilding></AboutBuilding>
            </div>
        </div>
    );
};

export default Home;