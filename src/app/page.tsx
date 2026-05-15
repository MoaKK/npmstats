import { SearchBar } from "@/components/SearchBar";

function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-4xl font-bold tracking-tight">npmstats</h1>
        <p className="text-muted-foreground">
          Search any npm package or user to see download stats
        </p>
      </div>
      <SearchBar />
    </main>
  );
}

export default HomePage;
