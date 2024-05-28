import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Divider } from "@nextui-org/divider"
import { ReactNode } from "react"

type Props = {
  children: ReactNode;
  title: string;
}

const Panel: React.FC<Props> = ({ children, title }) => {
  return (
    <Card className="mb-5">
      <CardHeader className="px-5 bg-teal-500 text-white">
        {title}
      </CardHeader>
      <Divider />
      <CardBody className="p-5">
        {children}
      </CardBody>
    </Card>
  )
}

export default Panel