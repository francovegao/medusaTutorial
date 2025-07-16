import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { z } from "zod"
import { PostStoreCustomSchema } from "./validators"

type PostStoreCustomSchemaType = z.infer<
  typeof PostStoreCustomSchema
>

export const POST = async (
  req: MedusaRequest<PostStoreCustomSchemaType>,
  res: MedusaResponse
) => {
  res.json({
    sum: req.validatedBody.a + req.validatedBody.b,
  })
}