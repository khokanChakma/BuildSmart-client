import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";


const MakeAnnouncements = () => {

    const axiosSecure = useAxiosSecure()

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const descripton = form.description.value;

        const formData = { title, descripton, date: new Date()  }
        axiosSecure.post('/announcement', formData)
            .then(res => {
                console.log(res.data);
                Swal.fire({
                    // position: "top-center",
                    icon: "success",
                    title: "agreement is successfully added",
                    showConfirmButton: false,
                    timer: 1500
                });
            })

    }
    return (
        <div className="p-10 min-h-screen">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text text-xl font-semibold">Title</span>
                    </div>
                    <input type="text" name="title" placeholder="title" className="input input-bordered w-full" required />
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text text-xl font-semibold">Description</span>
                    </div>
                    <textarea
                        name="description"
                        placeholder="Bio"
                        required
                        className="textarea textarea-bordered textarea-sm w-full"></textarea>
                </label>
                <input className="btn" type="submit" value="submit" />
            </form>
        </div>
    );
};

export default MakeAnnouncements;