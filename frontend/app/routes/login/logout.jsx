import { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContexts";
import { useNavigate } from "react-router";
import { LoadingPage } from "../../components/Loading";

export default function Logout() {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // checks if user is logged in then logs them out and redirects
    if (user) {
      logout();
    } else {
      setLoading(false);
      redirectUser();
    }
  }, [user]);

  const redirectUser = () => {
    navigate("/");
  };
  if (loading) {
    return <LoadingPage text={"Logging out..."} />;
  } else {
    redirectUser();
  }
}
