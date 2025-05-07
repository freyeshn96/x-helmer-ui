'use client';

import { SignInWithSupabase } from "@/core/actions/auth/login.action";
import { useActionState } from "react";

const LoginForm = () => {
    const [state, formAction, pending] = useActionState(SignInWithSupabase, {
        email: '',
        password: '',
        error: undefined,
    });

    return (
        <div className="flex flex-col w-2/3">
            <form action={formAction} className="flex flex-col gap-y-4">
                <span className="font-montserrat font-semibold text-[36px] text-black">
                    Welcome to Avara
                </span>
                <span className="font-montserrat font-medium text-[24px] text-black opacity-40">
                    Complete Login
                </span>

                <input
                    name="email"
                    className="border border-gray-400 rounded-md pl-2 py-2.5"
                    type="email"
                    placeholder="Email"
                    required
                />
                <input
                    name='password'
                    className="border border-gray-400 rounded-md pl-2 py-2.5"
                    type="password"
                    placeholder="Password"
                    required
                />
                {
                    state.error && (
                        <div className="text-red-500 text-sm font-medium">
                            Invalid email or password.
                        </div>
                    )}

                {<button
                    className={`bg-[#ABD1F5] text-black rounded-md py-3 ${pending ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    type="submit"
                    disabled={pending}
                >
                    {pending ? "Logging in..." : "Login"}
                </button>}
            </form>
        </div>
    );
};

export default LoginForm;
