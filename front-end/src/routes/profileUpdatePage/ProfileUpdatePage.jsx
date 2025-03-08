import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest"
import { useNavigate } from "react-router-dom";

function ProfileUpdatePage() {

  const { updateUser, currentUser } = useContext(AuthContext)
  const [error,setError] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.target)

    const { username, email, password } = Object.fromEntries(formData)

    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`, {username,email,password})
      updateUser(res.data)
      navigate("/profile")
    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
    } finally {
      setLoading(false)
    }

  }

  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button disabled={loading}>Update</button>
          {error && <span>{error}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img src={currentUser.avatar || "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"} alt="" className="avatar" />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;