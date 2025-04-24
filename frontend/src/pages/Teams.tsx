import { useContext, useEffect, useState } from "react";
import { assets, team } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Teams = () => {
  const { navigate, backendUrl, token } = useContext(AppContext);
  const [teamsInfo, setTeamsInfo] = useState([]);

  const fetchTeamsInfo = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/team/list",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", response.data);

      if (response.data.success) {
        setTeamsInfo(response.data.teamsData);

        console.log(teamsInfo);
      } else {
        console.log(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An unknown error occurred");
    }
  };

  useEffect(() => {
    fetchTeamsInfo();
  }, []);

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

        {teamsInfo.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/team/${item._id}`)}
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
