import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { UserContext } from '../../../App';
import JobDetail from '../JobDetail/JobDetail';

const Jobs = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [isEmployer, setIsEmployer] = useState(false);
    const [jobs,setJobs]=useState([]);

    useEffect(() =>{
        fetch('http://localhost:5000/jobs')
        .then(res=>res.json())
        .then(data=>setJobs(data));
    },[])
    useEffect(() => {
        fetch('http://localhost:5000/isEmployer', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email: loggedInUser.email })
        })
            .then(res => res.json())
            .then(data => setIsEmployer(data));
    }, [])
    return (
        <section id="services">
            {!isEmployer &&  <div><div className="text-center mt-5">
                <h5>All jobs</h5>
                <h2>Apply and start a job</h2>
            </div>
            <div className="d-flex justify-content-center">
                <div className="w-75 row mt-5 pt-5">
                    {
                        jobs.map(job => <JobDetail job={job}></JobDetail>)
                    }
                </div>
            </div>
            </div> }
        </section>
    );
};

export default Jobs;