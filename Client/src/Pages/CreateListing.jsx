import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useState } from "react";
import app from "../firebase";
import { createListing } from "../Redux/Listing/listingApi";
import { useSelector } from "react-redux";
import { userState } from "../Redux/User/userSlice";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector(userState);
  const storage = getStorage(app);
  const [formData, setFormData] = useState({
    imageUrls: [],
    title: "",
    description: "",
    address: "",
    type: "sale",
    parking: false,
    furnished: false,
    offer: false,
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
  });
  const [error, setError] = useState(null);
  const [file, setFile] = useState([]);
  const [uploading, setUploading] = useState(false);

  // Handle Remove Image
  const handleRemoveImage = (fileName, index) => {
    setUploading(true);
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });

    const desertRef = ref(storage, fileName);
    deleteObject(desertRef)
      .then(() => {
        console.log("Image is deleted");
        setUploading(false);
      })
      .catch((error) => {
        console.log(error);
        setUploading(false);
      });
  };

  //   Store Image
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve({ fileName: fileName, url: downloadURL });
          });
        }
      );
    });
  };

  //   Handle Image Submit
  const handleImageSubmit = () => {
    setUploading(true);

    if (file.length <= 0) {
      setError("Please Select Images");
      setUploading(false);
      return;
    }

    if (file.length + formData.imageUrls.length > 7) {
      setError("You can upload 6 images per listing");
      setUploading(false);
      return;
    }
    const promises = [];

    for (let i = 0; i < file.length; i++) {
      promises.push(storeImage(file[i]));
    }

    Promise.all(promises)
      .then((urls) => {
        setFormData({
          ...formData,
          imageUrls: formData.imageUrls.concat(urls),
        });

        setUploading(false);
      })
      .catch((error) => {
        setError("Image upload failed (3 mb max per image)");
        setUploading(false);
      });
  };
  //   Handle Change
  const handleChange = (e) => {
    setError(null);
    if (
      e.target.name == "title" ||
      e.target.name == "description" ||
      e.target.name == "address"
    ) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    if (e.target.id == "sale" || e.target.id == "rent") {
      setFormData({ ...formData, type: e.target.id });
    }

    if (
      e.target.name == "parking" ||
      e.target.name == "offer" ||
      e.target.name == "furnished"
    ) {
      setFormData({ ...formData, [e.target.name]: e.target.checked });
    }

    if (
      e.target.name == "bedrooms" ||
      e.target.name == "bathrooms" ||
      e.target.name == "regularPrice" ||
      e.target.name == "discountPrice"
    ) {
      setFormData({ ...formData, [e.target.name]: +e.target.value });
    }
  };
  //   Sumbmit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    if (formData.discountPrice > formData.regularPrice) {
      setError("Discount price must be lower than regular price");
      setUploading(false);
      return;
    }

    if (formData.imageUrls.length <= 0) {
      setError("You must upload at least 1 image ");
      setUploading(false);
      return;
    }

    console.log(formData);

    const data = createListing(formData);

    if (data.success === "false") {
      setError(data.messgae);
      setUploading(false);
      return;
    }

    setUploading(false);
    setError(null);
    navigate("/successful-listing");
  };
  return (
    <main className="max-w-4xl mx-auto m-10">
      <h1 className="text-3xl text-center font-semibold mb-5">
        Create Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex gap-4">
        {/* Form */}
        <div className="flex flex-col gap-6 flex-1 max-w-[50%]">
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="p-3 rounded-lg w-full border-slate-200 border-[1px]"
            onChange={handleChange}
            value={formData.title}
          />
          <textarea
            name="description"
            placeholder="Description"
            className="p-3 rounded-lg w-full border-slate-200 border-[1px]"
            onChange={handleChange}
            value={formData.description}
          ></textarea>
          <input
            type="text"
            placeholder="Address"
            name="address"
            className="p-3 rounded-lg w-full border-slate-200 border-[1px]"
            onChange={handleChange}
            value={formData.address}
          />
          {/* Check Box */}
          <div className="flex flex-wrap gap-4">
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                name="sale"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "sale"}
              />
              <label htmlFor="sale">Sale</label>
            </div>
            <div className="flex gap-2 ">
              <input
                type="checkbox"
                name="rent"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={formData.type === "rent"}
              />
              <label htmlFor="rent">Rent</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="parking"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={formData.parking}
              />
              <label htmlFor="parking">Parking Spot</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="furnished"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={formData.furnished}
              />
              <label htmlFor="furnished">Furnished</label>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                name="offer"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={formData.offer}
              />
              <label htmlFor="offer">Offer</label>
            </div>
          </div>
          {/*  */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="bedrooms"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <label htmlFor="bedrooms">Beds</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="bathrooms"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <label htmlFor="bathrooms">Baths</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="regularPrice"
                id="regularPrice"
                min="50"
                max="10000000"
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <label htmlFor="regularPrice">Regular Price</label>
                {formData.type === "rent" && (
                  <span className="text-xs">($ / month)</span>
                )}
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  name="discountPrice"
                  id="discountPrice"
                  min="0"
                  max="10000000"
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <div className="flex flex-col items-center">
                  <label htmlFor="discountPrice">Discounted Price</label>
                  {formData.type === "rent" && (
                    <span className="text-xs">($ / month)</span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Image */}
        <div className="flex flex-col gap-4 flex-1">
          <p className="">
            <span className="font-semibold">Images:</span> The first image will
            be the cover (max 6)
          </p>
          <div className="flex gap-4">
            <div className="border border-slate-300 p-3 w-full rounded-sm">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setFile(e.target.files)}
              />
            </div>
            <button
              type="button"
              onClick={handleImageSubmit}
              className="uppercase border border-green-600 text-green-600 bg-white p-3 rounded-sm hover:text-white hover:bg-green-600 transition-all duration-300"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          {/* Image Preview */}
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 border bg-white"
              >
                <img
                  src={item.url}
                  alt="image"
                  className="w-20 h-16 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(item.fileName, index)}
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75"
                >
                  Delete
                </button>
              </div>
            ))}
          <button
            className="bg-slate-700 text-white rounded-lg p-3 uppercase mt-4 hover:opacity-90 disabled:opacity-85"
            type="submit"
            disabled={uploading}
          >
            Create Listing
          </button>
          {error && <p className="text-red-700">{error}</p>}
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
