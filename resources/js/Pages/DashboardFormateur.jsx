import { Head } from "@inertiajs/react";
import { useMemo, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import {
    MaterialReactTable,
    useMaterialReactTable,
} from "material-react-table";
import data from "../../../storage/app/json_data/data.json";
import Modal from "@/Components/MyModal";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { __ } from "@/Libs/Lang";
import NoteInput from "@/Components/NoteInput";

const DashboardFormateur = ({ auth, authenticated, role_id }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [tableData, setTableData] = useState(data.usersdata);

    const handleShowDetails = (user) => {
        console.log(user);
        setSelectedUser(user);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleValidate = (row) => {
        fetch(`/validate-stage/${row.original.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content"),
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Stage validated successfully:", data);
                const updatedTableData = tableData.map((user) => {
                    if (user.id === row.original.id) {
                        return {
                            ...user,
                            etat: data.newEtat,
                        };
                    } else {
                        return user;
                    }
                });
                setTableData(updatedTableData);
            })
            .catch((error) => {
                console.error("Error validating stage:", error);
            });
    };

    const generatePdf = (row) => {
        const doc = new jsPDF();
        const Data = row.original;
        console.log(Data.note);
        const tableData = [
            [
                Data.name,
                Data.email,
                Data.apogee,
                Data.intitule,
                Data.description,
                Data.etat,
                Data.count,
                Data.note,
            ],
        ];
        autoTable(doc, {
            head: [
                [
                    "Name",
                    "Email",
                    "Apogee",
                    "Intitulé",
                    "Description",
                    "Etat",
                    "Documents Remplis",
                    "Note",
                ],
            ],
            body: tableData,
        });
        doc.save(`${Data.name}_data.pdf`);
    };

    const handleEnvoiNote = (row, note, callback) => {
        fetch(`/note-stage/${row.original.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content"),
            },
            body: JSON.stringify({ note: note }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Note sent successfully:", data);
                const updatedTableData = tableData.map((user) => {
                    if (user.id === row.original.id) {
                        return {
                            ...user,
                            note: data.note,
                        };
                    } else {
                        return user;
                    }
                });
                setTableData(updatedTableData);
                callback();
            })
            .catch((error) => {
                console.error("Error sending note:", error);
            });
    };

    const translatedHeader = (key) => {
        return __([key]) || key.charAt(0).toUpperCase() + key.slice(1);
    };
    const columns = useMemo(() => {
        const Fields = [
            "name",
            "email",
            "apogee",
            "actions",
            "documents remplis",
            "etat",
            "note",
        ];

        return Fields.map((key) => {
            if (key === "actions") {
                return {
                    accessorKey: key,
                    header: __("ActionsT"),
                    Cell: ({ row }) => (
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <button
                                onClick={() => handleShowDetails(row)}
                                style={{ marginRight: "15px" }}
                            >
                                <FontAwesomeIcon icon={faEye} />
                            </button>
                            <button
                                type="submit"
                                className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                                onClick={() => handleValidate(row)}
                            >
                                {__("validerB")}
                            </button>
                            <button
                                type="button"
                                className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3.5 py-2 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-800"
                                onClick={() => generatePdf(row)}
                            >
                                {__("export")}
                            </button>
                        </div>
                    ),
                };
            } else if (key === "note") {
                return {
                    accessorKey: key,
                    header: __("note"),
                    Cell: ({ row }) => (
                        <NoteInput row={row} onNoteSubmit={handleEnvoiNote} />
                    ),
                };
            } else if (key === "documents remplis") {
                return {
                    accessorKey: key,
                    header: __("DocumentsFilledT"),
                    Cell: ({ row }) => (
                        <>
                            <p>{row.original.count}/5</p>
                        </>
                    ),
                };
            } else {
                return {
                    accessorKey: key,
                    header: translatedHeader(key),
                };
            }
        });
    }, []);

    return (
        <>
            <AuthenticatedLayout
                user={auth.user}
                authenticated={authenticated}
                role_id={role_id}
            >
                <Head title="Dashboard" />
                <div style={{ width: "95%", margin: "40px auto" }}>
                    <MaterialReactTable data={tableData} columns={columns} />
                </div>
                <Modal
                    isOpen={modalOpen}
                    onClickFct={() => handleValidate(selectedUser)}
                    onClose={handleCloseModal}
                    user={selectedUser}
                />
            </AuthenticatedLayout>
        </>
    );
};

export default DashboardFormateur;
