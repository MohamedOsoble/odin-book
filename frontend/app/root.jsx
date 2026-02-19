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

import "./app.css";
import logoDark from "../public/logo2-dark.svg";
import logoLight from "../public/logo2-light.svg";

const userNavLinks = [
  { name: "Home", href: "/" },
  { name: "Profile", href: "/profile" },
  { name: "Posts", href: "/posts" },
  { name: "Messages", href: "/messages" },
  { name: "Logout", href: "/logout" },
];

const guestNavLinks = [
  { name: "Home", href: "/" },
  { name: "Posts", href: "/posts" },
  { name: "Register", href: "/register" },
  { name: "Login", href: "/login" },
];

const user = false;

function NavLinks(links) {
  return links.map((link) => (
    <li key={link.name}>
      <a href={link.href}>{link.name}</a>
    </li>
  ));
}

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
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-4">
            <img
              src={logoLight}
              alt="React Router"
              className="block w-full dark:hidden"
            />
            <img
              src={logoDark}
              alt="React Router"
              className="hidden w-full dark:block"
            />
          </div>
        </header>
        <div className="w-full space-y-6 px-4 pb-12">
          <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
            <ul className="flex items-center space-x-12 md:pl-10">
              {user ? NavLinks(userNavLinks) : NavLinks(guestNavLinks)}
            </ul>
          </nav>
        </div>
        <div>{children}</div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function HydrateFallback() {
  return <LoadingPage />;
}

export default function App() {
  return <Outlet />;
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
