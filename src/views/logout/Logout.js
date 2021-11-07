import { useAuth0 } from "@auth0/auth0-react";
import { Route } from 'react-router';

const Logout = () => {
  const { logout, isAuthenticated } = useAuth0();

  document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "userEmail=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "userPicture=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  if (isAuthenticated) {
    return (
      logout({ returnTo: window.location.origin })
    )
  } else {
    return (
      <Route render={({ history }) => (
        history.push("/")
      )} />
    )
  }
};

export default Logout;