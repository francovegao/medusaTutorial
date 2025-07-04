import {
  LoaderOptions,
} from "@medusajs/framework/types"

// recommended to define type in another file
type ModuleOptions = {
  capitalize?: boolean
}

export default async function helloWorldLoader({
  container, options,
}: LoaderOptions<ModuleOptions>) {
  const logger = container.resolve("logger")

  logger.info("[BLOG MODULE] Just started the Medusa application!")
  console.log(
    "[BLOG MODULE] Just started the Medusa application!",
    options
  )
}