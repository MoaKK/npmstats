import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-6 p-8">
      <Alert className="max-w-md">
        <AlertTitle>Page not found</AlertTitle>
        <AlertDescription>That page does not exist.</AlertDescription>
      </Alert>
      <Button asChild variant="outline">
        <Link href="/">Back to search</Link>
      </Button>
    </main>
  );
}

export default NotFound;
