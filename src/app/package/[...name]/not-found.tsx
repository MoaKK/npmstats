import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <Alert className="max-w-md">
        <AlertTitle>Package not found</AlertTitle>
        <AlertDescription>
          This package doesn't exist on npm or has no public data.
        </AlertDescription>
      </Alert>
      <Button asChild variant="outline">
        <Link href="/">Back to search</Link>
      </Button>
    </main>
  );
}

export default NotFound;
