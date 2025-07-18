import {
  createStep,
  StepResponse,
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"

const getProductCountStep = createStep(
  "get-product-count", 
  async (_, { container }) => {
    const productModuleService = container.resolve("product")

    const [, count] = await productModuleService.listAndCountProducts()

    return new StepResponse(count)
  }
)

const productCountWorkflow = createWorkflow(
  "product-count",
  function () {
    const count = getProductCountStep()

    return new WorkflowResponse({
      count,
    })
  }
)

export default productCountWorkflow