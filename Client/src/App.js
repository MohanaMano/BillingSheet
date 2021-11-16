import MaterialTable from "material-table";
import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tableData, setTableData] = useState([]);
  const [totalProdPrice, setTotalProdPrice] = useState(0);
  const [enteredProduct, setEnteredProduct] = useState("");
  const [enteredPrice, setEnteredPrice] = useState();
  const [enteredQuantity, setEnteredQuantity] = useState(0);
  const [data, setData] = useState([]);
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
      emptyValue: () => <h3>null</h3>,
      defaultSort: "asc",
      searchable: false,
    },
    {
      title: "Total Price",
     type: "currency",
      currencySetting: { currencyCode: "INR", minimumFractionDigits: 1 },
      render: (rowData) => rowData.productprice * rowData.productquantity,
      field: "totalprice",
    },
  ];
  const getbillsList = async () => {
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
    setTableData(transformedResultData);
  };

  useEffect(() => {
    getbillsList();
  }, []);

  return (
    <div>
      <h1>Material UI Example</h1>
      <MaterialTable
        columns={columns}
        data={tableData}
        editable={{
          onRowAdd: (newRow) =>
            new Promise((resolve, reject) => {
              setTableData([...tableData, newRow]);
              setTimeout(() => resolve(), 500);
            }),

          onRowUpdate: (newRow, oldRow) =>
            new Promise((resolve, reject) => {
              const updatedData = [...tableData];
              updatedData[oldRow.tableData.id] = newRow;
              setTableData(updatedData);
              console.log(newRow, oldRow);
              setTimeout(() => resolve(), 500);
            }),

          onRowDelete: (selectedRow) =>
            new Promise((resolve, reject) => {
              const updatedData = [...tableData];
              updatedData.splice(selectedRow.tableData.id, 1);
              setTableData(updatedData);
              setTimeout(() => resolve(), 500);
            }),
        }}
        actions={[
          {
            icon: "save",
            tooltip: "Save User",
            onClick: (event, rowData) => {
              // Do save operation
            },
          },
        ]}
        title="Product Information"
        //by default sorting will be automatically enable. if we click any title it will sort accordingly.
        //options={{sorting:false}}
        //By default search text is empty but we can give any searchtext. Based on that search rows will be displayed.
        //PaginationType is two types :normal and stepped . show first last page we can set false
        // options={{search:true,filtering:true,searchText:"Wheat",searchFieldAlignment:"left",searchAutoFocus:true,searchFieldVarient:"outlined",}}
        options={{
          search: false,
          paging: true,
          pageSize: 2,
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
