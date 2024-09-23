import { WithChildren } from "@/types"
import { PagesTopLoader } from "nextjs-toploader/pages"
import { Navbar } from "../navbar"
import { Footer } from "../footer"

export interface MainLayoutProps extends WithChildren {
  className?: string
}

export const MainLayout = ({ children, className }: MainLayoutProps) => {
  return (
    <div className={className}>
      <PagesTopLoader color="#fc7303" height={3} showSpinner={false} />
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
