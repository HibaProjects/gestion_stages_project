import DashboardEtudiantLayout from "@/Layouts/DashboardEtudiantLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import axios from "axios";
import { PopUpStageM } from "@/Components/PopUpStageModifier";
import { PopUpStageD } from "@/Components/PopUpStageDelete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTable } from "@fortawesome/free-solid-svg-icons";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { __ } from "@/Libs/Lang";

const FileUploadForm = () => {
    const [files, setFiles] = useState({
        rapport: null,
        convention: null,
        presentation: null,
        fiche_appreciation: null,
        attestation: null,
    });
    const [uploadDone, setUploadDone] = useState(false);
    const [showAlertD, setShowAlertD] = useState(false);
    const [typesArray, setTypesArray] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get("/get-uploaded-file-names");
            console.log("Fetched data:", response.data.typesArray);

            setTypesArray(response.data.typesArray);
            console.log(typesArray);
        } catch (error) {
            console.error("Error fetching uploaded file names:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        let uploadTimeout;
        if (uploadDone) {
            uploadTimeout = setTimeout(() => {
                setUploadDone(false);
            }, 3000);
        }
        return () => clearTimeout(uploadTimeout);
    }, [uploadDone]);
    useEffect(() => {
        console.log(typesArray);
    }, [typesArray]);

    useEffect(() => {
        let deleteTimeout;
        if (showAlertD) {
            deleteTimeout = setTimeout(() => {
                setShowAlertD(false);
            }, 3000);
        }
        return () => clearTimeout(deleteTimeout);
    }, [showAlertD]);

    const handleFileChange = (event, type) => {
        setFiles({
            ...files,
            [type]: event.target.files[0],
        });
    };

    const handleFileDelete = async (type) => {
        try {
            const response = await axios.delete(
                `/dashboardEtudiant/delete-file/${type}`
            );
            console.log(response);
            if (response.status === 200) {
                setFiles({ ...files, [type]: null });

                setTypesArray(typesArray.filter((e) => e !== type));
                setShowAlertD(true);
                fetchData();
            } else {
                console.error("Error deleting file:", response.statusText);
            }
        } catch (error) {
            console.error("Error deleting file:", error.message);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const allFilesEmpty = Object.values(files).every(
            (file) => file === null
        );

        if (allFilesEmpty) {
            console.log("No files selected for upload.");
            setUploadDone(false);
            return;
        }

        const formData = new FormData();
        for (const key in files) {
            if (files[key]) {
                formData.append(key, files[key]);
            }
        }

        try {
            axios
                .post("/upload-files", formData)
                .then(() => {
                    setUploadDone(true);
                    fetchData();
                })
                .catch((error) => {
                    console.error("Error uploading files:", error);
                });
            setShowAlertD(false);
        } catch (error) {
            console.error("Error uploading files:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-10 formDocs">
            {uploadDone && (
                <div
                    className="p-4 mt-20 m-2 top-20 absolute max-w-500 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                    role="alert"
                >
                    <span className="font-medium">{__("succ")}</span>
                    {__("alertU")}
                </div>
            )}
            {showAlertD && (
                <div
                    className="p-4 mt-20 m-2 top-20 absolute max-w-500 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                    role="alert"
                >
                    <span className="font-medium">{__("succ")}</span>{" "}
                    {__("alertD")}
                </div>
            )}

            <div>
                {Object.keys(files).map((type, index) => (
                    <div key={index}>
                        <label className="block mb-1 underline">{type}</label>
                        {!typesArray.includes(type) ? (
                            <label className="bg-blue-500 hover:bg-blue-700 text-white ml-20 font-bold my-3 py-2 px-16 rounded inline-flex items-center">
                                <FontAwesomeIcon
                                    icon={faUpload}
                                    className="mr-2"
                                />
                                <span>{__("telech")}</span>
                                <input
                                    type="file"
                                    className="hidden"
                                    name={type}
                                    onChange={(event) =>
                                        handleFileChange(event, type)
                                    }
                                />
                            </label>
                        ) : (
                            <div>
                                <span>{typesArray[type]}</span>
                                <button
                                    type="button"
                                    className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                    onClick={() => handleFileDelete(type)}
                                >
                                    {__("supprimerB")}
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <button
                type="submit"
                className="text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br m-4 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
                {__("sav")}
            </button>
        </form>
    );
};
export default function Dashboard({
    auth,
    stage,
    etudiants,
    authenticated,
    role_id,
}) {
    console.log(authenticated, role_id);
    const data = usePage().props;
    console.log(data);

    const [toggleTableWelcome, setToggleTableWelcome] = useState(true);
    const [toggleStage, setToggleStage] = useState(false);
    const [toggleRapport, setToggleRapport] = useState(false);
    const [name, setName] = etudiants ? useState(auth.user.name) : "";
    const [apogee, setApogee] = etudiants ? useState(etudiants.apogee) : "";
    const [stageData, setStageData] = useState(stage ? stage : {});

    const handleTableDelete = async (id) => {
        try {
            const response = await axios.delete(
                `/dashboardEtudiant/deleteStg/${id}`
            );

            if (response.status === 200) {
                setStageData(null);
            } else {
                console.error("Error deleting stage:", response.statusText);
            }
        } catch (error) {
            console.error("Error deleting stage:", error.message);
        }
    };

    return (
        <DashboardEtudiantLayout
            user={auth.user}
            authenticated={authenticated}
            role_id={role_id}
        >
            <Head title="Dashboard" />

            <aside
                id="default-sidebar"
                className="fixed top-3 w-64 absolute flex-col flex min-h-screen  bg-gray-50 sm:translate-x-0 transition-transform -translate-x-full sm:translate-x-0"
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium ">
                        <li>
                            <Link
                                href={route("stage.ajout")}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <FontAwesomeIcon icon={faPenToSquare} />
                                <span className="ms-3">{__("ajoutS")}</span>
                            </Link>
                        </li>
                        <li
                            onClick={() => {
                                setToggleStage(true);
                                setToggleRapport(false);
                                setToggleTableWelcome(false);
                            }}
                        >
                            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FontAwesomeIcon icon={faTable} />
                                <span className="ms-3">{__("votreS")}</span>
                            </div>
                        </li>
                        <li
                            onClick={() => {
                                setToggleStage(false);
                                setToggleRapport(true);
                                setToggleTableWelcome(false);
                            }}
                        >
                            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <FontAwesomeIcon icon={faSquareCheck} />
                                <span className="ms-3">{__("deposer")}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </aside>

            <div className="p-4 px-8 flex flex-col w-full h-screen">
                <div className="welcome-stg  p-4 h-100 border-2 border-gray-200 border-solid rounded-lg dark:border-gray-700">
                    <button className="text-white ">
                        {__("salutationE")} {auth.user.name}
                    </button>
                </div>
                {toggleTableWelcome && (
                    <div className=" p-4 welcomeDivtable ">
                        {stageData ? (
                            <table className=" table-dashboard border-collapse border border-gray-300">
                                <tbody>
                                    <tr>
                                        <th>{__("etudiant")}</th>
                                        <td>{name}</td>
                                    </tr>
                                    <tr>
                                        <th>{__("apogee")}</th>
                                        <td>{apogee}</td>
                                    </tr>

                                    <tr>
                                        <th>{__("nomE")}</th>
                                        <td>{stageData.nom_entreprise}</td>
                                    </tr>

                                    <tr>
                                        <th>{__("villeE")}</th>
                                        <td>{stageData.ville_entreprise}</td>
                                    </tr>
                                    <tr>
                                        <th>{__("encadrantE")}</th>
                                        <td>{stageData.nom_employe}</td>
                                    </tr>
                                    <tr>
                                        <th>{__("intitule")}</th>
                                        <td>{stageData.intitule}</td>
                                    </tr>
                                    <tr>
                                        <th>{__("description")}</th>

                                        <td>{stageData.description}</td>
                                    </tr>
                                    <tr>
                                        <th>{__("technologies")}</th>

                                        <td>{stageData.technologies}</td>
                                    </tr>
                                </tbody>
                            </table>
                        ) : (
                            <p>{__("NoData")}</p>
                        )}
                    </div>
                )}
                {toggleStage && (
                    <div className=" p-4 stgDiv">
                        {stageData ? (
                            <table className=" table-dashboard border-collapse border border-gray-300">
                                <tbody>
                                    <tr>
                                        <th>{__("etudiant")}</th>
                                        <td>{name}</td>
                                    </tr>
                                    <tr>
                                        <th>{__("apogee")}</th>
                                        <td>{apogee}</td>
                                    </tr>

                                    <tr>
                                        <th>{__("nomE")}</th>
                                        <td>{stageData.nom_entreprise}</td>
                                    </tr>

                                    <tr>
                                        <th>{__("villeE")}</th>
                                        <td>{stageData.ville_entreprise}</td>
                                    </tr>
                                    <tr>
                                        <th>{__("encadrantE")}</th>
                                        <td>{stageData.nom_employe}</td>
                                    </tr>
                                    <tr>
                                        <th>{__("intitule")}</th>
                                        <td>{stageData.intitule}</td>
                                    </tr>
                                    <tr>
                                        <th>{__("description")}</th>

                                        <td>{stageData.description}</td>
                                    </tr>
                                    <tr>
                                        <th>{__("technologies")}</th>

                                        <td>{stageData.technologies}</td>
                                    </tr>
                                    <tr>
                                        <th>{__("actions")}</th>

                                        <td>
                                            {stageData.id ? (
                                                <Link
                                                    href={`/form/edit/${stageData.id}`}
                                                >
                                                    <button class="text-white bg-gradient-to-br from-green-400 to-emerald-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm  py-4 px-6 text-center mx-5">
                                                        {__("modifierB")}
                                                    </button>
                                                </Link>
                                            ) : (
                                                <button class="text-white bg-gradient-to-br from-green-400 to-emerald-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm  py-1 text-center mx-5">
                                                    <PopUpStageM />
                                                </button>
                                            )}
                                            {stageData.id ? (
                                                <button
                                                    type="button"
                                                    class="text-white bg-gradient-to-br from-red-400 to-orange-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-200 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-3.5 text-center mx-5"
                                                    onClick={() =>
                                                        handleTableDelete(
                                                            stageData.id
                                                        )
                                                    }
                                                >
                                                    {__("supprimerB")}
                                                </button>
                                            ) : (
                                                <button
                                                    type="button"
                                                    class="text-white bg-gradient-to-br from-red-400 to-orange-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-200 dark:focus:ring-red-800 font-medium rounded-lg text-sm py-1 text-center mx-5"
                                                >
                                                    <PopUpStageD />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        ) : (
                            <p>{__("NoData")}</p>
                        )}
                    </div>
                )}
                {toggleRapport && <FileUploadForm />}
            </div>
        </DashboardEtudiantLayout>
    );
}
