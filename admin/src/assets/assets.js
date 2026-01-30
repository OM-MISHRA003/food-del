import logo from './logo.png'
import add_icon from './add_icon.png'
import order_icon from './order_icon.png'
import profile_image from './profile_image.png'
import upload_area from './upload_area.png'
import parcel_icon from './parcel_icon.png'

// Use environment variable for production, fallback to deployed backend
export const url = import.meta.env.VITE_API_URL || 'https://food-del-1-lcwy.onrender.com'
export const currency = '₹'

export const assets ={
    logo,
    add_icon,
    order_icon,
    profile_image,
    upload_area,
    parcel_icon
}

