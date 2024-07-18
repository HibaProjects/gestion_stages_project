import React, { useMemo, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Tabs, Tab } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Modal from "@/Components/ModalEtudiants";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import {
    MaterialReactTable,
    useMaterialReactTable,
} from "material-react-table";
import data from "../../../storage/app/json_data/dataadmin.json";
import { __ } from "@/Libs/Lang";
export default function Dashboard({ auth, authenticated, role_id }) {
    const translatedHeader = (key) => {
        return __([key]) || key.charAt(0).toUpperCase() + key.slice(1);
    };
    let tabs = [
        {
            id: __("etudiants"),
            label: __("etudiants"),
            content: "",
        },
        {
            id: __("formateurs"),
            label: __("formateurs"),
            content: "",
        },
    ];
    const [tableData, setTableData] = useState(data.etudiantsdata);
    const [tableDataFormateurs, setTableDataFormateurs] = useState(
        data.formateursdata
    );

    const [selectedUser, setSelectedUser] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const handleShowDetails = (user) => {
        console.log(user);
        setSelectedUser(user);
        setModalOpen(true);
    };
    const handleCloseModal = () => {
        setModalOpen(false);
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
    //----

    const columnsFormateurs = useMemo(() => {
        const Fields = ["name", "email"];
        return Fields.map((key) => {
            return {
                accessorKey: key,
                header: translatedHeader(key),
            };
        });
    });
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
                                type="button"
                                className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3.5 py-2 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-800"
                                onClick={() => generatePdf(row)}
                            >
                                {__("export")}
                            </button>
                        </div>
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
    });
    const tableE = useMaterialReactTable({
        columns: columns,
        data: tableData,
        muiPaginationProps: {
            color: "primary",
            shape: "rounded",
            showRowsPerPage: false,
            variant: "outlined",
        },
        paginationDisplayMode: "pages",
    });
    const tableF = useMaterialReactTable({
        columns: columnsFormateurs,
        data: tableDataFormateurs,
        muiPaginationProps: {
            color: "primary",
            shape: "rounded",
            showRowsPerPage: false,
            variant: "outlined",
        },
        paginationDisplayMode: "pages",
    });
    return (
        <AuthenticatedLayout
            user={auth.user}
            authenticated={authenticated}
            role_id={role_id}
        >
            <Head title="Dashboard" />
            <div className="tableaux-admin">
                <Tabs
                    aria-label="Dynamic tabs"
                    items={tabs}
                    className="flex justify-center"
                >
                    {(item) => (
                        <Tab key={item.id} title={item.label}>
                            {item.id === __("etudiants") && (
                                <>
                                    <MaterialReactTable table={tableE} />
                                    <Modal
                                        isOpen={modalOpen}
                                        onClose={handleCloseModal}
                                        user={selectedUser}
                                    />
                                </>
                            )}
                            {item.id === __("formateurs") && (
                                <>
                                    <MaterialReactTable table={tableF} />
                                </>
                            )}
                        </Tab>
                    )}
                </Tabs>
            </div>
        </AuthenticatedLayout>
    );
}
