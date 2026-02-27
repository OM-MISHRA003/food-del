import userModel from "../models/userModel.js"
import { useMemoryStore, inMemoryUsers } from "../config/db.js";

function getMemoryUser(userId) {
    return inMemoryUsers.find(u => u._id === userId);
}

// add to user cart  
const addToCart = async (req, res) => {
   try {
      if (useMemoryStore) {
         const user = getMemoryUser(req.body.userId);
         if (!user) return res.json({ success: false, message: "User not found" });
         if (!user.cartData[req.body.itemId]) user.cartData[req.body.itemId] = 1;
         else user.cartData[req.body.itemId] += 1;
         return res.json({ success: true, message: "Added To Cart" });
      }
      let userData = await userModel.findOne({_id:req.body.userId});
      let cartData = await userData.cartData;
      if (!cartData[req.body.itemId]) {
         cartData[req.body.itemId] = 1;
      }
      else {
         cartData[req.body.itemId] += 1;
      }
      await userModel.findByIdAndUpdate(req.body.userId, {cartData});
      res.json({ success: true, message: "Added To Cart" });
   } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" })
   }
}

// remove food from user cart
const removeFromCart = async (req, res) => {
   try {
      if (useMemoryStore) {
         const user = getMemoryUser(req.body.userId);
         if (!user) return res.json({ success: false, message: "User not found" });
         if (user.cartData[req.body.itemId] > 0) user.cartData[req.body.itemId] -= 1;
         return res.json({ success: true, message: "Removed From Cart" });
      }
      let userData = await userModel.findById(req.body.userId);
      let cartData = await userData.cartData;
      if (cartData[req.body.itemId] > 0) {
         cartData[req.body.itemId] -= 1;
      }
      await userModel.findByIdAndUpdate(req.body.userId, {cartData});
      res.json({ success: true, message: "Removed From Cart" });
   } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" })
   }

}

// get user cart
const getCart = async (req, res) => {
   try {
      if (useMemoryStore) {
         const user = getMemoryUser(req.body.userId);
         return res.json({ success: true, cartData: user ? user.cartData : {} });
      }
      let userData = await userModel.findById(req.body.userId);
      let cartData = await userData.cartData;
      res.json({ success: true, cartData:cartData });
   } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" })
   }
}


export { addToCart, removeFromCart, getCart }