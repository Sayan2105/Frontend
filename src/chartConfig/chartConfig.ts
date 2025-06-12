import { ChartConfig } from "@/components/ui/chart";

export const incomeExpenseConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig



export const chartConfig = {
  visitors: {
    label: "Visitors",
  },

  chrome: {
    label: "Appointment",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Pharmacy",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Radiology",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Pathology",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },

  opera: {
    label: "Blood Bank",
    color: "hsl(var(--chart-6))",
  },
  brave: {
    label: "Ambulance",
    color: "hsl(var(--chart-7))",
  },
  arc: {
    label: "ICU",
    color: "hsl(var(--chart-8))",
  },
  vivaldi: {
    label: "Surgery",
    color: "hsl(var(--chart-9))",
  },
  netscape: {
    label: "Emergency",
    color: "hsl(var(--chart-10))",
  },
} satisfies ChartConfig;





export const patientChartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig



export const barChartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig