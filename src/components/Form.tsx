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
        <section className="flex justify-center items-center  text-white">
            <form
                onSubmit={handleSubmit(onSubmit)}
                ref={containerFormRef}
                className="relative p-10 w-full max-w-2xl rounded-2xl shadow-[0_0_20px_rgba(128,0,255,0.4)] border border-purple-500 bg-opacity-20 backdrop-blur-md"
            >
                {/* <h2 className="text-3xl font-bold text-center mb-6 neon-text">NextGen Hackers Registration</h2> */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {fields.filter(f => f.type !== "radio").map(field => (
                        <div key={field.id} className="flex flex-col">
                            <label className="mb-2 font-semibold tracking-wide text-cyan-300">{field.label}</label>
                            {field.type === "select" ? (
                                <select
                                    {...register(field.field_name as keyof UserType)}
                                    className="bg-black/30 border border-purple-500 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
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
                                    className="bg-black/30 border border-purple-500 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                                />
                            )}
                            <p className="text-red-400 text-sm mt-1">{errors[field.field_name as keyof UserType]?.message}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <label className="block mb-3 font-semibold text-cyan-300">Are you already a member?</label>
                    <div className="flex justify-center gap-8">
                        {fields.find(f => f.field_name === "isMember")?.options?.map((option, index) => (
                            <label key={index} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    value={option === "Yes" ? "true" : "false"}
                                    {...register("isMember", { setValueAs: v => v === "true" })}
                                    className="accent-purple-500"
                                />
                                <span className="hover:text-cyan-400">{option}</span>
                            </label>
                        ))}
                    </div>
                    <p className="text-red-400 text-sm mt-1">{errors.isMember?.message}</p>
                </div>

                <div className="flex justify-center mt-8">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="relative px-10 py-3 font-bold rounded-md text-white bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 shadow-[0_0_10px_rgba(0,255,255,0.5)] disabled:opacity-70"
                    >
                        {isSubmitting ? "..." : "Register"}
                    </button>
                </div>

                {submitMessage.type && (
                    <div
                        className={`mt-4 text-center p-3 rounded-md ${submitMessage.type === "success" ? "bg-green-600/40" : "bg-red-600/40"
                            }`}
                    >
                        {submitMessage.message}
                    </div>
                )}
            </form>
         
        </section>
    )
}

export default Form
