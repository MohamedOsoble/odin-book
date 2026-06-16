import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../../contexts/UserContexts";
import { register } from "../../api/user";

export default function Register() {
  const [formState, setFormState] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const { user } = useUser();
  const navigate = useNavigate();
  const [registrationSuccess, setRegistrationSuccess] = useState(null);
  const [time, setTime] = useState(5);

  useEffect(() => {
    // checks if user is logged in
    if (user) {
      navigate("/posts");
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
    setFormErrors({ ...formErrors, [name]: null });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await register(formState);
    const data = response.data;
    if (data.error === true) {
      handleFormErrors(data.errors);
    } else if (data.error === false) {
      setRegistrationSuccess(true);
    } else {
      setRegistrationSuccess(false);
    }
  };

  const handleFormErrors = (errors) => {
    const errorsObj = {};
    for (const i in errors) {
      errorsObj[errors[i].path] = errors[i].msg;
    }
    setFormErrors(errorsObj);
  };

  const Success = () => {
    setInterval(() => {
      setTime((time) => {
        if (time === 0) {
          navigate("/login");
          return 0;
        } else return time - 1;
      });
    }, 1000);

    return (
      <div className="max-w-sm mx-auto pb-7">
        <h1 className="text-3xl">Registration Successful...</h1>
        <br />
        <p>Redirecting to login...</p>
      </div>
    );
  };

  const Failure = () => {
    return (
      <div className="max-w-sm mx-auto pb-7">
        <h1 className="text-3xl">
          Registration failed for an unknown reason...
        </h1>
        <br />
        <p>Please try again by refreshing the page and registering again.</p>
      </div>
    );
  };

  const RegistrationForm = () => {
    return (
      <div className="flex-col">
        <div className="max-w-sm mx-auto pb-7">
          <h1 className="text-3xl">Register</h1>
        </div>
        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              for="username"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Your username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="bg-neutral-secondary-medium border border-default-medium
            text-heading text-sm rounded-base focus:ring-brand focus:border-brand
            block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="TheOdin29"
              onChange={handleChange}
              minLength={3}
              required
            />
            {formErrors.username ? (
              <p className="text-m text-red-500 flex items-center mt-2">
                {formErrors.username}
              </p>
            ) : null}
          </div>
          <div className="mb-5">
            <label
              for="email"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-neutral-secondary-medium border border-default-medium
            text-heading text-sm rounded-base focus:ring-brand focus:border-brand
            block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="someone@example.com"
              onChange={handleChange}
              minLength={3}
              required
            />
            {formErrors.email ? (
              <p className="text-m text-red-500 flex items-center mt-2">
                {formErrors.email}
              </p>
            ) : null}
          </div>
          <div className="mb-5">
            <label
              for="password"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="bg-neutral-secondary-medium border border-default-medium
            text-heading text-sm rounded-base focus:ring-brand focus:border-brand
            block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="••••••••"
              onChange={handleChange}
              minLength={8}
              required
            />
            {formErrors.password ? (
              <p className="text-m text-red-500 flex items-center mt-2">
                {formErrors.password}
              </p>
            ) : null}
          </div>
          <div className="mb-5">
            <label
              for="passwordConfirmation"
              className="block mb-2.5 text-sm font-medium text-heading"
            >
              Confirm password
            </label>
            <input
              type="password"
              name="passwordConfirmation"
              id="passwordConfirmation"
              className="bg-neutral-secondary-medium border border-default-medium
            text-heading text-sm rounded-base focus:ring-brand focus:border-brand
            block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              placeholder="••••••••"
              onChange={handleChange}
              minLength={8}
              required
            />
            {formErrors.passwordConfirmation ? (
              <p className="text-m text-red-500 flex items-center mt-2">
                {formErrors.passwordConfirmation}
              </p>
            ) : null}
          </div>
          <button
            type="submit"
            className="text-white bg-brand box-border border border-white rounded-md
          hover:dark:bg-gray-950 focus:ring-4 focus:ring-brand-medium shadow-xs
          font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
          >
            Register
          </button>
        </form>
      </div>
    );
  };

  if (registrationSuccess === true) {
    return Success();
  } else if (registrationSuccess === false) {
    return Failure();
  } else {
    return RegistrationForm();
  }
}
