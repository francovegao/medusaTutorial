import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container, Heading } from "@medusajs/ui"
import { 
  DetailWidgetProps, 
  AdminProduct,
} from "@medusajs/framework/types"
import { Link } from "react-router-dom"

// The widget
const ProductWidget = ({ 
  data,
}: DetailWidgetProps<AdminProduct>) => {
  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">
          Product Widget {data.title}
        </Heading> 
        <Link to={"/orders"}>View Orders</Link>
      </div>
    </Container>
  )
}

// The widget's configurations
export const config = defineWidgetConfig({
  zone: "product.details.before",
})

export default ProductWidget