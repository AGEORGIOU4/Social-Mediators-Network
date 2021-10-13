import { useAuth0 } from "@auth0/auth0-react";

const Logout = () => {
  const { logout } = useAuth0();

  document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  return (
    logout({ returnTo: window.location.origin })
  );
};

export default Logout;