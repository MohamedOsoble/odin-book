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
    const { username, password, cpassword, email } = formState;
    console.log(`The current form state is: `);
    console.log(formState);

    // Do some other logging in stuff later;
  };

  const validateForm = () => {
    let isValid = true;
    if (!comparePasswords(formState.password, formState.cpassword)) {
      isValid = false;
      setFormErrors({
        password: { error: true, msg: "Passwords do not match" },
      });
    }
  };

  const comparePasswords = (password1, password2) => {
    return password1 === password2;
  };

  return (
    <div class="flex-col">
      <div class="max-w-sm mx-auto pb-7">
        <h1 class="text-3xl">Register</h1>
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
            class="bg-neutral-secondary-medium border border-default-medium 
            text-heading text-sm rounded-base focus:ring-brand focus:border-brand 
            block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
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
        <div class="mb-5">
          <label
            for="cpassword"
            class="block mb-2.5 text-sm font-medium text-heading"
          >
            Confirm password
          </label>
          <input
            type="password"
            name="cpassword"
            id="cpassword"
            class="bg-neutral-secondary-medium border border-default-medium 
            text-heading text-sm rounded-base focus:ring-brand focus:border-brand 
            block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="••••••••"
            onChange={handleChange}
            minLength={8}
            required
          />
        </div>
        <div class="mb-5">
          <label
            for="email"
            class="block mb-2.5 text-sm font-medium text-heading"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            class="bg-neutral-secondary-medium border border-default-medium 
            text-heading text-sm rounded-base focus:ring-brand focus:border-brand 
            block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            placeholder="someone@example.com"
            onChange={handleChange}
            minLength={3}
            required
          />
        </div>
        <button
          type="submit"
          class="text-white bg-brand box-border border border-white rounded-md 
          hover:dark:bg-gray-950 focus:ring-4 focus:ring-brand-medium shadow-xs 
          font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
        >
          Register
        </button>
      </form>
    </div>
  );
}
