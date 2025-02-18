import emailjs from '@emailjs/browser';
import { useRef } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import SectionTitle from './SectionTitle';
import Swal from 'sweetalert2';


const Contact = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                'service_ziy4cbj',
                'template_vf1hm4f',
                form.current,
                { publicKey: 'lJsZZ2DfdFjc84iRc' }
            )
            .then(
                (result) => {
                    console.log('SUCCESS!', result);
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Message sent successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    
                    form.current.reset(); // Reset the form after successful submission
                },
                (error) => {
                    console.log('FAILED...', error.text);
                    Swal.fire({
                        position: "top-end",
                        icon: "error",
                        title: "Failed to send message. Please try again",
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
            );
    };

    return (
        <div id="contact" className="container mx-auto mt-[80px]">
            <SectionTitle heading={'Contact Me'}></SectionTitle>
            <div className='md:flex gap-10 mx-auto shadow-md bg-gray-200 p-6 rounded'>
                <div className='flex-1'>
                    <form ref={form} onSubmit={sendEmail} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
                        <div className="md:flex gap-6">
                            <div className="flex-1">
                                <label className="block mb-2 text-sm font-medium text-gray-600">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="from_name"
                                    className="w-full input input-bordered p-2"
                                    placeholder="Name"
                                    required
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block mb-2 text-sm font-medium text-gray-600">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="from_email"
                                    className="w-full input input-bordered p-2"
                                    placeholder="Email"
                                    required
                                />
                            </div>
                        </div>
                        <div className="md:flex gap-6">
                            <div className="flex-1">
                                <label className="block mb-2 text-sm font-medium text-gray-600">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    className="w-full textarea textarea-bordered p-2"
                                    placeholder="Message"
                                    required
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block mb-2 text-sm font-medium text-gray-600">
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    name="from_phone"
                                    className="w-full input input-bordered p-2"
                                    placeholder="Phone"
                                />
                            </div>
                        </div>
                        <div className="text-center">
                            <input
                                type="submit"
                                value="Send"
                                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer"
                            />
                        </div>
                    </form>
                </div>
                <div className="space-y-4 flex-1 flex flex-col justify-center text-xl rounded-lg shadow-md bg-base-100 p-6">
                    <div className="flex items-center">
                        <FaPhone className="mr-2 text-blue-500" />
                        <span>+8801515223784</span>
                    </div>
                    <div className="flex items-center">
                        <FaEnvelope className="mr-2 text-blue-500" />
                        <span>khokancrmt@gmail.com</span>
                    </div>
                    <div className="flex items-center">
                        <FaMapMarkerAlt className="mr-2 text-blue-500" />
                        <span>Rangamati, Chittagong, Bangladesh</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
