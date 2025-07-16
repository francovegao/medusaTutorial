import { LoaderOptions } from "@medusajs/framework/types"
import { MedusaError } from "@medusajs/framework/utils"

// recommended to define type in another file
type ModuleOptions = {
  apiKey?: string
}

export default async function validationLoader({
  options,
}: LoaderOptions<ModuleOptions>) {
   //if (!options.apiKey) {
  //  if (options) {
    //throw new MedusaError(
     // MedusaError.Types.INVALID_DATA,
     // "Hello Module requires an apiKey option."
    //)
 // }
}