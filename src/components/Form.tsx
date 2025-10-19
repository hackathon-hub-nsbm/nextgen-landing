"use client";

import { useState, useRef } from "react"
import { UserType, UserSchema } from "@/types/user";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUser } from "@/actions/firebaseActions";

const fields = [
    {
        "id": 1,
        "field_name": "name",
        "type": "text",
        "label": "Name"
    },
    {
        "id": 2,
        "field_name": "email",
        "type": "email",
        "label": "Email Address"
    },
    {
        "id": 3,
        "field_name": "phone_number",
        "type": "tel",
        "label": "Phone Number"
    },
    {
        "id": 4,
        "field_name": "gender",
        "type": "select",
        "label": "Gender",
        "options": ["Male", "Female"]
    },
    {
        "id": 5,
        "field_name": "batch",
        "type": "select",
        "label": "Batch",
        "options": ["25.3", "25.2", "25.1", "24.3", "24.2", "24.1", "23.2", "23.1"]
    },
    {
        "id": 6,
        "field_name": "degree",
        "type": "select",
        "label": "Degree",
        "options": ["Artificial Intelligence", "Computer Science", "Data Science", "Computer Security", "Cyber Security", "Computer Networks", "Software Engineering", "Technology Management", "Management Information Systems"]
    },
    {
        "id": 7,
        "field_name": "isMember",
        "type": "radio",
        "label": "Are you already a member?",
        "options": ["Yes", "No"]
    },
];

const Form = () => {
    const containerFormRef = useRef<HTMLFormElement>(null);

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitMessage, setSubmitMessage] = useState<{
        type: 'success' | 'error'
        | null, message: string
    }>({ type: null, message: '' });

    const { register, handleSubmit, formState: { errors }, reset } = useForm<UserType>({
        // @ts-expect-error - Zod resolver type compatibility issue with react-hook-form
        resolver: zodResolver(UserSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            phone_number: "",
            gender: undefined,
            batch: undefined,
            degree: undefined,
            isMember: undefined,
        }
    })

    const onSubmit: SubmitHandler<UserType> = async (data) => {
        setIsSubmitting(true);
        setSubmitMessage({ type: null, message: '' });

        try {
            console.log(data);
            const result = await createUser(data);
            if (result) {
                setSubmitMessage({ type: 'success', message: 'Registration successful!' });
            } else {
                setSubmitMessage({ type: 'error', message: 'Registration failed!' });
            }
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'An error occurred during registration.';
            setSubmitMessage({ type: 'error', message: errorMessage || 'An error occurred during registration.' });
        } finally {
            setIsSubmitting(false);
            reset();
        }
    }

    return (
        <section className="flex justify-center items-center min-h-screen bg-black text-black">
            <form
                onSubmit={handleSubmit(onSubmit)}
                ref={containerFormRef}
                className="bg-gray-100 shadow-lg rounded-2xl p-8 w-full max-w-2xl border border-gray-300"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {fields.filter(f => f.type !== "radio").map(field => (
                        <div key={field.id} className="flex flex-col">
                            <label className="mb-2 font-semibold">{field.label}</label>
                            {field.type === "select" ? (
                                <select
                                    {...register(field.field_name as keyof UserType)}
                                    className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                >
                                    <option value="">Select {field.label}</option>
                                    {field.options?.map((option, index) => (
                                        <option key={index}>{option}</option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type={field.type}
                                    {...register(field.field_name as keyof UserType)}
                                    className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                />
                            )}
                            <p className="text-red-600 text-sm mt-1">{errors[field.field_name as keyof UserType]?.message}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <label className="block mb-3 font-semibold">Are you already a member?</label>
                    <div className="flex justify-center gap-8">
                        {fields.find(f => f.field_name === "isMember")?.options?.map((option, index) => (
                            <label key={index} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    value={option === "Yes" ? "true" : "false"}
                                    {...register("isMember", { setValueAs: v => v === "true" })}
                                    className="accent-gray-600"
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                    <p className="text-red-600 text-sm mt-1">{errors.isMember?.message}</p>
                </div>

                <div className="flex justify-center mt-8">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-10 py-3 font-bold rounded-md transition-all duration-300 bg-gray-600 text-white hover:bg-gray-700 disabled:opacity-70"
                    >
                        {isSubmitting ? "..." : "Register"}
                    </button>
                </div>

                {submitMessage.type && (
                    <div className={`mt-4 text-center p-2 rounded-md ${submitMessage.type === "success" ? "bg-green-400" : "bg-red-400"}`}>
                        {submitMessage.message}
                    </div>
                )}
                
            </form>
        </section>
    )

    //     const renderFormField = (field: typeof fields[number]) => {
    //         if (field.type === "radio") {
    //             return (
    //                 <div key={field.id} className="h-28">
    //                     <div>{field.label}</div>
    //                     <div className="flex gap-4">
    //                         {field.options?.map((option, index) => (
    //                             <label key={index} className="flex items-center gap-2">
    //                                 <input
    //                                     type="radio"
    //                                     value={option === "Yes" ? "true" : "false"}
    //                                     {...register(field.field_name as keyof UserType, {
    //                                         setValueAs: (value) => value === "true"
    //                                     })}
    //                                 />
    //                                 {option}
    //                             </label>
    //                         ))}
    //                     </div>
    //                     <div className="text-red-600">{errors[field.field_name as keyof UserType]?.message}</div>
    //                 </div>
    //             )
    //         }

    //         if (field.type === "select") {
    //             return (
    //                 <div key={field.id} className="h-28">
    //                     <div>{field.label}</div>
    //                     <select {...register(field.field_name as keyof UserType)} className="p-2 border-1 border-white w-full">
    //                         <option>Select {field.field_name}</option>
    //                         {field.options?.map((option, index) => (
    //                             <option key={index}>{option}</option>
    //                         ))}
    //                     </select>
    //                     <div className="text-red-600">{errors[field.field_name as keyof UserType]?.message}</div>
    //                 </div>
    //             )
    //         }
    //         else {
    //             return (
    //                 <div key={field.id} className="h-28">
    //                     <div>{field.label}</div>
    //                     <input {...register(field.field_name as keyof UserType)} type={field.type} className="p-2 border-1 border-white w-full" />
    //                     <div className="text-red-600">{errors[field.field_name as keyof UserType]?.message}</div>
    //                 </div>
    //             )
    //         }
    //     };

    //     return (
    //         <section>
    //             {/* @ts-expect-error - handleSubmit return type compatibility with form onSubmit handler */}
    //             <form onSubmit={handleSubmit(onSubmit)} ref={containerFormRef}>
    //                 {fields.map((field) => (
    //                     renderFormField(field)
    //                 ))}
    //                 <button
    //                     type="submit"
    //                     className="bg-white text-black p-4"
    //                     disabled={isSubmitting}
    //                 >
    //                     {isSubmitting ? (
    //                         "..."
    //                     ) : (
    //                         "Register"
    //                     )}
    //                 </button>
    //             </form>
    //             {submitMessage.type && (
    //                 <div className={` ${submitMessage.type === 'success'
    //                     ? 'bg-green-600'
    //                     : 'bg-red-600'
    //                     }`}>
    //                     {submitMessage.message}
    //                 </div>
    //             )}
    //         </section>
    //     )
}

export default Form
