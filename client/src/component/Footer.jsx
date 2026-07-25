import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <footer className="bg-[#f6f9fc] text-gray-500 px-6 md:px-16 lg:px-24 xl:px-32 text-sm">
            {/* Top Main Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 py-12 border-b border-gray-200">

                {/* Brand / Logo Info */}
                <div className="lg:col-span-4 pr-0 lg:pr-6">
                    <div className="flex items-center gap-2">
                        {/* <span className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-1.5">
              QuickStay
            </span> */}
                        <img src={assets.logo} alt="brand-logo"  className='invert opacity-80 mb-4 h-8 md:h-9' />

                    </div>
                    <p className="mt-4 leading-relaxed text-gray-500 text-xs md:text-sm">
                        Discover the world's most extraordinary places to stay, from boutique hotels to luxury villas and private islands.
                    </p>

                    {/* Social Icons */}
                    <div className="flex items-center gap-4 mt-6 text-gray-500">
                        <img src={assets.instagramIcon} className='w-6' alt="instagram-icon" />
                        <img src={assets.facebookIcon}  className='w-6' alt="facebook-icon" />
                        <img src={assets.twitterIcon} className='w-6'  alt="twitter-icon" />
                        <img src={assets.linkendinIcon} className='w-6'  alt="linkden-icon" />

                    </div>
                </div>

                {/* Company Links */}
                <div className="lg:col-span-2">
                    <h3 className="font-playfair font-normal text-[16px] leading-[100%] tracking-[0%] uppercase text-gray-500 mb-4">COMPANY</h3>
                    <ul className="space-y-2.5 font-normal text-gray-600">
                        <li><a href="#" className="hover:text-gray-900 transition">About</a></li>
                        <li><a href="#" className="hover:text-gray-900 transition">Careers</a></li>
                        <li><a href="#" className="hover:text-gray-900 transition">Press</a></li>
                        <li><a href="#" className="hover:text-gray-900 transition">Blog</a></li>
                        <li><a href="#" className="hover:text-gray-900 transition">Partners</a></li>
                    </ul>
                </div>

                {/* Support Links */}
                <div className="lg:col-span-2">
                    <h3 className="font-playfair font-normal text-[16px] leading-[100%] tracking-[0%] uppercase text-gray-500 mb-4">SUPPORT</h3>
                    <ul className="space-y-2.5 font-normal text-gray-600">
                        <li><a href="#" className="hover:text-gray-900 transition">Help Center</a></li>
                        <li><a href="#" className="hover:text-gray-900 transition">Safety Information</a></li>
                        <li><a href="#" className="hover:text-gray-900 transition">Cancellation Options</a></li>
                        <li><a href="#" className="hover:text-gray-900 transition">Contact Us</a></li>
                        <li><a href="#" className="hover:text-gray-900 transition">Accessibility</a></li>
                    </ul>
                </div>

                {/* Stay Updated / Newsletter */}
                <div className="lg:col-span-4">
                    <h3 className="font-playfair font-normal text-[16px] leading-[100%] tracking-[0%] uppercase text-gray-500 mb-4">STAY UPDATED</h3>
                    <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-4">
                        Subscribe to our newsletter for travel inspiration and special offers.
                    </p>

                    {/* Email Form */}
                    <div className="flex items-center max-w-sm">
                        <input
                            type="email"
                            className="w-full bg-white border border-gray-300 rounded-l-md h-10 px-3.5 text-gray-700 text-sm focus:outline-none focus:border-gray-400 placeholder-gray-400"
                            placeholder="Your email"
                        />
                        <button className="flex items-center justify-center bg-[#0d1527] hover:bg-black text-white h-10 w-10 min-w-10 rounded-r-md transition">
                            <img src={assets.arrowIcon}  className='w-3.5 inverts' alt="" />
                        </button>
                    </div>
                </div>

            </div>

            {/* Bottom Footer Section */}
            <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
                <p>© 2025 QuickStay. All rights reserved.</p>
                <div className="flex items-center gap-6">
                    <a href="#" className="hover:text-gray-900 transition">Privacy</a>
                    <a href="#" className="hover:text-gray-900 transition">Terms</a>
                    <a href="#" className="hover:text-gray-900 transition">Sitemap</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer