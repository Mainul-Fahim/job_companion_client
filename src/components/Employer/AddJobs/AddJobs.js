import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const containerStyle = {
    backgroundColor: "#F4FDFB",
    height: "100%"
}

const AddJobs = () => {

    const { register, handleSubmit, watch, errors } = useForm();
    const [checkOutDate, setCheckOutDate] = useState({ orderDate: new Date() });

    const onSubmit = data => {
        console.log(data);
        const jobsData = {
            jobTitle: data.jobTitle,
            //id: data.id,
            jobPosition: data.jobPosition,
            companyName: data.companyName,
            location: data.location,
            jobType: data.jobType,
        };
        const url = `http://localhost:5000/addJobs`;
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(jobsData)
        })
            .then(res => {
                console.log(res);
                if(res)
                    {
                        alert("successfully added");
                        
                    }
            })
    };

    return (
        <section>
            <div style={containerStyle} className="container-fluid row">

                <div className="col-md-10 mb-5 addservice">
                    <h1 className="text-center">Add Jobs</h1>
                    <br />
                    <div>
                        <h4><Link to="/" className="text-black"> <span>Logout</span></Link></h4>
                    </div>
                    <div style={{ border: '1px solid cyan', height: '500px' }} className="ms-5 pt-5 ps-5">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <h5>Job Title</h5>
                            <input name="jobTitle" placeholder="Job Title" ref={register} />
                            <br />
                            <h5>Job Position</h5>
                            <input name="jobPosition" placeholder="Job Position" ref={register({ required: true })} />
                            <br />
                            <h5>Company Name</h5>
                            <input name="companyName" placeholder="Company Name" ref={register} />
                            <br />
                            <h5>Job Location</h5>
                            <input name="location" placeholder="Job Location" ref={register} />
                            <br />
                            <h5>Job Type</h5>
                            <input name="jobType" placeholder="Job Type" ref={register} />
                            <br />
                            <br />
                            <input type="submit" />
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AddJobs;