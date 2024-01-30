"use client";
import React, { useEffect, useState } from "react";
import { NoteCreate } from "./NoteCreate";
import Database from "tauri-plugin-sql-api";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { NoteList } from "./NoteList";
import { ButtonComponent } from "./ButtonComponent";
import { SearchComponent } from "./SearchComponent";
import { NoteView } from "./NoteView";

// Main Function
export default function Notes() {
  const [notes, setNotes] = useState<any[]>([]);
  const [isNoteView, setIsNoteView] = useState(null);
  const [noteAdded, setNoteAdded] = useState(false);

  const state = useSelector((state: RootState) => state.state.state);
  const isEditValue = useSelector(
    (state: RootState) => state.state.isEditValue
  );

  useEffect(() => {
    if (isEditValue != null) {
      setIsNoteView(null);
    }
  }, [isEditValue]);

  const getNotes = async () => {
    try {
      const db = await Database.load("sqlite:test.db");
      const result = await db.select<
        Array<{ id: number; title: string; content: string }>
      >("SELECT * FROM notes");
      setNotes(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setIsNoteView(null);
    getNotes();
  }, [noteAdded, state]);

  return (
    <div className="flex flex-row overflow-hidden">
      <div className="flex-col w-1/3">
        <div className="flex gap-2 justify-between">
          <ButtonComponent onClick={() => setIsNoteView(null)}>
            Add New Note
          </ButtonComponent>
          <ButtonComponent>Add New Todo</ButtonComponent>
        </div>
        <SearchComponent />
        <NoteList
          notes={notes}
          noteView={(value: any) => {
            setIsNoteView(value);
          }}
        />
      </div>
      {isNoteView === null ? (
        <NoteCreate
          setNoteAdded={(value: any) => setNoteAdded(value)}
          isEditValue={isEditValue != null && isEditValue}
        />
      ) : (
        <NoteView
          notes={notes}
          id={isNoteView}
          setNoteAdded={(value: any) => setNoteAdded(value)}
        />
      )}
    </div>
  );
}
