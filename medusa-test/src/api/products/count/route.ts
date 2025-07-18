import type {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import productCountWorkflow from "../../../workflows/product-count"

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const { result } = await productCountWorkflow(req.scope)
    .run()

  res.send(result)
}