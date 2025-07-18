import { useParams } from "react-router-dom"
import { Container, Heading } from "@medusajs/ui"
import {
  useLoaderData,
  LoaderFunctionArgs,
} from "react-router-dom"

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params
  // TODO fetch product by id

  return {
    id,
  }
}

const CustomPage = () => {
  const { id } = useLoaderData() as Awaited<ReturnType<typeof loader>>

  return (
    <div>
      <Container className="divide-y p-0">
        <div className="flex items-center justify-between px-6 py-4">
          <Heading level="h2">Product ID: {id}</Heading>
        </div>
      </Container>
    </div>
  )
}


/*const CustomPage = () => {
  const { id } = useParams()

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h1">Passed ID: {id}</Heading>
      </div>
    </Container>
  )
}*/

export default CustomPage