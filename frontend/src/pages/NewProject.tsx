import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const NewProject = () => {
  const { backendUrl, token, navigate } = useContext(AppContext);

  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [image3, setImage3] = useState<File | null>(null);
  const [image4, setImage4] = useState<File | null>(null);
  const [image5, setImage5] = useState<File | null>(null);

  const [customer_name, setCustomer_name] = useState("");
  const [customer_email, setCustomer_email] = useState("");
  const [customer_phone, setCustomer_phone] = useState("");
  const [project_name, setProject_name] = useState("");
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [amount_paid, setAmount_paid] = useState("");
  const [duedate, setDuedate] = useState("");

  const parseNotes = (input: string): string[] => {
    return input
      .split(";")
      .map((note) => note.trim())
      .filter((note) => note.length > 0);
  };

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("customer_name", customer_name);
      formData.append("customer_email", customer_email);
      formData.append("customer_phone", customer_phone);
      formData.append("project_name", project_name);
      formData.append("description", description);
      formData.append("amount_paid", amount_paid);
      formData.append("duedate", duedate);
      formData.append("notes", JSON.stringify(parseNotes(notes)));

      // Check if image is selected before appending
      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);
      if (image5) formData.append("image5", image5);

      const response = await axios.post(
        backendUrl + "/api/project/new",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/projects");
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-5xl mb-15">New Project</h1>

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
                placeholder="Customer Name"
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

              <label htmlFor="projectprice" className="text-xl">
                Project Price:
                <input
                  onChange={(e) => setAmount_paid(e.target.value)}
                  value={amount_paid}
                  className="text-base block mt-2"
                  id="projectprice"
                  type="number"
                  placeholder="Project price"
                />
              </label>

              <label htmlFor="projectduedate" className="text-xl">
                Project Due Date:
                <input
                  onChange={(e) => setDuedate(e.target.value)}
                  value={duedate}
                  className="text-base block mt-2"
                  type="date"
                  name="due date"
                  id="due date"
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
                placeholder="Note 1; Note 2; Note 3;"
              ></textarea>
            </label>
          </div>
        </div>

        <div>
          <p className="text-2xl mb-4">Upload image:</p>
          <div className="flex gap-2">
            <label htmlFor="image1">
              <img
                className="w-20"
                src={assets.upload_area}
                alt="upload area"
              />
              <input
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setImage1(e.target.files[0]);
                  }
                }}
                type="file"
                id="image1"
                hidden
              />
            </label>

            <label htmlFor="image2">
              <img
                className="w-20"
                src={assets.upload_area}
                alt="upload area"
              />
              <input
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setImage2(e.target.files[0]);
                  }
                }}
                type="file"
                id="image2"
                hidden
              />
            </label>

            <label htmlFor="image3">
              <img
                className="w-20"
                src={assets.upload_area}
                alt="upload area"
              />
              <input
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setImage3(e.target.files[0]);
                  }
                }}
                type="file"
                id="image3"
                hidden
              />
            </label>

            <label htmlFor="image4">
              <img
                className="w-20"
                src={assets.upload_area}
                alt="upload area"
              />
              <input
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setImage4(e.target.files[0]);
                  }
                }}
                type="file"
                id="image4"
                hidden
              />
            </label>

            <label htmlFor="image5">
              <img
                className="w-20"
                src={assets.upload_area}
                alt="upload area"
              />
              <input
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setImage5(e.target.files[0]);
                  }
                }}
                type="file"
                id="image5"
                hidden
              />
            </label>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <button className="mt-20 bg-linear-to-b from-[#FF0036] to-[#321234] w-[300px] py-4 rounded-xl outline-2 outline-[#FF0036]">
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewProject;
