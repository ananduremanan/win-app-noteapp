"use client";
import { useEffect, useRef } from "react";
import { appWindow } from "@tauri-apps/api/window";
import React from "react";
import Icon from "@mdi/react";
import { mdiMinus } from "@mdi/js";
import { mdiCheckboxBlankOutline } from "@mdi/js";
import { mdiClose } from "@mdi/js";

export default function TitleBar() {
  const minimizeButtonRef: any = useRef(null);
  const maximizeButtonRef: any = useRef(null);
  const closeButtonRef: any = useRef(null);

  useEffect(() => {
    if (minimizeButtonRef.current) {
      minimizeButtonRef.current.addEventListener("click", () =>
        appWindow.minimize()
      );
    }

    if (maximizeButtonRef.current) {
      maximizeButtonRef.current.addEventListener("click", () =>
        appWindow.toggleMaximize()
      );
    }

    if (closeButtonRef.current) {
      closeButtonRef.current.addEventListener("click", () => appWindow.close());
    }
  }, []);
  return (
    <div
      data-tauri-drag-region
      className="flex justify-end items-center top-0 h-8"
    >
      <div className="flex gap-6 items-center px-6 mt-2">
        <Icon
          className="cursor-pointer"
          id="titlebar-minimize"
          path={mdiMinus}
          size={0.8}
          ref={minimizeButtonRef}
        />
        <Icon
          className="cursor-pointer"
          id="titlebar-maximize"
          path={mdiCheckboxBlankOutline}
          size={0.5}
          ref={maximizeButtonRef}
        />
        <Icon
          id="titlebar-close"
          className="cursor-pointer"
          path={mdiClose}
          size={0.8}
          ref={closeButtonRef}
        />
      </div>
    </div>
  );
}
