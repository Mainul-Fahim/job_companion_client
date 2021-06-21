import { useForm } from "react-hook-form";
import React, { useState } from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import './MakeAdmin.css';

const containerStyle = {
    backgroundColor: "#F4FDFB",
    height: "100%"
}
const MakeAdmin = () => {
    
    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmit = data => {
        console.log(data);
        const emailData = {
            email: data.email,
            //id: data.id,
        };
        const url = `http://localhost:5000/addAdmin`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(emailData)
        })
            .then(res => {
                console.log(res)
            })

    };
    
    return (
        <section>
            <div style={containerStyle} className="container-fluid row">
                <div className="col-md-2">
                    <Sidebar></Sidebar>
                </div>
                <div className="col-md-10 mb-5 addadmin">
                    <h1 className="text-center">Add Admin</h1>
                    <br />
                    <div style={{ border: '1px solid cyan', height: '500px' }} className="ms-5 pt-5 ps-5">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h5>Email</h5>
                            <input name="email" placeholder="messi12@gmail.com" ref={register} />
                            <input type="submit" />
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MakeAdmin;