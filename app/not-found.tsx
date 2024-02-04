import Image from "next/image";
import Link from "next/link"; // using Link will remains the component ssr
import React from "react";

export default function Notfound() {
  return (
    <section className="children-wrapper pl-6 pr-2 flex flex-col gap-4 justify-center items-center h-72">
      <Image src={"/working.png"} width={100} height={100} alt="working on" />
      <div>Hey, Thanks For Exploring Our App.</div>
      <div className="text-xs">
        If your&apose seeing this message, it means our devs are working hard to
        brought this feature to you.
      </div>
      <div className="text-xs -mt-4">
        Sit Tight, We will back with this feature soon.
      </div>
      <div>Track More @ https://github.com/Nada-Inc/NOTE-APP-MONO-REPO</div>
      <div className="text-xs">All Rights Reserved Nada Labs © 2024</div>
    </section>
  );
}
