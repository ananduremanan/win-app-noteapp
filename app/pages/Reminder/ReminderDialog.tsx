import {
  Button,
  Caption1Strong,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Input,
  Toast,
  ToastBody,
  ToastTitle,
  Toaster,
  useId,
  useToastController,
} from "@fluentui/react-components";
import { DatePicker } from "@fluentui/react-datepicker-compat";
import {
  TimePicker,
  TimePickerProps,
  formatDateToTimeString,
} from "@fluentui/react-timepicker-compat";
import React, { useEffect, useState } from "react";
import { useStyles } from "./styles";
import Database from "tauri-plugin-sql-api";
import { sendNotification } from "@tauri-apps/api/notification";

export default function ReminderDialog({
  reminderAdded,
  isOpen,
  openClose,
  data,
}: any) {
  const styles = useStyles();
  const inputId = useId("input");
  const toasterId = useId("toaster");
  const { dispatchToast } = useToastController(toasterId);

  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = React.useState<Date | null>(null);
  const [timePickerValue, setTimePickerValue] = React.useState<string>(
    selectedTime ? formatDateToTimeString(selectedTime) : ""
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dataFetched, setDataFetched] = useState<any>({});

  console.log(dataFetched);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    setDataFetched(data);
  }, [data]);

  const onTimeChange: TimePickerProps["onTimeChange"] = (_ev, data) => {
    setSelectedTime(data.selectedTime);
    setTimePickerValue(data.selectedTimeText ?? "");
  };
  const onTimePickerInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setTimePickerValue(ev.target.value);
  };

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
            reminderAdded(true);
            setTitle("");
            setDescription("");
            setTimePickerValue("");
            setSelectedDate(new Date());
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

  const handleDelete = async (id: any) => {
    const db = await Database.load("sqlite:test.db");
    await db.execute(`DELETE FROM reminders WHERE id = ?`, [id]);
  };

  return (
    <React.Fragment>
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
            <DialogTitle>
              <div className="flex justify-between">
                <div>Add New Reminder</div>
                {dataFetched && dataFetched.id && (
                  <Button
                    onClick={() => {
                      handleDelete(dataFetched.id);
                    }}
                  >
                    Delete
                  </Button>
                )}
              </div>
            </DialogTitle>
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
                <Button
                  appearance="secondary"
                  onClick={() => {
                    openClose(false);
                    setDataFetched({});
                  }}
                >
                  Close
                </Button>
              </DialogTrigger>
              <Button appearance="primary" onClick={addReminder}>
                {dataFetched && dataFetched.id ? "Update" : "Add Reminder"}
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </React.Fragment>
  );
}
