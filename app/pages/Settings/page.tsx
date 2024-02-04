"use client";
import {
  Body1,
  Button,
  Caption1,
  Caption1Strong,
  Card,
  Dropdown,
  Option,
  Title1,
  makeStyles,
  useId,
} from "@fluentui/react-components";
import React from "react";
import { CiLight } from "react-icons/ci";
import { BsPerson } from "react-icons/bs";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { GoBell } from "react-icons/go";

const useStyles = makeStyles({});

export default function Settings() {
  const [selectedTheme, setSelectedTheme] = React.useState("System");
  const dropdownId = useId("dropdown-default");
  const options = ["System", "Light", "Dark"];

  return (
    <section>
      <div className="sticky top-0 z-10 bg-custom-gray pl-6 pr-2">
        <Title1>Settings</Title1>
      </div>
      <div className="children-wrapper pl-6 pr-2 flex flex-col gap-4 mb-4 py-8">
        <div className="mt-4">
          <Body1>
            <b>Account</b>
            <Card className="mt-4">
              <div className="p-2 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <BsPerson size={20} />
                  <Caption1Strong>
                    Sign into your account to sync your notes data with cloud.
                  </Caption1Strong>
                </div>
                <div>
                  <Button>Sign In</Button>
                </div>
              </div>
            </Card>
          </Body1>
        </div>

        <div className="mt-4">
          <Body1>
            <b>General</b>
            <Card className="mt-4">
              <div className="p-2 flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <CiLight size={20} />
                    <div>
                      <Caption1Strong>App Theme</Caption1Strong>
                      <div className="text-xs text-gray-400">
                        Select Which App Theme to display
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Dropdown
                    placeholder={selectedTheme}
                    aria-labelledby={dropdownId}
                    appearance="underline"
                    style={{
                      minWidth: "auto",
                      border: "none",
                    }}
                  >
                    {options.map((option) => (
                      <Option key={option}>{option}</Option>
                    ))}
                  </Dropdown>
                </div>
              </div>
            </Card>

            <Card className="mt-4">
              <div className="p-2 flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <GoBell size={20} />
                    <div>
                      <Caption1Strong>Notifications</Caption1Strong>
                      <div className="text-xs text-gray-400">
                        Modify Notification Settings For Note App
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Button>Modify</Button>
                </div>
              </div>
            </Card>

            <Card className="mt-4">
              <div className="p-2 flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <MdOutlinePrivacyTip size={20} />
                    <div>
                      <Caption1Strong>Privacy</Caption1Strong>
                      <div className="text-xs text-gray-400">
                        Clear Your Data From Our Servers
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Button>Clear Data</Button>
                </div>
              </div>
            </Card>
          </Body1>
        </div>
        <div className="mt-4">
          <Body1>
            <b>About</b>
            <Card className="mt-4">
              <div className="p-2 flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2">
                    {/* <MdOutlinePrivacyTip size={20} /> */}
                    <div>
                      <Caption1Strong>Note App For Windows</Caption1Strong>
                      <div className="text-xs text-gray-400">V 0.0.12-Beta</div>
                    </div>
                  </div>
                </div>
                <div>
                  <Caption1>
                    <div className="text-blue-500">Send FeedBack</div>
                  </Caption1>
                </div>
              </div>
            </Card>
          </Body1>
        </div>
      </div>
    </section>
  );
}
