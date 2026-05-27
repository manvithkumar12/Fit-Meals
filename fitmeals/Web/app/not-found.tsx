import NotAuthorized from "@/src/Components/RedirectComponent/NotAuthorized";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black text-center px-6">
      <NotAuthorized />
    </div>
  );
}
