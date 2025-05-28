//React component to create a widget
import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { DetailWidgetProps, AdminProduct } from "@medusajs/framework/types"
import { clx, Container, Heading, Text } from "@medusajs/ui"
import { useQuery } from "@tanstack/react-query"
import { sdk } from "../lib/sdk"

type AdminProductBrand = AdminProduct & {
  brand?: {
    id: string
    name: string
  }
}

//use Tanstack (React) Query to query the medusa server
const ProductBrandWidget = ({ 
  data: product,
}: DetailWidgetProps<AdminProduct>) => {
  const { data: queryResult } = useQuery({
    queryFn: () => sdk.admin.product.retrieve(product.id, {    //define queryFunction
      fields: "+brand.*",    //use Get Product API Route
    }),
    queryKey: [["product", product.id]],   
  })
  const brandName = (queryResult?.product as AdminProductBrand)?.brand?.name

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <Heading level="h2">Brand</Heading>
        </div>
      </div>
      <div
        className={clx(
          `text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4`
        )}
      >
        <Text size="small" weight="plus" leading="compact">
          Name
        </Text>

        <Text
          size="small"
          leading="compact"
          className="whitespace-pre-line text-pretty"
        >
          {brandName || "-"}
        </Text>
      </div>
    </Container>
  )
}

//Export configuration object. Receives an object as parameter that has a zone property
export const config = defineWidgetConfig({
  zone: "product.details.before",            //zone to inject the widget to       
})

//React component to be rendered in the specified injection zone
export default ProductBrandWidget