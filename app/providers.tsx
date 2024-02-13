"use client";

import * as React from "react";
import {
  FluentProvider,
  teamsDarkTheme,
  SSRProvider,
  RendererProvider,
  createDOMRenderer,
  renderToStyleElements,
  teamsLightTheme,
  Dialog
} from "@fluentui/react-components";
import { useServerInsertedHTML } from "next/navigation";
import { RootState, store } from "./redux/store";
import { Provider } from "react-redux";

export function Providers({ children }: { children: React.ReactNode }) {
  const [renderer] = React.useState(() => createDOMRenderer());

  useServerInsertedHTML(() => {
    return <>{renderToStyleElements(renderer)}</>;
  });

  return (
    <Provider store={store}>
      <RendererProvider renderer={renderer}>
        <SSRProvider>
          <FluentProvider theme={teamsLightTheme} className="ml-1">
            {children}
          </FluentProvider>
        </SSRProvider>
      </RendererProvider>
    </Provider>
  );
}
