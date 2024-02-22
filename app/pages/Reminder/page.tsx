"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Caption1Strong,
  Card,
  CardHeader,
  CardPreview,
  Switch,
  Text,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Input,
  useId,
  Spinner,
} from "@fluentui/react-components";
import {
  isPermissionGranted,
  requestPermission,
  sendNotification,
} from "@tauri-apps/api/notification";
import {
  TimePicker,
  formatDateToTimeString,
  TimePickerProps,
} from "@fluentui/react-timepicker-compat";
import { useStyles } from "./styles";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import {
  Toaster,
  useToastController,
  Toast,
  ToastTitle,
  ToastBody,
} from "@fluentui/react-components";
import Database from "tauri-plugin-sql-api";

export default function Reminder() {
  const styles = useStyles();
  const toasterId = useId("toaster");
  const { dispatchToast } = useToastController(toasterId);

  const [isPermission, setIsPermission] = useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reminders, setReminders] = React.useState<any[]>([]);
  const [selectedTime, setSelectedTime] = React.useState<Date | null>(null);
  const [timePickerValue, setTimePickerValue] = React.useState<string>(
    selectedTime ? formatDateToTimeString(selectedTime) : ""
  );
  const [open, setOpen] = React.useState(false);
  const [reminderAdded, setReminderAdded] = React.useState(false);
  const [isFetching, setIsFetching] = React.useState(true);

  const fetchReminders = async () => {
    try {
      setIsFetching(true);
      const db = await Database.load("sqlite:test.db");
      const result = await db.select<
        Array<{ id: number; title: string; content: string }>
      >("SELECT * FROM reminders");
      console.log("reminders", result);
      setReminders(result);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetching(false);
    }
  };

  const checkNotificationPermission = async () => {
    let permissionGranted = await isPermissionGranted();
    setIsPermission(permissionGranted);
    if (!permissionGranted) {
      const permission = await requestPermission();
      permissionGranted = permission === "granted";
    }
  };

  // useEffect(() => {
  //   if (!open) {
  //     fetchReminders();
  //   }
  // }, [reminderAdded]);

  useEffect(() => {
    checkNotificationPermission();
  }, []);

  const inputId = useId("input");

  const notify = (type?: string, value?: string) =>
    dispatchToast(
      <Toast>
        <ToastTitle>
          {type === "error" ? "User Error" : "Note Added"}
        </ToastTitle>
        <ToastBody>
          {type === "error" ? `${value} is Missing` : "Note Added Successfully"}
        </ToastBody>
      </Toast>,
      { intent: type === "error" ? "warning" : "success" }
    );

  const addReminder = async () => {
    if (title === "") {
      notify("error", "Title");
      setOpen(true);
      return;
    } else {
      try {
        const db = await Database.load("sqlite:test.db");

        await db.execute(`
        CREATE TABLE IF NOT EXISTS reminders (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT,
          description TEXT,
          date TEXT,
          isActive INTEGER
          );
        `);

        const reminder = {
          title: title,
          description: description,
          date: selectedDate,
          time: timePickerValue,
        };

        const [hours, minutes] = reminder.time.split(":");

        reminder.date.setHours(parseInt(hours, 10));
        reminder.date.setMinutes(parseInt(minutes, 10));
        reminder.date.setSeconds(0);

        const currentTime = new Date().getTime();
        const notificationTime = reminder.date.getTime();
        const delay = notificationTime - currentTime;

        if (delay > 0) {
          setTimeout(() => {
            sendNotification({
              title: reminder.title,
              body: reminder.description,
            });
          }, delay);

          const dateString = `${selectedDate}T${timePickerValue}`;

          const result = await db.execute(
            "INSERT into reminders (title, description, date, isActive) VALUES ($1, $2, $3, $4)",
            [title, description, dateString, 1]
          );

          if (result) {
            notify("success", "Reminder Added Successfully");
            setReminderAdded(true);
          }
        } else {
          notify("error", "The specified time is in the past");
          return;
        }
      } catch (error) {
        console.error(error);
      } finally {
        setOpen(false);
      }
    }
  };

  const onTimeChange: TimePickerProps["onTimeChange"] = (_ev, data) => {
    setSelectedTime(data.selectedTime);
    setTimePickerValue(data.selectedTimeText ?? "");
  };
  const onTimePickerInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setTimePickerValue(ev.target.value);
  };

  return (
    <section className="children-wrapper pl-6 pr-2 flex flex-col gap-4">
      {isFetching && (
        <div className="flex items-center gap-2">
          <Spinner size="small" label={"Fetching Reminders Please Wait..."} />
        </div>
      )}
      <Toaster toasterId={toasterId} />
      <Dialog
        modalType="non-modal"
        open={open}
        onOpenChange={(event, data) => setOpen(data.open)}
      >
        <div className="flex justify-between items-center">
          <Caption1Strong>
            <div className="text-lg">Your Reminders</div>
          </Caption1Strong>
          <DialogTrigger disableButtonEnhancement>
            <Button>Add New Reminder</Button>
          </DialogTrigger>
        </div>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Add New Reminder</DialogTitle>
            <DialogContent>
              {/* <Calendar onSelectDate={onSelectDate} value={selectedDate} /> */}
              <div className="flex flex-col gap-2 mb-4">
                <DatePicker
                  className={styles.searchField}
                  appearance="filled-lighter"
                  placeholder="Select Reminder Date"
                  onChange={(event: any) => {
                    setSelectedDate(event.target.value);
                  }}
                  value={selectedDate}
                />
                <TimePicker
                  className={styles.searchField}
                  appearance="filled-lighter"
                  placeholder="Select a time..."
                  selectedTime={selectedTime}
                  onTimeChange={onTimeChange}
                  value={timePickerValue}
                  freeform
                  onInput={onTimePickerInput}
                  hourCycle="h24"
                />
                <Input
                  id={inputId}
                  placeholder="Add Title"
                  appearance="filled-lighter"
                  onInput={(event: any) => {
                    setTitle(event.target.value);
                  }}
                  className={styles.searchField}
                  defaultValue={title}
                />
                <Input
                  id={inputId}
                  placeholder="Add Description"
                  appearance="filled-lighter"
                  onInput={(event: any) => {
                    setDescription(event.target.value);
                  }}
                  defaultValue={description}
                  className={styles.searchField}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">Close</Button>
              </DialogTrigger>
              <Button appearance="primary" onClick={addReminder}>
                Add Reminder
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>

      <div className="flex flex-wrap gap-2">
        <Card className="w-80">
          <CardHeader
            header={
              <Text weight="semibold">
                <div className="text-2xl font-bold">
                  Someone&apos;s Birthday
                </div>
              </Text>
            }
            action={<Switch checked />}
          />
          <CardPreview className="-mt-4">
            <div className="p-4">
              <div className="text-lg">Someone&apos;s Birthday</div>
              <div className="font-bold">7:30 AM March 12 2024</div>
              <div className="text-gray-400 text-xs mt-2">
                in 18 days 12 Hours 15 Minute
              </div>
            </div>
          </CardPreview>
        </Card>
      </div>
    </section>
  );
}
