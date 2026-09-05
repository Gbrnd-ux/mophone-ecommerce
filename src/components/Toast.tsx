import { useEffect, useState } from "react";
import { ToastData } from "../types";

export function Toast({ toast, onRemove }: { toast: ToastData; onRemove: (id: number) => void }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(() => onRemove(toast.id), 300);
    }, 3000);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  const bgColor =
    toast.type === "success"
      ? "bg-[#0f0e0d]"
      : toast.type === "error"
        ? "bg-red-900"
        : "bg-[#c8a97e]";

  return (
    <div
      className={`${bgColor} text-white px-6 py-3.5 text-[13px] font-medium tracking-wide shadow-lg flex items-center gap-3 ${exiting ? "animate-toast-out" : "animate-toast-in"}`}
    >
      {toast.type === "success" && <span>✓</span>}
      {toast.type === "error" && <span>✕</span>}
      {toast.type === "info" && <span>ℹ</span>}
      {toast.message}
    </div>
  );
}

export function ToastContainer({ toasts, onRemove }: { toasts: ToastData[]; onRemove: (id: number) => void }) {
  if (toasts.length === 0) return null;
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((t) => (
        <Toast key={t.id} toast={t} onRemove={onRemove} />
      ))}
    </div>
  );
}
