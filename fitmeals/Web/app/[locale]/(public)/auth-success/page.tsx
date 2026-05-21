"use client";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { getSupabase } from "@/src/lib/supabase";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Zap, Brain, Sparkles, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";

type Question = {
  text: string;
  answer: number;
  options: number[];
};

const generateQuestion = (): Question => {
  const ops = ["+", "-", "×", "÷"];

  const op = ops[Math.floor(Math.random() * ops.length)];
  let num1 = 0,
    num2 = 0,
    answer = 0;

  switch (op) {
    case "+":
      num1 = Math.floor(Math.random() * 50) + 1;
      num2 = Math.floor(Math.random() * 50) + 1;
      answer = num1 + num2;
      break;
    case "-":
      num1 = Math.floor(Math.random() * 50) + 20;
      num2 = Math.floor(Math.random() * 20) + 1;
      answer = num1 - num2;
      break;
    case "×":
      num1 = Math.floor(Math.random() * 12) + 2;
      num2 = Math.floor(Math.random() * 12) + 2;
      answer = num1 * num2;
      break;
    case "÷":
      num2 = Math.floor(Math.random() * 10) + 2;
      answer = Math.floor(Math.random() * 12) + 2;
      num1 = num2 * answer;
      break;
  }

  const options = [answer];
  while (options.length < 4) {
    const offset = Math.floor(Math.random() * 10) - 5;
    const wrongAnswer = answer + offset;
    if (
      wrongAnswer !== answer &&
      !options.includes(wrongAnswer) &&
      wrongAnswer > 0
    ) {
      options.push(wrongAnswer);
    }
  }

  return {
    text: `${num1} ${op} ${num2} = ?`,
    answer: answer,
    options: options.toSorted(() => Math.random() - 0.5),
  };
};

const motivationalTexts = [
  "Keep your brain active",
  "Login almost ready...",
  "Great job!",
  "Fast fingers!",
  "Warming up your mind...",
  "Setting things up...",
];

const AuthSuccessPage = () => {
  const router = useRouter();
  const supabase = getSupabase();

  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const locale = useLocale();
  const [question, setQuestion] = useState<Question | null>(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [progress, setProgress] = useState(0);
  const [motivationalText, setMotivationalText] = useState(
    motivationalTexts[0],
  );
  const [correctBurst, setCorrectBurst] = useState(false);

  // Initialize question on client side to avoid hydration mismatch
  useEffect(() => {
    setQuestion(generateQuestion());
  }, []);

  // Simulate progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // Timer for questions
  useEffect(() => {
    if (!question) return;

    if (timeLeft === 0) {
      setStreak(0);
      setQuestion(generateQuestion());
      setTimeLeft(10);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, question]);

  // Auth logic
  useEffect(() => {
    const handleLogin = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user?.email) {
          router.push("/en/login/Customer");
          return;
        }
        const res = await fetch("/api/auth/supabase-login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
          }),
        });
        if (!res.ok) {
          toast.error("Failed to login");
          router.push("/en/login/Customer");
          return;
        }
        setTimeout(() => {
          globalThis.location.href = `/${locale}/profile`;
        }, 800);
      } catch (error) {
        toast.error("Failed to login");
        router.push("/en/login/Customer");
      }
    };
    handleLogin();
  }, [router, locale]);

  const handleAnswer = (selected: number) => {
    if (!question) return;

    if (selected === question.answer) {
      setScore((s) => s + 10 + streak * 5);
      setStreak((s) => s + 1);
      setCorrectBurst(true);
      setTimeout(() => setCorrectBurst(false), 500);
      setMotivationalText(
        motivationalTexts[Math.floor(Math.random() * motivationalTexts.length)],
      );
    } else {
      setStreak(0);
    }
    setQuestion(generateQuestion());
    setTimeLeft(10);
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gray-50 font-sans text-slate-800">
      {/* Floating Background Blobs */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-green-200/40 blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          x: [0, -10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-emerald-200/30 blur-3xl"
      />

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-[90%] max-w-md overflow-hidden rounded-[2rem] border border-white/60 bg-white/70 p-6 shadow-2xl shadow-green-900/5 backdrop-blur-xl sm:p-8"
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Loader2 className="animate-spin text-emerald-500" size={24} />
            <h2 className="font-semibold text-gray-700">Logging you in...</h2>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 shadow-inner">
            <Zap className="text-amber-500" size={16} fill="currentColor" />
            <span className="font-bold text-emerald-700">{score}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 h-2 w-full overflow-hidden rounded-full bg-gray-200/50">
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full rounded-full bg-linear-to-r from-emerald-400 to-emerald-600 shadow-sm"
          />
        </div>

        {/* Game Area */}
        <div className="relative text-center">
          <AnimatePresence>
            {correctBurst && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: -20 }}
                exit={{ opacity: 0, scale: 1.2, y: -40 }}
                className="pointer-events-none absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center text-emerald-500"
              >
                <CheckCircle
                  size={64}
                  className="drop-shadow-lg"
                  fill="white"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.p
            key={motivationalText}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-2 text-xs font-semibold uppercase tracking-wider text-emerald-600"
          >
            {motivationalText}
          </motion.p>

          <div className="mb-6 flex flex-col items-center justify-center rounded-2xl bg-white/60 py-8 px-4 shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] border border-emerald-50">
            {question ? (
              <h3 className="text-4xl font-bold tracking-tight text-gray-800">
                {question.text}
              </h3>
            ) : (
              <div className="h-10 w-32 animate-pulse rounded-lg bg-gray-200/60" />
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {question?.options.map((opt, idx) => (
              <motion.button
                key={`${question.text}-${idx}`}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(opt)}
                className="group relative flex items-center justify-center overflow-hidden rounded-xl bg-white p-4 font-bold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-200/50 transition-all hover:bg-emerald-50 hover:text-emerald-700 hover:shadow-md hover:ring-emerald-200"
              >
                <span className="relative z-10 text-xl">{opt}</span>
              </motion.button>
            ))}
          </div>

          {/* Footer Stats */}
          <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-4 text-sm font-medium text-gray-400">
            <div className="flex items-center gap-1.5">
              <Sparkles
                size={16}
                className={streak > 2 ? "text-amber-400" : ""}
              />
              <span className={streak > 2 ? "text-amber-500" : ""}>
                Streak: {streak} 🔥
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Brain size={16} />
              <span className={timeLeft <= 3 ? "text-red-400" : ""}>
                00:{timeLeft.toString().padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthSuccessPage;
