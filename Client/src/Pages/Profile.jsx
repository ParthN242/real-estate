import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userState } from "../Redux/User/userSlice";
import { deleteUser, signOuteUser, updateUser } from "../Redux/User/userApi";
import Loading from "../Components/Loading";
import {
  getStorage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import app from "../firebase";
import { Link } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const storage = getStorage(app);
  const { currentUser, loading, error } = useSelector(userState);

  const id = currentUser._id;
  const fileRef = useRef(null);

  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [loadingFile, setLoadingFile] = useState(false);

  // On Change Function
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const prevFileName = currentUser.avatar.fileName;
    if (prevFileName != "1705822577764blank-profile-picture.jpeg") {
      const desertRef = ref(storage, prevFileName);
      deleteObject(desertRef)
        .then(() => {
          console.log("Previous file is deleted");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    dispatch(updateUser({ id, formData }));
  };

  // User SignOut
  const handleSignOut = (e) => {
    e.preventDefault();
    dispatch(signOuteUser());
  };

  // Delete User
  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteUser(id));
  };

  // File Upload
  const handleFileUpload = (file) => {
    setFileUploadError(false);
    setLoadingFile(true);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    const prevFileName = formData?.avatar?.fileName;

    if (prevFileName) {
      const desertRef = ref(storage, prevFileName);
      deleteObject(desertRef)
        .then(() => {
          console.log("Previous file is deleted");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        console.log("error: ", error);
        setFileUploadError(true);
        setLoadingFile(false);
      },
      () => {
        {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setFormData({
              ...formData,
              avatar: { url: downloadUrl, fileName },
            });
            setLoadingFile(false);
          });
        }
      }
    );
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  return loading ? (
    <Loading />
  ) : (
    <main className="max-w-lg mx-auto my-6 p-3">
      <h1 className="text-3xl font-semibold text-center mb-4">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <input
            type="file"
            name="avatar"
            onChange={(e) => setFile(e.target.files[0])}
            accept="image/*"
            ref={fileRef}
            hidden
          />
          <img
            onClick={() => fileRef.current.click()}
            className="w-28 h-28 rounded-full mx-auto my-4 cursor-pointer object-cover"
            src={formData?.avatar?.url || currentUser.avatar.url}
            alt="avatar"
          />
          {!fileUploadError && filePerc > 0 && filePerc < 100 && (
            <p className="text-center text-green-700">Uploading {filePerc}%</p>
          )}
          {!fileUploadError && filePerc >= 100 && (
            <p className="text-center text-green-700">Upload Successfully</p>
          )}
          {fileUploadError && (
            <p className="text-center text-red-700">
              Image size must be less than 2mb
            </p>
          )}
        </div>
        <input
          type="text"
          name="name"
          defaultValue={currentUser.name}
          placeholder="username"
          className="border-slate-200 border-[1px] p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          defaultValue={currentUser.email}
          placeholder="email"
          className="border-slate-200 border-[1px] p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="border-slate-200 border-[1px] p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="p-3 bg-slate-700 text-white uppercase text-center rounded-lg disabled:opacity-70"
          disabled={loading || loadingFile}
        >
          {loading || loadingFile ? "UPDATEING..." : "UPDATE"}
        </button>
        <Link
          to="/create-listing"
          type="button"
          className="p-3 bg-green-700 text-white uppercase rounded-lg text-center"
        >
          Create Listing
        </Link>
      </form>
      <div className="my-4 flex justify-between text-red-700">
        <button onClick={handleDelete}>Delete Acoount</button>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
      <p className="text-center">
        <Link
          className="text-green-700 text-center text-lg"
          to={"/user-listings"}
        >
          Your Listing
        </Link>
      </p>
      {error && <p className="text-red-700">{error}</p>}
    </main>
  );
};

export default Profile;
