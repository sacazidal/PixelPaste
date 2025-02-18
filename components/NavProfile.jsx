"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { PackageOpen, Settings, UserPen } from "lucide-react";
import Profile from "./Profile/Profile";
import Purchases from "./Profile/Purchases";
import SettingsProfile from "./Profile/SettingsProfile";

const NavProfile = () => {
  const [activeSection, setActiveSection] = useState("profile");

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <>
      <div className="flex gap-x-3 justify-end">
        <Button
          className={`flex gap-x-1 items-center ${
            activeSection === "profile" ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => {
            handleSectionClick("profile");
          }}
        >
          <UserPen size={10} />
          <span className="text-xs font-medium">Профиль</span>
        </Button>
        <Button
          className={`flex gap-x-1 items-center ${
            activeSection === "purchases" ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => {
            handleSectionClick("purchases");
          }}
        >
          <PackageOpen size={5} />
          <span className="text-xs font-medium">Покупки</span>
        </Button>
        <Button
          className={`flex gap-x-1 items-center ${
            activeSection === "settings" ? "bg-blue-500 text-white" : ""
          }`}
          onClick={() => {
            handleSectionClick("settings");
          }}
        >
          <Settings size={5} />
          <span className="text-xs font-medium">Настройки</span>
        </Button>
      </div>
      <div className="mt-8">
        {activeSection === "profile" && <Profile />}
        {activeSection === "purchases" && <Purchases />}
        {activeSection === "settings" && <SettingsProfile />}
      </div>
    </>
  );
};
export default NavProfile;
