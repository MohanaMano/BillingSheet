import MaterialTable from "material-table";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tableData, setTableData] = useState([]);
  const columns = [
    { title: "ProductName", field: "productname" },
    //by default currency setting is dollar. we can change the currency using currencySetting,
    //export: false => if we dont want to save particular column we can set to false
    //
    //{ title: "ProductName", field: "productname",filterPlaceHolder="Filter by Product name",export:false },
    {
      title: "Price",
      field: "productprice",
      align: "right",
      type: "currency",
      currencySetting: { currencyCode: "INR", minimumFractionDigits: 1 },
    },
    {
      title: "Quantity",
      field: "productquantity",
      emptyValue: () => <h3>NA</h3>,
      defaultSort: "asc",
      searchable: false,
    },
    {
      title: "Total Price",
      type: "currency",
      currencySetting: { currencyCode: "INR", minimumFractionDigits: 1 },
      render: (rowData) => rowData.productprice * rowData.productquantity,
      field: "totalprice",
      editable: false,
    },
  ];
  const getbillsList = async () => {
    const result = await axios("http://localhost:8080/getbill");
    let resultData = result.data || [];
    setTableData(resultData);
  };

  useEffect(() => {
    getbillsList();
  }, []);

  const addItem = async (item, price, quantity) => {
    const result = await axios.post(
      "http://localhost:8080/insertbill?productname=" +
        item +
        "&productprice=" +
        price +
        "&productquantity=" +
        quantity
    );
    console.log(result.data);
    setTableData((prevData) => [
      ...prevData,
      {
        productname: item,
        productprice: price,
        productquantity: quantity,
      },
    ]);
  };

  const updateItem = async (id, item, price, quantity) => {
    const result = await axios.patch(
      "http://localhost:8080/updatebill?productname=" +
        item +
        "&productprice=" +
        price +
        "&productquantity=" +
        quantity +
        "&id=" +
        id
    );
    console.log(result.data);
    getbillsList();
  };

  const deleteItem = async (id) => {
    const result = await axios.delete(
      "http://localhost:8080/deletebill?id=" + id
    );
    console.log(result.data);
    getbillsList();
  };

  return (
    <div>
      <h1>Billing System</h1>
      <MaterialTable
        columns={columns}
        data={tableData}
        editable={{
          onRowAdd: (newRow) =>
            new Promise((resolve, reject) => {
              var existingItemIndex = tableData.findIndex(
                (item) => item.productname === newRow.productname
              );
              if (existingItemIndex === -1) {
                addItem(
                  newRow.productname,
                  newRow.productprice,
                  newRow.productquantity
                );
                alert(newRow.productname + " Added");
              } else {
                var existingItem = tableData[existingItemIndex];
                var productprice =
                  Number(existingItem.productprice) +
                  Number(newRow.productprice);
                var productquantity =
                  Number(existingItem.productquantity) +
                  Number(newRow.productquantity);
                updateItem(
                  existingItem._id,
                  newRow.productname,
                  productprice,
                  productquantity
                );
                alert("Item " + newRow.productname + " Updated");
              }
              // setTableData([...tableData, newRow]);

              setTimeout(() => resolve(), 500);
            }),

          onRowUpdate: (newRow, oldRow) =>
            new Promise((resolve, reject) => {
             
              updateItem(
                oldRow._id,
                newRow.productname,
                newRow.productprice,
                newRow.productquantity
              );
              setTimeout(() => resolve(), 500);
            }),

          ondeRowDelete: (selectedRow) =>
            new Promise((resolve, reject) => {
              console.log(
                "delete id = " +
                  JSON.stringify(tableData[selectedRow.tableData.id]._id)
              );
              deleteItem(tableData[selectedRow.tableData.id]._id);
              getbillsList();
              setTimeout(() => resolve(), 500);
            }),
        }}
        title="Product Information"
        //by default sorting will be automatically enable. if we click any title it will sort accordingly.
        //options={{sorting:false}}
        //By default search text is empty but we can give any searchtext. Based on that search rows will be displayed.
        //PaginationType is two types :normal and stepped . show first last page we can set false
        // options={{search:true,filtering:true,searchText:"Wheat",searchFieldAlignment:"left",searchAutoFocus:true,searchFieldVarient:"outlined",}}
        options={{
          search: false,
          paging: true,
          pageSize: 10,
          pageSizeOptions: [2, 4, 6, 8, 10, 20, 30, 40],
          paginationType: "stepped",
          exportButton: true,
          exportAllData: true,
          showFirstLastPageButtons: false,
          paginationPosition: "both",
          exportFileName: "ProductInfo",
          //If you want to move it to last column. Just simply do:
          actionsColumnIndex: -1,
          //actionsColumnIndex is having 0(left align) and -1(right align)
        }}
      />
    </div>
  );
}

export default App;
