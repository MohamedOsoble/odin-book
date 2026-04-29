import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import { LoadingPage } from "./components/Loading";
import { Navbar } from "./components/Navbar";
import { UserProvider, useUser } from "./contexts/UserContexts";
import { ThemeProvider } from "./contexts/ThemeContexts";

import "./app.css";
import logoDark from "../public/logo2-dark.svg";
import logoLight from "../public/logo2-light.svg";

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }) {
  return (
    <ThemeProvider>
      <html data-theme="black">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            href="https://cdn.jsdelivr.net/npm/daisyui@5"
            rel="stylesheet"
            type="text/css"
          />
          <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
          <Meta />
          <Links />
        </head>
        <body>
          <header className="flex flex-row items-center gap-9">
            <div className="w-[500px] max-w-[100vw] p-4">
              <h1>The Odin Book</h1>
            </div>
          </header>
          <div class="flex flex-col items-center">{children}</div>
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    </ThemeProvider>
  );
}

export function HydrateFallback() {
  return <LoadingPage />;
}

export default function App() {
  return (
    <UserProvider>
      <Navbar></Navbar>
      <Outlet />
    </UserProvider>
  );
}

export function ErrorBoundary({ error }) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <div className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </div>
  );
}
