import { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [ settingsOpen, setSettingsOpen ] = useState(false);

  const logout = () => {
    localStorage.removeItem('token')
    window.location.reload();
  }
  
  return (
    <div>
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
            <li>
              <NavLink to={"/deadlines"}>Deadlines</NavLink>
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
        <img width={50} src={assets.settings} onClick={() => setSettingsOpen(true)} />
      </div>
    </div>

    {settingsOpen ? (
        <div className="bg-linear-to-b from-[#321234] to-[#140D2B] absolute left-0 bottom-0 rounded-l-md rounded-t-md pt-15 pb-20 px-15 z-20">
          <ul className="flex flex-col gap-8">
            <li
              className="flex gap-3"
              onClick={() => logout()}
            >
              <img className="max-h-[28px]" src={assets.logout} alt="log out" />
              <p className="text-lg">Log Out</p>
            </li>
            <hr />
          </ul>

          <img
            onClick={() => setSettingsOpen(false)}
            className="absolute bottom-5 left-5"
            src={assets.close}
            alt=""
          />
        </div>
      ) : null}
    </div>
  );
};

export default Sidebar;
