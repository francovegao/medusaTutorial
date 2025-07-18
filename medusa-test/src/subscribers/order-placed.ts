import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework"
//import { sendOrderConfirmationWorkflow } from "../workflows/send-order-confirmation"

export default async function orderPlacedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  const logger = container.resolve("logger")

  logger.info("Sending confirmation email...")

  /*await sendOrderConfirmationWorkflow(container)
    .run({
      input: {
        id: data.id,
      },
    })*/
}

export const config: SubscriberConfig = {
  event: `order.placed`,
}