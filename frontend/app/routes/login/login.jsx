import { useState } from "react";

export default function Login() {
  const [formState, setFormState] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = formState.username;
    const password = formState.password;
    console.log(
      `Your username is ${username} and your password is ${password}`,
    );

    // Do some other logging in stuff later;
  };

  return (
    <div class="flex-col">
      <div class="max-w-sm mx-auto pb-7">
        <h1 class="text-3xl">Login</h1>
      </div>
      <form class="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div class="mb-5">
          <label
            for="username"
            class="block mb-2.5 text-sm font-medium text-heading"
          >
            Your username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            class="bg-neutral-secondary-medium border border-default-medium text-heading 
            text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 
            py-2.5 shadow-xs placeholder:text-body"
            placeholder="TheOdin29"
            onChange={handleChange}
            minLength={3}
            required
          />
        </div>
        <div class="mb-5">
          <label
            for="password"
            class="block mb-2.5 text-sm font-medium text-heading"
          >
            Your password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            class="bg-neutral-secondary-medium border border-default-medium 
            text-heading text-sm rounded-base focus:ring-brand focus:border-brand 
            block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="••••••••"
            onChange={handleChange}
            minLength={8}
            required
          />
        </div>
        <button
          type="submit"
          class="text-white bg-brand box-border border border-white rounded-md 
          hover:dark:bg-gray-950 focus:ring-4 focus:ring-brand-medium shadow-xs 
          font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
        >
          Login
        </button>
      </form>
    </div>
  );
}
