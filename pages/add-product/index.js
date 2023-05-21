import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  Input,
  Select,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Box,
  TextField,
} from "@mui/material";
const Index = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      variant: [{ size: "S", quantity: 1, price: 0 }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variant",
  });

  const onSubmit = (data) => console.log(data);
  console.log(errors);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box></Box>
        <input
          type="text"
          placeholder="Product Code"
          {...register("product-code", { required: true, maxLength: 80 })}
        />
        <TextField
          type="text"
          placeholder="Product name"
          {...register("title", { required: true, maxLength: 80 })}
        />
        <TextField
          type="number"
          placeholder="Quantity"
          {...register("quantity", { required: true, maxLength: 20 })}
        />
        <TextField
          type="number"
          placeholder="Rate"
          {...register("Email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        <TextField
          type="number"
          placeholder="Sale Price"
          {...register("salePrice", {
            required: true,
            minLength: 6,
            maxLength: 12,
          })}
        />
        {/* <FormControl > */}
        <Box>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            label="Select-option"
            placeholder="Select-option"
            {...register("brand", { required: true })}
          >
            <MenuItem value="none">Select-option</MenuItem>
            <MenuItem value="comfywear">Comfy Wear</MenuItem>
            <MenuItem value="bin-saeed">Bin Saeed</MenuItem>
          </Select>
        </Box>
        <Box>
          <InputLabel id="stuf">Select Stuff</InputLabel>
          <Select
            labelId="stuf"
            label="Select-Stuff"
            placeholder="Select-option"
            {...register("stuff", { required: true })}
          >
            <MenuItem value="none">Select-option</MenuItem>
            <MenuItem value="Loan">Loan</MenuItem>
            <MenuItem value="Embroidery">Embroidery</MenuItem>
            <MenuItem value="Linen">Linen</MenuItem>
            <MenuItem value="Cotton">Cotton</MenuItem>
            <MenuItem value="Silk">Silk</MenuItem>
            <MenuItem value="Chiffon">Chiffon</MenuItem>
            <MenuItem value="Organza">Organza</MenuItem>
          </Select>
        </Box>

        <Box>
          <InputLabel id="category">Select Category</InputLabel>
          <Select
            labelId="category"
            label="Select-Category"
            placeholder="Select-option"
            {...register("category", { required: true })}
          >
            <MenuItem value="none">Select-option</MenuItem>
            <MenuItem value="3-piece">3-piece</MenuItem>
            <MenuItem value="2-piece">2-piece</MenuItem>
            <MenuItem value="single">single</MenuItem>
            <MenuItem value="none">None</MenuItem>
          </Select>
        </Box>

        <Box>
          <InputLabel id="status">Select Status</InputLabel>
          <Select
            labelId="status"
            label="Select-Status"
            placeholder="Select-option"
            {...register("status", { required: true })}
          >
            <MenuItem value="none">Select-option</MenuItem>
            <MenuItem value="Available">Available</MenuItem>
            <MenuItem value="out-of-stock">out-of-stock</MenuItem>
          </Select>
        </Box>
        <Box>Add Variant</Box>
        <Box>
          {fields.map((item, index) => {
            return (
              <Box sx={{ display: "flex", gap: "1rem" }} key={item.id}>
                <TextField
                  margin="normal"
                  required
                  label="Size"
                  {...register(`variant.${index}.size`, { required: true })}
                />

                <Controller
                  render={({ field }) => (
                    <TextField
                      margin="normal"
                      required
                      label="quantity"
                      {...field}
                    />
                  )}
                  name={`variant.${index}.quantity`}
                  control={control}
                />
                <TextField
                  margin="normal"
                  required
                  label="Price"
                  autoFocus
                  {...register(`variant.${index}.price`, { required: true })}
                />
                <Button type="button" onClick={() => remove(index)}>
                  Delete
                </Button>
              </Box>
            );
          })}
        </Box>
        <section>
          <Button
            type="button"
            onClick={() => {
              append({ size: "S", quantity: 1, price: 0 });
            }}
          >
            Add more
          </Button>
        </section>
        <Box>
          <Button>Submit</Button>
        </Box>
      </form>
    </>
  );
};

export default Index;
