"use client";

import { useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <Alert className="max-w-md" variant="destructive">
        <AlertTitle>Something went wrong</AlertTitle>
        <AlertDescription>
          There was a problem loading this page. This is usually a temporary issue
          with the npm API.
        </AlertDescription>
      </Alert>
      <Button onClick={reset} variant="outline">
        Try again
      </Button>
    </main>
  );
}

export default GlobalError;
