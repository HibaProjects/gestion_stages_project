import React from 'react';
import { Menu } from "@headlessui/react";
import { Link } from "@inertiajs/react";

export default function LangToggle() {
    const classNames = 'flex items-center gap-x-3 w-full text-left text-sm px-4 py-2 hover:bg-gray-200 hover:text-gray-900 transition-colors duration-200';

    return (
        <Menu className="relative text-gray-500 mt-1" as={'div'}>
            <Menu.Button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mx-3 my-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
                </svg>
            </Menu.Button>
            <Menu.Items className="absolute w-32 right-0 top-full mt-2 border shadow-sm bg-white">
                <Menu.Item>
                    <Link className={classNames} href={route('language.store')} data={{ language: 'en' }}
                          method="post" as="button">
                        <span>🇺🇸</span>
                        <span>English</span>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link className={classNames} href={route('language.store')} data={{ language: 'ar' }}
                          method="post" as="button">
                        <span>ar</span>
                        <span>Arabic</span>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link className={classNames} href={route('language.store')} data={{ language: 'fr' }}
                          method="post" as="button">
                        <span>fr</span>
                        <span>French</span>
                    </Link>
                </Menu.Item>
            </Menu.Items>
        </Menu>
    )
}
