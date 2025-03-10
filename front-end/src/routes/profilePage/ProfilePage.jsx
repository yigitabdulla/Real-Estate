import { Link, useNavigate } from "react-router-dom";
import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import apiRequest from "../../lib/apiRequest";
import "./profilePage.scss";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

function ProfilePage() {

  const {updateUser, currentUser} = useContext(AuthContext)

  const navigate = useNavigate()

  const handleLogout = async () => {

    try {
      await apiRequest.post(("/auth/logout"))
      updateUser(null)
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update"><button >Update Profile</button></Link>
            
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src={currentUser.avatar || "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"}
                alt=""
              />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <button onClick={() => handleLogout()}>Logout</button>
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/add"><button>Create New Post</button></Link>
          </div>
          <List />
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <List />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <Chat/>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;