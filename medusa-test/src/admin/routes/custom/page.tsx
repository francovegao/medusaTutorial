import { defineRouteConfig } from "@medusajs/admin-sdk"
import { ChatBubbleLeftRight } from "@medusajs/icons"
import { Container, Heading } from "@medusajs/ui"
import {
  useLoaderData,
} from "react-router-dom"

export async function loader() {
  // TODO fetch products

  return {
    products: [],
  }
}

const CustomPage = () => {
  const { products } = useLoaderData() as Awaited<ReturnType<typeof loader>>

  return (
    <div>
      <Container className="divide-y p-0">
        <div className="flex items-center justify-between px-6 py-4">
          <Heading level="h2">Products count: {products.length}</Heading>
        </div>
      </Container>
    </div>
  )
}

/*const CustomPage = () => {
  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">This is my custom route</Heading>
      </div>
    </Container>
  )
}*/

export const config = defineRouteConfig({
  label: "Custom Route",
  icon: ChatBubbleLeftRight,
})

export default CustomPage