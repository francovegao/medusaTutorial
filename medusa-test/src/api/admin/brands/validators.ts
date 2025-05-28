//Define validation schemas of incoming request bodies
import { z } from "zod"

//export validation schema that expects in the request body an object with a name property whose value is a string
export const PostAdminCreateBrand = z.object({
  name: z.string(),
})