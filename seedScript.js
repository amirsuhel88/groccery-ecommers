import "dotenv/config.js";
import mongoose from "mongoose";

import { categories, products } from "./seedData.js";
import { Category, Product } from "./src/models/index.js";

async function seedDatabase(params) {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany({});
    await Category.deleteMany({});

    const categoryDocs = await Category.insertMany(categories);

    const categoryMap = categoryDocs.reduce((map, category) => {
      map[category.name] = category._id;
      return map;
    }, {});

    const productWithCategoryIds = products.map((product) => ({
      ...product,
      category: categoryMap[product.category],
    }));

    await Product.insertMany(productWithCategoryIds);
    console.log("Database seeded Successfully✅");
  } catch (error) {
    console.error("Error seeding database", error);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();
