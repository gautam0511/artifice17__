import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../global/Sidebar";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([])
  const [isSidebar, setIsSidebar] = useState(true);
  useEffect(() => {
    axios.get('https://gautam0511.pythonanywhere.com/product/').then((res) => {
      console.log(res.data)
      setData(res.data.data)
    }).catch((err) => console.log(err))
  }, [])
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    // { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "product",
      headerName: "Product",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "state",
      headerName: "State",
      flex: 1,
    },
    {
      field: "dateofdelivery",
      headerName: "Date of Delivery",
      flex: 1,
    },
    {
      field: "dateofshipping",
      headerName: "Date of Shipping",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "amountpaid",
      headerName: "Amount Paid",
      flex: 1,
    },
    {
      field: "pendingamount",
      headerName: "Pending Amount",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "shippingmode",
      headerName: "Shipping Mode",
      flex: 1,
    },
  ];

  return (
    <Box display='flex' width='100%' height='100%'>
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Box m="20px">
          <Header
            title="Orders"
            subtitle="All Orders"
          />
          <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${colors.grey[100]} !important`,
              },
            }}
          >
            <DataGrid
              rows={data}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
            />
          </Box>
        </Box>
        </main>
        </Box>
        );
};

        export default Contacts;
