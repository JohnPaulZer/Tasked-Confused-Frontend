import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // go back to previous page
  };

  return (
    <main className="w-full flex min-h-screen items-center justify-center bg-secondary px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <div className="flex justify-center">
          <svg
            className="h-24 w-24 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>

        <p className="text-base font-semibold text-primary uppercase tracking-wide">
          404 Error
        </p>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-5xl">
          Page not found
        </h1>

        <p className="mt-6 text-base leading-7 text-primary">
          Sorry, we couldn’t find the page you’re looking for. It might have
          been moved or deleted.
        </p>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            onClick={handleGoBack}
            className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-secondary shadow-sm hover:bg-third hover:text-primary focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors"
          >
            Go back
          </button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
