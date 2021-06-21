import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../App';
import JobDetail from '../JobDetail/JobDetail';

const Jobs = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [isEmployer, setIsEmployer] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [search, setSearch] = useState('');
    const { register, handleSubmit, watch, errors } = useForm();

    useEffect(() => {
        fetch('https://calm-bastion-47822.herokuapp.com/jobs')
            .then(res => res.json())
            .then(data => setJobs(data));
    }, [])
    useEffect(() => {
        fetch('https://calm-bastion-47822.herokuapp.com/isEmployer', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email: loggedInUser.email })
        })
            .then(res => res.json())
            .then(data => setIsEmployer(data));
    }, [])

    const onSubmit = data => {
        console.log(data);
        setSearch(data.search);

    };

    return (
        <section id="services">
            {!isEmployer && <div><div className="text-center mt-5">
                <h5>All jobs</h5>
                <h2>Apply and start a job</h2>
                <h4>Filter Jobs</h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input className="p-2 mb-2" name="search" placeholder="Enter Job" ref={register} />
                    <br />
                    <input type="submit" />
                </form>
            </div>
                <div className="d-flex justify-content-center">
                    <div style={{ display: search ? 'block' : 'none' }} className="w-75 row mt-5 pt-5">
                        {

                            jobs.filter(job => job.jobTitle === search)
                                .map(job => <JobDetail job={job}></JobDetail>)
                        }
                    </div>

                </div>
                <div style={{ display: search ? 'none' : 'block' }} className="w-75 row mt-5 pt-5">
                    {
                        jobs.map(job => <JobDetail job={job}></JobDetail>)
                    }
                </div>
            </div>}
        </section>
    );
};

export default Jobs;