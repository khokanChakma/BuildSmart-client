
const SectionTitle = ({ heading }) => {
    return (
        <div className="md:w-3/12 mx-auto text-center my-12">
            <h3 className="text-2xl text-gray-400 uppercase border-y-4 border-gray-200  py-4 font-bold">{heading}</h3>
        </div>
    );
};

export default SectionTitle;