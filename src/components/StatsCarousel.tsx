"use client";

import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartTypeToggle } from "@/components/ChartTypeToggle";
import { DownloadChart } from "@/components/DownloadChart";
import type { ChartType } from "@/components/ChartTypeToggle";
import type { PackageStats } from "@/types/npm";

type Slide = {
  label: string;
  key: keyof PackageStats;
};

const slides: Slide[] = [
  { label: "Last Day", key: "daily" },
  { label: "Last Week", key: "weekly" },
  { label: "Last Month", key: "monthly" },
  { label: "Last Year", key: "yearly" },
];

type StatsCarouselProps = {
  stats: PackageStats;
};

function StatsCarousel({ stats }: StatsCarouselProps) {
  const [chartType, setChartType] = useState<ChartType>("bar");

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex justify-end">
        <ChartTypeToggle value={chartType} onChange={setChartType} />
      </div>
      <Carousel className="w-full">
        <CarouselContent>
          {slides.map(({ label, key }) => (
            <CarouselItem key={key}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">{label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <DownloadChart data={stats[key]} chartType={chartType} />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

export { StatsCarousel };
