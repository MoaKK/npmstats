"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type SearchMode = "package" | "user";

function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<SearchMode>("package");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(mode === "package" ? `/package/${trimmed}` : `/user/${trimmed}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-xl">
      <ToggleGroup
        type="single"
        variant="outline"
        value={mode}
        onValueChange={(val) => val && setMode(val as SearchMode)}
        className="self-start"
      >
        <ToggleGroupItem value="package">Package</ToggleGroupItem>
        <ToggleGroupItem value="user">User</ToggleGroupItem>
      </ToggleGroup>
      <div className="flex gap-2">
        <Input
          value={query}
          
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            mode === "package" ? "e.g. react or @moakk/killport-cli" : "e.g. moakk"
          }
          className="flex-1"
        />
        <Button type="submit">Search</Button>
      </div>
    </form>
  );
}

export { SearchBar };
