import AddButton from "../components/AddButton";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { IProject } from "../types";

const Projects = () => {
  const { backendUrl, token } = useContext(AppContext);
  const [projectsData, setProjectsData] = useState<IProject[]>([]);
  const today = new Date();

  const fetchList = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/project/list",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setProjectsData(response.data.projectsData);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const calculateDaysLeft = (dueDate: string) => {
    const due = new Date(dueDate).getTime();
    const now = today.getTime();
    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getLabelColor = (daysLeft: number) => {
    if (daysLeft <= 3) return "bg-red-400";
    if (daysLeft <= 14) return "bg-yellow-200";
    return "bg-blue-200";
  };

  const getPriorityColor = (priority: string) => {
    if (priority === "High") return "bg-gray-100";
    if (priority === "Low") return "bg-gray-500";
    if (priority === "Mid") return "bg-gray-300";
    return "none";
  };

  return (
    <>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 text-white">
        {projectsData.map((item) => {
          const daysLeft = calculateDaysLeft(item.duedate);
          const labelColor = getLabelColor(daysLeft);
          const priorityColor = getPriorityColor(item.priority);

          return (
            <NavLink key={item._id} to={`/project/${item._id}`}>
              <div className="bg-[#4A416A] p-6 h-fit relative rounded-md flex flex-col gap-4">
                <div>
                  <p className="text-2xl">{item.project_name}</p>
                  <p className="text-xl">{item.customer_name}</p>
                </div>
                <img
                  className="h-fit max-h-[150px] object-cover w-full"
                  src={item.images[0]}
                />
                <p className="h-20 overflow-clip">
                  {item.description.length > 70
                    ? `${item.description.slice(0, 70)}...`
                    : item.description}
                </p>
                <div className="flex gap-2 absolute bottom-4 right-6">
                  <div
                    className={`${
                      item.paid ? "bg-[#BBF491]" : "bg-[#FF3762]"
                    } w-7 h-7 flex justify-center items-center outline-1 outline-black`}
                  >
                    <img
                      className="max-w-[70%] max-h-[70%] object-contain"
                      src={assets.money}
                      alt=""
                    />
                  </div>

                  {item.duedate != "" ? (
                    <div
                      className={`${labelColor} w-7 h-7 flex justify-center items-center outline-1 outline-black`}
                    >
                      <img src={assets.clock} />
                    </div>
                  ) : (
                    ""
                  )}

                  {item.priority != "Default" ? (
                    <div
                      className={`${priorityColor} w-7 h-7 flex justify-center items-center outline-1 outline-black`}
                    >
                      <img src={assets.priority} />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </NavLink>
          );
        })}
      </div>
      <AddButton />
    </>
  );
};

export default Projects;
