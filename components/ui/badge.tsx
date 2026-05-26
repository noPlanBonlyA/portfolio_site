import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-cyan-300/25 bg-cyan-300/10 text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.08)]",
        violet: "border-violet-300/25 bg-violet-300/10 text-violet-100",
        blue: "border-blue-300/25 bg-blue-300/10 text-blue-100",
        graphite: "border-white/10 bg-white/[0.06] text-zinc-300",
        success: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
        warning: "border-amber-300/25 bg-amber-300/10 text-amber-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
