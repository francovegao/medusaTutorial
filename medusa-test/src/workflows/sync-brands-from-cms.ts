//File for workflow that executes once a day to sync data from third party system
//1. retrieveBrandsFromCmsStep: to retrieve the brands from the CMS.
//2. createBrandsStep: to create the brands retrieved in the first step that don't exist in Medusa.
//3. updateBrandsStep: to update the brands retrieved in the first step that exist in Medusa.
import {
  createStep,
  StepResponse,
} from "@medusajs/framework/workflows-sdk"
import CmsModuleService from "../modules/cms/service"
import { CMS_MODULE } from "../modules/cms"

import BrandModuleService from "../modules/brand/service"
import { BRAND_MODULE } from "../modules/brand"

import {
  // ...
  createWorkflow,
  transform,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"

type CreateBrand = {
  name: string
}

type CreateBrandsInput = {
  brands: CreateBrand[]
}

type UpdateBrand = {
  id: string
  name: string
}

type UpdateBrandsInput = {
  brands: UpdateBrand[]
}

//Step that resolves the CMS module's service and uses retrieveBrands method 
const retrieveBrandsFromCmsStep = createStep(
  "retrieve-brands-from-cms",
  async (_, { container }) => {
    const cmsModuleService: CmsModuleService = container.resolve(
      CMS_MODULE
    )

    const brands = await cmsModuleService.retrieveBrands()

    //Returns retrieved brands from third party system
    return new StepResponse(brands)
  }
)

//step to create brands that exist in third party system, but not in medusa
export const createBrandsStep = createStep(
  "create-brands-step",
  async (input: CreateBrandsInput, { container }) => {
    const brandModuleService: BrandModuleService = container.resolve(    
      BRAND_MODULE
    )

    //Use generated createBrands method 
    const brands = await brandModuleService.createBrands(input.brands)

    //Pass the created brands to the compensation function, to delete those brands if error occurs during workflow execution
    return new StepResponse(brands, brands)   
  },
  async (brands, { container }) => {
    if (!brands) {
      return
    }

    const brandModuleService: BrandModuleService = container.resolve(
      BRAND_MODULE
    )

    await brandModuleService.deleteBrands(brands.map((brand) => brand.id))
  }
)

//Step that updates brand's details already existing in medusa to match the third party system
export const updateBrandsStep = createStep(
  "update-brands-step",
  async ({ brands }: UpdateBrandsInput, { container }) => {
    const brandModuleService: BrandModuleService = container.resolve(
      BRAND_MODULE
    )

    const prevUpdatedBrands = await brandModuleService.listBrands({
      id: brands.map((brand) => brand.id),
    })

    //Update brands using the Brand's module generated method
    const updatedBrands = await brandModuleService.updateBrands(brands)

    //pass old brand details to compensation function
    return new StepResponse(updatedBrands, prevUpdatedBrands)
  },
  async (prevUpdatedBrands, { container }) => {
    if (!prevUpdatedBrands) {
      return
    }

    const brandModuleService: BrandModuleService = container.resolve(
      BRAND_MODULE
    )

    //revert the update using the Brand's module generated method
    await brandModuleService.updateBrands(prevUpdatedBrands)
  }
)

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//CREATE WORKFLOW
export const syncBrandsFromCmsWorkflow = createWorkflow(
  "sync-brands-from-system",
  () => {
    const brands = retrieveBrandsFromCmsStep()

    //Since workflows are constructed internally and are only evaluated during execution, you can't access values to perform data manipulation directly.
    //Instead, use transform from the Workflows SDK that gives you access to the real-time values of the data, allowing you to create new variables using those values.
    //Transform accepts two parameters: data to be passed to function in second parameter, function to execute when workflow is executed
    const { toCreate, toUpdate } = transform(
    {
        brands,
    },
    (data) => {
        const toCreate: CreateBrand[] = []
        const toUpdate: UpdateBrand[] = []

        //loop over brands array to check wich should be created or updated
        data.brands.forEach((brand) => {
        if (brand.external_id) {
            toUpdate.push({
            id: brand.external_id as string,
            name: brand.name as string,
            })
        } else {
            toCreate.push({
            name: brand.name as string,
            })
        }
        })

        return { toCreate, toUpdate }
    }
    )

    //pass the arrays returned by transform as inputs for the steps
    const created = createBrandsStep({ brands: toCreate })    //Create brands that don't exist in medusa
    const updated = updateBrandsStep({ brands: toUpdate })    //update brands that exist in medusa

    //return object of created and updated brands. 
    return new WorkflowResponse({
    created,
    updated,
    })

  }
)