"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "@/src/Components/LocalizedLink";
import { toast } from "react-toastify";
import { useUser } from "@/src/context/UserContext";
import {
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
    Mail,
    Phone,
    MapPin,
    Clock,
    Headphones,
    Leaf,
    UserCheck,
    Truck,
    ShieldCheck,
    Send,
    ArrowRight
} from "lucide-react";

export default function Footer() {
    const [email, setEmail] = useState("");
    const user = useUser();
    const role = user?.role;
    const isVerified = user?.isVerified;

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter a valid email address.");
            return;
        }
        toast.success("Thank you for subscribing to FitMeals!");
        setEmail("");
    };

    // Default Links (Guest or CUSTOMER)
    let quickLinks = [
        { label: "Home", path: "/" },
        { label: "About Us", path: "/about" },
        { label: "Services", path: "/services/order/1" },
        { label: "Health Plans", path: "/health/diet/daily-plan" },
        { label: "Contact Us", path: "/contact/query" },
        { label: "FAQ", path: "/contact/query" }
    ];

    let secondColumnTitle = "Services";
    let secondColumnLinks = [
        { label: "Meal Delivery", path: "/services/order/1" },
        { label: "Personalized Diet Plans", path: "/health/diet/daily-plan" },
        { label: "Weight Loss Programs", path: "/health/diet/daily-plan" },
        { label: "Fitness Nutrition", path: "/health/fit-tracker" },
        { label: "Corporate Meals", path: "/services/order/1" },
        { label: "Healthy Catering", path: "/services/reservation/1" }
    ];

    // Conditional Links based on roles
    if (role === "OWNER") {
        quickLinks = [
            { label: "Home", path: "/" },
            { label: "About Us", path: "/learnMore" },
            { label: "Contact Us", path: "/contact/query" }
        ];
        if (isVerified === "PENDING") {
            quickLinks.push({ label: "Verification Status", path: "/verification" });
        }
        
        secondColumnTitle = "Management";
        if (isVerified === "VERIFIED") {
            secondColumnLinks = [
                { label: "Dashboard", path: "/dashboard/restaurantOwner" },
                { label: "Earnings", path: "/earnings" },
                { label: "Food Items", path: "/FoodItems" },
                { label: "Reservation", path: "/form/restaurant/reservation" },
                { label: "Profile", path: "/profile" }
            ];
        } else {
            secondColumnLinks = [];
        }
    } else if (role === "DELIVERY") {
        quickLinks = [
            { label: "Home", path: "/" },
            { label: "About Us", path: "/learnMore" }
        ];
        if (isVerified === "PENDING") {
            quickLinks.push({ label: "Verify Partner", path: "/PartnerVerification" });
        }
        
        secondColumnTitle = "Management";
        if (isVerified === "VERIFIED") {
            secondColumnLinks = [
                { label: "Dashboard", path: "/dashboard/deliveryPartner" }
            ];
        } else {
            secondColumnLinks = [];
        }
    }

    const hasSecondColumn = secondColumnLinks.length > 0;
    const brandSpan = hasSecondColumn ? "lg:col-span-4" : "lg:col-span-5";
    const contactSpan = hasSecondColumn ? "lg:col-span-4" : "lg:col-span-5";

    return (
        <div className="w-full bg-[#F5FAF7] pt-24 pb-8 px-4 sm:px-6 lg:px-8 xl:px-12 relative overflow-hidden font-manrope border-t border-gray-200">
            
            {/* 1. Floating CTA Section (Renders above the main footer card) */}
            <div className="max-w-6xl mx-auto px-4 relative z-20">
                <div className="rounded-[32px] bg-gradient-to-br from-emerald-600 via-emerald-600 to-green-500 p-8 sm:p-12 md:p-14 text-white shadow-xl overflow-hidden relative group">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
                        <div className="max-w-2xl text-center md:text-left">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white font-bold text-xs uppercase tracking-wider mb-3">
                                Start Eating Healthy
                            </span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
                                Ready to eat healthier?
                            </h2>
                            <p className="text-emerald-50 text-base sm:text-lg leading-relaxed font-medium">
                                Fresh meals crafted by nutrition experts and delivered right to your doorstep. Start your wellness journey today.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto shrink-0">
                            <Link href="/services/order/1" className="w-full sm:w-auto">
                                <button className="w-full sm:w-auto px-8 py-4 bg-white text-emerald-700 font-bold text-base rounded-full shadow-lg hover:bg-emerald-50 hover:shadow-xl active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer">
                                    <span>Order Now</span>
                                    <ArrowRight size={18} strokeWidth={2.5} />
                                </button>
                            </Link>
                            <Link href="/services/cookbook/1" className="w-full sm:w-auto">
                                <button className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white/80 text-white font-bold text-base rounded-full hover:bg-white/10 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer">
                                    Browse Menu
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Premium Standalone Footer Container */}
            <div className="max-w-7xl mx-auto bg-white rounded-[32px] sm:rounded-[40px] shadow-[0_30px_100px_-15px_rgba(13,59,49,0.08)] border border-slate-100/80 border-t-[6px] border-emerald-600 -mt-16 sm:-mt-20 pt-28 sm:pt-36 pb-12 px-6 sm:px-12 lg:px-16 relative z-10">
                
                {/* 3. Four Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
                    
                    {/* Column 1 – Brand */}
                    <div className={`${brandSpan} flex flex-col items-start`}>
                        <div className="flex items-center gap-2 mb-6">
                            <Image
                                src="/Fitmeals-logo.png"
                                height={40}
                                width={40}
                                alt="FitMeals Logo"
                                className="rounded-xl shadow-md bg-white p-0.5"
                            />
                            <span className="text-2xl font-extrabold text-[#0D3B31] tracking-tight">
                                FitMeals
                            </span>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed mb-8 max-w-sm font-medium">
                            Nutritious meals made fresh daily to help you live healthier, save precious time, and feel your absolute best.
                        </p>
                        
                        {/* Social Icons */}
                        <div className="flex items-center gap-3">
                            {[
                                { icon: <Facebook size={18} strokeWidth={2.5} />, url: "https://facebook.com" },
                                { icon: <Instagram size={18} strokeWidth={2.5} />, url: "https://instagram.com" },
                                { icon: <Twitter size={18} strokeWidth={2.5} />, url: "https://twitter.com" },
                                { icon: <Linkedin size={18} strokeWidth={2.5} />, url: "https://linkedin.com" }
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-500 hover:text-emerald-600 hover:border-emerald-200 hover:shadow-md active:scale-95 transition-all duration-300"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2 – Quick Links */}
                    <div className="lg:col-span-2">
                        <h3 className="text-sm font-extrabold text-[#0D3B31] uppercase tracking-wider mb-6">
                            Quick Links
                        </h3>
                        <ul className="space-y-4">
                            {quickLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.path}
                                        className="text-gray-600 hover:text-emerald-600 text-sm font-semibold transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3 – Services / Management */}
                    {hasSecondColumn && (
                        <div className="lg:col-span-2">
                            <h3 className="text-sm font-extrabold text-[#0D3B31] uppercase tracking-wider mb-6">
                                {secondColumnTitle}
                            </h3>
                            <ul className="space-y-4">
                                {secondColumnLinks.map((service) => (
                                    <li key={service.label}>
                                        <Link
                                            href={service.path}
                                            className="text-gray-600 hover:text-emerald-600 text-sm font-semibold transition-colors duration-200"
                                        >
                                            {service.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Column 4 – Contact Information */}
                    <div className={`${contactSpan} bg-[#fcfbf7] rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-[0_15px_40px_rgba(0,0,0,0.01)]`}>
                        <h3 className="text-sm font-extrabold text-[#0D3B31] uppercase tracking-wider mb-6">
                            Contact Info
                        </h3>
                        <ul className="space-y-4 font-semibold text-sm text-gray-600">
                            <li className="flex items-start gap-3">
                                <Mail size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                                <a href="mailto:m6783321@gmail.com" className="hover:text-emerald-600 transition-colors font-medium">
                                    m6783321@gmail.com
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                                <a href="tel:+7993625522" className="hover:text-emerald-600 transition-colors font-medium">
                                    +91 7993625522
                                </a>
                            </li>
                            <li className="flex items-start gap-3 font-medium">
                                <MapPin size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                                <span>123 Health Ave, San Francisco, CA 94103</span>
                            </li>
                            <li className="flex items-start gap-3 font-medium">
                                <Clock size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                                <span>Mon - Sun: 7:00 AM - 10:00 PM</span>
                            </li>
                            <li className="flex items-start gap-3 font-medium">
                                <Headphones size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                                <span className="text-emerald-700 font-bold">24/7 Premium Support Available</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* 4. Newsletter Section (Separate Elevated Card) */}
                <div className="mb-16">
                    <div className="bg-[#fcfbf7] rounded-[24px] p-6 sm:p-8 md:p-10 border border-slate-100 shadow-[0_15px_40px_rgba(13,59,49,0.02)] flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="max-w-md text-center lg:text-left">
                            <h3 className="text-xl font-extrabold text-[#0D3B31] mb-2 tracking-tight">
                                Stay Updated
                            </h3>
                            <p className="text-gray-500 text-sm font-medium">
                                Subscribe to our newsletter for healthy recipes, nutrition tips, and exclusive discount offers.
                            </p>
                        </div>

                        <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch gap-3 max-w-lg lg:min-w-[450px]">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address"
                                className="flex-1 bg-white border border-slate-200 rounded-full px-6 py-4 text-sm text-gray-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all duration-300 outline-none shadow-inner"
                            />
                            <button
                                type="submit"
                                className="px-8 py-4 bg-emerald-600 text-white font-bold text-sm rounded-full hover:bg-emerald-700 active:scale-95 shadow-md shadow-emerald-600/15 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                            >
                                <span>Subscribe</span>
                                <Send size={14} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* 5. Trust Indicators Row (Centered Premium Feature Cards) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {[
                        {
                            icon: <Leaf size={20} className="text-emerald-600" />,
                            title: "Healthy Ingredients",
                            desc: "100% organic & farm-fresh sourcing"
                        },
                        {
                            icon: <UserCheck size={20} className="text-emerald-600" />,
                            title: "Expert Nutritionists",
                            desc: "Diets approved by certified experts"
                        },
                        {
                            icon: <Truck size={20} className="text-emerald-600" />,
                            title: "Fast Delivery",
                            desc: "Direct to your doorstep daily"
                        },
                        {
                            icon: <ShieldCheck size={20} className="text-emerald-600" />,
                            title: "Secure Payments",
                            desc: "Safe & fully encrypted checkouts"
                        }
                    ].map((item, index) => (
                        <div key={index} className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-[0_10px_35px_rgba(0,0,0,0.01)] hover:shadow-[0_15px_45px_rgba(13,59,49,0.04)] transition-all duration-300 flex flex-col items-center text-center group">
                            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors duration-300">
                                {item.icon}
                            </div>
                            <h4 className="font-extrabold text-[#0D3B31] text-sm mb-1.5">
                                {item.title}
                            </h4>
                            <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* 6. Bottom Bar */}
                <div className="border-t border-slate-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-gray-400">
                    <div>
                        © 2026 FitMeals. All rights reserved.
                    </div>
                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="hover:text-emerald-600 transition-colors duration-200">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-emerald-600 transition-colors duration-200">
                            Terms of Service
                        </Link>
                        <Link href="/cookies" className="hover:text-emerald-600 transition-colors duration-200">
                            Cookie Policy
                        </Link>
                    </div>
                </div>

            </div>

        </div>
    );
}
