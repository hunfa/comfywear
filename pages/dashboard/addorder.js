import React from 'react'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import { FormControl, MenuItem } from '@mui/material';



function AddOrder() {

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <>
            <Paper >
                <Typography variant="h4" component="h2">
                    Add Order
                </Typography>

                <TextField type='date' name="date"
                ></TextField>
                <TextField type='date'
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

                <Box >
                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel id="demo-simple-select-autowidth-label">Select Product</InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={age}
                            onChange={handleChange}
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


            </Paper>
        </>
    )
}

export default AddOrder