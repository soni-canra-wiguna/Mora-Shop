import { cn } from "@/lib/utils"

interface ContainerProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  className?: string
  children: React.ReactNode
}

export const Container = ({
  children,
  className,
  ...props
}: ContainerProps) => {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </div>
  )
}
