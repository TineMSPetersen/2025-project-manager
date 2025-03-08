import { useParams } from "react-router-dom";
import { assets, projects } from "../assets/assets";
import { useState } from "react";

const Project = () => {
  const { projectId } = useParams();
  const [ optionsOpen, setOptionsOpen ] = useState(false);

  const projectInfo = projects.find((project) => project._id === projectId);

  console.log(projectInfo);
  return (
    <div>
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

      
      { optionsOpen ? 
        <div className='bg-linear-to-b from-[#321234] to-[#140D2B] absolute right-0 bottom-0 rounded-l-md rounded-t-md pt-15 pb-20 px-15 z-20'>
        <ul className='flex flex-col gap-8'>
          <li className='flex gap-3'><img className='max-h-[28px]' src={assets.checkmark} alt="" /><p className='text-lg'>Mark complete</p></li>
          <hr/>
          <li className='flex gap-3'><img className='max-h-[28px]' src={assets.clock_white} /> <p className='text-lg'>Change due date</p></li>
          <hr />
        </ul>
  
        <img onClick={ () => setOptionsOpen(false)} className='absolute bottom-5 right-5' src={assets.close} alt="" />
      </div>
      : null}
      
      
      <div onClick={ () => setOptionsOpen(true)} className='bg-linear-to-b from-[#FF0036] to-[#321234] p-4 rounded-full outline-2 outline-[#FF0036] absolute bottom-5 right-5 z-10'>
            <img width={50} src={assets.options} alt="" />
      </div>
    </div>
  );
};

export default Project;
