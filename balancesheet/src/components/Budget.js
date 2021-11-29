import './Budget.css';
import { FormControl, Box, FormLabel, Button, TextField, Grid } from '@mui/material';
import MaterialTable from "material-table";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from 'material-ui-image'


const greenLayout = {
  bgcolor: 'background.paper',
  m: 10,
  borderColor: 'primary.main',
  width: '50rem',
  height: '12rem',
  border: '2px solid green'
};
const redLayout = {
  // bgcolor: 'background.paper',
  m: 10,

  borderColor: 'red',
  width: '50rem',
  height: '20rem',
  border: '2px solid red'
};


function Budget() {
  const [tableData, setTableData] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  const [txtBudget, setTxtBudget] = useState(0);

  const [txtProduct, setTxtProduct] = useState("");
  const [txtPrice, setTxtPrice] = useState(0);

  const columns = [
    {
      title: "ProductName", field: "productname",
      editable: false
    },
    {
      title: "Price",
      field: "productprice",
      align: "right",
      type: "currency",
      currencySetting: { currencyCode: "INR", minimumFractionDigits: 1 },
    }
  ];

  const addBudget = async (budget) => {
    const result = await axios.post(
      "http://localhost:8080/addbudget?budget=" +
      budget
    );
    console.log(result.data);
    setUpdateUI(!updateUI);
    //TODO: total and update budget
  };

  const addExpense = async (productname, productprice) => {
    const result = await axios.post(
      "http://localhost:8080/addexpense?productname=" +
      productname + "&productprice=" + productprice
    );
    console.log(result.data);
    setUpdateUI(!updateUI);
    //TODO: total and update budget
  };

  const getBudget = async () => {
    const result = await axios("http://localhost:8080/getbudget");
    let resultData = result.data || [];

    var sumOfBudget = 0;
    for (var budgetVal of resultData) {
      sumOfBudget += Number(budgetVal.budget);
    }
    setTotalBudget(sumOfBudget);

    const ExpenseResult = await axios("http://localhost:8080/getexpense");
    let ExpenseResultData = ExpenseResult.data || [];
    setTableData(ExpenseResultData);
    var sumOfExpense = 0;
    for (var expenseVal of ExpenseResultData) {
      sumOfExpense += Number(expenseVal.productprice);
    }
    setTotalExpense(sumOfExpense);

    setTotalBalance(sumOfBudget - sumOfExpense);

  };
  const updateItem = async (id, item, price) => {
    console.log(id + " hello " + item + "  " + price);
    const result = await axios.patch(
      "http://localhost:8080/updateexpense?productname=" +
      item +
      "&productprice=" +
      price +
      "&id=" +
      id
    );
    console.log(result.data);
    setUpdateUI(!updateUI);
  };


  const deleteItem = async (id) => {
    const result = await axios.delete(
      "http://localhost:8080/deleteexpense?id=" + id
    );
    console.log(result.data);
    setUpdateUI(!updateUI);
  };


  useEffect(() => {
    getBudget();
  }, [updateUI]);

  useEffect(() => {
    getBudget();
  }, []);

  const handleTextFieldChange = function (e) {
    setTxtBudget(Number(e.target.value));
  }

  const handleTextFieldChangeProduct = function (e) {
    setTxtProduct(e.target.value);
  }

  const handleTextFieldChangePrice = function (e) {
    setTxtPrice(Number(e.target.value));
  }

  return (<div>


    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Box sx={{ ...greenLayout }} >
          <FormControl style={{ width: '90%', padding: '10px' }}>
            <FormLabel component="legend" style={{ padding: '10px' }}>Please Enter Your Budget</FormLabel>
            <TextField style={{ margin: '10px' }}
              id="outlined-required"
              type="number"
              value={txtBudget}
              InputLabelProps={{
                shrink: true,
              }}

              onChange={handleTextFieldChange}
            />
            <Button variant="contained" style={{ width: '40%', margin: '10px' }}
              onClick={() => {
                if (txtBudget > 0) {
                  addBudget(txtBudget);
                 setTxtBudget(0);
                }
                else
                  alert("Add Positive Value");
              }}
            >Calculate</Button>
          </FormControl>
        </Box></Grid>
      <Grid item xs={5}>
        <Box sx={{ ...greenLayout }} >
          <FormControl style={{ width: '90%', padding: '10px' }}>
            {/* <Image
  src="C:\Users\Thangabalaji\Documents\Project\Scenai\Assignment-4\budget.png"
/> */}
            <FormLabel component="legend" style={{ padding: '10px' }}>Budget : {totalBudget}</FormLabel>
            <FormLabel component="legend" style={{ padding: '10px', colour: 'red' }}>Expense : {totalExpense}</FormLabel>
            <FormLabel component="legend" style={{ padding: '10px', colour: 'red' }}>Balance : {totalBalance}</FormLabel>

          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={6}>
        <Box sx={{ ...redLayout }} >
          <FormControl style={{ width: '90%', padding: '10px' }}>
            <FormLabel component="legend" style={{ padding: '10px' }}>Please Enter Your Expense</FormLabel>
            <TextField style={{ margin: '10px' }}
              id="outlined-required"
              type="text"
              value={txtProduct}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleTextFieldChangeProduct} />
            <FormLabel component="legend" style={{ padding: '10px', colour: 'red' }}>Please Enter Expense Amount</FormLabel>
            <TextField style={{ margin: '10px' }}
              id="outlined-required"
              type="number"
              value={txtPrice}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleTextFieldChangePrice} />
            <Button variant="contained" style={{ width: '40%', margin: '10px' }}
              onClick={() => {
                if (txtProduct.trim().length <= 0) {
                  alert("Enter valid product name");
                }
                else if (txtPrice < 0) {
                  alert("Enter valid amount");
                }
                else if (totalBudget >= (txtPrice + totalExpense)) {
                  var existingData=tableData.find(e=>e.productname.toLowerCase()===txtProduct.toLowerCase());
                 
                  if(existingData===undefined)
                  {       
                               addExpense(txtProduct, txtPrice);
                               setTxtProduct("");
                               setTxtPrice(0);
                  }
                  else
                  {
                    alert("Item already Exist");
                  }
                }
                else
                  alert(" Please enter amount less than or equal to ( " + totalBalance + " ) balance amount | Add budget amount to spent");
              }

              }
            >Add Expense</Button>
          </FormControl>

        </Box>
      </Grid>
      <Grid item xs={5}>
        <Box sx={{ ...redLayout, height: '30rem' }} >
          <MaterialTable
            columns={columns}
            data={tableData}
            editable={{
              onRowUpdate: (newRow, oldRow) =>
                new Promise((resolve, reject) => {
                  console.log("Update New date = " + JSON.stringify(newRow));
                  console.log("Update old date = " + JSON.stringify(oldRow));

                  if (totalBudget >= (newRow.productprice + totalExpense - oldRow.productprice)) {
                    updateItem(oldRow._id, newRow.productname, newRow.productprice);
                  }
                  else {
                    alert("Please enter less amount");
                  }
                  setTimeout(() => resolve(), 500);
                }),

              onRowDelete: (selectedRow) =>
                new Promise((resolve, reject) => {
                  console.log("delete id = " + JSON.stringify(tableData[selectedRow.tableData.id]._id));
                  deleteItem(tableData[selectedRow.tableData.id]._id);
                  setTimeout(() => resolve(), 500);
                }),
            }}

            title="Expense Information"
            //by default sorting will be automatically enable. if we click any title it will sort accordingly.
            //options={{sorting:false}}
            //By default search text is empty but we can give any searchtext. Based on that search rows will be displayed.
            //PaginationType is two types :normal and stepped . show first last page we can set false
            // options={{search:true,filtering:true,searchText:"Wheat",searchFieldAlignment:"left",searchAutoFocus:true,searchFieldVarient:"outlined",}}
            options={{
              search: false,
              paging: true,
              pageSize: 4,
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
        </Box>
      </Grid>
    </Grid>

  </div>);
}

export default Budget;
