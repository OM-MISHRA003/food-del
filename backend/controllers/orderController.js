import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import Stripe from "stripe";
import { useMemoryStore, inMemoryUsers, inMemoryOrders } from "../config/db.js";
const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_KEY) : null;

//config variables
const currency = "inr";
const deliveryCharge = 50;
const frontend_URL = 'https://food-del-fronted-5ggo.onrender.com/';

// Placing User Order for Frontend using stripe
const placeOrder = async (req, res) => {

    try {
        if (useMemoryStore) {
            const orderId = Date.now().toString();
            inMemoryOrders.push({ _id: orderId, userId: req.body.userId, items: req.body.items, amount: req.body.amount, address: req.body.address, status: "Food Processing", date: new Date(), payment: true });
            const user = inMemoryUsers.find(u => u._id === req.body.userId);
            if (user) user.cartData = {};
            return res.json({ success: true, message: "Order Placed" });
        }

        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        if (!stripe) {
            return res.json({ success: true, message: "Order Placed" });
        }

        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: "Delivery Charge"
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${frontend_URL}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_URL}/verify?success=false&orderId=${newOrder._id}`,
            line_items: line_items,
            mode: 'payment',
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// Placing User Order for Frontend using COD
const placeOrderCod = async (req, res) => {

    try {
        if (useMemoryStore) {
            const orderId = Date.now().toString();
            inMemoryOrders.push({ _id: orderId, userId: req.body.userId, items: req.body.items, amount: req.body.amount, address: req.body.address, status: "Food Processing", date: new Date(), payment: true });
            const user = inMemoryUsers.find(u => u._id === req.body.userId);
            if (user) user.cartData = {};
            return res.json({ success: true, message: "Order Placed" });
        }

        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            payment: true,
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        res.json({ success: true, message: "Order Placed" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// Listing Order for Admin panel
const listOrders = async (req, res) => {
    try {
        if (useMemoryStore) return res.json({ success: true, data: inMemoryOrders });
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// User Orders for Frontend
const userOrders = async (req, res) => {
    try {
        if (useMemoryStore) {
            const orders = inMemoryOrders.filter(o => o.userId === req.body.userId);
            return res.json({ success: true, data: orders });
        }
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const updateStatus = async (req, res) => {
    console.log(req.body);
    try {
        if (useMemoryStore) {
            const order = inMemoryOrders.find(o => o._id === req.body.orderId);
            if (order) order.status = req.body.status;
            return res.json({ success: true, message: "Status Updated" });
        }
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        res.json({ success: false, message: "Error" })
    }

}

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (useMemoryStore) {
            if (success === "true") {
                const order = inMemoryOrders.find(o => o._id === orderId);
                if (order) order.payment = true;
                return res.json({ success: true, message: "Paid" });
            } else {
                const idx = inMemoryOrders.findIndex(o => o._id === orderId);
                if (idx !== -1) inMemoryOrders.splice(idx, 1);
                return res.json({ success: false, message: "Not Paid" });
            }
        }
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid" })
        }
        else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false, message: "Not Paid" })
        }
    } catch (error) {
        res.json({ success: false, message: "Not  Verified" })
    }

}

export { placeOrder, listOrders, userOrders, updateStatus, verifyOrder, placeOrderCod }
