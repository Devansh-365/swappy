"use client";

import { useState } from "react";
import JobFilter from "@/components/job-filter"; // Import your JobFilter component
import { Job, Skill } from "@prisma/client";
import PopupCard from "./popup-card";

interface Props {
  jobs: any;
  skills?: Skill[];
}

const JobList: React.FC<Props> = ({ jobs }) => {
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  const handleFilter = (filters: {
    title: string;
    location: string;
    country: string;
  }) => {
    // Apply filtering logic based on the filters
    const filtered = jobs.filter((job: any) => {
      const titleMatch = job.title
        .toLowerCase()
        .includes(filters.title.toLowerCase());
      const locationMatch = job.location
        .toLowerCase()
        .includes(filters.location.toLowerCase());
      const countryMatch = job.country
        .toLowerCase()
        .includes(filters.country.toLowerCase());

      return titleMatch && locationMatch && countryMatch;
    });

    setFilteredJobs(filtered);
  };

  return (
    <div>
      <JobFilter onFilter={handleFilter} />
      {/* Render the filtered job list */}
      {filteredJobs.length != 0 ? (
        <div className="pt-12 grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
          {filteredJobs.map((job: any, i: any) => (
            <PopupCard role={job} skills={job.skills} key={i} />
          ))}
        </div>
      ) : (
        <div className="w-full mx-auto pt-12 text-center">
          <h5 className="font-semibold leading-none tracking-tight">
            No job posts found
          </h5>
          <p className="max-w-sm text-xs text-muted-foreground text-center mx-auto mt-2">
            No jobs found that match your current filters. Please modify your
            search or check back later for new opportunities.
          </p>
        </div>
      )}
    </div>
  );
};

export default JobList;
