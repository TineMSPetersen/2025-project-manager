import { useParams } from "react-router-dom";
import { assets, projects } from "../assets/assets";
import OptionsButton from "../components/OptionsButton";

const Project = () => {
  const { projectId } = useParams();

  console.log(projectId);

  const projectInfo = projects.find((project) => project._id === projectId);

  console.log(projectInfo);
  return (
    <div className="px-20 py-10">
      {projectInfo ? (
        <div className="flex flex-col gap-10">
          <div className="flex justify-between">
            <div className="flex flex-col gap-4">
              <h1 className="text-5xl">{projectInfo.project_name}</h1>
              <h2 className="text-2xl">{projectInfo.customer_name}</h2>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4 h-fit">
                {projectInfo.paid ? (
                  <div className="bg-[#BBF491] text-black w-fit px-3 py-2 text-xl">
                    PAID {projectInfo.amount_paid ? '- $' + projectInfo.amount_paid : ''}
                  </div>
                ) : (
                  <div className="bg-[#FF3762] text-black w-fit px-3 py-2 text-xl">
                    UNPAID { projectInfo.amount_paid ? '- $' + projectInfo.amount_paid : ''}
                  </div>
                )}
                {projectInfo.duedate != "" ? (
                  <div className="bg-[#FFFD7C] text-black w-fit px-3 py-2 text-xl flex gap-2 items-center">
                    <img
                      className="max-w-[70%] max-h-[70%] object-contain"
                      src={assets.clock}
                    />{" "}
                    <p>{new Date(projectInfo.duedate).toISOString()}</p>
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="flex flex-col items-end">
                {projectInfo.customer_email ? (
                  <div className="flex gap-2 items-center">
                    <p>{projectInfo.customer_email}</p>
                    <img
                      className="max-w-[50%] max-h-[60%]"
                      src={assets.email}
                    />
                  </div>
                ) : (
                  ""
                )}
                {projectInfo.customer_phone ? (
                  <div className="flex gap-2 items-center">
                    <p>{projectInfo.customer_phone}</p>
                    <img
                      className="max-w-[50%] max-h-[60%]"
                      src={assets.phone}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="flex">
              { projectInfo.images.map( (item) => <img className="max-h-[200px]" src={item} />)}
          </div>

          <p>{projectInfo.description}</p>

          <div>
            <p className="text-2xl mb-2">Important Notes</p>
            <ul className="list-disc flex flex-col gap-2">
              { projectInfo.notes.map( (item) => <li>
                {item}
              </li>)}
            </ul>
          </div>
        </div>
      ) : (
        <p>Project not found</p>
      )}

      <OptionsButton />
    </div>
  );
};

export default Project;
