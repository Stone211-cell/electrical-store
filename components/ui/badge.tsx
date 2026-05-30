import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "bg-destructive text-white hover:bg-destructive/80",
        outline:
          "border border-current text-foreground",
        electric:
          "bg-sky-100 text-sky-700 border border-sky-200",
        amber:
          "bg-amber-100 text-amber-700 border border-amber-200",
        success:
          "bg-emerald-100 text-emerald-700 border border-emerald-200",
        hot:
          "bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold shadow-sm",
        new:
          "bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold shadow-sm",
        sale:
          "bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold shadow-sm",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
