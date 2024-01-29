"use client";
import { Body1, Body1Strong, Button } from "@fluentui/react-components";
import { mdiEarth } from "@mdi/js";
import Icon from "@mdi/react";
import React, { useState, useEffect } from "react";
import {
  useId,
  Toaster,
  useToastController,
  Toast,
  ToastTitle,
  ToastBody,
} from "@fluentui/react-components";
import Database from "tauri-plugin-sql-api";

export const NoteCreate = ({ userNotes }: any) => {
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [noteAdded, setNotAdded] = useState(false);

  const toasterId = useId("toaster");
  const { dispatchToast } = useToastController(toasterId);

  const getNotes = async () => {
    try {
      const db = await Database.load("sqlite:test.db");
      const result = await db.select<
        Array<{ id: number; title: string; content: string }>
      >("SELECT * FROM notes");
      userNotes(result);
    } catch (error) {
      console.error(error);
    }
  };

  const _userSetNotes = async () => {
    setNotAdded(false);
    const fileName: string = Math.random()
      .toString()
      .substring(2, 10)
      .toString();

    const db = await Database.load("sqlite:test.db");

    await db.execute(`
    CREATE TABLE IF NOT EXISTS notes (
      id TEXT PRIMARY KEY,
      title TEXT,
      content TEXT
      );
    `);

    const result = await db.execute(
      "INSERT into notes (id, title, content) VALUES ($1, $2, $3)",
      [fileName, title, body]
    );

    if (result) {
      notify();
      setNotAdded(true);
      setTitle("");
      setBody("");
    }
  };

  useEffect(() => {
    getNotes();
  }, [noteAdded]);

  useEffect(() => {
    const today: Date = new Date();
    setDate(today.toString().split(" GMT")[0]);
  }, []);

  const notify = () =>
    dispatchToast(
      <Toast>
        <ToastTitle>Note Added</ToastTitle>
        <ToastBody subtitle="Subtitle">Note Added Successfully</ToastBody>
      </Toast>,
      { intent: "success" }
    );

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
            <Button onClick={_userSetNotes}>Save</Button>
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
