import { useUser } from "../contexts/UserContexts";
import ThemeController from "./ThemeController";

export const Navbar = () => {
  const { user } = useUser();

  const userNavLinks = [
    { name: "Home", href: "/", sublinks: [] },
    { name: "Profile", href: "/profile/" + user.username, sublinks: [] },
    {
      name: "Posts",
      href: "/posts",
      sublinks: [
        { name: "Explore", href: "/explore" },
        { name: "Popular", href: "/popular" },
        { name: "Recent", href: "/recent" },
      ],
    },
    { name: "Messages", href: "/messages", sublinks: [] },
    { name: "Logout", href: "/logout", sublinks: [] },
  ];

  const guestNavLinks = [
    { name: "Home", href: "/", sublinks: [] },
    {
      name: "Posts",
      href: "/posts",
      sublinks: [
        { name: "Explore", href: "/explore" },
        { name: "Popular", href: "/popular" },
        { name: "Recent", href: "/recent" },
      ],
    },
    { name: "Register", href: "/register", sublinks: [] },
    { name: "Login", href: "/login", sublinks: [] },
  ];

  function NavLinks(links) {
    return (
      <ul className="menu menu-horizontal px-1">
        {links.map((link) => {
          return (
            <li>
              {link.sublinks.length > 0 ? (
                <details>
                  <summary>{link.name}</summary>
                  <ul className="p-2 bg-base-100 w-40 z-1">
                    {link.sublinks.map((sublink) => {
                      return (
                        <li>
                          <a href={link.href + "/" + sublink.name}>
                            {sublink.name}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </details>
              ) : (
                <button href={link.href}>
                  <a href={link.href}>{link.name}</a>
                </button>
              )}
            </li>
          );
        })}
      </ul>
    );
  }
  return (
    <div className="max-lg:collapse bg-base-200 lg:mb-48 shadow-sm w-full rounded-md">
      <input id="navbar-1-toggle" className="peer hidden" type="checkbox" />
      <label
        htmlFor="navbar-1-toggle"
        className="fixed inset-0 hidden max-lg:peer-checked:block"
      ></label>
      <div className="collapse-title navbar">
        <div className="navbar-start">
          <label htmlFor="navbar-1-toggle" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <button className="btn btn-ghost text-xl">oBook</button>
        </div>
        <div className="navbar-center hidden lg:flex">
          {user ? NavLinks(userNavLinks) : NavLinks(guestNavLinks)}
        </div>
        <div className="navbar-end">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-64 lg:w-auto"
          />
          <ThemeController />
        </div>
      </div>
    </div>
  );
};
