import { SearchBar } from "@/components/SearchBar";

function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-4xl font-bold tracking-tight">npmstats</h1>
        <p className="text-muted-foreground max-w-lg">
          Search any npm package to see download stats or search any user to see their published packages
        </p>
      </div>
      <SearchBar />
    </main>
  );
}

export default HomePage;
