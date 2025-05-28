//Create a link between the custom brand module and the core product module
import BrandModule from "../modules/brand"
import ProductModule from "@medusajs/medusa/product"
import { defineLink } from "@medusajs/framework/utils"

//defineLink accepts two parameters: datamodel's link configuration or
//object that has two properties linkable and isList
export default defineLink(
  {
    linkable: ProductModule.linkable.product, //data model's link configuration
    isList: true,  //boolean indicating whether many records of the data model can be linked to the other model
                    //isList true because brand can be associated to multiple products
  },
  BrandModule.linkable.brand
)
