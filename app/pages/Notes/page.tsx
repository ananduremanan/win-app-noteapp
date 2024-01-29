"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Input,
  Caption1Strong,
  Divider,
  Body1,
  Body1Strong,
} from "@fluentui/react-components";
import Icon from "@mdi/react";
import { mdiEarth } from "@mdi/js";
import { mdiPencil } from "@mdi/js";
import { mdiDelete } from "@mdi/js";
import { useStyles } from "./styles";
import { NoteCreate } from "./NoteCreate";

const IsNoteViewContext = React.createContext(true);

const ButtonComponent = ({ children, onClick }: any) => {
  const styles = useStyles();
  return (
    <Button className={styles.button} onClick={onClick}>
      {children}
    </Button>
  );
};

const SearchComponent = () => {
  const styles = useStyles();
  return (
    <Input
      appearance="filled-lighter"
      className={styles.searchField}
      placeholder="Search..."
    />
  );
};

const NoteList = ({ notes, noteView }: any) => {
  return (
    <>
      <div className="mt-2 ml-1">
        <Caption1Strong>Your Notes</Caption1Strong>
        <Divider />
      </div>
      <div className="mt-2 ml-1 flex-col">
        {notes.length > 0 &&
          notes.map((note: any, index: number) => (
            <div className="drawer-item p-1 rounded-md" key={note.id}>
              <Body1 onClick={() => noteView(note.id)}>
                {index + 1}. {note.title}
              </Body1>
            </div>
          ))}
      </div>
    </>
  );
};

const NoteView = ({ notes, id }: any) => {
  const noteData = notes.filter((item: any) => item.id === id);
  console.log(noteData[0]);

  return (
    <div className="w-full ml-4">
      <div className="flex flex-row justify-between w-full">
        <div>
          <Body1Strong>{noteData[0].title}</Body1Strong>
        </div>
        <div className="flex gap-2">
          {/* <Body1>26/01/2026 Friday</Body1> */}
          <div className="flex">
            <Icon path={mdiEarth} size={0.8} />
            <Body1>English</Body1>
          </div>
        </div>
      </div>
      <div className="bg-white mt-2 p-4 rounded-md">
        <div className="flex justify-between">
          <div>
            <Body1Strong>{noteData[0].title}</Body1Strong>
          </div>
          <div className="flex gap-2">
            <Button>
              <Icon path={mdiPencil} size={0.8} />
              Edit
            </Button>
            <Button>
              <Icon path={mdiDelete} size={0.8} />
              Delete
            </Button>
          </div>
        </div>
        <div className="text-justify mt-4">
          <Body1>{noteData[0].content}</Body1>
        </div>
      </div>
    </div>
  );
};

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [isNoteView, setIsNoteView] = useState(null);

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
        <NoteCreate userNotes={(notes: any) => setNotes(notes)} />
      ) : (
        <NoteView notes={notes} id={isNoteView} />
      )}
    </div>
  );
}
