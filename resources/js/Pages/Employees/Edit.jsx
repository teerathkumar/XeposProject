import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head, useForm, usePage, Link } from '@inertiajs/inertia-react';

export default function Dashboard(props) {

    const { employee, companies } = usePage().props;
    const { data, setData, put, errors } = useForm({
        first_name: employee.first_name || "",
        last_name: employee.last_name || "",
        phone: employee.phone || "",
        email: employee.email || "",
        company_id: employee.company_id || "",
    });


    function handleSubmit(e) {
        e.preventDefault();
        put(route("employees.update", employee.id));
    }

    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Post</h2>}
        >
            <Head title="Employees" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">

                            <div className="flex items-center justify-between mb-6">
                                <Link
                                    className="px-6 py-2 text-white bg-blue-500 rounded-md focus:outline-none"
                                    href={route("employees.index")}
                                >
                                    Back
                                </Link>
                            </div>

                            <form name="createForm" onSubmit={handleSubmit}>
                                <div className="flex flex-col">
                                    <div className="mb-4">
                                        <label className="">First Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="First Name"
                                            name="first_name"
                                            value={data.first_name}
                                            onChange={(e) =>
                                                setData("first_name", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.first_name}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Last Name</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Last Name"
                                            name="last_name"
                                            value={data.last_name}
                                            onChange={(e) =>
                                                setData("last_name", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.last_name}
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <label className="">Phone</label>
                                        <input
                                            type="text"
                                            className="w-full px-4 py-2"
                                            label="Phone"
                                            name="phone"
                                            value={data.phone}
                                            onChange={(e) =>
                                                setData("phone", e.target.value)
                                            }
                                        />
                                        <span className="text-red-600">
                                            {errors.phone}
                                        </span>
                                    </div>
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
                                    <div className="mb-4">
                                        <label className="">Company</label>
                                        <select name='company_id' className="w-full px-4 py-2" onChange={(e) =>
                                            setData("company_id", e.target.value)
                                        }>
                                            <option value={""}>select</option>
                                            {
                                                companies.map((val) => {
                                                    return <option value={val.id}>{val.name}</option>
                                                })
                                            }

                                        </select>

                                        <span className="text-red-600">
                                            {errors.first_name}
                                        </span>
                                    </div>



                                </div>
                                <div className="mt-4">
                                    <button
                                        type="submit"
                                        className="px-6 py-2 font-bold text-white bg-green-500 rounded"
                                    >
                                        Update
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
