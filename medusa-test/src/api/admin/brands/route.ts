//Define the HTTP request methods and parameters
import {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { 
  createBrandWorkflow,
} from "../../../workflows/create-brand"

//Define HTTP request body
/*type PostAdminCreateBrandType = {
  name: string
}*/
//Replace above with
import { z } from "zod"
import { PostAdminCreateBrand } from "./validators"

type PostAdminCreateBrandType = z.infer<typeof PostAdminCreateBrand>

//Function receives two parameters: MedusaRequest object to access request details, MedusaResponse object to return or manipulate the response
export const POST = async ( //HTTP method of the API 
  req: MedusaRequest<PostAdminCreateBrandType>,  //Accepts the HTTP request body's type as type argument
  res: MedusaResponse
) => {
  const { result } = await createBrandWorkflow(req.scope)  //execute workflow by invoking and passing the Medusa container req.scope as parameter
    .run({
      input: req.validatedBody,
    })

    //return JSON response with created brand
  res.json({ brand: result })
}

//Get the product's brands
export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const query = req.scope.resolve("query")  //resolve query from medusa container
  
  //graph method runs a query to retrieve data
  //accepts an object with parameters entity and fields
  /*const { data: brands } = await query.graph({
    entity: "brand",                 //data model's name
    fields: ["*", "products.*"],    //Array of properties and relations to retrieve
  })

  res.json({ brands })*/


  const { 
    data: brands, 
    metadata: { count, take, skip } = {},
  } = await query.graph({     //use graph to retrieve the brands
    entity: "brand",
    ...req.queryConfig,     //spread the queryConfig property of the request object.
  })

  //queryConfig property holds configurations for pagination and retrieved fields
  //fields: fields to retrieve in the brands
  //limit: maximum number of items to retrieve
  //offset: number of items to skip before retrieving the returned items

  //return the retrieved brands and the pagination configurations
  res.json({ 
    brands,
    count,             //Total count of items
    limit: take,       //Take: maximum number of items returned in the data array
    offset: skip,      //skip: number of items skipped before retrieving the returned items
  })

}