import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Topbar from "../global/Topbar";
import Sidebar from "../global/Sidebar";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import PieChart from "../../components/PieChart";
import ProgressCircle from "../../components/ProgressCircle";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [sales, setSales] = useState('')
  const [msales, setMsales] = useState('')
  const [month, setMonth] = useState('')
  const [clients, setClients] = useState('')
  const [isSidebar, setIsSidebar] = useState(true);
  const [childData, setChildData] = useState('0');
  const [data,setData] = useState([])
  const handleChildData = (data) => {
    console.log(data,typeof(data),'%%%%%%%%')
    setChildData(data);
    
  };
  const share =  ()=>{
    axios.get('https://gautam0511.pythonanywhere.com/product/share/', { params: { search: childData} })
      .then(response => {
        // Handle the response from the Django backend
        console.log(response.data);
        setData(response.data)
        setChildData('')
      })
      .catch(error => {
        // Handle any errors
        console.error(error);
      });
  }
 if(childData){
  share();
 }
  // const demo =  ()=>{
  //   console.log(data)
  // }
  // childData ? share():demo()

  useEffect(() => {
    const revenue = async () => {
      const data = await axios.get('https://gautam0511.pythonanywhere.com/product/sales/')
      setSales(data.data.sum)
      setClients(data.data.count)
    }
    const sales = async () => {
      const data = await axios.get('https://gautam0511.pythonanywhere.com/product/sales/month/')
      setMsales(data.data.sum)
      const monthNumber = data.data.month
      const date = new Date(2000, monthNumber - 1);

      // Get the localized month name
      const monthName = date.toLocaleString('default', { month: 'long' });
      setMonth(monthName)
    }
    revenue();
    sales()
  }, [])

  return (
    <Box display='flex' width='100%' height='100%'>
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Box m="20px">


          <Topbar setIsSidebar={setIsSidebar} onChildData={handleChildData} />
          {/* HEADER */}
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Header title="DASHBOARD" subtitle="Social Media Dashboard" />
          </Box>


          {/* GRID & CHARTS */}
          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="140px"
            gap="20px"
          >
            {/* ROW 1 */}
            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={`₹${msales}`}
                subtitle={`${month} Sales`}
                progress="0"
                increase="0%"

              />
            </Box>

            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={clients}
                subtitle="Total Clients"
                progress="0"
                increase="0%"
              // icon={
              //   <PersonAddIcon
              //     sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              //   />
              // }
              />
            </Box>
            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title="₹9,000"
                subtitle="Total AD Spent"
                progress="0"
                increase="0%"

              />
            </Box>
            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title="₹13,630"
                subtitle="Raw Materials"
                progress="0"
                increase="0%"
              // icon={
              //   <TrafficIcon
              //     sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              //   />
              // }
              />
            </Box>

            {/* ROW 2 */}
            <Box
              gridColumn="span 6"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              p="30px"
            >
              <Typography variant="h5" fontWeight="600">
                Share Division
              </Typography>
              <Box
                gridColumn="span 4"
                gridRow="span 2"
                backgroundColor={colors.primary[400]}
              >
                <Box height="250px" mt="-20px">
                  <PieChart isDashboard={true} inputData={data}/>
                </Box>
              </Box>
            </Box>

            <Box
              gridColumn="span 6"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              overflow="auto"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                colors={colors.grey[100]}
                p="15px"
              >
                <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                  Recent Transactions(coming soon feature...)
                </Typography>
              </Box>
              {mockTransactions.map((transaction, i) => (
                <Box
                  key={`${transaction.txId}-${i}`}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  p="15px"
                >
                  <Box>
                    <Typography
                      color={colors.greenAccent[500]}
                      variant="h5"
                      fontWeight="600"
                    >
                      {transaction.txId}
                    </Typography>
                    <Typography color={colors.grey[100]}>
                      {transaction.user}
                    </Typography>
                  </Box>
                  <Box color={colors.grey[100]}>{transaction.date}</Box>
                  <Box
                    backgroundColor={colors.greenAccent[500]}
                    p="5px 10px"
                    borderRadius="4px"
                  >
                    ${transaction.cost}
                  </Box>
                </Box>
              ))}
            </Box>
            <Box
              gridColumn="span 12"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
            >
              <Box
                mt="25px"
                p="0 30px"
                display="flex "
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    color={colors.grey[100]}
                  >
                    Revenue Generated
                  </Typography>
                  <Typography
                    variant="h3"
                    fontWeight="bold"
                    color={colors.greenAccent[500]}
                  >
                    ₹{sales}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="h5"
                    fontWeight="600"
                    sx={{ padding: "30px 30px 0 30px" }}
                  >
                    2023-2024
                  </Typography>
                </Box>
              </Box>
              <Box
                gridColumn="span 4"
                gridRow="span 2"
                backgroundColor={colors.primary[400]}
              >

                <Box height="250px" mt="-20px">
                  <BarChart isDashboard={true} value={msales}/>
                </Box>
              </Box>
            </Box>

            {/* ROW 3 */}
            {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box> */}
            {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box> */}
            {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box> */}
          </Box>
        </Box>
      </main>
    </Box>
  );
};

export default Dashboard;
