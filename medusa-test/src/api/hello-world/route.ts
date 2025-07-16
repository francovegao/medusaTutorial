import type {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"


type HelloWorldReq = {
  name: string
}

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  res.json({
    //message: "[GET] Hello world!",
    message: `Hello ${req.query.name}`,   //http://localhost:9000/hello-world?name=John
  })
}

/*export const POST = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  res.json({
    message: "[POST] Hello world!",
  })
}*/

export const POST = async (
  req: MedusaRequest<HelloWorldReq>,
  res: MedusaResponse
) => {
  res.json({
    message: `[POST] Hello ${req.body.name}!`,
  })
}