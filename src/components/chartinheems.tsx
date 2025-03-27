"use client"

import { DonutChart } from "@/components/donutchart"

interface DonutChartProps1 {
    plantendata2: { name: string; value: number; }[];
  }

export const ChartInheems = ({ plantendata2 }: DonutChartProps1) => (
  <DonutChart
    className="mx-auto"
    data={plantendata2}
    category="name"
    value="value"
    showLabel={true}
  />
)