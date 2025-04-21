import React, { useState } from "react";
import { assets } from "../assets/assets";

const NewTeam = () => {
  const [teamName, setTeamName] = useState("");
  const [teamImage, setTeamImage] = useState<File | null>(null);
  const [members, setMembers] = useState("");

  return (
    <div>
      <h1 className="text-5xl mb-15">Edit Project Details</h1>

      <form className="flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <label htmlFor="teamname" className="text-xl">
            Team Name:
            <input
              onChange={(e) => setTeamName(e.target.value)}
              value={teamName}
              className="text-base block mt-2 outline-1 p-2 outline-white"
              id="teamname"
              type="text"
              placeholder="Team Name"
            />
          </label>

          <div>
            <p className="text-xl">Upload Team Avatar:</p>
            <label htmlFor="team_image">
              <img
                className="w-20"
                src={assets.upload_area}
                alt="upload area"
              />
              <input
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setTeamImage(e.target.files[0]);
                  }
                }}
                type="file"
                id="team_image"
                hidden
              />
            </label>
          </div>

          <label htmlFor="members" className="text-xl">
            Invite members:
            <input
              onChange={(e) => setMembers(e.target.value)}
              value={members}
              className="text-base block mt-2 outline-1 p-2 outline-white"
              type="text"
              name="members"
              id="members"
            />
          </label>
        </div>

        <div className="flex flex-col items-center">
          <button className="mt-20 bg-linear-to-b from-[#FF0036] to-[#321234] w-[300px] py-4 rounded-xl outline-2 outline-[#FF0036]">
            Create Team
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewTeam;
