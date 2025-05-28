//Create the steps of the workflow
//Import the steps
import {
  createStep,
  StepResponse,
} from "@medusajs/framework/workflows-sdk"

//Import workflows
import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"

import { BRAND_MODULE } from "../modules/brand"
import BrandModuleService from "../modules/brand/service"

//CREATE STEP
export type CreateBrandStepInput = {
  name: string
}

//Create a new step with createStep
//two parameters: step's unique name, step's function
export const createBrandStep = createStep(
  "create-brand-step",
  async (input: CreateBrandStepInput, { container }) => {   //container property  = Medusa container
    const brandModuleService: BrandModuleService = container.resolve(
      BRAND_MODULE
    )

    //Use createBrands method from the service: accepts an object of brands to create it
    const brand = await brandModuleService.createBrands(input)  


    //Compensation function that roll-backs the step if an error occurs during the workflow's execution
    //Parameters: id (passed from the second parameter of StepResponse), context object with a container property
    async (id: string, { container }) => {
    const brandModuleService: BrandModuleService = container.resolve(
      BRAND_MODULE
    )

    //use deleteBrands method from the service to delete the brand created by the step
    await brandModuleService.deleteBrands(id)
   }

    //must return an instance of StepResponse with: data retunred by the step, data passed to compensation function
    //Compensation function defines the logic to roll-back the changes made by the step
    return new StepResponse(brand, brand.id)
  }
)

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//CREATE WORKFLOW
type CreateBrandWorkflowInput = {
  name: string
}

//Use createWorkFlow function
//Accepts two parameters: workflow's unique name, wonkflow's constructor function holding the workflow's implementation
export const createBrandWorkflow = createWorkflow(
  "create-brand",
  (input: CreateBrandWorkflowInput) => {  //accepts the workflow's input as a parameter
    const brand = createBrandStep(input)   //invoke createBrandStep 

    //must return an instance of WorkflowRepsonse, parameter is the data to return to the workflow's executor
    return new WorkflowResponse(brand)
  }
)