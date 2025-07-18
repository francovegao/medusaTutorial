import type {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import myWorkflow from "../../workflows/hello-world"

export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const { result } = await myWorkflow(req.scope)
    .run()

  res.send(result)
}


/*export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
) {
  const { result } = await myWorkflow(req.scope)
    .run({
      input: {
        name: "John",
      },
    })

  res.send(result)
}*/