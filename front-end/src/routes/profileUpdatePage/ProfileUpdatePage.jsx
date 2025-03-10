import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest"
import { useNavigate } from "react-router-dom";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { Cloudinary } from '@cloudinary/url-gen';

function ProfileUpdatePage() {

  const { updateUser, currentUser } = useContext(AuthContext)
  const [error, setError] = useState("")
  const [avatar, setAvatar] = useState([])
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const [publicId, setPublicId] = useState('');

  const cloudName = 'drvnkln2g';
  const uploadPreset = 'realestate';

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'drvnkln2g',
    },
  });

  const uwConfig = {
    cloudName: cloudName,
    uploadPreset: uploadPreset,
    multipleFiles: 'false',
    folder: 'posts'
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.target)

    const { username, email, password } = Object.fromEntries(formData)

    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`, { username, email, password, avatar: avatar[0] })
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
        <img src={avatar[0] || currentUser.avatar || "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"} alt="" className="avatar" />
        <UploadWidget
          uwConfig={uwConfig}
          setState={setAvatar}
          setPublicId={setPublicId}
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;