"use client";

import React from "react";
import Icon from "@mdi/react";
import { mdiMenu } from "@mdi/js";
import { mdiWindowClose } from "@mdi/js";
import { mdiFilePlus, mdiTimerAlert } from "@mdi/js";
import { VscNotebook } from "react-icons/vsc";
import { TfiTimer } from "react-icons/tfi";
import { LiaWalletSolid } from "react-icons/lia";
import { BsPerson } from "react-icons/bs";
import { LuSettings } from "react-icons/lu";
import Image from "next/image";
import noteapplogo from "../../public/notes.png";

export default function Drawer() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isActive, setIsActive] = React.useState("note");

  return (
    <div className="drawer h-screen flex flex-col lg:w-80 p-1 shadow-md	z-10">
      {isOpen && (
        <div className="drawer absolute left-0">
          <div className="flex justify-between">
            <div>Drawer</div>
            <span onClick={() => setIsOpen(!isOpen)}>
              <Icon path={mdiWindowClose} size={1} />
            </span>
          </div>
        </div>
      )}
      <div onClick={() => setIsOpen(!isOpen)} className="flex">
        {/* <Icon path={mdiMenu} size={0.8} className="mt-2 cursor-pointer" /> */}
        <div className="font-extralight text-sm p-2">Note App</div>
      </div>
      <div className="mt-2">
        <div
          className={`flex items-center p-2 drawer-item gap-4 rounded-md mb-1`}
        >
          <VscNotebook />
          <div className="">Notes</div>
        </div>
        <div className="">
          <div
            className={`flex items-center p-2 drawer-item gap-4 rounded-md mb-1`}
          >
            <TfiTimer />
            <div className="font-light">Reminder</div>
          </div>
        </div>
        <div className="">
          <div
            className={`flex items-center p-2 gap-4 rounded-md mb-1 drawer-item`}
          >
            <LiaWalletSolid />
            <div className="font-light">Track Expense</div>
          </div>
        </div>
      </div>
      <div className="mt-auto">
        <div
          className={`flex items-center gap-4 p-2 drawer-item rounded-md mb-1`}
        >
          <BsPerson />
          <div className="">Sign In</div>
        </div>
        <div
          className={`flex items-center p-2 drawer-item gap-4 rounded-md mb-1`}
        >
          <LuSettings />
          <div className="">Settings</div>
        </div>
      </div>
    </div>
  );
}
