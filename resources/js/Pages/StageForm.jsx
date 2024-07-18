import { useForm, usePage } from "@inertiajs/react";
import { __ } from "@/Libs/Lang";
export default function StageForm() {
    const pageData = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        nom_entreprise: "",
        ville_entreprise: "",
        nom_employe: "",
        intitule: "",
        description: "",
        technologies: "",
    });
    const submit = (e) => {
        e.preventDefault();
        console.log(data);
        console.log(errors);
        post("/dashboardEtudiant/show");
    };
    return (
        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
            <form onSubmit={submit}>
                <div className="container max-w-screen-lg mx-auto ">
                    <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6 ">
                        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                            <div className="lg:col-span-2">
                                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                                    <div className="md:col-span-5">
                                        <h1 className=" text-blue-500 text-center text-bold text-xl">
                                            {__("ajoutS")}
                                        </h1>
                                    </div>
                                    <br />
                                    <div className="md:col-span-5">
                                        <label htmlFor="nom_entreprise">
                                            {__("nomE")}
                                        </label>
                                        <input
                                            type="text"
                                            name="nom_entreprise"
                                            id="nom_entreprise"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            onChange={(e) =>
                                                setData(
                                                    "nom_entreprise",
                                                    e.target.value
                                                )
                                            }
                                            value={data.nom_entreprise}
                                        />
                                        {errors.nom_entreprise && (
                                            <p className="text-red-500">
                                                {errors.nom_entreprise}
                                            </p>
                                        )}
                                    </div>

                                    <div className="md:col-span-5">
                                        <label htmlFor="ville">
                                            {__("villeE")}
                                        </label>
                                        <input
                                            type="text"
                                            name="ville_entreprise"
                                            id="ville"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            placeholder=""
                                            onChange={(e) =>
                                                setData(
                                                    "ville_entreprise",
                                                    e.target.value
                                                )
                                            }
                                            value={data.ville_entreprise}
                                        />
                                        {errors.ville_entreprise && (
                                            <p className="text-red-500">
                                                {errors.ville_entreprise}
                                            </p>
                                        )}
                                    </div>
                                    <div className="md:col-span-5">
                                        <label htmlFor="nom_employe">
                                            {__("encadrantE")}
                                        </label>
                                        <input
                                            type="text"
                                            name="nom_employe"
                                            id="nom_employe"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            placeholder=""
                                            onChange={(e) =>
                                                setData(
                                                    "nom_employe",
                                                    e.target.value
                                                )
                                            }
                                            value={data.nom_employe}
                                        />
                                        {errors.nom_employe && (
                                            <p className="text-red-500">
                                                {errors.nom_employe}
                                            </p>
                                        )}
                                    </div>
                                    <div className="md:col-span-5">
                                        <label htmlFor="intitule">
                                            {__("intitule")}
                                        </label>
                                        <input
                                            type="text"
                                            name="intitule"
                                            id="intitule"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            placeholder=""
                                            onChange={(e) =>
                                                setData(
                                                    "intitule",
                                                    e.target.value
                                                )
                                            }
                                            value={data.intitule}
                                        />
                                        {errors.intitule && (
                                            <p className="text-red-500">
                                                {errors.intitule}
                                            </p>
                                        )}
                                    </div>
                                    <div className="md:col-span-5">
                                        <label htmlFor="description">
                                            {__("description")}
                                        </label>
                                        <input
                                            type="text"
                                            name="description"
                                            id="description"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            placeholder=""
                                            onChange={(e) =>
                                                setData(
                                                    "description",
                                                    e.target.value
                                                )
                                            }
                                            value={data.description}
                                        />
                                        {errors.description && (
                                            <p className="text-red-500">
                                                {errors.description}
                                            </p>
                                        )}
                                    </div>
                                    <div className="md:col-span-5">
                                        <label htmlFor="technologies">
                                            {__("technologies")}
                                        </label>
                                        <input
                                            type="text"
                                            name="technologies"
                                            id="technologies"
                                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                            placeholder=""
                                            onChange={(e) =>
                                                setData(
                                                    "technologies",
                                                    e.target.value
                                                )
                                            }
                                            value={data.technologies}
                                        />
                                        {errors.technologies && (
                                            <p className="text-red-500">
                                                {errors.technologies}
                                            </p>
                                        )}
                                    </div>
                                    <div className="md:col-span-5 text-right">
                                        <div className="inline-flex items-end">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                type="submit"
                                                disabled={processing}
                                            >
                                                {__("envoyer")}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
