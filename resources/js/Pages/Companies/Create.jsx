import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, useForm, Link } from '@inertiajs/inertia-react';

export default function Dashboard(props) {

    const { data, setData, errors, post } = useForm({
        name: "",
        logo: "",
        email: "",
        website: "",
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route("companies.store"));
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Create Company</h2>}
        >
            <Head title="Companies" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">

                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
                                    href={route("companies.index")}
                                >
                                    Back
                                </Link>
                            </div>

                            <form name="createForm" onSubmit={handleSubmit} encType='multipart/form-data'>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Name"
                                            name="name"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.name}
                                        </span>
                                    </div>

                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">Email</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Email"
                                            name="email"
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.email}
                                        </span>
                                    </div>

                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">Logo</label>
                                        <input type='file' className="w-full px-4 py-2"
                                            label="Logo"
                                            name="logo"
                                            onChange={(e) =>
                                                setData("logo", e.target.files[0])
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.logo}
                                        </span>
                                    </div>

                                </div>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">Website</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Website"
                                            name="website"
                                            value={data.website}
                                            onChange={(e) =>
                                                setData("website", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.website}
                                        </span>
                                    </div>

                                </div>
                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
