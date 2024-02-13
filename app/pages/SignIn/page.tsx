import { Button, Caption1Strong } from "@fluentui/react-components";
import Image from "next/image";
import React from "react";

export default function SignIn() {
  return (
    <section className="children-wrapper pl-6 pr-2 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Caption1Strong>
          <div className="text-lg">Sign In</div>
        </Caption1Strong>
      </div>
      <div className="justify-center items-center flex flex-col">
        <Image
          src={"/win-app-qr.png"}
          width={100}
          height={100}
          alt="working on"
        />
        <div>Hey, Thanks For Exploring Our App.</div>
        <div className="text-xs">
          If you&apos;re seeing this message, it means our devs are working hard
          to brought this feature to you.
        </div>
        <div className="text-xs mt-4">
          Sit Tight, We will back with this feature soon.
        </div>
        <div className="text-center text-xs">
          Scan the Qr Code Above or visit @
          https://github.com/Nada-Inc/NOTE-APP-MONO-REPO to know more
        </div>
        <div className="text-xs mt-8">All Rights Reserved Nada Labs © 2024</div>
      </div>
    </section>
  );
}
