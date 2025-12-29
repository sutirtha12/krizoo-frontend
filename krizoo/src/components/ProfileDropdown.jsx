import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/authSlice";

const ProfileDropdown = ({ close }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    close();
    navigate("/login");
  };

  return (
    <div className="absolute right-0 top-12 w-48 bg-zinc-900 border border-zinc-700 rounded-xl shadow-lg z-50">
      <button
        onClick={() => {
          close();
          navigate("/dashboard");
        }}
        className="w-full text-left px-4 py-3 hover:bg-zinc-800"
      >
        Dashboard
      </button>

      <button
        onClick={() => {
          close();
          navigate("/orders");
        }}
        className="w-full text-left px-4 py-3 hover:bg-zinc-800"
      >
        My Orders
      </button>

      <button
        onClick={handleLogout}
        className="w-full text-left px-4 py-3 text-red-500 hover:bg-zinc-800"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileDropdown;