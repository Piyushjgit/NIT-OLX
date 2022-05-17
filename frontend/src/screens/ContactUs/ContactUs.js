import { Form, Button, Row, Col } from 'react-bootstrap'
import MainScreen from '../../components/MainScreen'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Loading from '../../components/Loading'
import ErrorMessage from '../../components/ErrorMessage'
import { useEffect } from 'react'
import { Register } from '../../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
const ContactUs = () => {
    const [name, setName] = useState();
    const [contact, setContact] = useState();
    const [message, setMessage] = useState();
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!name||!contact||!message)
        {
            toast.error("Please Fill All the Fields");
            return ;
        }
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.post(`/api/users/contact`, {name,contact,message}, config);
            toast.success("Message Sent Successfully");
        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
            toast.error(message);
        }
    }
    return (
            <div className="card shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light cntct">
                <div className="card-header bg-transparent border-0 text-center text-uppercase"><h3>NIT-KKR Contact Us</h3></div>
                <div className="card-body">
                    <form action="/home"  encType="multipart/form-data" autoComplete="off" onSubmit={(e)=>handleSubmit(e)}>
                        <div className="form-group">
                            <label className="mb-0">Name<span className="text-danger">*</span></label>
                        <input name="name" type="text" className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                        <label className="mb-0">Contact Number <span className="text-danger">*</span></label>
                        <input name="contact" type="text" className="form-control" placeholder="Contact" onChange={(e) => setContact(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="mb-0">Message<span className="text-danger">*</span></label>
                        <textarea name="message" type="text" className="form-control" placeholder="Message" onChange={(e) => setMessage(e.target.value)} />
                        </div>
                        <p className="text-center mb-0"><input type="submit" className="btn btn-primary btn-lg w-100 text-uppercase" value="Submit Now" /></p>
                    </form>

                </div>
            </div>
    )
}

export default ContactUs
