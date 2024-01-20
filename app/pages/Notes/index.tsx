"use client";
import React from "react";
import {
  Card,
  makeStyles,
  Button,
  Input,
  Caption1Strong,
  Divider,
  Body1,
  Body1Strong,
} from "@fluentui/react-components";
import Icon from "@mdi/react";
import { mdiEarth } from "@mdi/js";
import Link from "next/link";

const useStyles = makeStyles({
  card: {
    height: "fit-content",
    backgroundColor: "#fdfdfd",
    color: "#000",
    marginLeft: "20px",
    marginBottom: "1rem",
  },
  fab: {
    position: "absolute",
    bottom: "1rem",
    right: "1rem",
  },
  button: {
    backgroundColor: "#fff",
    color: "#000",
    width: "50%",
  },
  searchField: {
    width: "100%",
    marginTop: "10px",
  },
});

export default function Notes() {
  const styles = useStyles();

  return (
    <div className="flex flex-row overflow-hidden">
      <div className="flex-col w-1/3">
        <div className="flex gap-2 justify-between">
          <Button className={styles.button}>Add New Note</Button>
          <Button className={styles.button}>Add New Todo</Button>
        </div>
        <Input
          appearance="filled-lighter"
          className={styles.searchField}
          placeholder="Search..."
        />
        <div className="mt-2 ml-1">
          <Caption1Strong>Your Notes</Caption1Strong>
          <Divider />
        </div>
        <div className="mt-2 ml-1 flex-col">
          <div className="drawer-item p-1 rounded-md">
            <Body1>1. A Note On Human Behaviour</Body1>
          </div>
          <div className="drawer-item p-1 rounded-md">
            <Body1>2. ThermoDynamics Lecture Note</Body1>
          </div>
        </div>
      </div>
      <div className="w-full ml-4">
        <div className="flex flex-row justify-between w-full">
          <div>
            <Body1Strong>A Note On Human Behaviour</Body1Strong>
          </div>
          <div className="flex gap-2">
            <Body1>26/01/2026 Friday</Body1>
            <div className="flex">
              <Icon path={mdiEarth} size={0.8} />
              <Body1>English</Body1>
            </div>
          </div>
        </div>
        <div className="bg-white">Notes</div>
        <Link href="/Reminder">Reminder</Link>
      </div>
    </div>
  );
}
