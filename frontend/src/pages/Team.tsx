import { useParams } from "react-router-dom";
import { assets, team } from "../assets/assets";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Team = () => {
  const { teamId } = useParams();
  const { backendUrl, token } = useContext(AppContext);
  const teamData = team.find((item) => item.id === teamId);
  const [isOwner, setIsOwner] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [teamInfo, setTeamInfo] = useState(null);

  const fetchTeamInfo = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/team/singleteam",
        { teamId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setTeamInfo(response.data.team);
        console.log(teamInfo);
      } else {
        console.log(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An unknown error occurred");
    }
  };

  useEffect(() => {
    fetchTeamInfo();
  }, []);

  return (
    <div>
      <h1 className="text-5xl mb-15">{teamInfo?.team_name}</h1>

      <div className="flex flex-col gap-10">
        <div>
          <p className="text-2xl mb-4">Team Members:</p>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <img src={assets.owner} className="h-4" />
              <p>{teamInfo?.owner}</p>
              <p className="text-xs text-gray-500">Owner</p>
            </div>
            {teamInfo?.members.map((item, index) => (
              <div key={index}>
                {item.member_type === "admin" ? (
                  <div className="flex gap-2 items-center">
                    <img src={assets.admin} className="h-4" />
                    <p>{item.email}</p>
                    <p className="text-xs text-gray-500">Admin</p>
                  </div>
                ) : (
                  <div>
                    <p>{item.email}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="md:flex gap-20">
          {isOwner || isAdmin ? (
            <div className="mb-10">
              <p className="text-2xl mb-4">Admin settings:</p>
              <button className="underline block cursor-pointer mb-2">
                Edit members
              </button>
              <button className="underline block cursor-pointer">
                Edit team
              </button>
            </div>
          ) : null}
          {isOwner ? (
            <div>
              <p className="text-2xl mb-4">Owner settings:</p>
              <div className="">
                <button className="underline block cursor-pointer mb-2">
                  Transfor Ownership
                </button>
                <button className="underline block cursor-pointer">
                  Delete Team
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Team;
