"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Field, FieldError } from "@/components/ui/field";

type SearchMode = "package" | "user";

const formSchema = z.object({
  query: z.string().max(50).min(1, "Input field is empty!"),
});

function SearchBar() {
  const router = useRouter();
  const [mode, setMode] = useState<SearchMode>("package");

  const form = useForm({
    defaultValues: { query: "" },
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      const trimmed = value.query.trim();
      router.push(mode === "package" ? `/package/${trimmed}` : `/user/${trimmed}`);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="flex flex-col gap-3 w-full max-w-xl"
    >
      <ToggleGroup
        type="single"
        variant="outline"
        value={mode}
        onValueChange={(val) => val && setMode(val as SearchMode)}
        className="self-start"
      >
        <ToggleGroupItem value="package" title="Search by package name" className="h-8 px-2 text-xs sm:h-9 sm:px-3 sm:text-sm">Package</ToggleGroupItem>
        <ToggleGroupItem value="user" title="Search by npm username" className="h-8 px-2 text-xs sm:h-9 sm:px-3 sm:text-sm">User</ToggleGroupItem>
      </ToggleGroup>
      <form.Field name="query">
        {(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
          return (
            <Field data-invalid={isInvalid}>
              <div className="relative">
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder={
                    mode === "package" ? "e.g. react or @moakk/killport-cli" : "e.g. moakk"
                  }
                  className="pr-10"
                />
                <button
                  type="submit"
                  title="Search"
                  className="absolute right-0 top-0 h-full px-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Search"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          );
        }}
      </form.Field>
    </form>
  );
}

export { SearchBar };
