import { useUser } from "../contexts/UserContexts";
import ThemeController from "./ThemeController";
import { findUser } from "../api/search";

export const Navbar = () => {
  const { user } = useUser();

  const search = async (e) => {
    e.preventDefault();
    const username = e.target.search.value;
    const response = await findUser(username);
    console.log(response);
  };

  const userNavLinks = [
    { name: "Home", href: "/", sublinks: [] },
    { name: "Profile", href: "/profile/" + user.username, sublinks: [] },
    {
      name: "Explore",
      href: "/posts",
      sublinks: [
        { name: "Following", href: "/posts/following" },
        { name: "Recent", href: "/posts/recent" },
        { name: "Popular", href: "/" },
      ],
    },
    { name: "Messages", href: "/messages", sublinks: [] },
    { name: "Logout", href: "/logout", sublinks: [] },
  ];

  const guestNavLinks = [
    { name: "Home", href: "/", sublinks: [] },
    {
      name: "Explore",
      href: "/posts",
      sublinks: [
        { name: "Popular", href: "/" },
        { name: "Recent", href: "/posts/recent" },
      ],
    },
    { name: "Register", href: "/register", sublinks: [] },
    { name: "Login", href: "/login", sublinks: [] },
  ];

  function NavLinks(links) {
    return (
      <>
        {links.map((link) => {
          return (
            <li key={link.name}>
              {link.sublinks.length > 0 ? (
                <details>
                  <summary>{link.name}</summary>
                  <ul className="p-2 bg-base-100 w-40 z-1">
                    {link.sublinks.map((sublink) => {
                      return (
                        <li key={sublink.name}>
                          <a href={sublink.href} key={sublink.name}>
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
      </>
    );
  }
  return (
    <div className="max-lg:collapse bg-base-200 shadow-sm w-full rounded-md">
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
          <ul className="menu menu-horizontal px-1">
            {user ? NavLinks(userNavLinks) : NavLinks(guestNavLinks)}
          </ul>
        </div>
        <div className="navbar-end">
          <form onSubmit={search}>
            <input
              name="search"
              type="text"
              placeholder="Search user"
              className="input input-bordered w-64 lg:w-auto"
            />
          </form>
          <ThemeController />
        </div>
      </div>
      <div className="collapse-content lg:hidden z-1">
        <ul className="menu">
          {user ? NavLinks(userNavLinks) : NavLinks(guestNavLinks)}
        </ul>
      </div>
    </div>
  );
};
