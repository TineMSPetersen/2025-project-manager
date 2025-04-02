import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { IProject } from "../types";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Archive = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [archiveData, setArchiveData] = useState<IProject[]>([]);

  const fetchArchiveData = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/project/listarchive",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setArchiveData(response.data.archiveData);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchArchiveData();
  }, []);

  const removeProject = async (projectId: string) => {
    try {
      await axios.post(
        backendUrl + "/api/project/delete",
        { projectId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchArchiveData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-5xl mb-15">Archive</h1>

      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-5 text-xl">
          <p>Project Name</p>
          <p>Client Name</p>
          <p>Amount Paid</p>
          <p>Due Date</p>
          <p>Delete</p>
        </div>
        <hr className="mb-5" />
        {archiveData.map((item) => (
          <div>
            <div className="grid grid-cols-5">
              <p>{item.project_name}</p>
              <p>{item.customer_name}</p>
              <p>USD {item.amount_paid}</p>
              <p>
                {new Date(Number(item.duedate)).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <img
                onClick={() => removeProject(item._id)}
                className="w-4"
                src={assets.close}
                alt="delete"
              />
            </div>
            <hr className="text-gray-700 my-5" />
            <NavLink to={`/project/${item._id}`}></NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Archive;
