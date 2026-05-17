import { SearchBar } from "@/components/SearchBar";

function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center gap-6 p-4 sm:gap-8 sm:p-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-[clamp(1.75rem,6vw,2.25rem)] font-bold tracking-tight">npmstats</h1>
        <p className="text-muted-foreground max-w-lg">
          Search any npm package to see download stats or search any user to see their published packages
        </p>
      </div>
      <SearchBar />
    </main>
  );
}

export default HomePage;
