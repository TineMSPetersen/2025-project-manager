import AddButton from "../components/AddButton"
import { assets, projects } from "../assets/assets"
import { NavLink } from "react-router-dom"


const Projects = () => {

  return (
    <>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10 text-white p-20">
        {
          projects.map((item) => (
            <NavLink to={`/project/${item._id}`}>
            <div className="bg-[#4A416A] p-6 h-fit relative rounded-md flex flex-col gap-4">
              <div>
                <p className="text-2xl">{item.project_name}</p>
                <p className="text-xl">{item.customer_name}</p>
              </div>
              <img className="h-fit max-h-[150px] object-cover w-full" src={item.images[0]}/>
              <p className="h-20 overflow-clip">
                {item.description.length > 70 ? `${item.description.slice(0, 70)}...` : item.description}
              </p>
              <div className="flex gap-2 absolute bottom-4 right-6">
                <div className={`${item.paid ? 'bg-[#BBF491]' : 'bg-[#FF3762]'} w-7 h-7 flex justify-center items-center outline-1 outline-black`}>
                  <img className="max-w-[70%] max-h-[70%] object-contain" src={assets.money}  alt="" />
                </div>
                
                  {item.duedate != '' ? <div className="bg-[#FFFD7C] w-7 h-7 flex justify-center items-center outline-1 outline-black">
                  <img src={assets.clock} />
                  </div> : '' }

              </div>
              
            </div>
            </NavLink>
          ))
        }
      </div>
      <AddButton />
    </>
  )
}

export default Projects
