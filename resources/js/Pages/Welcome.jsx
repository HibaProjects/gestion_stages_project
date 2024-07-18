import { Link, Head } from "@inertiajs/react";
import { Card } from "flowbite-react";
import { __ } from "@/Libs/Lang";
import Footer from "@/Components/MyFooter";
import LangToggle from "@/Components/LangToggle";
import { useRef } from "react";

export default function Welcome({
    canLogin,
    canRegister,
    laravelVersion,
    phpVersion,
    authenticated,
    role_id,
}) {
    console.log(authenticated, role_id);
    const firstDivRef = useRef(null);
    const handleScroll = () => {
        firstDivRef.current.scrollIntoView({ behavior: "smooth" });
    };
    const getDashboardURL = (role_id) => {
        switch (role_id) {
            case 1:
                return "/dashboardAdmin";
            case 2:
                return "/dashboardFormateur";
            case 3:
                return "/dashboardEtudiant";
            default:
                return "/";
        }
    };
    console.log(role_id);
    const dashboardURL = getDashboardURL(role_id);
    console.log(dashboardURL);
    return (
        <>
            <div className="container w-full flex ">
                <nav className=" bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
                        <p
                            href="#"
                            className="flex items-center space-x-3 rtl:space-x-reverse"
                        >
                            <img
                                src="my logoo final.jpg"
                                width="105px"
                                height="105px"
                                alt="Logo"
                            />
                        </p>

                        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                            <LangToggle />
                            {authenticated == 1 ? (
                                <Link
                                    href={`${dashboardURL}`}
                                    className="flex-1  items-center rounded-md mr-8 py-3 px-7 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300  w-200px dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
                                >
                                    {__("espaceM")}
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="text-white flex items-center p-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        <svg
                                            class="flex-shrink-0 text-white w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 18 16"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                                            />
                                        </svg>
                                        <span className="flex-1 ms-3 whitespace-nowrap">
                                            {__("login")}
                                        </span>
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="text-white flex items-center p-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        <svg
                                            class="flex-shrink-0 text-white w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                                            <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                                            <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                                        </svg>
                                        <span className="flex-1 ms-3 whitespace-nowrap">
                                            {__("register")}
                                        </span>
                                    </Link>
                                </>
                            )}
                        </div>
                        <div
                            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                            id="navbar-sticky"
                        >
                            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                <li>
                                    <a
                                        href="#"
                                        className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                                        aria-current="page"
                                    >
                                        {__("home")}
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                    >
                                        {__("about")}
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="#"
                                        className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                                    >
                                        {__("contact")}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="item2 py-1 bg-dark md:flex-grow  mx-auto w-full  border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="banner-card">
                        <img
                            src="grad-students-throwing-hats-in-the-air.jpg"
                            alt="image card"
                        />
                    </div>
                    <div className="banner-text">
                        <h4>{__("Dashboard")}</h4>
                        <p>{__("plateforme")}</p>
                        <button
                            className=" custom-button relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group focus-outline-none  hover:bg-gradient-to-br from-green-400 to-blue-600   hover:text-white dark:text-white  focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                            onClick={handleScroll}
                        >
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-transparent dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                {__("commencer")}
                            </span>
                        </button>
                    </div>
                </div>
                <div className="item3 " ref={firstDivRef}>
                    <Card
                        className="min-h-full  sm-w-5000 sm-h-900"
                        imgSrc="bgcardhorizontale.jpg"
                        horizontal
                    >
                        <div>
                            <h1 className="text-3xl lexend-deca-propos font-bold text-left tracking-tight text-gray-900 dark:text-white">
                                {__("apropos")}
                            </h1>
                            <h5 className="text-2xl pt-6 font-bold tracking-tight text-left  text-blue-900 dark:text-white">
                                {__("title")}
                            </h5>
                            <p className="font-normal pt-4 text-gray-700 dark:text-gray-400">
                                {__("descriptionProjet")}
                            </p>
                        </div>
                    </Card>
                </div>

                <div className="item4 sm-mt-custom  ">
                    <Footer />
                </div>
            </div>
        </>
    );
}
