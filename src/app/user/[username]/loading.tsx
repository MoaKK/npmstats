import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Item, ItemContent, ItemTitle } from "@/components/ui/item";
import { BackButton } from "@/components/BackButton";

function Loading() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-4 p-4 sm:gap-8 sm:p-8">
      <BackButton className="flex-start w-20" />
      <Item variant="outline">
        <ItemContent>
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-24" />
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemContent>
          <Skeleton className="h-64 w-full" />
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemContent>
          <ItemTitle className="text-xl font-medium mb-3">Packages</ItemTitle>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-5 w-12" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-3 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </ItemContent>
      </Item>
    </div>
  );
}

export default Loading;
