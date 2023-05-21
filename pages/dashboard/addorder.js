import React from 'react'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import { Button, FormControl, MenuItem } from '@mui/material';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';


function AddOrder() {
    const { register, handleSubmit, reset } = useForm();
    const [selectedProduct, setselectedProduct] = React.useState('');
    const products = useSelector(state => state.product.products)
    const [inputData, setInputData] = React.useState([{ input1: '', input2: '', input3: '' }]);
    const handleAddInput = () => {
        setInputData([...inputData, { input1: '', input2: '', input3: '' }]);
    };

    const handleRemoveInput = (index) => {
        const updatedData = [...inputData];
        updatedData.splice(index, 1);
        setInputData(updatedData);
    };
    const handleChange = (e) => {

        setselectedProduct(e.target.value)
    };
    return (
        <>
            <Paper >
                <Typography variant="h4" component="h2">
                    Add Order
                </Typography>

                <TextField type='date' name="date"
                ></TextField>
                <TextField type='time'
                ></TextField>

                <Box>
                    <TextField type='text' name="ClientName"
                        placeholder='Client Name'
                    ></TextField>
                </Box>

                <Box>
                    <TextField type='text' name="ClientContact"
                        placeholder='Client Contact'
                    ></TextField>
                </Box>


                {inputData.map((data, index) => {
                    return (
                        <Box key={index}>
                            <FormControl sx={{ m: 1, minWidth: 200 }}>
                                <InputLabel id="demo-simple-select-autowidth-label">Select Product</InputLabel>
                                <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    value={selectedProduct}
                                    onChange={handleChange}
                                    autoWidth
                                    label="Select Product"
                                >
                                    <MenuItem value="" disabled>
                                        <em>None</em>
                                    </MenuItem>
                                    {products.length > 0 && products.map((product) => {
                                        return (
                                            <MenuItem  {...register(`input[${index}].input1`)} key={product._id} value={product}>{product.productTitle}</MenuItem>
                                        )
                                    })}

                                </Select>
                            </FormControl>
                            <TextField type='number' name="Rate"
                                placeholder='Rate'
                            ></TextField>
                            <TextField type='number' name="Quantity"
                                placeholder='Quantity'
                            ></TextField>
                            <TextField type='number' name="Total"
                                placeholder='Total'
                            ></TextField>
                        </Box>
                    )
                })}

                <button type="button" onClick={handleAddInput}>Add</button>





                <Box>
                    <TextField type='number' name="VAT"
                        placeholder='VAT 0%'
                    ></TextField>
                </Box>

                <Box>
                    <TextField type='number' name="TotalAmount"
                        placeholder='Total Amount'
                    ></TextField>
                </Box>

                <Box>
                    <TextField type='number' name="Discount"
                        placeholder='Discount'
                    ></TextField>
                </Box>

                <Box>
                    <TextField type='number' name="GrandTotal"
                        placeholder='Grand Total'
                    ></TextField>
                </Box>

                <Box>
                    <TextField type='number' name="PaidAmount"
                        placeholder='PaidAmount'
                    ></TextField>
                </Box>

                <Box>
                    <TextField type='number' name="DueAmount"
                        placeholder='Due Amount'
                    ></TextField>
                </Box>

                {/* <Box >
                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel id="dem-select-autowidth-label">Payment Type</InputLabel>
                        <Select
                            labelId="dem-select-autowidth-label"
                            id="dem-select-autowidth"
                            // value={age}
                            // onChange={handleChange}
                            autoWidth
                            label="Select Product"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={10}>Twenty</MenuItem>
                            <MenuItem value={21}>Twenty one</MenuItem>
                            <MenuItem value={22}>Twenty one and a half</MenuItem>
                        </Select>
                    </FormControl>
                </Box> */}

                <Box>
                    <Button variant='contained'>Place Order</Button>
                </Box>
            </Paper>
        </>
    )
}

export default AddOrder