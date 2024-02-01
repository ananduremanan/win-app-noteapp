import React from "react";
import {
  Button,
  Caption1Strong,
  Card,
  CardHeader,
  CardPreview,
  Switch,
  Text,
} from "@fluentui/react-components";
import { notification } from "@tauri-apps/api";

// // Define the notification
// const notify = () => {
//   notification.sendNotification({
//     title: "Scheduled Notification",
//     body: "This is a scheduled notification",
//   });
// };

// // Set the desired date and time
// const desiredDate = new Date("2024-01-030T20:55:00"); // Format: YYYY-MM-DDTHH:mm:ss

// // Get the current date and time
// const currentDate = new Date();

// // Calculate the delay (in milliseconds)
// const delay = desiredDate.getTime() - currentDate.getTime();

// // Check if the desired date is in the future
// if (delay > 0) {
//   // Use setTimeout to trigger the notification after the calculated delay
//   setTimeout(notify, delay);
// } else {
//   console.log("Desired date is in the past");
// }

export default function Reminder() {
  return (
    <section className="children-wrapper pl-6 pr-2 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Caption1Strong>
          <div className="text-lg">Your Reminders</div>
        </Caption1Strong>
        <Button>Add New</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        <Card className="w-80">
          <CardHeader
            header={
              <Text weight="semibold">
                <div className="text-2xl font-bold">Keerthi's Birthday</div>
              </Text>
            }
            action={<Switch checked />}
          />
          <CardPreview className="-mt-4">
            <div className="p-4">
              <div className="text-lg">Keerthi's Birthday</div>
              <div className="font-bold">7:30 AM March 12 2024</div>
              <div className="text-gray-400 text-xs mt-2">
                in 18 days 12 Hours 15 Minute
              </div>
            </div>
          </CardPreview>
        </Card>
        <Card className="w-80">
          <CardHeader
            header={
              <Text weight="semibold">
                <div className="text-2xl font-bold">EC Council Exam</div>
              </Text>
            }
            action={<Switch />}
          />
          <CardPreview className="-mt-4">
            <div className="p-4">
              <div className="text-lg">Exam @ 3 O' Clock</div>
              <div className="font-bold">3:30 AM March 12 2024</div>
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
