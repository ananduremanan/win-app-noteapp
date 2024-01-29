"use client";
import React, { useState } from "react";
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
import Database from "tauri-plugin-sql-api";
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
} from "@fluentui/react-components";

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

// Note List
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

// Note View
const NoteView = ({ notes, id }: any) => {
  const [isDelete, setIsDelete] = useState(true);
  const noteData = notes.filter((item: any) => item.id === id);

  const handleDelete = async () => {
    alert("Called");
    // const db = await Database.load("sqlite:test.db");
    // await db.execute(`DELETE FROM notes WHERE id = ?`, [id]);
  };

  return (
    <div className="w-full ml-4">
      <Dialog>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Dialog title</DialogTitle>
            <DialogContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
              exercitationem cumque repellendus eaque est dolor eius expedita
              nulla ullam? Tenetur reprehenderit aut voluptatum impedit
              voluptates in natus iure cumque eaque?
            </DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">Close</Button>
              </DialogTrigger>
              <Button appearance="primary">Do Something</Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>

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
            <DialogTrigger disableButtonEnhancement>
              <Button onClick={handleDelete}>
                <Icon path={mdiDelete} size={0.8} />
                Delete
              </Button>
            </DialogTrigger>
          </div>
        </div>
        <div className="text-justify mt-4">
          <div>{noteData[0].content}</div>
        </div>
      </div>
    </div>
  );
};

// Main Function
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
