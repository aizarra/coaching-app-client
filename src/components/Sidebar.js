import { forwardRef } from 'react';
import { useContext } from 'react';
import { AuthContext } from './../context/auth.context';
import UserProfile from './UserProfile';
const Sidebar = forwardRef(({ showNav }, ref) => {
  const { user, logOutUser } = useContext(AuthContext);

  return (
    <div
      ref={ref}
      className="fixed w-56 h-full bg-white shadow-sm">
      <div className="flex justify-center mt-6 mb-14">
        <picture>
          <img
            className="w-32 h-auto"
            src="/logoCoachApp.png"
            alt="company logo"
          />
        </picture>
      </div>
      <UserProfile />
    </div>
  );
});
Sidebar.displayName = 'Sidebar';

export default Sidebar;
