import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { IProject } from "../types";

const Project = () => {
  const { backendUrl, token, navigate } = useContext(AppContext);
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState<IProject | null>(null);

  const [optionsOpen, setOptionsOpen] = useState(false);
  const [completeOpen, setCompleteOpen] = useState(false);
  const [dueDateOpen, setDueDateOpen] = useState(false);
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);

  const [newDueDate, setNewDueDate] = useState("");
  const [newPriority, setNewPriority] = useState("");

  const [newPrice, setNewPrice] = useState(0);
  const [paidStatus, setPaidStatus] = useState(
    projectData?.paid ? "true" : "false"
  );

  const today = new Date();

  const fetchProjectInfo = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/project/singleproject",
        { projectId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setProjectData(response.data.project);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjectInfo();
  }, []);

  const markProjectComplete = async () => {
    try {
      await axios.post(
        backendUrl + "/api/project/markcomplete",
        { projectId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const changeProjectDueDate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        backendUrl + "/api/project/changeduedate",
        { projectId, newDueDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setDueDateOpen(false);
        fetchProjectInfo();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changePriority = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        backendUrl + "/api/project/changepriority",
        { projectId, newPriority },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setPriorityOpen(false);
        fetchProjectInfo();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        backendUrl + "/api/project/changepayment",
        {
          projectId,
          newPrice,
          paidStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setPriceOpen(false);
        fetchProjectInfo();
      }
    } catch (error) {}
  };

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

    const daysLeft = calculateDaysLeft(projectData?.duedate || "");
    const labelColor = getLabelColor(daysLeft);

  

  return (
    <div>
      {projectData ? (
        <div className="flex flex-col gap-10">
          <div className="flex justify-between">
            <div className="flex flex-col gap-4">
              <h1 className="text-5xl">{projectData.project_name}</h1>
              <h2 className="text-2xl">{projectData.customer_name}</h2>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 h-fit">
                {projectData.priority ? (
                  <div
                    onClick={() => {
                      setCompleteOpen(false);
                    setOptionsOpen(false);
                    setDueDateOpen(false);
                    setPriorityOpen(true);
                    setPriceOpen(false)
                    }}
                    className={`
      text-black w-fit px-3 py-2 text-xl
      ${
        projectData.priority === "High"
          ? "bg-gray-100"
          : projectData.priority === "Mid"
          ? "bg-gray-300"
          : "bg-gray-500"
      }
    `}
                  >
                    <p>Priority: {projectData.priority}</p>
                  </div>
                ) : null}
                {projectData.paid ? (
                  <div onClick={() => {
                    setCompleteOpen(false);
                    setOptionsOpen(false);
                    setDueDateOpen(false);
                    setPriorityOpen(false);
                    setPriceOpen(true)
                  }} className="bg-[#BBF491] text-black w-fit px-3 py-2 text-xl">
                    PAID{" "}
                    {projectData.amount_paid
                      ? "- $" + projectData.amount_paid
                      : ""}
                  </div>
                ) : (
                  <div onClick={() => {
                    setCompleteOpen(false);
                    setOptionsOpen(false);
                    setDueDateOpen(false);
                    setPriorityOpen(false);
                    setPriceOpen(true)
                  }} className="bg-[#FF3762] text-black w-fit px-3 py-2 text-xl">
                    UNPAID{" "}
                    {projectData.amount_paid
                      ? "- $" + projectData.amount_paid
                      : ""}
                  </div>
                )}
                {projectData && projectData.duedate ? (
                  <div
                    onClick={() => {
                      setCompleteOpen(false);
                    setOptionsOpen(false);
                    setDueDateOpen(true);
                    setPriorityOpen(false);
                    setPriceOpen(false)
                    }}
                    className={ `${labelColor} text-black w-fit px-3 py-2 text-xl flex gap-2 items-center`}
                  >
                    <img
                      className="max-w-[70%] max-h-[70%] object-contain"
                      src={assets.clock}
                    />{" "}
                    <p>
                      {new Date(Number(projectData.duedate)).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                ) : null}
              </div>

              <div className="flex flex-col items-end">
                {projectData.customer_email ? (
                  <div className="flex gap-2 items-center">
                    <p>{projectData.customer_email}</p>
                    <img
                      className="max-w-[50%] max-h-[60%]"
                      src={assets.email}
                    />
                  </div>
                ) : null}
                {projectData.customer_phone ? (
                  <div className="flex gap-2 items-center">
                    <p>{projectData.customer_phone}</p>
                    <img
                      className="max-w-[50%] max-h-[60%]"
                      src={assets.phone}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex">
            {projectData && projectData.images
              ? projectData.images.map((item) => (
                  <img className="max-h-[200px]" src={item} />
                ))
              : null}
          </div>

          <p>{projectData.description}</p>

          <div>
            <p className="text-2xl mb-2">Important Notes</p>
            <ul className="list-disc flex flex-col gap-2">
              {projectData && projectData.notes
                ? projectData.notes.map((item) => <li>{item}</li>)
                : null}
            </ul>
          </div>
        </div>
      ) : (
        <p>Project not found</p>
      )}

      {optionsOpen ? (
        <div className="bg-linear-to-b from-[#321234] to-[#140D2B] absolute right-0 bottom-0 rounded-l-md rounded-t-md pt-15 pb-20 px-15 z-20">
          <ul className="flex flex-col gap-8">
            <li onClick={() => navigate(`/project/${projectId}/edit`) } className="flex gap-3">
            <img className="max-h-[28px]" src={assets.settings} alt="" />
            <p className="text-lg">Edit Project Details</p>
            </li>
            <hr />
            <li
              onClick={() => {
                setCompleteOpen(true);
                setOptionsOpen(false);
                setDueDateOpen(false);
                setPriorityOpen(false);
                setPriceOpen(false)
              }}
              className="flex gap-3"
            >
              <img className="max-h-[28px]" src={assets.checkmark} alt="" />
              <p className="text-lg">Mark complete</p>
            </li>
            <hr />
            <li
              onClick={() => {
                setCompleteOpen(false);
                setOptionsOpen(false);
                setPriorityOpen(false);
                setDueDateOpen(true);
                setPriceOpen(false);
              }}
              className="flex gap-3"
            >
              <img className="max-h-[28px]" src={assets.clock_white} />{" "}
              <p className="text-lg">Change Due Date</p>
            </li>
            <hr />
            <li
              onClick={() => {
                setCompleteOpen(false);
                setOptionsOpen(false);
                setDueDateOpen(false);
                setPriorityOpen(true);
                setPriceOpen(false);
              }}
              className="flex gap-3"
            >
              <img className="max-h-[28px]" src={assets.checkmark} alt="" />
              <p className="text-lg">Change Priority</p>
            </li>
            <hr />
          </ul>

          <img
            onClick={() => setOptionsOpen(false)}
            className="absolute bottom-5 right-5"
            src={assets.close}
            alt=""
          />
        </div>
      ) : null}

      <div
        onClick={() => setOptionsOpen(true)}
        className="bg-linear-to-b from-[#FF0036] to-[#321234] p-4 rounded-full outline-2 outline-[#FF0036] absolute bottom-5 right-5 z-10"
      >
        <img width={50} src={assets.options} alt="" />
      </div>

      {completeOpen ? (
        <div className="bg-gradient-to-b from-[#321234] to-[#140D2B] absolute m-auto left-0 right-0 z-30 p-10 min-w-[400px] max-w-[600px] top-[30%] text-center rounded-md">
          <div className="relative">
            <img
              onClick={() => setCompleteOpen(false)}
              src={assets.close}
              className="w-5 h-5 absolute right-0 top-0"
            />
          </div>
          <div className="flex flex-col gap-5 items-center">
            <p className="text-2xl">Mark complete</p>
            <p>
              This will mark the project as complete, and remove it from the
              "Projects" tab and the calendar.
            </p>
            <div>
              <p className="mb-2">Is the project complete?</p>
              <button
                onClick={() => {
                  setCompleteOpen(false);
                  markProjectComplete();
                }}
                className="bg-[#BBF491] rounded-md text-black py-2 px-5 flex gap-2 items-center justify-center"
              >
                <img className="h-5" src={assets.checkmark_black} />
                <p>Yes, mark as complete</p>
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {dueDateOpen ? (
        <div className="bg-gradient-to-b from-[#321234] to-[#140D2B] absolute m-auto left-0 right-0 z-30 p-10 min-w-[400px] max-w-[600px] top-[30%] text-center rounded-md">
          <div className="relative">
            <img
              onClick={() => setDueDateOpen(false)}
              src={assets.close}
              className="w-5 h-5 absolute right-0 top-0"
            />
          </div>
          <div className="flex flex-col gap-5 items-center">
            <p className="text-2xl">Change Due Date</p>
            <p>
              Here you can change the due date to another time in the calendar.
            </p>
            <div>
              <form
                onSubmit={changeProjectDueDate}
                className="flex flex-col items-center gap-5"
              >
                <label htmlFor="projectduedate" className="text-xl">
                  Project Due Date:
                  <input
                    onChange={(e) => setNewDueDate(e.target.value)}
                    value={newDueDate}
                    className="text-base block mt-2"
                    type="date"
                    name="due date"
                    id="due date"
                  />
                </label>
                <div>
                  <p className="mb-2">Is the project complete?</p>
                  <button
                    type="submit"
                    className="bg-[#BBF491] rounded-md text-black py-2 px-5 flex gap-2 items-center justify-center"
                  >
                    <img className="h-5" src={assets.clock} />
                    <p>Change due date</p>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}

      {priorityOpen ? (
        <div className="bg-gradient-to-b from-[#321234] to-[#140D2B] absolute m-auto left-0 right-0 z-30 p-10 min-w-[400px] max-w-[600px] top-[30%] text-center rounded-md">
          <div className="relative">
            <img
              onClick={() => setPriorityOpen(false)}
              src={assets.close}
              className="w-5 h-5 absolute right-0 top-0"
            />
          </div>
          <div className="flex flex-col gap-5 items-center">
            <p className="text-2xl">Set Priority</p>
            <p>
              Setting a priority helps you keep track on how important the
              project is for you.
            </p>
            <div>
              <p className="mb-2">What is this project's priority?</p>
              <form onSubmit={changePriority} className="flex flex-col gap-1">
                <label htmlFor="default">
                  <input
                    onChange={(e) => setNewPriority(e.target.value)}
                    type="radio"
                    name="priority"
                    value="Default"
                    id="default"
                  />{" "}
                  Default
                </label>
                <label htmlFor="low">
                  <input
                    onChange={(e) => setNewPriority(e.target.value)}
                    type="radio"
                    name="priority"
                    value="Low"
                    id="low"
                  />{" "}
                  Low
                </label>
                <label htmlFor="mid">
                  <input
                    onChange={(e) => setNewPriority(e.target.value)}
                    type="radio"
                    name="priority"
                    value="Mid"
                    id="mid"
                  />{" "}
                  Medium
                </label>
                <label htmlFor="high">
                  <input
                    onChange={(e) => setNewPriority(e.target.value)}
                    type="radio"
                    name="priority"
                    value="High"
                    id="high"
                  />{" "}
                  High
                </label>
                <button
                  type="submit"
                  className="bg-[#BBF491] rounded-md text-black py-2 px-5 flex gap-2 items-center justify-center mt-5"
                >
                  <p>Confirm</p>
                </button>
              </form>
            </div>
          </div>
        </div>
      ) : null}

      {priceOpen ? (
        <div className="bg-gradient-to-b from-[#321234] to-[#140D2B] absolute m-auto left-0 right-0 z-30 p-10 min-w-[400px] max-w-[600px] top-[30%] text-center rounded-md">
          <div className="relative">
            <img
              onClick={() => setPriceOpen(false)}
              src={assets.close}
              className="w-5 h-5 absolute right-0 top-0"
            />
          </div>
          <div className="flex flex-col gap-5 items-center">
            <p className="text-2xl">Edit Price</p>
            <p>Change the payment amount, and update status of the project.</p>
            <form onSubmit={changePayment} className="flex flex-col gap-1">
              <label htmlFor="">
                Price:
                <input
                  className="block"
                  type="number"
                  value={newPrice || projectData?.amount_paid}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                  placeholder={projectData?.amount_paid?.toString()}
                />
              </label>
              <p className="mt-5">Is this project paid?</p>
              <div className="flex gap-4 justify-center">
                <label htmlFor="unpaid">
                  <input
                    onChange={(e) => setPaidStatus(e.target.value)}
                    type="radio"
                    name="status"
                    checked={paidStatus === "false"}
                    value="false"
                    id="unpaid"
                  />{" "}
                  Unpaid
                </label>
                <label htmlFor="paid">
                  <input
                    onChange={(e) => setPaidStatus(e.target.value)}
                    type="radio"
                    name="status"
                    checked={paidStatus === "true"}
                    value="true"
                    id="paid"
                  />{" "}
                  Paid
                </label>
              </div>
              <button
                type="submit"
                className="bg-[#BBF491] rounded-md text-black py-2 px-5 flex gap-2 items-center justify-center mt-5"
              >
                <p>Confirm</p>
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Project;
