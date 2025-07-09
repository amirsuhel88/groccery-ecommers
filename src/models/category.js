import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {},
  image: {},
});

const Category = mongoose.model("Category", categorySchema);
export default Category;
