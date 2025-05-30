//Create a job that executes every certain time
import { MedusaContainer } from "@medusajs/framework/types"
import { syncBrandsFromCmsWorkflow } from "../workflows/sync-brands-from-cms"

//Export asynchronous function that will be executed at the specified schedule (must be default's export)
export default async function (container: MedusaContainer) {
  const logger = container.resolve("logger")

  const { result } = await syncBrandsFromCmsWorkflow(container).run()

  logger.info(
    `Synced brands from third-party system: ${
      result.created.length
    } brands created and ${result.updated.length} brands updated.`)
}

//Export object of scheduled jobs configuration with two properties:
//unique name for the scheduled job, schedule: string that holds a cron expression indicating the schedule to run the job
export const config = {
  name: "sync-brands-from-system",
  schedule: "0 0 * * *", // change to * * * * * for debugging
}