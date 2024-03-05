"use client";
import React from "react";
import { Button } from "@fluentui/react-components";
import Icon from "@mdi/react";
import { mdiDelete } from "@mdi/js";
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
} from "@fluentui/react-components";
import Database from "tauri-plugin-sql-api";
import { useDispatch } from "react-redux";
import { setIsDeletedReminder } from "@/app/redux/slice";

export const DeleteDialog = ({ id }: any) => {
  const dispatch = useDispatch();

  const handleDelete = async (id: any) => {
    try {
      const db = await Database.load("sqlite:test.db");
      await db.execute(`DELETE FROM reminders WHERE id = ?`, [id]);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setIsDeletedReminder(true));
    }
  };

  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button>
          <Icon path={mdiDelete} size={0.8} />
          Delete
        </Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogTitle>Delete Note</DialogTitle>
          <DialogContent>
            Do You Really Want to Delete this Reminder? This is an unrecoverable
            action.
          </DialogContent>
          <DialogActions>
            <DialogTrigger disableButtonEnhancement>
              <Button appearance="secondary">Close</Button>
            </DialogTrigger>
            <DialogTrigger disableButtonEnhancement>
              <Button
                appearance="primary"
                onClick={() => {
                  handleDelete(id);
                }}
              >
                Yes, Im sure
              </Button>
            </DialogTrigger>
          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
