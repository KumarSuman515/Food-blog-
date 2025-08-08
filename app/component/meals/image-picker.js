"use client";

import { useRef, useState } from 'react';
import Image from 'next/image';
import classes from './image-picker.module.css'; // You can replace or remove this if not using CSS Modules

export default function ImagePicker({ label = "Select Image", name = "image" }) {
  const imageInput = useRef(null);
  const [pickedImage, setPickedImage] = useState(null);

  const handlePickClick = () => {
    imageInput.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPickedImage(reader.result); // Set base64 URL to state
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={classes?.picker || "p-4"}>
      <label htmlFor={name} className="block mb-2 font-semibold">{label}</label>
      <div className={classes?.control || "space-y-4"}>
        <div className={classes?.preview || "border p-4 text-center"}>
          {!pickedImage && <p>No image picked yet.</p>}
          {pickedImage && (
            <Image
              src={pickedImage}
              alt="Selected image"
              width={150}
              height={150}
              className="object-cover mx-auto rounded"
            />
          )}
        </div>

        <input
          type="file"
          id={name}
          accept="image/png, image/jpg, image/jpeg"
          name={name}
          ref={imageInput}
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />

        <button
          type="button"
          onClick={handlePickClick}
          className={classes?.button || "bg-blue-500 text-white px-4 py-2 rounded"}
        >
          Pick an image
        </button>
      </div>
    </div>
  );
}
