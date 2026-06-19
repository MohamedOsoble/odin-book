import { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContexts";
import { useNavigate } from "react-router";
import { LoadingPage } from "../../components/Loading";

export default function Logout() {
  const { currentUser, logout } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      logout();
    } else {
      setLoading(false);
      redirectUser();
    }
  }, [currentUser]);

  const redirectUser = () => {
    navigate("/");
  };
  if (loading) {
    return <LoadingPage text={"Logging out..."} />;
  } else {
    redirectUser();
  }
}
