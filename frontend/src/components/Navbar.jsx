import { Link, useNavigate } from "react-router-dom";
import { HiMiniBars3CenterLeft, HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";

import avatar from "../assets/avatar.png";
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { clearCart } from "../redux/features/cart/cartSlice";
import {useDiscount} from "../context/DiscountContext"

const navigation = [
    { name: "Dashboard", href: "/user-dashboard" },
    { name: "Orders", href: "/orders" },
    { name: "Cart Page", href: "/cart" },
    { name: "Check Out", href: "/checkout" },
];

const Navbar = () => {
    const [sticky, setSticky] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const { currentUser, logout } = useAuth();
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");
    const dispatch = useDispatch();
    const {userArea, setUserArea, discounts} = useDiscount()

    // Sticky navbar on scroll
    useEffect(() => {
        const handleScroll = () => {
            setSticky(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        if (!isDropdownOpen) return;
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDropdownOpen]);

    const handleLogOut = () => {
        logout();
        dispatch(clearCart()); // logout hone par cart reset
    };

    return (
        <header
            className={`max-w-screen-2xl container mx-auto px-4 py-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                sticky ? "bg-gray-900 text-white shadow-md" : "bg-gray-100 text-gray-900"
            }`}
        >
            <nav className="flex justify-between items-center">
                <div className="flex items-center md:gap-16 gap-4">
                    <Link to="/">
                        <HiMiniBars3CenterLeft
                            className={`text-2xl transition-colors ${
                                sticky ? "text-white" : "text-gray-900"
                            }`}
                        />
                    </Link>
                    <div className="relative sm:w-72 w-40 space-x-2">
                        <IoSearchOutline
                            className={`absolute inline-block left-3 inset-y-2 transition-colors ${
                                sticky ? "text-white" : "text-gray-500"
                            }`}
                        />
                        <input
                            type="text"
                            placeholder="Search here"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className={`w-full py-1 md:px-8 px-6 rounded-md focus:outline-none transition-colors ${
                                sticky ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
                            }`}
                        />
                    </div>
                </div>
                <div classname = "hidden sm: block">
                    <select 
                    value = {userArea}
                    onChange={(e) => setUserArea(e.target.value)}
                    className={`border rounded-md px-2 py-1 text-sm outline-none transition-color ${
                        sticky ? "bg gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"
                    }`}
>
                    <option value= "">selected area</option>
                    {
                        discounts.map(d=>{
                            <option key={d._id} value={d.area} >{d.area}({d.discountPercentage}% off) </option>
                        })
                    }
                     </select>
                     </div>
                <div className="relative flex items-center md:space-x-3 space-x-2">
                    <div ref={dropdownRef}>
                        {currentUser ? (
                            <>
                                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                    <img
                                        src={avatar}
                                        alt="User Avatar"
                                        className={`w-10 h-10 rounded-full ring-2 ${
                                            sticky ? "ring-blue-500" : "ring-gray-900"
                                        }`}
                                    />
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                                        <ul className="py-2">
                                            {navigation.map((item) => (
                                                <li
                                                    key={item.name}
                                                    onClick={() => setIsDropdownOpen(false)}
                                                >
                                                    <Link
                                                        to={item.href}
                                                        className="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-900"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            ))}
                                            <li>
                                                <button
                                                    onClick={handleLogOut}
                                                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                                >
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </>
                        ) : (
                            <Link to="/login">
                                <HiOutlineUser
                                    className={`text-2xl transition-colors ${
                                        sticky ? "text-white" : "text-gray-900"
                                    }`}
                                />
                            </Link>
                        )}
                    </div>
                    <button className="hidden sm:block">
                        <HiOutlineHeart
                            className={`text-2xl transition-colors ${
                                sticky ? "text-white" : "text-gray-900"
                            }`}
                        />
                    </button>
                    <Link
                        to="/cart"
                        className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm"
                    >
                        <HiOutlineShoppingCart
                            className={`text-2xl transition-colors ${
                                sticky ? "text-white" : "text-gray-900"
                            }`}
                        />
                        <span className="text-sm font-semibold sm:ml-1">
                            {cartItems.length > 0 ? cartItems.length : "0"}
                        </span>
                    </Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
