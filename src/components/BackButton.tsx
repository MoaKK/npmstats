"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BackButtonProps = {
  className?: string;
};

function BackButton({ className }: BackButtonProps) {
  const router = useRouter();

  return (
    <Button variant="default" title="Go back" className={cn(className)} onClick={() => router.back()}>
      <ArrowLeft className="h-4 w-4" />
      Back
    </Button>
  );
}

export { BackButton };