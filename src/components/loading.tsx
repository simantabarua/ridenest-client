import { cn } from "@/lib/utils";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  variant?: "spinner" | "dots" | "bars";
  className?: string;
  text?: string;
  fullScreen?: boolean;
}

export default function Loading({
  size = "md",
  variant = "spinner",
  className,
  text,
  fullScreen = false,
}: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const dotSizeClasses = {
    sm: "h-1.5 w-1.5",
    md: "h-2 w-2",
    lg: "h-3 w-3",
  };

  const barSizeClasses = {
    sm: "h-4 w-1",
    md: "h-8 w-1.5",
    lg: "h-12 w-2",
  };

  const containerClasses = fullScreen
    ? "fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50"
    : "flex items-center justify-center p-4";

  const renderSpinner = () => (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-primary border-t-transparent",
        sizeClasses[size],
        className
      )}
    />
  );

  const renderDots = () => (
    <div className={cn("flex space-x-1", className)}>
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className={cn(
            "animate-bounce rounded-full bg-primary",
            dotSizeClasses[size]
          )}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );

  const renderBars = () => (
    <div className={cn("flex items-end space-x-1", className)}>
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className={cn(
            "animate-pulse rounded bg-primary",
            barSizeClasses[size]
          )}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );

  const renderLoading = () => {
    switch (variant) {
      case "dots":
        return renderDots();
      case "bars":
        return renderBars();
      default:
        return renderSpinner();
    }
  };

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center space-y-2">
        {renderLoading()}
        {text && (
          <p className="text-sm text-muted-foreground animate-pulse">{text}</p>
        )}
      </div>
    </div>
  );
}