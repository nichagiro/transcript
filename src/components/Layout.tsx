import { ReactNode } from "react"

type Props = {
  children: ReactNode,
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <main className="p-5 container mx-auto">
      {children}
    </main>
  )
}

export default Layout