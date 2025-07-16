//Define middlewares functions
//A middleware is a function executed before the route handler when a request is sent to an API Route. It's useful to guard API routes, parse custom request body types, and apply validation on an API route.
import { 
  defineMiddlewares,
  validateAndTransformBody,
  validateAndTransformQuery,
} from "@medusajs/framework/http"
import { PostAdminCreateBrand } from "./admin/brands/validators"
import { z } from "zod"
import { createFindParams } from "@medusajs/medusa/api/utils/validators"
import { PostStoreCustomSchema } from "./custom/validators"

//Zod schema that request's query parameters must satisfy
export const GetBrandsSchema = createFindParams()

export const GetCustomSchema = createFindParams()

//use defineMiddlewares function
//accepts an object having a routes property which is an array of the middleware objects with three properties
export default defineMiddlewares({
  routes: [
    {
      matcher: "/admin/brands",  //string or regular expression indicating the API route path to apply the middleware on
      method: "POST",    //HTTP method to restrict the middleware to
      middlewares: [      //Array of middlewares to apply on the route
        validateAndTransformBody(PostAdminCreateBrand),   //pass the validateAndTransformBody middleware passing the Zod schema created in validators
      ],
    },
    {
      matcher: "/admin/products",  //string or regular expression indicating the API route path to apply the middleware on
      method: "POST",    //HTTP method to restrict the middleware to
      additionalDataValidator: {      //configures the validation rules for custom properties passed in additional_data
          brand_id: z.string().optional(),
      },
    },
    {
      matcher: "/admin/brands",
      method: "GET",
      middlewares: [
        validateAndTransformQuery(     //Middleware that accepts two parameters:
          GetBrandsSchema,             //1.Zod Schema
          {                           //2. Object with properties:
            defaults: [                //Array of default fields and relations to retrieve
              "id",
              "name",
              "products.*",
            ],
            isList: true,            //Whether the API route returns a list of items
          }
        ),
      ],
    },
    {
      matcher: "/custom",
      middlewares: [
        (req, res, next) => {
          console.log("Global middleware")
          next()
        },
      ],
    },
    {
      matcher: "/custom",
      method: ["GET"],
      middlewares: [
        (req, res, next) => {
          console.log("Route middleware")
          next()
        },
      ],
    },
    {
      matcher: "/custom",
      method: "POST",
      middlewares: [
        validateAndTransformBody(PostStoreCustomSchema),
      ],
    },


  ],
})

//If request does not match the Zod validation schema an error is returned in the response specifying the issues to fix in the request body
