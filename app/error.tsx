"use client";

import { useEffect } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an external error reporting service
    console.error("CLIENT SIDE ERROR CAUGHT BY ERROR BOUNDARY:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-red-50 text-red-900 z-50 fixed inset-0">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <pre className="bg-white p-4 rounded shadow border border-red-200 overflow-auto max-w-full text-sm">
        {error.message}
        {"\n\n"}
        {error.stack}
      </pre>
      <button
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  );
}
