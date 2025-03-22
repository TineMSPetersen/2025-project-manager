import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { IProject } from "../types";
import { NavLink } from "react-router-dom";

const Deadlines = () => {
  const { backendUrl, token } = useContext(AppContext)
  const today = new Date();
  const [ projectData, setProjectData ]= useState<IProject[]>([]);

  useEffect(() => {
    fetchProjectData()
  }, [])

  const fetchProjectData = async () => {
    try {
      const response = await axios.post(backendUrl + '/api/project/list', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.data.success) {
        setProjectData(response.data.projectsData)
        console.log(projectData)
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const calculateDaysLeft = (dueDate: string) => {
    const due = new Date(dueDate).getTime();
    const now = today.getTime();
    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays
  }

  const getLabelColor = (daysLeft: number) => {
    if (daysLeft <= 3) return "bg-red-400";
    if (daysLeft <= 14) return "bg-yellow-200"
    return "bg-blue-200"
  }

  return (
    <div>
      <h1 className="text-5xl mb-15">Deadlines</h1>
      <div className="grid grid-cols-5 text-xl">
        <p>Days left</p>
        <p>Due Date</p>
        <p>Project Name</p>
        <p>Client Name</p>
        <p>Status</p>
      </div>
      <hr className="mb-10" />
      <div className="flex flex-col gap-5">
      {projectData.map((item, index) => {
          const daysLeft = calculateDaysLeft(item.duedate);
          const labelColor = getLabelColor(daysLeft);
          const dueDateObj = new Date(item.duedate);
          const dueDateFormatted = dueDateObj.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          });

          return (
            <NavLink to={`/project/${item._id}`} key={index}>
              <div className="grid grid-cols-5 items-center mb-2">
                <p
                  className={`${labelColor} mr-2 px-2 py-1 rounded-xl text-black max-w-30 text-center`}
                >
                  {daysLeft <= 0
                    ? "Due today"
                    : `${daysLeft} ${daysLeft === 1 ? "Day" : "Days"} Left`}
                </p>
                <p>{dueDateFormatted}</p>
                <p>{item.project_name}</p>
                <p>{item.customer_name}</p>
                <p>{item.paid ? "Paid" : "Unpaid"}</p>
              </div>
              <hr className="text-gray-700 my-5" />
            </NavLink>
          );
        })}
        </div>
    </div>
  );
};

export default Deadlines;
