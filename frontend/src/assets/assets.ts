import header from "./header.jpg";
import logo from "./logo.png";
import settings from "./settings.png";
import add from "./add.png";
import clock from "./clock.png";
import money from "./money.png";
import email from "./email.png";
import phone from "./phone.png";
import options from "./options.png";
import checkmark from "./checkmark.png";
import clock_white from "./clock_white.png";
import close from "./close.png";
import checkmark_black from "./checkmark_black.png";
import upload_area from "./upload_area.png";
import logout from './logout.png'
import priority from './priority.png'
import priority_white from './priority_white.png'
import admin from './admin.png'
import owner from './owner.png'

export const assets = {
  header,
  logo,
  settings,
  add,
  clock,
  money,
  email,
  phone,
  options,
  checkmark,
  clock_white,
  close,
  checkmark_black,
  upload_area,
  logout,
  priority, priority_white,
  admin, owner
};

export const team = [
  {
    id: "1",
    team_name: "Test team",
    team_avatar: "https://avatars.githubusercontent.com/u/111304307?v=4",
    owner: "1234",
    members: [
      {
        userId: "12345",
        member_type: "admin",
      },
      {
        userId: "54321",
        member_type: "member",
      },
    ],
  },
  {
    id: "2",
    team_name: "Test team 2",
    team_avatar: "https://avatars.githubusercontent.com/u/111304307?v=4",
    owner: "1234",
    members: [
      {
        userId: "12345",
        member_type: "admin",
      },
      {
        userId: "54321",
        member_type: "member",
      },
      {
        userId: "54321",
        member_type: "member",
      },
      {
        userId: "54321",
        member_type: "admin",
      },
      {
        userId: "54321",
        member_type: "member",
      },
      {
        userId: "54321",
        member_type: "member",
      },
    ],
  },
];
