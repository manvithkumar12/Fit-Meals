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
      hideProgressBar
      newestOnTop
      pauseOnHover={false}
      draggable={false}
      style={{
        top: "20px",
        right: "1rem",
        left: "auto",
        width: "fit-content",
      }}
      toastStyle={{
        width: "320px",
        minHeight: "50px",
        borderRadius: "14px",
        background: "#0f0f0f",
        color: "#fff",
        fontSize: "15px",
        marginLeft: "auto",
      }}
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
