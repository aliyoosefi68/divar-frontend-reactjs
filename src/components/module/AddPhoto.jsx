import React, { useState } from "react";

function AddPhoto() {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // محدود کردن تعداد تصاویر انتخاب شده به 5 تصویر
    const selectedFiles = files.slice(0, 5 - selectedImages.length);

    // تبدیل تصاویر انتخاب شده به آرایه از URL های تصاویر
    const imageUrls = selectedFiles.map((file) => URL.createObjectURL(file));

    // اضافه کردن تصاویر انتخاب شده به لیست تصاویر
    setSelectedImages((prevImages) => [...prevImages, ...imageUrls]);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />
      <div>
        {selectedImages.map((imageUrl, index) => (
          <img
            key={index}
            src={imageUrl}
            alt={`Image ${index + 1}`}
            style={{ maxWidth: "200px", maxHeight: "200px", margin: "5px" }}
          />
        ))}
      </div>
    </div>
  );
}

export default AddPhoto;
