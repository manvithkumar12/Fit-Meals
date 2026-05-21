"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider() {
  return (
    <ToastContainer
      theme="dark"
      position="top-right"
      closeButton={false}
      autoClose={3000}
      hideProgressBar={true}
      newestOnTop={true}
      icon={({ type }) => {
        if (type === "success") return "✅";
        if (type === "error") return "❌";
        if (type === "warning") return "⚠️";
        if (type === "info") return "ℹ️";
        return "🔔";
      }}
    />
  );
}
