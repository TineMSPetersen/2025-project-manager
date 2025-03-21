import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-full bg-gradient-to-b from-[#321234] to-[#140D2B] h-screen hidden md:flex flex-col justify-between pt-10 px-5 pb-5 sticky top-0">
      <div className="flex flex-col gap-15">
        <NavLink className="flex justify-center" to={"/"}>
          <img src={assets.logo} alt="logo" />
        </NavLink>
        <div className="md:text-lg lg:text-xl flex flex-col gap-8">
          <ul className="flex flex-col gap-1">
            <li>
              <NavLink to={"/projects"}>Projects</NavLink>
            </li>
            <li>
              <NavLink to={"/archive"}>Archive</NavLink>
            </li>
          </ul>
          <ul>
            <NavLink to={"/pricecalculator"}>
              <li>Price calculator</li>
            </NavLink>
          </ul>
        </div>
      </div>
      <div>
        <img width={50} src={assets.settings} />
      </div>
    </div>
  );
};

export default Sidebar;
