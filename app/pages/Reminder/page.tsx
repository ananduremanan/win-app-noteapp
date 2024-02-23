"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardPreview,
  Spinner,
  Switch,
  Text,
} from "@fluentui/react-components";
import {
  isPermissionGranted,
  requestPermission,
} from "@tauri-apps/api/notification";

import Database from "tauri-plugin-sql-api";
import ReminderDialog from "./ReminderDialog";

export default function Reminder() {
  const [reminders, setReminders] = React.useState<any[]>([]);
  const [open, setOpen] = React.useState(false);
  const [reminderAdded, setReminderAdded] = React.useState(false);
  const [isFetching, setIsFetching] = React.useState(false);
  const [singleReminderData, setSingleReminderData] = React.useState<any[]>();
  const [isPermission, setIsPermission] = useState(false);

  const singleFetch = async (id: any) => {
    try {
      const db = await Database.load("sqlite:test.db");
      const result: any = await db.select(
        `SELECT * FROM reminders where id = ${id}`
      );
      if (result) {
        setSingleReminderData(result[0]);
      }
    } catch (error) {}
  };

  const fetchReminders = async () => {
    try {
      setIsFetching(true);
      const db = await Database.load("sqlite:test.db");
      const result = await db.select<
        Array<{ id: number; title: string; content: string }>
      >("SELECT * FROM reminders");
      setReminders(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  const checkNotificationPermission = async () => {
    let permissionGranted = await isPermissionGranted();
    await setIsPermission(permissionGranted);
    if (!permissionGranted) {
      alert("Notifictaion Permission Denied By OS!!");
      const permission = await requestPermission();
      permissionGranted = permission === "granted";
    }
  };

  useEffect(() => {
    fetchReminders();
  }, [reminderAdded]);

  useEffect(() => {
    checkNotificationPermission();
  }, []);

  return (
    <section className="children-wrapper pl-6 pr-2 flex flex-col gap-4">
      <ReminderDialog
        reminderAdded={(value: any) => {
          setReminderAdded(value);
        }}
        isOpen={open}
        openClose={(value: boolean) => setOpen(value)}
        data={singleReminderData && singleReminderData}
        permisssion={isPermission}
      />

      {isFetching ? (
        <div className="flex items-center gap-2 justify-center h-[60vh]">
          <Spinner size="small" label={"Fetching Reminders Please Wait..."} />
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {reminders.length > 0 ? (
            reminders.map((items: any) => {
              return (
                <Card
                  className="w-80 cursor-pointer"
                  key={items.id}
                  onClick={() => {
                    setOpen(true);
                    singleFetch(items.id);
                  }}
                >
                  <CardHeader
                    header={
                      <Text weight="semibold">
                        <div className="text-2xl font-bold">{items.title}</div>
                      </Text>
                    }
                    action={
                      <Switch checked={items.isActive === 1 ? true : false} />
                    }
                  />
                  <CardPreview className="-mt-4">
                    <div className="p-4">
                      <div className="text-lg">{items.description}</div>
                      <div className="font-bold">{items.date.slice(0, 21)}</div>
                      <div className="text-gray-400 text-xs mt-2">
                        in 18 days 12 Hours 15 Minute
                      </div>
                    </div>
                  </CardPreview>
                </Card>
              );
            })
          ) : (
            <div className="flex justify-center items-center w-full h-[60vh]">
              No Reminders Found!
            </div>
          )}
        </div>
      )}
    </section>
  );
}
