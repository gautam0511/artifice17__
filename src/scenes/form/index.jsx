import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import axios from 'axios'
import Sidebar from "../global/Sidebar";

const Form = () => {
  const [isSidebar, setIsSidebar] = useState(true);
  // const [dataf, setDataf] = useState({
  //   id: "",
  //   name: "",
  //   product: "",
  //   state: "",
  //   dateofdelivery: "",
  //   dateofshipping: "",
  //   status: "",
  //   amountpaid: "",
  //   pendingamount: "",
  //   date: "",
  //   shippingmode: ""
  // })
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleFormSubmit = async (values) => {
    console.log(values);
    // const productData ={
    //   name:values.name,
    //   product:values.product,

    // }

    try {
      const response = await axios.post('https://gautam0511.pythonanywhere.com/product/add/', values);
      console.log(response.data);
      // Reset form fields
      // setDataf({ id:'',name: '', product: '', state: '', });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box display='flex' width='100%' height='100%'>
      <Sidebar isSidebar={isSidebar} />
      <main className="content">
        <Box m="20px">

          <Header title="Add a Customer" subtitle="Artifice details.." />

          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                  }}
                >
                  <TextField
                    fullWidth
                    variant="filled"
                    type="number"
                    label="Id"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.id}
                    id="id"
                    error={!!touched.id && !!errors.id}
                    helperText={touched.id && errors.id}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    name="name"
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Product"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.product}
                    name="product"
                    error={!!touched.product && !!errors.product}
                    helperText={touched.product && errors.product}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="State"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.state}
                    name="state"
                    error={!!touched.state && !!errors.state}
                    helperText={touched.state && errors.state}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Date of Delivery"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.dateofdelivery}
                    name="dateofdelivery"
                    error={!!touched.dateofdelivery && !!errors.dateofdelivery}
                    helperText={touched.dateofdelivery && errors.dateofdelivery}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Date of Shipping"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.dateofshipping}
                    name="dateofshipping"
                    error={!!touched.dateofshipping && !!errors.dateofshipping}
                    helperText={touched.dateofshipping && errors.dateofshipping}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Status"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.status}
                    name="status"
                    error={!!touched.status && !!errors.status}
                    helperText={touched.status && errors.status}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Amount Paid"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.amountpaid}
                    name="amountpaid"
                    error={!!touched.amountpaid && !!errors.amountpaid}
                    helperText={touched.amountpaid && errors.amountpaid}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Pending Amount"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.pendingamount}
                    name="pendingamount"
                    error={!!touched.pendingamount && !!errors.pendingamount}
                    helperText={touched.pendingamount && errors.pendingamount}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Date"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.date}
                    name="date"
                    error={!!touched.date && !!errors.date}
                    helperText={touched.date && errors.date}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Shipping Mode"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.shippingmode}
                    name="shippingmode"
                    error={!!touched.shippingmode && !!errors.shippingmode}
                    helperText={touched.shippingmode && errors.shippingmode}
                    sx={{ gridColumn: "span 4" }}
                  />

                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                  <Button type="submit" color="secondary" variant="contained">
                    Submit
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
        </main>
    </Box>
  );

};

const phoneRegExp =
  /^((\+[1-9]{1, 4}[ -]?)|(\([0-9]{2, 3}\)[ -]?)|([0-9]{2, 4})[ -]?)*?[0-9]{3, 4}[ -]?[0-9]{3, 4}$/;

const checkoutSchema = yup.object().shape({
  id: yup.string().required("required"),
  name: yup.string().required("required"),
  product: yup.string().required("required"),
  state: yup.string().required("required"),
  dateofdelivery: yup.string().required("required"),
  dateofshipping: yup.string().required("required"),
  status: yup.string().required("required"),
  amountpaid: yup.string().required("required"),
  pendingamount: yup.string().required("required"),
  date: yup.string().required("required"),
  shippingmode: yup.string().required("required"),
});
const initialValues = {
  id: "",
  name: "",
  product: "",
  state: "",
  dateofdelivery: "",
  dateofshipping: "",
  status: "",
  amountpaid: "",
  pendingamount: "",
  date: "",
  shippingmode: ""
};

export default Form;
