import { useContext } from 'react';
import { AuthContext } from './../context/auth.context';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5005';

function UserProfile() {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <>
      {user && (
        <>
          <div>
            <h1>{user.username}</h1>
          </div>
          <div>
            <h2>{user.usersType}</h2>
          </div>
        </>
      )}
    </>
  );
}
export default UserProfile;
