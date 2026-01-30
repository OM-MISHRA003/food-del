import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Food Model
const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true }
});

const Food = mongoose.model("food", foodSchema);

// Sample food data
const foodData = [
    { name: "Greek salad", image: "food_1.png", price: 120, description: "Fresh vegetables with feta cheese and olives, dressed with olive oil", category: "Salad" },
    { name: "Veg salad", image: "food_2.png", price: 180, description: "Healthy mix of fresh garden vegetables with light dressing", category: "Salad" },
    { name: "Clover Salad", image: "food_3.png", price: 160, description: "Unique blend of greens with a tangy vinaigrette", category: "Salad" },
    { name: "Chicken Salad", image: "food_4.png", price: 240, description: "Grilled chicken breast on a bed of fresh greens", category: "Salad" },
    { name: "Lasagna Rolls", image: "food_5.png", price: 140, description: "Delicious pasta rolls filled with cheese and herbs", category: "Rolls" },
    { name: "Peri Peri Rolls", image: "food_6.png", price: 120, description: "Spicy peri peri chicken wrapped in soft rolls", category: "Rolls" },
    { name: "Chicken Rolls", image: "food_7.png", price: 200, description: "Tender chicken pieces wrapped in fresh bread", category: "Rolls" },
    { name: "Veg Rolls", image: "food_8.png", price: 150, description: "Mixed vegetables wrapped in crispy rolls", category: "Rolls" },
    { name: "Ripple Ice Cream", image: "food_9.png", price: 140, description: "Creamy ice cream with chocolate ripples", category: "Deserts" },
    { name: "Fruit Ice Cream", image: "food_10.png", price: 220, description: "Refreshing ice cream with fresh fruit pieces", category: "Deserts" },
    { name: "Jar Ice Cream", image: "food_11.png", price: 100, description: "Classic ice cream served in a cute jar", category: "Deserts" },
    { name: "Vanilla Ice Cream", image: "food_12.png", price: 120, description: "Rich and creamy vanilla flavored ice cream", category: "Deserts" },
    { name: "Chicken Sandwich", image: "food_13.png", price: 120, description: "Grilled chicken with fresh veggies in toasted bread", category: "Sandwich" },
    { name: "Vegan Sandwich", image: "food_14.png", price: 180, description: "Plant-based delight with avocado and veggies", category: "Sandwich" },
    { name: "Grilled Sandwich", image: "food_15.png", price: 160, description: "Perfectly grilled sandwich with melted cheese", category: "Sandwich" },
    { name: "Bread Sandwich", image: "food_16.png", price: 240, description: "Classic sandwich with multiple layers of goodness", category: "Sandwich" },
    { name: "Cup Cake", image: "food_17.png", price: 140, description: "Delightful mini cake with colorful frosting", category: "Cake" },
    { name: "Vegan Cake", image: "food_18.png", price: 120, description: "Eggless cake made with plant-based ingredients", category: "Cake" },
    { name: "Butterscotch Cake", image: "food_19.png", price: 200, description: "Rich butterscotch flavored layered cake", category: "Cake" },
    { name: "Sliced Cake", image: "food_20.png", price: 150, description: "Fresh slice of our signature layered cake", category: "Cake" },
    { name: "Garlic Mushroom", image: "food_21.png", price: 140, description: "Sautéed mushrooms with garlic and herbs", category: "Pure Veg" },
    { name: "Fried Cauliflower", image: "food_22.png", price: 220, description: "Crispy fried cauliflower with special spices", category: "Pure Veg" },
    { name: "Mix Veg Pulao", image: "food_23.png", price: 100, description: "Fragrant rice cooked with mixed vegetables", category: "Pure Veg" },
    { name: "Rice Zucchini", image: "food_24.png", price: 120, description: "Healthy zucchini served with steamed rice", category: "Pure Veg" },
    { name: "Cheese Pasta", image: "food_25.png", price: 120, description: "Creamy pasta loaded with melted cheese", category: "Pasta" },
    { name: "Tomato Pasta", image: "food_26.png", price: 180, description: "Classic pasta in rich tomato sauce", category: "Pasta" },
    { name: "Creamy Pasta", image: "food_27.png", price: 160, description: "Pasta in white cream sauce with herbs", category: "Pasta" },
    { name: "Chicken Pasta", image: "food_28.png", price: 240, description: "Pasta with grilled chicken and vegetables", category: "Pasta" },
    { name: "Butter Noodles", image: "food_29.png", price: 140, description: "Soft noodles tossed in butter and garlic", category: "Noodles" },
    { name: "Veg Noodles", image: "food_30.png", price: 120, description: "Stir-fried noodles with fresh vegetables", category: "Noodles" },
    { name: "Somen Noodles", image: "food_31.png", price: 200, description: "Japanese style thin wheat noodles", category: "Noodles" },
    { name: "Cooked Noodles", image: "food_32.png", price: 150, description: "Classic noodles with savory sauce", category: "Noodles" }
];

async function seedDatabase() {
    try {
        const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/food-del";
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");

        // Clear existing food data
        await Food.deleteMany({});
        console.log("Cleared existing food data");

        // Insert new food data
        await Food.insertMany(foodData);
        console.log("Successfully added", foodData.length, "food items!");

        await mongoose.connection.close();
        console.log("Database seeded successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
}

seedDatabase();
