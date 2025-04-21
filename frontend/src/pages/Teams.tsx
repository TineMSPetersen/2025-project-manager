import { useContext } from "react";
import { assets, team } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Teams = () => {
  const { navigate } = useContext(AppContext);

  return (
    <div>
      <h1 className="text-5xl mb-15">My Teams</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        <div
          onClick={() => navigate("/newteam")}
          className="border-2 border-[#4A416A] p-6 text-center flex flex-col gap-5 relative items-center justify-center cursor-pointer"
        >
          <img className="w-[60px]" src={assets.add} />
          <p className="text-lg">Create new team</p>
        </div>

        {team.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/team/${item.id}`)}
            className="border-2 border-[#4A416A] p-6 text-center flex flex-col gap-2 cursor-pointer"
          >
            <img src={item.team_avatar} />
            <p className="text-lg">{item.team_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teams;
