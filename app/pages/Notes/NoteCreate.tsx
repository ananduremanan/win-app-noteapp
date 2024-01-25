"use client";
import { Body1, Body1Strong, Button } from "@fluentui/react-components";
import { mdiEarth } from "@mdi/js";
import Icon from "@mdi/react";
import React, { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
// import { appDataDir } from "@tauri-apps/api/path";

export const NoteCreate = () => {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("Your Title");
  const [body, setBody] = useState("");
  const [appDataDirectory, setAppDataDirectory] = useState<any>();

  async function setAppDataDir() {
    const appDataDir = (await import("@tauri-apps/api/path")).appDataDir;
    setAppDataDirectory(appDataDir);
  }

  useEffect(() => {
    const today: Date = new Date();
    setDate(today.toString().split(" GMT")[0]);
    setAppDataDir();
  }, []);

  const handleSave = async () => {
    const noteObject = {
      id: Math.random().toString().substring(2, 10),
      title: title,
      body: body,
      createdAt: date,
    };
    const appDataDirPath = await appDataDirectory;
    const filePath = `${appDataDirPath}/notes.json`;

    
  };

  return (
    <div className="w-full ml-4">
      <div className="flex flex-row justify-between w-full">
        <div>
          <Body1Strong>{title}</Body1Strong>
        </div>
        <div className="flex gap-2">
          <Body1>{date}</Body1>
          <div className="flex">
            <Icon path={mdiEarth} size={0.8} />
            <Body1>English</Body1>
          </div>
        </div>
      </div>
      <div className="bg-white mt-2 p-4 rounded-md">
        <div className="flex justify-between">
          <div className="flex-grow">
            <input
              placeholder="Add Your Title"
              className="border-none outline-none w-full"
              onInput={(event: any) => {
                setTitle(event.target.value);
              }}
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
        <div className="text-justify mt-4">
          <textarea
            className="border-none outline-none w-full"
            placeholder="Enter Note Body"
            rows={20}
            onInput={(event: any) => {
              setBody(event.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};
