import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { IProject } from "../types";

const Project = () => {
  const { backendUrl, token } = useContext(AppContext);
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState<IProject | null>(null);

  const [optionsOpen, setOptionsOpen] = useState(false);
  const [completeOpen, setCompleteOpen] = useState(false);
  const [dueDateOpen, setDueDateOpen] = useState(false);

  const [newDueDate, setNewDueDate] = useState("");

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
                {projectData.paid ? (
                  <div className="bg-[#BBF491] text-black w-fit px-3 py-2 text-xl">
                    PAID{" "}
                    {projectData.amount_paid
                      ? "- $" + projectData.amount_paid
                      : ""}
                  </div>
                ) : (
                  <div className="bg-[#FF3762] text-black w-fit px-3 py-2 text-xl">
                    UNPAID{" "}
                    {projectData.amount_paid
                      ? "- $" + projectData.amount_paid
                      : ""}
                  </div>
                )}
                {projectData && projectData.duedate ? (
                  <div
                    onClick={() => setDueDateOpen(true)}
                    className="bg-[#FFFD7C] text-black w-fit px-3 py-2 text-xl flex gap-2 items-center"
                  >
                    <img
                      className="max-w-[70%] max-h-[70%] object-contain"
                      src={assets.clock}
                    />{" "}
                    <p>{new Date(Number(projectData.duedate)).toISOString()}</p>
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
            <li
              onClick={() => {
                setCompleteOpen(true);
                setOptionsOpen(false);
                setDueDateOpen(false);
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
                setDueDateOpen(true);
              }}
              className="flex gap-3"
            >
              <img className="max-h-[28px]" src={assets.clock_white} />{" "}
              <p className="text-lg">Change due date</p>
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
    </div>
  );
};

export default Project;
