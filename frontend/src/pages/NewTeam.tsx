import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const NewTeam = () => {
  const { token, backendUrl, navigate } = useContext(AppContext);

  const [teamName, setTeamName] = useState("");
  const [teamImage, setTeamImage] = useState<File | null>(null);
  const [memberEmail, setMemberEmail] = useState("");
  const [memberType, setMemeberType] = useState("member");
  const [members, setMemebers] = useState<{
    emails: string[];
    types: string[];
  }>({
    emails: [],
    types: [],
  });

  const addMember = (e: React.FormEvent) => {
    e.preventDefault();

    setMemebers((prevMembers) => ({
      emails: [...prevMembers.emails, memberEmail],
      types: [...prevMembers.types, memberType],
    }));

    setMemberEmail("");
    setMemeberType("");
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("team_name", teamName);

      if (teamImage) {
        formData.append("avatar", teamImage);
      }

      // Transform members into an array of objects
      const formattedMembers = members.emails.map((email, index) => ({
        email,
        type: members.types[index],
      }));

      formData.append("members", JSON.stringify(formattedMembers));

      const response = await axios.post(
        backendUrl + "/api/team/new",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/teams");
      } else {
        console.log(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-5xl mb-15">Create New Team</h1>

      <form onSubmit={onSubmitHandler} className="flex flex-col">
        <div className="flex flex-col gap-20">
          <div className="flex justify-between">
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
            <div className="min-w-[300px]">
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
          </div>

          <div className="flex gap-10 justify-between">
            <div>
              <p className="text-xl">Invite members:</p>
              <div className="flex gap-5">
                <label htmlFor="member_email" className="text-base">
                  Member email:
                  <input
                    onChange={(e) => setMemberEmail(e.target.value)}
                    value={memberEmail}
                    className="text-base block mt-2 outline-1 p-2 outline-white"
                    type="text"
                    name="members"
                    id="members"
                  />
                </label>
              </div>
              <p className="mt-5">Member type:</p>
              <div className="flex gap-5">
                <label htmlFor="member_type">
                  <input
                    type="radio"
                    name="member_type"
                    value="member"
                    id="member"
                    defaultChecked
                    onChange={(e) => setMemeberType(e.target.value)}
                  />{" "}
                  Member
                </label>
                <label htmlFor="member_type">
                  <input
                    type="radio"
                    name="member_type"
                    value="admin"
                    id="admin"
                    onChange={(e) => setMemeberType(e.target.value)}
                  />{" "}
                  Admin
                </label>
              </div>
              <button
                onClick={addMember}
                className="mt-5 bg-linear-to-b from-[#FF0036] to-[#321234] rounded-xl py-2 px-8 border-2 border-[#FF0036]"
              >
                Add Member
              </button>
            </div>
            <div className="min-w-[300px]">
              <p className="text-xl">Invited members:</p>
              {members.emails.map((email, index) => (
                <p key={index}>
                  {email} {members.types[index] === "admin" ? "- Admin" : null}
                </p>
              ))}
            </div>
          </div>
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
