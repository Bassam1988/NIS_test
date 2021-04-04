import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import axios from "axios";
import { addProduct } from "../../redux/actions/productsActions";

function AddProductForm() {
  const dispatch = useDispatch();
  //const products= useSelector((state) => state.products.products);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("0.00");
  const [oldPrice, setOldPrice] = useState("0.00");
  const [description, setDescription] = useState("");
  const [mainCategory, setMainCategory] = useState();
  const [subCategories, setSubCategories] = useState([]);
  const [productAddress, setProductAddress] = useState([]);
  const [addresses, setAdresses] = useState([]);
  const [img, setImage] = useState();

  const handleChange = (e) => {
    let compName = e.target.name;
    let value = Array.from(e.target.selectedOptions, (option) => option.value)
    /*value = [
      ...value,
      Array.from(e.target.selectedOptions, (option) => option.value),
    ];*/
    //(e.target.selectedOptions, (option) => value.push(option.value))
  
    //console.log(Array.from(e.target.selectedOptions, (option) => option.value))
    if (compName == "categories") {
      setSubCategories(value);
     
    } else if (compName == "addresses") {
      setProductAddress(value);
     
    }
  };

  const categories = useSelector((state) => state.products.subCategories);

  const token = useSelector((state) => state.auth.token);

  function getAddress() {
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // If token, add to headers config
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    axios
      .get("/shop/address/", config)
      .then((response) => {
        return response;
      })
      .then((json) => {
        if (json.data) {
          let addressesVar = json.data;
          console.log(addressesVar);
          setAdresses(addressesVar);
        } else {
          alert(`Our System Failed To Logout from Your Account!`);
        }
      });
  }

  useEffect(() => {
    getAddress();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    const uploadData = new FormData();
    uploadData.append("img", img, img.name);
    uploadData.append("seller", 1);
    uploadData.append("m_category", mainCategory);
    uploadData.append("name", name);
    uploadData.append("price", price);
    uploadData.append("old_price", oldPrice);
    uploadData.append("description", description);
    subCategories.forEach(item => {
      uploadData.append("s_categories", item);
     });
     productAddress.forEach(item => {
      uploadData.append("addresses", item);
     });
    

    dispatch(addProduct(uploadData));
  };

  return (
    <div className="card card-body mt-4 mb-4 container">
      <h2>Add Product</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            className="form-control"
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="form-group">
          <label>Main Categories</label>
          <div
            className="radio"
            onChange={(e) => setMainCategory([e.target.value])}
          >
            <input type="radio" value="1" name="expType" /> Service <br />
            <input type="radio" value="2" name="expType" /> Goods
          </div>
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            className="form-control"
            type="text"
            name="price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>
        <div className="form-group">
          <label>Old Price</label>
          <input
            className="form-control"
            type="text"
            name="oldPrice"
            onChange={(e) => setOldPrice(e.target.value)}
            value={oldPrice}
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            type="text"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div className="form-group">
          <label>Image</label>
          <input
            type="file"
            onChange={(evt) => setImage(evt.target.files[0])}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect2">Sub Categories</label>
          <select
            multiple
            name="categories"
            className="form-control"
            id="exampleFormControlSelect2"
            onChange={handleChange}
          >
            {categories.length != 0 ? (
              categories.map((subCategory) => (
                <option key={subCategory.id} value={subCategory.id}>
                  {subCategory.name}
                </option>
              ))
            ) : (
              <option>No categories</option>
            )}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="exampleFormControlSelect2">Addresses</label>
          <select
            multiple
            name="addresses"
            className="form-control"
            id="exampleFormControlSelect2"
            onChange={handleChange}
          >
            {addresses.length != 0 ? (
              addresses.map((address) => (
                <option key={address.id} value={address.id}>
                  {address.country} - {address.state} - {address.city} -{" "}
                  {address.region}
                </option>
              ))
            ) : (
              <option>No addresses</option>
            )}
          </select>
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProductForm;
