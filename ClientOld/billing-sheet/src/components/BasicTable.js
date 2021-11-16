import React, { useState, useEffect } from "react";
import axios from "axios";
import "./header/Header.css";
import "./header/Footer.css";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";

const BasicTable = () => {
  const [enteredProduct, setEnteredProduct] = useState("");
  const [enteredPrice, setEnteredPrice] = useState();
  const [enteredQuantity, setEnteredQuantity] = useState(0);
  const [data, setData] = useState([]);
  const [totalProdPrice, setTotalProdPrice] = useState(0);
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
        const result = await axios.post(
          "http://localhost:8080/insertbill?productname=" +
            enteredProduct +
            "&productprice=" +
            enteredPrice +
            "&productquantity=" +
            enteredQuantity
        );
        console.log(result.data);
        setData((prevData) => [
          ...prevData,
          {
            productname: enteredProduct,
            productprice: enteredPrice,
            productquantity: enteredQuantity,
            totalPrice: enteredPrice * enteredQuantity,
          },
        ]);
      })();
      console.log("You clicked submit.");
    }
  }
  useEffect(() => {
    (async () => {
      const result = await axios("http://localhost:8080/getbill");
      let resultData = result.data || [];
      let transformedResultData = resultData.map((item) => {
        return {
          ...item,
          totalPrice: item.productprice * item.productquantity,
        };
      });
      let tempTotalProductPrice = transformedResultData.reduce((acc, item) => {
        return acc + item.totalPrice;
      }, 0);
      setTotalProdPrice(tempTotalProductPrice);
      setData(transformedResultData);
    })();
  }, []);

  const columns = [
    {
      Header: "Name",
      accessor: "productname",
    },
    {
      Header: "Price",
      accessor: "productprice",
    },
    {
      Header: "Quantity",
      accessor: "productquantity",
    },
    {
      Header: "Total Product Price",
      accessor: "totalPrice",
    },
  ];

  return (
    <div>
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
      <div className="head">
        <ReactTable
          data={data}
          columns={columns}
          defaultPageSize={5}
          pageSizeOptions={[2, 4, 10]}
        />
      </div>
      <div className="head">
        <div className="span-brown">
          <label className="span-brown">Total</label>{totalProdPrice}
        </div>
        <div className="span-brown">
          <label className="span-brown">Total (Including Discount)</label>{totalProdPrice * 0.75}
        </div>
        <div>
          <button className="submit-foot-clear">clear</button>
          <button className="submit-foot">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default BasicTable;
