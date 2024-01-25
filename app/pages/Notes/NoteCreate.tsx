"use client";
import { Body1, Body1Strong, Button } from "@fluentui/react-components";
import { mdiEarth } from "@mdi/js";
import Icon from "@mdi/react";
import React, { useState, useEffect } from "react";
import { BaseDirectory, writeTextFile } from "@tauri-apps/api/fs";
import {
  useId,
  Toaster,
  useToastController,
  Toast,
  ToastTitle,
  ToastBody,
} from "@fluentui/react-components";
import { Store } from "tauri-plugin-store-api";

export const NoteCreate = ({ userNotes }: any) => {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [notes, setNotes] = useState<any[]>([]);
  const [localNotes, setLocalNotes] = useState<any[]>([]);

  const toasterId = useId("toaster");
  const { dispatchToast } = useToastController(toasterId);

  const getNotes = async () => {
    const val = await store.get("_noteData");
    userNotes(val);
  };

  const store = new Store(".noteData.json");

  const _userSetNotes = async () => {
    await store.set("_noteData", notes);
    await store.save();
  };

  useEffect(() => {
    _userSetNotes();
    getNotes();
  }, [notes]);

  useEffect(() => {
    const today: Date = new Date();
    setDate(today.toString().split(" GMT")[0]);
    // getNotes();
  }, []);

  const notify = () =>
    dispatchToast(
      <Toast>
        <ToastTitle>Note Added</ToastTitle>
        <ToastBody subtitle="Subtitle">Note Added Successfully</ToastBody>
      </Toast>,
      { intent: "success" }
    );

  const handleSave = async () => {
    try {
      const fileName: string = Math.random()
        .toString()
        .substring(2, 10)
        .toString();
      const folderName: string = "noteData";
      await writeTextFile(`${folderName}/${fileName}.txt`, body, {
        dir: BaseDirectory.Document,
      });
      notify();
      const noteData: any = { fileId: fileName, title: title };
      setNotes([{ ...noteData }, ...notes]);
      setTitle("");
      setBody("");
    } catch (error) {
      console.error("Error Occured: ", error);
    }
  };

  return (
    <div className="w-full ml-4">
      <Toaster toasterId={toasterId} />
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
              value={title}
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
            value={body}
          />
        </div>
      </div>
    </div>
  );
};
