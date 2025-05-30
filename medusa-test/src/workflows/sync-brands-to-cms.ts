//Workflow to sync brands with third party system module (CMS)
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { InferTypeOf } from "@medusajs/framework/types"
import { Brand } from "../modules/brand/models/brand"
import { CMS_MODULE } from "../modules/cms"
import CmsModuleService from "../modules/cms/service"

//IMPORT WORKFLOW 
import { 
  createWorkflow, 
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { useQueryGraphStep } from "@medusajs/medusa/core-flows"

type SyncBrandToCmsStepInput = {
  brand: InferTypeOf<typeof Brand>
}

type SyncBrandToCmsWorkflowInput = {
  id: string
}

//Step accepts a brand as input
const syncBrandToCmsStep = createStep(
  "sync-brand-to-cms",
  async ({ brand }: SyncBrandToCmsStepInput, { container }) => {
    //Resolve CMS Module's service from the medusa container
    const cmsModuleService: CmsModuleService = container.resolve(CMS_MODULE)  

    //use createBrand method from CMS Module's service (Method that creates the brand in the third party system)
    await cmsModuleService.createBrand(brand)

    return new StepResponse(null, brand.id)   //pass brand ID to the step compensation function
  },
  async (id, { container }) => {    //COmpensation function -> Deletes brand if an error occurs during workflow's execution
    if (!id) {
      return
    }

    const cmsModuleService: CmsModuleService = container.resolve(CMS_MODULE)

    await cmsModuleService.deleteBrand(id)
  }
)

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Create workflow 
export const syncBrandToCmsWorkflow = createWorkflow(
  "sync-brand-to-cms",
  (input: SyncBrandToCmsWorkflowInput) => {    //Accept brand's ID as input
    // @ts-ignore

    //Step1: useQueryGraphStep: Retrieve brand's details using query
    const { data: brands } = useQueryGraphStep({
      entity: "brand",
      fields: ["*"],
      filters: {
        id: input.id,
      },
      options: {
        throwIfKeyNotFound: true,     //Throw error if brand's ID doesn't exist
      },
    })

    //Step2: syncBrandToCMSStep: Create the brand in the third party system
    syncBrandToCmsStep({
      brand: brands[0],
    } as SyncBrandToCmsStepInput)

    return new WorkflowResponse({})
  }
)