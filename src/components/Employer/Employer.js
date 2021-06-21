import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import ProcessPayment from '../Employer/ProcessPayment/ProcessPayment';
import Sidebar from '../Dashboard/Sidebar/Sidebar';
import './Employer.css';

const containerStyle = {
    backgroundColor: "#F4FDFB",
    height: "100%"
}
const Employer = () => {

    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [shippingData, setShippingData] = useState(null);
    const [orderDetails, setOrderDetails] = useState({});
    const [checkOutDate, setCheckOutDate] = useState({ orderDate: new Date() });
    let history = useHistory();

    const onSubmit = data => {
        setShippingData(data);
        console.log(data);
    };
    const handlePaymentSuccess = paymentId => {

        const email = loggedInUser.email;
        const employerBook = { ...checkOutDate, paymentId, shippingData, email };
        fetch('https://calm-bastion-47822.herokuapp.com/addEmployers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employerBook)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data) {
                    alert("successfully Placed");
                    history.push("/employerlogin");
                    setLoggedInUser(data.email);
                    //history.push("/addjobs");
                }
            });
    }
    return (
        <section>
            <div style={containerStyle} className="container-fluid row">
               
                <div>
                    <h1 className="text-center">Employer Account</h1>
                    <br />

                    <div style={{ border: '1px solid cyan', height: '500px' }} className="ms-5 pt-5 ps-5">
                        <div className="row">
                            <div style={{ display: shippingData ? 'none' : 'block' }} className="col-md-6">
                                <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
                                    <input name="name" ref={register({ required: true })} placeholder="Your Name" />
                                    {errors.name && <span className="error">Name is required</span>}

                                    <input name="email" ref={register({ required: true })} placeholder="Your Email" />
                                    {errors.email && <span className="error">Email is required</span>}
                                    <br />
                                    <h5>Select account type : </h5>
                                    <select name="account" ref={register({ required: true })}>
                                        <option value="premium">Premium</option>
                                        <option value="standard">Standard</option>
                                        <option value="basic">Basic</option>
                                    </select>
                                    <input type="submit" />
                                </form>
                            </div>
                            <div style={{ display: shippingData ? 'block' : 'none' }} className="col-md-6">
                                <h2>Please Pay for me</h2>
                                <ProcessPayment handlePayment={handlePaymentSuccess}></ProcessPayment>
                            </div>
                        </div>
                    </div>
                    {/* <Link to={`/orderedList`}><button onClick={handleCheckOut} className="btn btn-primary">Checkout</button></Link> */}
                </div>
            </div>
        </section>
    );
};

export default Employer;