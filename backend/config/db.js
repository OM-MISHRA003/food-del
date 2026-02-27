import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Flag to track if we have a real MongoDB connection
export let useMemoryStore = false;

// In-memory food data (used when no MongoDB is available)
export const inMemoryFoodData = [
    { _id: "1", name: "Greek salad", image: "food_1.png", price: 120, description: "Fresh vegetables with feta cheese and olives, dressed with olive oil", category: "Salad" },
    { _id: "2", name: "Veg salad", image: "food_2.png", price: 180, description: "Healthy mix of fresh garden vegetables with light dressing", category: "Salad" },
    { _id: "3", name: "Clover Salad", image: "food_3.png", price: 160, description: "Unique blend of greens with a tangy vinaigrette", category: "Salad" },
    { _id: "4", name: "Chicken Salad", image: "food_4.png", price: 240, description: "Grilled chicken breast on a bed of fresh greens", category: "Salad" },
    { _id: "5", name: "Lasagna Rolls", image: "food_5.png", price: 140, description: "Delicious pasta rolls filled with cheese and herbs", category: "Rolls" },
    { _id: "6", name: "Peri Peri Rolls", image: "food_6.png", price: 120, description: "Spicy peri peri chicken wrapped in soft rolls", category: "Rolls" },
    { _id: "7", name: "Chicken Rolls", image: "food_7.png", price: 200, description: "Tender chicken pieces wrapped in fresh bread", category: "Rolls" },
    { _id: "8", name: "Veg Rolls", image: "food_8.png", price: 150, description: "Mixed vegetables wrapped in crispy rolls", category: "Rolls" },
    { _id: "9", name: "Ripple Ice Cream", image: "food_9.png", price: 140, description: "Creamy ice cream with chocolate ripples", category: "Deserts" },
    { _id: "10", name: "Fruit Ice Cream", image: "food_10.png", price: 220, description: "Refreshing ice cream with fresh fruit pieces", category: "Deserts" },
    { _id: "11", name: "Jar Ice Cream", image: "food_11.png", price: 100, description: "Classic ice cream served in a cute jar", category: "Deserts" },
    { _id: "12", name: "Vanilla Ice Cream", image: "food_12.png", price: 120, description: "Rich and creamy vanilla flavored ice cream", category: "Deserts" },
    { _id: "13", name: "Chicken Sandwich", image: "food_13.png", price: 120, description: "Grilled chicken with fresh veggies in toasted bread", category: "Sandwich" },
    { _id: "14", name: "Vegan Sandwich", image: "food_14.png", price: 180, description: "Plant-based delight with avocado and veggies", category: "Sandwich" },
    { _id: "15", name: "Grilled Sandwich", image: "food_15.png", price: 160, description: "Perfectly grilled sandwich with melted cheese", category: "Sandwich" },
    { _id: "16", name: "Bread Sandwich", image: "food_16.png", price: 240, description: "Classic sandwich with multiple layers of goodness", category: "Sandwich" },
    { _id: "17", name: "Cup Cake", image: "food_17.png", price: 140, description: "Delightful mini cake with colorful frosting", category: "Cake" },
    { _id: "18", name: "Vegan Cake", image: "food_18.png", price: 120, description: "Eggless cake made with plant-based ingredients", category: "Cake" },
    { _id: "19", name: "Butterscotch Cake", image: "food_19.png", price: 200, description: "Rich butterscotch flavored layered cake", category: "Cake" },
    { _id: "20", name: "Sliced Cake", image: "food_20.png", price: 150, description: "Fresh slice of our signature layered cake", category: "Cake" },
    { _id: "21", name: "Garlic Mushroom", image: "food_21.png", price: 140, description: "Sautéed mushrooms with garlic and herbs", category: "Pure Veg" },
    { _id: "22", name: "Fried Cauliflower", image: "food_22.png", price: 220, description: "Crispy fried cauliflower with special spices", category: "Pure Veg" },
    { _id: "23", name: "Mix Veg Pulao", image: "food_23.png", price: 100, description: "Fragrant rice cooked with mixed vegetables", category: "Pure Veg" },
    { _id: "24", name: "Rice Zucchini", image: "food_24.png", price: 120, description: "Healthy zucchini served with steamed rice", category: "Pure Veg" },
    { _id: "25", name: "Cheese Pasta", image: "food_25.png", price: 120, description: "Creamy pasta loaded with melted cheese", category: "Pasta" },
    { _id: "26", name: "Tomato Pasta", image: "food_26.png", price: 180, description: "Classic pasta in rich tomato sauce", category: "Pasta" },
    { _id: "27", name: "Creamy Pasta", image: "food_27.png", price: 160, description: "Pasta in white cream sauce with herbs", category: "Pasta" },
    { _id: "28", name: "Chicken Pasta", image: "food_28.png", price: 240, description: "Pasta with grilled chicken and vegetables", category: "Pasta" },
    { _id: "29", name: "Butter Noodles", image: "food_29.png", price: 140, description: "Soft noodles tossed in butter and garlic", category: "Noodles" },
    { _id: "30", name: "Veg Noodles", image: "food_30.png", price: 120, description: "Stir-fried noodles with fresh vegetables", category: "Noodles" },
    { _id: "31", name: "Somen Noodles", image: "food_31.png", price: 200, description: "Japanese style thin wheat noodles", category: "Noodles" },
    { _id: "32", name: "Cooked Noodles", image: "food_32.png", price: 150, description: "Classic noodles with savory sauce", category: "Noodles" }
];

export const connectDB = async () => {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
        console.log("No MONGODB_URI found — running with in-memory food data (no database)");
        useMemoryStore = true;
        return;
    }

    try {
        await mongoose.connect(uri);
        console.log("DB Connected to MongoDB");
    } catch (err) {
        console.error("MongoDB connection error, falling back to in-memory store:", err.message);
        useMemoryStore = true;
    }
}