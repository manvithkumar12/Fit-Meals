"use client";

import React, { useState } from "react";
import PopUpButton from "../General/Button/PopUpButton";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowRight, ShieldCheck, Loader2 } from "lucide-react";
import { getSupabase } from "@/src/lib/supabase";
import { toast } from "react-toastify";

const LoginWithOtp = () => {
  const t = useTranslations("LoginPage");

  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = getSupabase();

    if (!email) return;

    try {
      setLoading(true);

      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_BASE_URL + "/en/auth-success",
        },
      });

      if (error) {
        toast.error(error.message);
        console.log(error);
        return;
      }

      toast.success("Magic login link sent successfully");

      setStep(2);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PopUpButton btnTxt={t("body.login_with_otp")}>
      <div className="relative w-[320px] sm:w-95 overflow-hidden rounded-xl bg-white p-2 sm:p-4 text-slate-800 font-sans">
        <div className="absolute -top-10 -left-10 h-32 w-32 rounded-full bg-green-200/50 blur-3xl"></div>

        <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-green-300/40 blur-3xl"></div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: 20,
              }}
              transition={{
                duration: 0.3,
              }}
              className="relative z-10 flex flex-col items-center"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600 shadow-inner">
                <ShieldCheck size={28} strokeWidth={2} />
              </div>

              <h2 className="mb-1 text-2xl font-bold tracking-tight text-gray-900">
                Welcome Back
              </h2>

              <p className="mb-6 text-center text-sm text-gray-500">
                Enter your email to receive a secure login link
              </p>

              <form onSubmit={handleSendMagicLink} className="w-full">
                <div className="relative mb-5">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                    <Mail size={18} />
                  </div>

                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-xl border border-gray-200 bg-gray-50 p-3.5 pl-11 text-sm outline-none transition-all focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-500/20"
                    placeholder="Enter your email"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !email}
                  className="group relative flex w-full items-center justify-center overflow-hidden rounded-xl bg-linear-to-r from-green-500 to-green-600 p-3.5 text-sm font-semibold text-white shadow-lg shadow-green-500/30 transition-all hover:scale-[1.02] hover:shadow-green-500/40 disabled:opacity-70 disabled:hover:scale-100"
                >
                  {loading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      Send Magic Link
                      <ArrowRight
                        size={16}
                        className="ml-2 transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-gray-400">
                <ShieldCheck size={14} />

                <span>Secure and encrypted authentication</span>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: 20,
              }}
              transition={{
                duration: 0.3,
              }}
              className="relative z-10 flex flex-col items-center"
            >
              <div className="mb-4 mt-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600 shadow-inner">
                <Mail size={28} strokeWidth={2} />
              </div>

              <h2 className="mb-2 text-2xl font-bold text-gray-900">
                Check Your Email
              </h2>

              <p className="mb-6 text-center text-sm text-gray-500">
                We sent a secure login link to
                <br />
                <span className="font-medium text-gray-800">{email}</span>
              </p>

              <div className="w-full rounded-xl bg-green-50 p-4 text-center text-sm text-green-700">
                Open your Gmail and click the magic login link to continue.
              </div>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="mt-5 text-sm font-medium text-green-600"
              >
                Use another email
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PopUpButton>
  );
};

export default LoginWithOtp;
