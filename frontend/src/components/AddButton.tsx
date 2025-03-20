import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const AddButton = () => {
  return (
    <NavLink
      to={"/newproject"}
      className="bg-linear-to-b from-[#FF0036] to-[#321234] p-4 rounded-full outline-2 outline-[#FF0036] absolute bottom-5 right-5"
    >
      <img width={50} src={assets.add} alt="" />
    </NavLink>
  );
};

export default AddButton;
