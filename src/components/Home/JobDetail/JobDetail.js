import React from 'react';
import './JobDetail.css';

const JobDetail = ({job}) => {
   
   const handleSubmit = ()=>{
       alert("Successfully applied");
   }
    return (
        <div className="col-md-4 text-center mb-3">
           <div className="job-card" class="card" styles="width: 18rem;">
            <h4 className="p-2">{job.jobTitle}</h4>
            <div class="card-body">
                <h5 class="card-title">{job.jobPosition}</h5>
                <p class="card-text">{job.companyName}</p>
                <p class="card-text">{job.location}</p>
                <p class="card-text">{job.jobType}</p>
                <a onClick={handleSubmit} href="#htmlCard" class="btn btn-primary">Apply</a>
            </div>
        </div>
        </div>
    );
};

export default JobDetail;