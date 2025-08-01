import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import SelectInput from "@/Components/SelectInput";
import { __ } from "@/Libs/Lang";

export default function Register() {

    const options = ["formateur", "etudiant"];
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        type: "formateur",
        apogee: null,
        email: "",
        password: "",
        password_confirmation: "",
    });
console.log(data);
    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("register"));
    };

    return (
        <GuestLayout>
            <Head title={__('registerTitle')} />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value={__('name')} />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full "
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="type" value={__('typeLabel')} />
                    <SelectInput
                        id="type"
                        name="type"
                        value={data.type}
                        options={options}
                        className="mt-1 block w-full "
                        autoComplete="type"
                        isFocused={false}
                        onChange={(e) => setData("type", e.target.value)}
                        required
                    />
                    <InputError message={errors.type} className="mt-2" />
                </div>
                {data.type === "etudiant" && (
                    <div className="mt-4 ">
                        <InputLabel htmlFor="Apogee" value="Apogee" />
                        <TextInput
                            id="Apogee"
                            type="apogee"
                            name="apogee"
                            value={data.apogee}
                            className="mt-1 block  w-full h-10  focus:ring-opacity-500"
                            onChange={(e) => setData("apogee", e.target.value)}
                        />
                        <InputError message={errors.apogee} className="mt-2" />
                    </div>
                )}
                <div className="mt-4">
                    <InputLabel htmlFor="email"  value={__('email')}  />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value={__('password')} />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData("password", e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value={__('confirm')}
                    />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData("password_confirmation", e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route("login")}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                       { __('already')}
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        {__('register')}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
