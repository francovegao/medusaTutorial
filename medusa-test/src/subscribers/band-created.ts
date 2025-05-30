//Create a subscriber that listens to and handle an event
import type {
  SubscriberConfig,
  SubscriberArgs,
} from "@medusajs/framework"
import { syncBrandToCmsWorkflow } from "../workflows/sync-brands-to-cms"

//Must Export async function that is executed when the event is emmitted (File's default export)
//Accepts an object parameter with two properties: event: object of event details, container: medusa container used to resolbe Framework and commerce tools
export default async function brandCreatedHandler({
  event: { data },      //Data holds the event's data payload, which is the brand's ID
  container,
}: SubscriberArgs<{ id: string }>) {
  await syncBrandToCmsWorkflow(container).run({     //Everytime a brand is created, this function is executed, which executes the workflow to sync the brand to the third party system
    input: data,
  })
}

//Export object that holds the subscriber's configurations
export const config: SubscriberConfig = {
  event: "brand.created",        //name of the event that the subscriber is listening to
}