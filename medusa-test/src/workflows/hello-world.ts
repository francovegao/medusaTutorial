import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import {
  // other imports...
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import {
  emitEventStep,
} from "@medusajs/medusa/core-flows"


const step1 = createStep(
  "step-1",
  async () => {
    const message = `Hello from step one!`

    console.log(message)

    return new StepResponse(message)
  },
  async () => {
    console.log("Oops! Rolling back my changes...")
  }
)

const step2 = createStep(
  "step-2",
  async () => {
    throw new Error("Throwing an error...")
  }
)

const myWorkflow = createWorkflow(
  "hello-world", 
  function (input) {
  const str1 = step1()
  step2()

  //Create an event when workflow is executed, that subscribers can listen to
  emitEventStep({
      eventName: "custom.created",
      data: {
        id: "123",
        // other data payload
      },
    })


  return new WorkflowResponse({
    message: str1,
  })
})

export default myWorkflow

/*type WorkflowInput = {
  name: string
}

const step2 = createStep(
  "step-2", 
  async ({ name }: WorkflowInput) => {
    return new StepResponse(`Hello ${name} from step two!`)
  }
)

const myWorkflow = createWorkflow(
  "hello-world",
  function (input: WorkflowInput) {
    const str1 = step1()
    // to pass input
    const str2 = step2(input)

    return new WorkflowResponse({
      message: str2,
    })
  }
)

export default myWorkflow*/