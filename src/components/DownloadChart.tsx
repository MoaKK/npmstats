"use client";

import { useState, useEffect } from "react";
import { BarChart, Bar, LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import type { DownloadRange } from "@/types/npm";
import type { ChartType } from "@/components/ChartTypeToggle";

const chartConfig = {
  downloads: {
    label: "Downloads",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

function formatDay(day: string) {
  return new Date(day).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatNumber(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toString();
}

type DownloadChartProps = {
  data: DownloadRange;
  chartType: ChartType;
  ariaLabel?: string;
};

function DownloadChart({ data, chartType, ariaLabel }: DownloadChartProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const dataLength = data.downloads.length;
  const compactYearly = dataLength > 180 && isMobile;

  const chartData = data.downloads.map((d) => ({
    day: formatDay(d.day),
    downloads: d.downloads,
  }));

  const interval =
    compactYearly ? Math.floor(dataLength / 6) :
    dataLength > 60 ? Math.floor(dataLength / 12) :
    "preserveStartEnd";

  const sharedProps = {
    data: chartData,
    margin: { top: 4, right: 4, bottom: 4, left: 4 },
  };

  const axes = (
    <>
      <CartesianGrid vertical={false} />
      <XAxis
        dataKey="day"
        tickLine={false}
        axisLine={false}
        interval={interval}
        tick={{ fontSize: 12 }}
        tickFormatter={compactYearly ? (value: string) => value.split(" ")[0] : undefined}
      />
      <YAxis
        tickLine={false}
        axisLine={false}
        tickFormatter={formatNumber}
        tick={{ fontSize: 12 }}
        width={48}
      />
      <ChartTooltip content={<ChartTooltipContent className="min-w-48" />} />
    </>
  );

  return (
    <ChartContainer config={chartConfig} className="h-64 w-full" aria-label={ariaLabel}>
      {chartType === "bar" ? (
        <BarChart {...sharedProps}>
          {axes}
          <Bar dataKey="downloads" fill="var(--color-downloads)" radius={[2, 2, 0, 0]} />
        </BarChart>
      ) : (
        <LineChart {...sharedProps}>
          {axes}
          <Line
            dataKey="downloads"
            stroke="var(--color-downloads)"
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      )}
    </ChartContainer>
  );
}

export { DownloadChart };
