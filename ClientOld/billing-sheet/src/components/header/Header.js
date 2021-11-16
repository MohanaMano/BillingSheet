import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Header.css";

function Header() {
  const [enteredProduct, setEnteredProduct] = useState("");
  const [enteredPrice, setEnteredPrice] = useState();
  const [enteredQuantity, setEnteredQuantity] = useState(0);
  const [data, setData] = useState([]);

  const productChangeHandler = (event) => {
    setEnteredProduct(event.target.value);
    console.log(event.target.value);
  };

  const priceChangeHandler = (event) => {
    setEnteredPrice(event.target.value);
    console.log(event.target.value);
  };
  const quantityChangeHandler = (event) => {
    setEnteredQuantity(event.target.value);
    console.log(event.target.value);
  };

  function handleSubmit() {
    if (
      enteredProduct != null &&
      enteredPrice != null &&
      enteredQuantity != null
    ) {
      (async () => {
        const result = await axios.post("http://localhost:8080/insertbill?productname="+enteredProduct+"&productprice="+enteredPrice+"&productquantity="+enteredQuantity);
                console.log(result.data);
      })();
      console.log("You clicked submit.");
    }
  }
  return (
  
    <div className="head">
      <label className="label">Product</label>
      <input
        className="input"
        type="text"
        id="product"
        value={enteredProduct}
        onChange={productChangeHandler}
      />
      <label className="label">Price</label>
      <input
        className="input"
        type="text"
        id="price"
        value={enteredPrice}
        onChange={priceChangeHandler}
      />
      <label className="label">Quantity</label>
      <input
        className="input"
        type="text"
        id="quantity"
        value={enteredQuantity}
        onChange={quantityChangeHandler}
      />
      <button className="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
}

export default Header;
