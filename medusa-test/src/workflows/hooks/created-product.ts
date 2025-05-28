//To consume hook after a product is created to add brand
import { createProductsWorkflow } from "@medusajs/medusa/core-flows"
import { StepResponse } from "@medusajs/framework/workflows-sdk"
import { Modules } from "@medusajs/framework/utils"
import { LinkDefinition } from "@medusajs/framework/types"
import { BRAND_MODULE } from "../../modules/brand"
import BrandModuleService from "../../modules/brand/service"

//productsCreated function accepts a step function as parameter
//Step function has parameters: object having additional_data property, object of properties related to the step's context
createProductsWorkflow.hooks.productsCreated(
  (async ({ products, additional_data }, { container }) => {
    if (!additional_data?.brand_id) {
      return new StepResponse([], [])
    }

    const brandModuleService: BrandModuleService = container.resolve(
      BRAND_MODULE
    )

    //COMPENSATION FUNCTION
    //passed as second parameter to productsCreated
    //Used to undo the creation of links in the hook
    async (links, { container }) => {
    //if empty return
    if (!links?.length) {
      return
    }


    const link = container.resolve("link")

    await link.dismiss(links)  //method to remove a link between two records
     }

    //if brandID is passed, use retrieveBand from brandModuleService
    // if the brand doesn't exist, an error is thrown.
    await brandModuleService.retrieveBrand(additional_data.brand_id as string)

    // Create link of brand to product
    
    const link = container.resolve("link")    //Resolve link from the container
    const logger = container.resolve("logger")

    const links: LinkDefinition[] = []

    //Loop over created products to assemble an array of links to be created
    for (const product of products) {
    links.push({
        [Modules.PRODUCT]: {
        product_id: product.id,
        },
        [BRAND_MODULE]: {
        brand_id: additional_data.brand_id,
        },
    })
    }

    //Pass array of links to link's create method to link products and brands
    await link.create(links)

    logger.info("Linked brand to products")
    
    return new StepResponse(links, links)

  })

  
)