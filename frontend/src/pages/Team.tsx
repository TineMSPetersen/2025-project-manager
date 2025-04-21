import { useParams } from "react-router-dom";
import { assets, team } from "../assets/assets";
import { useState } from "react";

const Team = () => {
  const { teamId } = useParams();
  const teamData = team.find((item) => item.id === teamId);
  const [isOwner, setIsOwner] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div>
      <h1 className="text-5xl mb-15">{teamData?.team_name}</h1>

      <div className="flex flex-col gap-10">
        <div>
          <p className="text-2xl mb-4">Team Members:</p>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <img src={assets.owner} className="h-4" />
              <p>{teamData?.owner}</p>
              <p className="text-xs text-gray-500">Owner</p>
            </div>
            {teamData?.members.map((item, index) => (
              <div key={index}>
                {item.member_type === "admin" ? (
                  <div className="flex gap-2 items-center">
                    <img src={assets.admin} className="h-4" />
                    <p>{item.userId}</p>
                    <p className="text-xs text-gray-500">Admin</p>
                  </div>
                ) : (
                  <div>
                    <p>{item.userId}</p>
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
