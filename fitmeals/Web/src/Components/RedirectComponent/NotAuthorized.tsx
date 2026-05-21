import Image from "next/image";
import Link from "next/link";

interface NotAuthorizedProps {
  type?: "404" | "unauthorized";
  label?: string;
}

const NotAuthorized = ({ type = "404", label }: NotAuthorizedProps) => {
  const defaultLabel =
    type === "404" ? "404 Page Not Found" : "You are not authorized";

  const displayLabel = label || defaultLabel;

  const subText =
    type === "404"
      ? "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
      : "You don't have the necessary permissions to access this page. Please contact support if you think this is a mistake.";

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 text-center">
      <div className="relative w-full max-w-lg aspect-video mb-6">
        <Image
          src="/NotFound.png"
          alt="Error Illustration"
          fill
          sizes="(max-width: 1024px) 100vw, 512px"
          className="object-contain"
          priority
        />
      </div>

      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
        {displayLabel}
      </h1>

      <p className="text-gray-500 mb-8 max-w-md">{subText}</p>

      <Link
        href="/"
        className="px-2 py-2 md:px-6 md:py-3 bg-green-600 text-white text-sm md:text-md lg:text-lg font-medium rounded-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg active:scale-95"
      >
        Return to Homepage
      </Link>
    </div>
  );
};

export default NotAuthorized;
