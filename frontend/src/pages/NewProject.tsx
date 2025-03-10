import React from "react";

const NewProject = () => {
  return (
    <div>
      <h1 className="text-5xl mb-15">New Project</h1>

      <form className="flex flex-col gap-10">
        <div>
          <p className="text-2xl mb-4">Customer Information:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <label className="text-xl" htmlFor="customername">
              Customer Name:
              <input
                id="customername"
                className="block mt-2 text-base"
                type="text"
                placeholder="Customer Name"
              />
            </label>

            <label className="text-xl" htmlFor="customername">
              Customer Email:
              <input
                id="customeremail"
                className="block mt-2 text-base"
                type="text"
                placeholder="customer@mail.com"
              />
            </label>

            <label className="text-xl" htmlFor="customername">
              Customer Phone:
              <input
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
                  className="text-base block mt-2"
                  id="projectname"
                  type="text"
                  placeholder="Project name"
                />
              </label>

              <label htmlFor="projectprice" className="text-xl">
                Project Price:
                <input
                  className="text-base block mt-2"
                  id="projectprice"
                  type="number"
                  placeholder="Project price"
                />
              </label>

              <label htmlFor="projectprice" className="text-xl">
                Project Due Date:
                <input
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
                className="text-base block mt-2 w-full"
                name="projectdescription"
                id="projectdescription"
                placeholder="Lorem ipsum dolor sit amed..."
              ></textarea>
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
