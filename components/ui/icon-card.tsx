import { TypographyH4, TypographyP } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function IconCard({
  heading,
  description,
  icon: Icon,
  active,
  className,
  disabled,
  onClick,
  ...props
}: {
  heading: string;
  description: string;
  icon: React.ElementType;
  active?: boolean;
} & React.ComponentProps<"button">) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (disabled) {
      toast.warning("This option is currently unavailable.");
      return;
    }
    onClick?.(e);
  };
  return (
    <button
      className={cn(
        "bg-card text-card-foreground w-full cursor-pointer rounded-lg border px-2 py-4 text-center shadow-sm",
        active && "ring-primary/50 ring-2",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      <Icon className="mx-auto h-14 w-auto" />
      <TypographyH4 className="mt-4">{heading}</TypographyH4>
      <TypographyP className="not-first:mt-2">{description}</TypographyP>
    </button>
  );
}
