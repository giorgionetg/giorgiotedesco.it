
import type { Job } from "@/app/lib/types";

interface JobProps {
  job: Job
}

export default async function JobComponent({ job }: JobProps) {
    
    const jobData: Job = job;

    return (<>
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{jobData.name}</h2>
                <p>{jobData.summary}</p>
                <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    </>);
}