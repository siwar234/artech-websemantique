/*!

=========================================================
* Paper Dashboard React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";
import GalleryOwner from "views/user/GalleryOwner";
import DeliveryMan from "views/user/DeliveryMan";
import Client from "views/user/Client";
import Product from "views/product/Product";
import Order from "views/order/Order";
import Payment from "views/order/Payment";
import Post from "views/post/Post";
import Comments from "views/comment/Comment";
import Shipping from "views/shipping/Shipping";
import Event from "views/event/Event";
import Review from "views/review/Review";
import Notification from "views/notification/Notification";
import Category from "views/category/Category";
import Cart from "views/cart/Cart";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: <Icons />,
    layout: "/admin",
  },
  
  
  {
    path: "/galleryowner",
    name: "Gallery Owners",
    icon: "nc-icon nc-single-02",
    component: <GalleryOwner />,
    layout: "/admin",
  },
  
  {
    path: "/deliveryman",
    name: "Delivery Men",
    icon: "nc-icon nc-bus-front-12",
    component: <DeliveryMan />,
    layout: "/admin",
  },

  {
    path: "/client",
    name: "Clients",
    icon: "nc-icon nc-single-02",
    component: <Client />,
    layout: "/admin",
  },
  

  {
    path: "/product",
    name: "Products",
    icon: "nc-icon nc-bag-16",
    component: <Product />,
    layout: "/admin",
  },
  

  {
    path: "/order",
    name: "Orders",
    icon: "nc-icon nc-basket",
    component: <Order />,
    layout: "/admin",
  },

  {
    path: "/payment",
    name: "Payment",
    icon: "nc-icon nc-money-coins",
    component: <Payment />,
    layout: "/admin",
  },
 
  {
    path: "/post",
    name: "Posts",
    icon: "nc-icon nc-bullet-list-67",
    component: <Post />,
    layout: "/admin",
  },

  {
    path: "/comment",
    name: "Comments",
    icon: "nc-icon nc-chat-33",
    component: <Comments />,
    layout: "/admin",
  },

  {
    path: "/shipping",
    name: "Shippings",
    icon: "nc-icon nc-delivery-fast",
    component: <Shipping />,
    layout: "/admin",
  },
  {
    path: "/event",
    name: "Events",
    icon: "nc-icon nc-headphones",
    component: <Event />,
    layout: "/admin",
  },
  {
    path: "/review",
    name: "Reviews",
    icon: "nc-icon nc-paper",
    component: <Review />,
    layout: "/admin",
  },  
  {
    path: "/notification",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: <Notification />,
    layout: "/admin",
  },

  {
    path: "/category",
    name: "Categories",
    icon: "nc-icon nc-palette",
    component: <Category />,
    layout: "/admin",
  },

  {
    path: "/cart",
    name: "Cart",
    icon: "nc-icon nc-cart-simple",
    component: <Cart />,
    layout: "/admin",
  },
 
];
export default routes;
