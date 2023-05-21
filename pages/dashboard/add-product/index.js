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
  NativeSelect,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

const Index = () => {
  const [isvariant, setisvariant] = useState("no");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      variant: [{ size: "", quantity: 0, price: 0 }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variant",
  });

  const onSubmit = async (data) => {
    try {
      const responce = await axios.post("/api/addproduct", {
        data,
        isvariant,
      });
      console.log(responce.data);
    } catch (error) {
      console.log("error while uploading product");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          type="text"
          placeholder="Product Code"
          {...register("productcode", { required: true })}
        />
        <TextField
          type="text"
          placeholder="Product name"
          {...register("title", { required: true })}
        />
        <TextField
          type="number"
          placeholder="Quantity"
          {...register("quantity", { required: true })}
        />
        <TextField
          type="number"
          placeholder="Rate"
          {...register("Price", { required: true })}
        />
        <TextField
          type="number"
          placeholder="Sale Price"
          {...register("salePrice", {
            required: true,
          })}
        />
        {/* <FormControl > */}
        <Box>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <NativeSelect
            label="Select-option"
            placeholder="Select-option"
            {...register("brand", { required: true })}
          >
            <option value="Select-option">Select-option</option>
            <option value="comfywear">Comfy Wear</option>
            <option value="bin-saeed">Bin Saeed</option>
          </NativeSelect>
        </Box>
        <Box>
          <InputLabel id="stuf">Select Stuff</InputLabel>
          <NativeSelect
            label="Select-Stuff"
            placeholder="Select-option"
            {...register("stuff", { required: true })}
          >
            <option value="none">Select-option</option>
            <option value="Loan">Loan</option>
            <option value="Embroidery">Embroidery</option>
            <option value="Linen">Linen</option>
            <option value="Cotton">Cotton</option>
            <option value="Silk">Silk</option>
            <option value="Chiffon">Chiffon</option>
            <option value="Organza">Organza</option>
          </NativeSelect>
        </Box>

        <Box>
          <InputLabel id="category">Select Category</InputLabel>
          <NativeSelect
            label="Select-Category"
            placeholder="Select-option"
            {...register("category", { required: true })}
          >
            <option value="none">Select-option</option>
            <option value="3-piece">3-piece</option>
            <option value="2-piece">2-piece</option>
            <option value="single">single</option>
            <option value="none">None</option>
          </NativeSelect>
        </Box>

        <Box>
          <InputLabel id="status">Select Status</InputLabel>
          <NativeSelect
            label="Select-Status"
            placeholder="Select-option"
            {...register("status", { required: true })}
          >
            <option value="none">Select-option</option>
            <option value="Available">Available</option>
            <option value="out-of-stock">out-of-stock</option>
          </NativeSelect>
        </Box>
        <Box>Add Variant</Box>
        <Box>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Do you have variant
            </FormLabel>

            <RadioGroup
              onChange={(e) => setisvariant(e.target.value)}
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="no"
              name="radio-buttons-group"
            >
              <FormControlLabel value="yes" control={<Radio />} label="yes" />
              <FormControlLabel value="no" control={<Radio />} label="no" />
            </RadioGroup>
          </FormControl>
        </Box>
        <Box display={isvariant === "no" ? "none" : "block"}>
          {fields.map((item, index) => {
            return (
              <Box sx={{ display: "flex", gap: "1rem" }} key={item.id}>
                <TextField
                  margin="normal"
                  label="Size"
                  {...register(`variant.${index}.size`)}
                />

                <Controller
                  render={({ field }) => (
                    <TextField margin="normal" label="quantity" {...field} />
                  )}
                  name={`variant.${index}.quantity`}
                  control={control}
                />
                <TextField
                  margin="normal"
                  label="Price"
                  {...register(`variant.${index}.price`)}
                />
                <Button type="button" onClick={() => remove(index)}>
                  Delete
                </Button>
              </Box>
            );
          })}
          <Box>
            <Button
              type="button"
              onClick={() => {
                append({ size: "S", quantity: 1, price: 0 });
              }}
            >
              Add more
            </Button>
          </Box>
        </Box>

        <Box>
          <Input type="submit">Submit</Input>
        </Box>
      </form>
    </>
  );
};

export default Index;
