import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { IProject } from "../types";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

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
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  useEffect(() => {
    fetchArchiveData();
  }, []);

  const removeProject = async (projectId: string) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/project/delete",
        { projectId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Project deleted")
      }
      fetchArchiveData();
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
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
                className="w-4 cursor-pointer"
                src={assets.close}
                alt="delete"
              />
            </div>
            <hr className="text-gray-700 my-5" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Archive;
