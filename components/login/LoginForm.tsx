"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    email: string;
    contrasena: string;
};

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data);
        const res = await fetch("http://localhost:8080/api/v1/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: data.email,
                password: data.contrasena,
            }),
        });
        data = await res.json();

        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-md w-full max-w-sm shadow-md">
            <legend className="text-3xl font-bold text-white text-center mb-2">Iniciar Sesión</legend>

            {/* Email */}
            <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-sm text-gray-300">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    placeholder="correo@gmail.com"
                    aria-invalid={errors.email ? "true" : "false"}
                    {...register("email", {
                        required: "Email es requerido.",
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Formato de email inválido.",
                        },
                    })}
                    className={`p-2 rounded-md bg-white/10 border text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition
                        ${errors.email ? "border-red-400" : "border-white/20"}
                    `}
                />
                {errors.email && (
                    <span role="alert" className="text-red-400 text-sm">
                        {errors.email.message}
                    </span>
                )}
            </div>

            {/* Contraseña */}
            <div className="flex flex-col gap-1">
                <label htmlFor="contrasena" className="text-sm text-gray-300">
                    Contraseña
                </label>
                <input
                    type="password"
                    id="contrasena"
                    placeholder="**************"
                    aria-invalid={errors.contrasena ? "true" : "false"}
                    {...register("contrasena", {
                        required: "Contraseña es requerida.",
                    })}
                    className={`p-2 rounded-md bg-white/10 border text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition
                        ${errors.contrasena ? "border-red-400" : "border-white/20"}
                    `}
                />
                {errors.contrasena && (
                    <span role="alert" className="text-red-400 text-sm">
                        {errors.contrasena.message}
                    </span>
                )}
            </div>

            {/* Botón */}
            <button type="submit" className="w-full py-2 rounded-md bg-amber-500 hover:bg-amber-600 text-black font-semibold transition">
                Entrar
            </button>
        </form>
    );
}
