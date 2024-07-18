import React, { useState } from "react";
import { __ } from "@/Libs/Lang";
const NoteInput = ({ row, onNoteSubmit }) => {
    const [note, setNote] = useState("");

    const handleNoteChange = (e) => {
        setNote(e.target.value);
    };

    const handleNoteSubmit = () => {
        onNoteSubmit(row, note, () => {
            setNote("");
        });
    };

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <input
                type="text"
                value={note}
                onChange={handleNoteChange}
                style={{
                    width: "65px",
                    marginRight: "2px",
                    marginBottom: "6px",
                    borderRadius: "5px",
                    border: "1px solid black",
                }}
            />
            <button
                onClick={handleNoteSubmit}
                className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
            >
                {__("envoyer")}
            </button>
        </div>
    );
};

export default NoteInput;
