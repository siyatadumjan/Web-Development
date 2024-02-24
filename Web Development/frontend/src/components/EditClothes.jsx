import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import "../css/createclothes.scss";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import img from "../assets/logo.png";
import { MdFileUpload } from "react-icons/md";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase/firebase.js";

const EditClothes = ({
  isOpen,
  onRequestClose,
  singleClothes,
  loading,
  updateClothes,
}) => {
  useEffect(() => {
    // Populate form fields with data from singleClothes
    if (!loading) {
      setValue("clothesName", singleClothes?.name || "");
      setValue("price", singleClothes?.price || "");
      setValue(
        "category",
        { value: singleClothes?.category, label: singleClothes?.category } || {}
      );
      setValue(
        "type",
        { value: singleClothes?.type, label: singleClothes?.type } || {}
      );
      setValue(
        "size",
        singleClothes?.size.map((size) => ({ value: size, label: size })) || []
      );
      setValue(
        "color",
        singleClothes?.color.map((color) => ({ value: color, label: color })) ||
          []
      );
      setValue("description", singleClothes?.description || "");
      setUrl(singleClothes?.imagePath || ""); // Assuming imagePath is the URL of the image
      setSelectedImage(singleClothes?.imagePath || "");
      setNewChecked(singleClothes?.isNew || false);
      setInStockChecked(singleClothes?.inStock || false);
      setBestSellingChecked(singleClothes?.bestSelling || false);
    }
  }, [singleClothes]);

  // const {data} = getSingleClothes
  // console.log(data)

  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(null);
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [newChecked, setNewChecked] = useState(false);
  const [inStockChecked, setInStockChecked] = useState(false);
  const [bestSellingChecked, setBestSellingChecked] = useState(false);

  const imageInputRef = useRef(null);

  const handleImageClick = () => {
    imageInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setSelectedImage(imageUrl);
        console.log(url);
        setImage(file); // Set the 'image' state to the selected file
        setIsImageSelected(true);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = async (e) => {
    e.preventDefault();
    const file = image;

    setError("");

    const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
    const randomString = Math.random().toString(36).substring(2, 8);
    const fileName = `${timestamp}_${randomString}_${file.name}`;

    const storage = getStorage(app);
    const REF = ref(storage, `upload/${fileName}`);
    const uploadTask = uploadBytesResumable(REF, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (err) => {
        setError(err);
      },
      () =>
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          // Assuming you have a Submit function defined elsewhere
          // Modify this part according to your logic
          //calls the submit to database
          setUrl(url);
          setTimeout(() => {
            setProgress(null);
          }, 3000);
        })
    );
  };

  const categoryOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Unisex", label: "Unisex" },
    { value: "Other", label: "Other" },
  ];

  const typeOptions = [
    { value: "T-Shirt", label: "T-Shirt" },
    { value: "Shorts", label: "Shorts" },
    { value: "Pants & Joggers", label: "Pants & Joggers" },
    { value: "Sweatpants", label: "Sweatpants" },
    { value: "Outer", label: "Outer" },
    { value: "Polos", label: "Polos" },
    { value: "Sweatshit & Layers", label: "Sweatshit & Layers" },
  ];

  const sizeOptions = [
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
    { value: "XXL", label: "XXL" },
  ];

  const colorOptions = [
    { value: "Red", label: "Red" },
    { value: "Blue", label: "Blue" },
    { value: "Black", label: "Black" },
    { value: "White", label: "White" },
    { value: "Orchard Plaid", label: "Orchard Plaid" },
    { value: "Infinity Blue", label: "Infinity Blue" },
    { value: "Pacific Blue", label: "Pacific Blue" },
    { value: "Gray", label: "Gray" },
    { value: "Slate", label: "Slate" },
    { value: "Dove", label: "Dove" },
    { value: "Dark Pine", label: "Dark Pine" },
    { value: "Stone", label: "Stone" },
    { value: "Green", label: "Green" },
    { value: "Cabernet", label: "Cabernet" },
    { value: "Polar", label: "Polar" },
    { value: "Greystone", label: "Greystone" },
    { value: "Umber", label: "Umber" },
    { value: "Ivory", label: "Ivory" },
    { value: "Heather Moss", label: "Heather Moss" },
    { value: "Heather Gray", label: "Heather Gray" },
    { value: "Graphite", label: "Graphite" },
    { value: "Clay", label: "Clay" },
    { value: "Sage", label: "Sage" },
  ];

  const {
    handleSubmit,
    control,
    setValue,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Implement your submit logic here

    if (url === "" || url === null) {
      setError("Image is required");
    } else {
      const Data = {
        name: data.clothesName.toLowerCase(),
        price: parseFloat(data.price), // Use parseFloat for the price
        category: data.category.value,
        type: data.type.value,
        size: data.size.map((item) => item.value),
        color: data.color.map((item) => item.value),
        imagePath: url,
        description: data.description.trim(),
      };

      await updateClothes(singleClothes.id, Data);

      toast.success("clothes updated successfully", {
        position: "top-right",
        style: {
          height: "25px", // Adjust this value to your desired height
          fontSize: "13px",
          margin: 0,
        },
      });
      setValue("clothesName", "");
      setValue("price", "");
      setValue("category", []);
      setValue("type", []);
      setValue("size", []);
      setValue("color", []);
      setValue("description", "");
      setSelectedImage(null);
      setIsImageSelected(false);
      setUrl(""); // Reset the URL state
      setProgress(null);
    }
  };

  const style1 = {
    control: (base, state) => ({
      ...base,
      border: ".5px solid black  !important",
      boxShadow: "0 !important",
      borderRadius: "4px",
      fontFamily: "sans-serif",
      fontSize: "12px",
      fontWeight: "bold",
      color: "black",
      "&:hover": {
        border: ".5px solid black !important",
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: "white",
      color: "black",
      fontFamily: "sans-serif",
      fontSize: "12px",
      fontWeight: "bold",
      ":hover": {
        backgroundColor: "#c0c0c0",
      },
    }),
  };
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Create Clothes Modal"
      className="custom-modal overflow-y-auto px-12"
      overlayClassName="custom-overlay"
      appElement={document.getElementById("root")}
    >
      <form className="w-full " onSubmit={handleSubmit(onSubmit)}>
        <h3 className="w-full text-center font-bold">Add Clothes</h3>
        <div className="flex flex-col  gap-2">
          <div className="flex flex-col lg:flex-row md:flex-row items-center justify-center gap-5 w-full">
            <Controller
              name="clothesName"
              control={control}
              defaultValue=""
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <div className="flex flex-col w-full gap-1">
                  <label
                    htmlFor="clothes-name"
                    className="text-xs font-semibold"
                  >
                    Name
                  </label>
                  <input
                    {...field}
                    type="text"
                    id="clothes-name"
                    autoComplete="off"
                    className="border border-black rounded-sm outline-none px-2"
                  />
                  {errors.clothesName && (
                    <p className="text-red-500 text-xs">
                      {errors.clothesName.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="price"
              control={control}
              defaultValue=""
              rules={{ required: "Price is required" }}
              render={({ field }) => (
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="price" className="text-xs font-semibold">
                    Price
                  </label>
                  <input
                    {...field}
                    type="number"
                    id="price"
                    className="border border-black rounded-sm outline-none px-2"
                  />
                  {errors.price && (
                    <p className="text-xs text-red-500">
                      {errors.price.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <div className="flex flex-col lg:flex-row md:flex-row sm:flex-col justify-evenly items-start w-full gap-5 h-full ">
            <div className="w-full h-full ">
              <div className="flex flex-col gap-1">
                <label htmlFor="imgs" className="text-xs font-semibold">
                  Images*
                  {progress ? (
                    <span className="text-red-600 text-xs font-semibold">
                      {progress !== 100
                        ? ` uploading... ${progress.toFixed(2)}%`
                        : " image uploaded"}
                    </span>
                  ) : null}
                  {error && (
                    <span className="text-red-600 text-xs font-semibold">
                      {" "}
                      {error}
                    </span>
                  )}
                </label>

                <div
                  className="min-h-[280px] px-2 py-2 flex items-center justify-center border border-black rounded-sm "
                  onClick={handleImageClick}
                >
                  <img
                    src={selectedImage || img}
                    alt="Preview"
                    className="max-h-[270px]"
                  />
                  <input
                    type="file"
                    ref={imageInputRef}
                    hidden
                    onChange={handleImageChange}
                    accept="image/*"
                    id="imgs"
                  />
                </div>
                {isImageSelected && (
                  <button
                    type="button"
                    onClick={handleUploadClick}
                    className="bg-black text-white mt-1 rounded-[2px] font-sans text-md font-semibold
              p-[3px] flex justify-center items-center gap-3 w-full"
                  >
                    <MdFileUpload />
                    <span>upload</span>
                  </button>
                )}
              </div>
            </div>

            <div className="w-full">
              <div className="w-full flex flex-col gap-1 justify-evenly h-full min-h-[280px]">
                <label className="text-xs font-semibold">Category*</label>
                <Controller
                  name="category"
                  control={control}
                  defaultValue={[]}
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="select category"
                      options={categoryOptions}
                      styles={style1}
                    />
                  )}
                />
                {errors.category && (
                  <p className="text-xs text-red-500">
                    {errors.category.message}
                  </p>
                )}

                <div className="select">
                  <label className="text-xs font-semibold">Type*</label>
                  <Controller
                    name="type"
                    control={control}
                    defaultValue={[]}
                    rules={{ required: "Type is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder="select types"
                        options={typeOptions}
                        styles={style1}
                      />
                    )}
                  />
                  {errors.type && (
                    <p className="text-xs text-red-500">
                      {errors.type.message}
                    </p>
                  )}
                </div>
                <div className="select">
                  <label className="text-xs font-semibold">Size*</label>
                  <Controller
                    name="size"
                    control={control}
                    defaultValue={[]}
                    rules={{ required: "Size is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder="select size"
                        isMulti
                        options={sizeOptions}
                        styles={style1}
                      />
                    )}
                  />
                  {errors.size && (
                    <p className="text-xs text-red-500">
                      {errors.size.message}
                    </p>
                  )}
                </div>
                <div className="select">
                  <label className="text-xs font-semibold">Color*</label>
                  <Controller
                    name="color"
                    control={control}
                    defaultValue={[]}
                    rules={{ required: "Color is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        placeholder="select color"
                        isMulti
                        options={colorOptions}
                        styles={style1}
                      />
                    )}
                  />
                  {errors.color && (
                    <p className="text-xs text-red-500">
                      {errors.color.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <Controller
                name="description"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <div className="flex flex-col">
                    <label htmlFor="description">Description*</label>
                    <textarea
                      {...field}
                      name="description"
                      id="description"
                      className="min-h-[90px] border border-black rounded-sm"
                    />
                    {errors.description && <p>{errors.description.message}</p>}
                  </div>
                )}
              />
            </div>
            <div className="inline-flex flex-wrap text-sm font-semibold w-full items-center justify-start gap-5">
              <div className="">
                <label className="inline-flex gap-2 text-xs font-bold items-center justify-between">
                  <input
                    type="checkbox"
                    checked={newChecked}
                    onChange={() => setNewChecked(!newChecked)}
                    className=""
                  />
                  New
                </label>
              </div>
              <div className="">
                <label className="inline-flex gap-2 text-xs font-bold items-center justify-between">
                  <input
                    type="checkbox"
                    checked={inStockChecked}
                    onChange={() => setInStockChecked(!inStockChecked)}
                    className=""
                  />
                  In Stock
                </label>
              </div>
              <div className="">
                <label className="inline-flex gap-2 text-xs font-bold items-center justify-between">
                  <input
                    type="checkbox"
                    checked={bestSellingChecked}
                    onChange={() => setBestSellingChecked(!bestSellingChecked)}
                    className=""
                  />
                  Best Selling
                </label>
              </div>
            </div>
            <div className="w-full flex items-center justify-center">
              <button
                type="submit"
                className="w-1/2 bg-black text-white rounded-sm text-sm font-bold py-1"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default EditClothes;
