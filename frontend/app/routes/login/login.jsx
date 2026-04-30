import { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContexts";
import { useNavigate } from "react-router";

export default function Login() {
  const [formState, setFormState] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const { user, login } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // checks if user is logged in
    if (user) {
      redirectUser();
    }
  }, [user]);

  const redirectUser = () => {
    navigate("/posts");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
    setFormErrors({});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    const response = await login({ username, password });
    if (response.status === 200) {
      redirectUser();
    } else {
      setFormErrors({
        errorMessage: response.data.message,
      });
    }
  };

  return (
    <div className="flex-col">
      <div className="max-w-sm mx-auto pb-7"></div>
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Login</legend>

            <label className="label">Username</label>
            <input
              name="username"
              id="username"
              type="text"
              className="input"
              placeholder="Username"
            />

            <label className="label">Password</label>
            <input
              name="password"
              id="password"
              type="password"
              className="input"
              placeholder="Password"
            />

            <button className="btn btn-neutral mt-4" type="submit">
              Login
            </button>
          </fieldset>
        </div>
        {formErrors ? <div>{formErrors.errorMessage}</div> : <></>}
      </form>
    </div>
  );
}
