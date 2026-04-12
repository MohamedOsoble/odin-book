import { useUser } from "../contexts/UserContexts";

export const Navbar = () => {
  const { user } = useUser();

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

  function NavLinks(links) {
    return links.map((link) => (
      <li key={link.name}>
        <a href={link.href}>{link.name}</a>
      </li>
    ));
  }
  return (
    <div className="w-full space-y-6 px-4 pb-12">
      <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 space-y-4">
        <ul className="flex items-center space-x-12 md:pl-10">
          {user ? NavLinks(userNavLinks) : NavLinks(guestNavLinks)}
        </ul>
      </nav>
    </div>
  );
};
