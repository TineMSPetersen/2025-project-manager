import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { IProject } from "../types";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditProject = () => {
  const { backendUrl, token, navigate } = useContext(AppContext);
  const [projectData, setProjectData] = useState<IProject | null>(null);

  const { projectId } = useParams();

  console.log("projectId from URL:", projectId);

  const [customer_name, setCustomer_name] = useState("");
  const [customer_email, setCustomer_email] = useState("");
  const [customer_phone, setCustomer_phone] = useState("");
  const [project_name, setProject_name] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");

  const parseNotes = (input: string): string[] => {
    return input
      .split(";")
      .map((note) => note.trim())
      .filter((note) => note.length > 0);
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formattedNotes = parseNotes(notes);

      const form = {
        projectId,
        customer_name,
        customer_email,
        customer_phone,
        project_name,
        description,
        notes: formattedNotes,
      };

      const response = await axios.post(
        backendUrl + "/api/project/update",
        form,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        navigate(`/project/${projectData?._id}`);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    if (projectData) {
      setCustomer_name(projectData.customer_name || "");
      setCustomer_email(projectData.customer_email || "");
      setCustomer_phone(projectData.customer_phone || "");
      setProject_name(projectData.project_name || "");
      setDescription(projectData.description || "");
      setNotes(projectData.notes ? projectData.notes.join("; ") : "");
    }
  }, [projectData]);

  return (
    <div>
      <h1 className="text-5xl mb-15">Edit Project Details</h1>

      <form onSubmit={onSubmitHandler} className="flex flex-col gap-10">
        <div>
          <p className="text-2xl mb-4">Customer Information:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <label className="text-xl" htmlFor="customername">
              Customer Name:
              <input
                onChange={(e) => setCustomer_name(e.target.value)}
                value={customer_name}
                id="customername"
                className="block mt-2 text-base"
                type="text"
                placeholder={customer_name}
              />
            </label>

            <label className="text-xl" htmlFor="customername">
              Customer Email:
              <input
                onChange={(e) => setCustomer_email(e.target.value)}
                value={customer_email}
                id="customeremail"
                className="block mt-2 text-base"
                type="text"
                placeholder="customer@mail.com"
              />
            </label>

            <label className="text-xl" htmlFor="customername">
              Customer Phone:
              <input
                onChange={(e) => setCustomer_phone(e.target.value)}
                value={customer_phone}
                id="customerphone"
                className="block mt-2 text-base"
                type="number"
                placeholder="12345678"
              />
            </label>
          </div>
        </div>

        <div>
          <p className="text-2xl mb-4">Project information:</p>

          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <label htmlFor="projectname" className="text-xl">
                Project Name:
                <input
                  onChange={(e) => setProject_name(e.target.value)}
                  value={project_name}
                  className="text-base block mt-2"
                  id="projectname"
                  type="text"
                  placeholder="Project name"
                />
              </label>
            </div>

            <label htmlFor="projectdescription" className="text-xl">
              Project Description:
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="text-base block mt-2 w-full"
                name="projectdescription"
                id="projectdescription"
                placeholder="Lorem ipsum dolor sit amed..."
              ></textarea>
            </label>

            <label htmlFor="projectnotes" className="text-xl">
              Important notes:
              <p className="text-xs">Seperate each note by ';'</p>
              <textarea
                onChange={(e) => setNotes(e.target.value)}
                className="text-base block mt-2 w-full"
                name="projectnotes"
                id="projectnotes"
                value={notes}
                placeholder="Note 1; Note 2; Note 3;"
              ></textarea>
            </label>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <button className="mt-20 bg-linear-to-b from-[#FF0036] to-[#321234] w-[300px] py-4 rounded-xl outline-2 outline-[#FF0036]">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProject;
