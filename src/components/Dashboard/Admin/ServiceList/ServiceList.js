import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../App';
import Sidebar from '../../Sidebar/Sidebar';
import './ServiceList.css';
const containerStyle = {
    backgroundColor: "#F4FDFB",
    height: "100%"
}
const ServiceList = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [allOrders, setAllOrders] = useState([]);
    const [orderStatus, setOrderStatus]=useState('Pending');

    useEffect(() => {
        fetch('http://localhost:5000/allJobs')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setAllOrders(data)
            });
    }, [])
    const handleStatus = id => {
        console.log('clicked',id);
        const status=document.getElementById("status").value;
        console.log(status);
        fetch(`http://localhost:5000/update/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(status)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data)
                    {alert("status Changed");
                        //setOrderStatus(data);
                    }
            });
      };
    return (
        <section>

            <div style={containerStyle} className="container-fluid row">
                <div className="col-md-2">
                    <Sidebar></Sidebar>
                </div>
                <div className="col-md-10 mb-5">
                    <h1 className="text-center">ServiceList</h1>
                    <br />
                    <div style={{ border: '1px solid cyan', height: '500px' }} className="ms-5 pt-5 ps-5 pe-5 table-responsive-sm">
                        <table class="table table-striped table-dark">
                            <thead>
                                <tr>
                                    <th>Job Title</th>
                                    <th>Company Name</th>
                                    <th>Job Position</th>
                                    <th>Location</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    allOrders.map(service => <tr>
                                        <td>{service.jobTitle}</td>
                                        <td>{service.companyName}</td>
                                        <td>{service.jobPosition}</td>
                                        <td>{service.location}</td>
                                        <td><label for="status"></label>

                                            <select onChange={() =>handleStatus(service._id)} id="status">
                                                <option value="ongoing">Ongoing</option>
                                                <option value="done">Done</option>
                                                <option value="pending" selected>Pending</option>
                                            </select></td></tr>)
                                }


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>



        </section>
    );
};

export default ServiceList;