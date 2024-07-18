import React from "react";
import { __ } from "@/Libs/Lang";
import {
    FaFacebook,
    FaGithub,
    FaInstagram,
    FaTwitter,
} from "react-icons/fa";

const sections = [
    {
        items: ["About", "Contact"]
    },
   
];

const items = [
    { name: "Facebook", icon: FaFacebook, link: "https://www.facebook.com/" },
    {
        name: "Instagram",
        icon: FaInstagram,
        link: "https://www.instagram.com/",
    },
    { name: "Twitter", icon: FaTwitter, link: "https://twitter.com/" },
    { name: "Github", icon: FaGithub, link: "https://github.com/" },
];

const Footer = () => {
    return (
        <div className="w-full  bg-slate-900 text-gray-300  px-2">
            <div className="max-w-[1240px]  mx-auto grid grid-cols-2 md:grid-cols-4 border-b-2 border-gray-600 py-2">
                <div className="px-4 ">
                    <h6 className="font-bold uppercase pt-2 ">{__('descriptionn')}</h6>

                    <ul>
                        <li className="py-1 text-gray-500 hover:text-white">
                           {__('descriptionnF')}
                        </li>
                    </ul>
                </div>
                    <div className="pr-4 pl-24">
                        <h6 className="font-bold uppercase pt-2 ">
                            {__('other')}
                        </h6>
                        <ul>
                                <li
                                    className="py-1 text-gray-500 hover:text-white"
                                >
                                    {__('about')}
                                </li>
                                <li
                                    className="py-1 text-gray-500 hover:text-white"
                                >
                                    {__('contact')}
                                </li>
                        </ul>
                    </div>
                
            </div>

            <div className="flex flex-col max-w-[1240px] px-2 py-1 mx-auto justify-between sm:flex-row text-center text-gray-500">
                <p className="py-4">{__('copyright')}</p>
                <div className="flex justify-between sm:w-[300px] pt-4 text-2xl">
                    {items.map((x, index) => {
                        return (
                            <a key={index} href={x.link} className="hover:text-white">
                            <x.icon key={index} className="hover:text-white" />
                            </a>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Footer;
