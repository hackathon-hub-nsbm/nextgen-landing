"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { useRef, useState } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { UserSchema, type UserType } from "@/types/user";
import { api } from "../../convex/_generated/api";

const fields = [
  {
    id: 1,
    field_name: "name",
    type: "text",
    label: "Name",
    placeholder: "Enter your full name",
  },
  {
    id: 2,
    field_name: "email",
    type: "email",
    label: "Email Address",
    placeholder: "you@example.com",
  },
  {
    id: 3,
    field_name: "phone_number",
    type: "tel",
    label: "Phone Number",
    placeholder: "07X XXX XXXX",
  },
  {
    id: 4,
    field_name: "gender",
    type: "select",
    label: "Gender",
    options: ["Male", "Female"],
  },
  {
    id: 5,
    field_name: "batch",
    type: "select",
    label: "Batch",
    options: [
      "26.2",
      "26.1",
      "25.4",
      "25.3",
      "25.2",
      "25.1",
      "24.3",
      "24.2",
      "24.1",
      "23.2",
      "23.1",
    ],
  },
  {
    id: 6,
    field_name: "degree",
    type: "select",
    label: "Degree",
    options: [
      "Artificial Intelligence",
      "Computer Science",
      "Data Science",
      "Computer Security",
      "Cyber Security",
      "Computer Networks",
      "Software Engineering",
      "Technology Management",
      "Management Information Systems",
    ],
  },
  {
    id: 7,
    field_name: "isMember",
    type: "radio",
    label: "Are you already a member?",
    options: ["Yes", "No"],
  },
];

const Form = () => {
  const containerFormRef = useRef<HTMLFormElement>(null);
  const createUser = useMutation(api.users.createUser);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserType>({
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
    },
  });

  const onSubmit: SubmitHandler<UserType> = async (data) => {
    setIsSubmitting(true);
    setSubmitMessage({ type: null, message: "" });

    try {
      const result = await createUser({
        name: data.name,
        email: data.email,
        phone_number: data.phone_number,
        gender: data.gender,
        batch: data.batch,
        degree: data.degree,
        isMember: data.isMember,
      });
      if (result) {
        setSubmitMessage({
          type: "success",
          message: "Registration confirmed. See you at NextGen.",
        });
        reset();
      } else {
        setSubmitMessage({
          type: "error",
          message: "Registration could not be completed. Please try again.",
        });
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred during registration.";
      setSubmitMessage({
        type: "error",
        message: errorMessage || "An error occurred during registration.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-full text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        ref={containerFormRef}
        noValidate
        className="relative p-6 sm:p-7 w-full max-w-2xl rounded-2xl bg-[#0a0e1a]/75 backdrop-blur-xl border border-purple-500/45 shadow-[0_16px_48px_rgba(126,34,206,0.28),inset_0_1px_0_0_rgba(255,255,255,0.14)]"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
          {fields
            .filter((f) => f.type !== "radio")
            .map((field) => {
              const fieldKey = field.field_name as keyof UserType;
              const errorMsg = errors[fieldKey]?.message;
              return (
                <div key={field.id} className="flex flex-col">
                  <label
                    htmlFor={field.field_name}
                    className="mb-1.5 text-sm font-semibold tracking-wide text-cyan-300"
                  >
                    {field.label}
                  </label>
                  {field.type === "select" ? (
                    <div className="relative">
                      <select
                        id={field.field_name}
                        {...register(fieldKey)}
                        className={`w-full h-11 appearance-none bg-[#060913]/75 border text-white text-sm px-3.5 pr-9 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/70 focus:border-cyan-400 cursor-pointer ${
                          errorMsg
                            ? "border-red-400/75"
                            : "border-purple-500/50 hover:border-purple-400/80"
                        }`}
                      >
                        <option value="" className="bg-[#0d1220] text-slate-400">
                          Select {field.label}
                        </option>
                        {field.options?.map((option) => (
                          <option key={option} value={option} className="bg-[#0d1220] text-white">
                            {option}
                          </option>
                        ))}
                      </select>
                      <svg
                        aria-hidden="true"
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-purple-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  ) : (
                    <input
                      id={field.field_name}
                      type={field.type}
                      placeholder={field.placeholder}
                      {...register(fieldKey)}
                      className={`w-full h-11 bg-[#060913]/75 border text-white text-sm px-3.5 rounded-lg placeholder:text-slate-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/70 focus:border-cyan-400 ${
                        errorMsg
                          ? "border-red-400/75"
                          : "border-purple-500/50 hover:border-purple-400/80"
                      }`}
                    />
                  )}
                  <p className="text-red-400 text-xs mt-1 min-h-[1rem] leading-tight">
                    {errorMsg ?? ""}
                  </p>
                </div>
              );
            })}
        </div>

        <div className="mt-3 text-center">
          <p className="block mb-2.5 text-sm font-semibold tracking-wide text-cyan-300">
            Are you already a member?
          </p>
          <Controller
            name="isMember"
            control={control}
            render={({ field }) => (
              <div className="flex justify-center gap-4">
                {fields
                  .find((f) => f.field_name === "isMember")
                  ?.options?.map((option) => {
                    const isYes = option === "Yes";
                    const isChecked = field.value === isYes;
                    return (
                      <label
                        key={option}
                        className={`flex items-center justify-center gap-2.5 px-6 py-2 rounded-lg border text-sm font-medium cursor-pointer transition-all duration-200 select-none ${
                          isChecked
                            ? "bg-purple-600/30 border-cyan-400 text-white shadow-[0_0_14px_rgba(34,211,238,0.28)]"
                            : "bg-[#060913]/60 border-purple-500/40 text-slate-300 hover:border-purple-400/80 hover:text-cyan-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name={field.name}
                          checked={isChecked}
                          onChange={() => field.onChange(isYes)}
                          onBlur={field.onBlur}
                          ref={field.ref}
                          className="sr-only"
                        />
                        <span
                          className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-colors ${
                            isChecked ? "border-cyan-400" : "border-purple-400/70"
                          }`}
                        >
                          {isChecked && (
                            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
                          )}
                        </span>
                        <span>{option}</span>
                      </label>
                    );
                  })}
              </div>
            )}
          />
          <p className="text-red-400 text-xs mt-1 min-h-[1rem]">{errors.isMember?.message ?? ""}</p>
        </div>

        <div className="flex justify-center mt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="relative inline-flex items-center justify-center gap-2 px-12 py-3 font-semibold tracking-wide rounded-lg text-white bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-cyan-500 hover:to-purple-600 active:scale-[0.98] transition-all duration-200 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_26px_rgba(34,211,238,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 disabled:opacity-65 disabled:pointer-events-none cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 animate-spin text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-90"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                <span>Registering...</span>
              </>
            ) : (
              "Register"
            )}
          </button>
        </div>

        {submitMessage.type && (
          <div
            role="status"
            className={`mt-4 text-center px-4 py-2.5 rounded-lg text-sm font-medium border backdrop-blur-md transition-all ${
              submitMessage.type === "success"
                ? "bg-emerald-950/60 border-emerald-400/50 text-emerald-200"
                : "bg-red-950/60 border-red-400/50 text-red-200"
            }`}
          >
            {submitMessage.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default Form;
