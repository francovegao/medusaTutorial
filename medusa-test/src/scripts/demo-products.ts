import { ExecArgs } from "@medusajs/framework/types"
import { faker } from "@faker-js/faker"
import { 
  ContainerRegistrationKeys, 
  Modules, 
  ProductStatus,
} from "@medusajs/framework/utils"
import { 
  createInventoryLevelsWorkflow,
  createProductsWorkflow,
} from "@medusajs/medusa/core-flows"

export default async function seedDummyProducts({
  container,
}: ExecArgs) {
  const salesChannelModuleService = container.resolve(
    Modules.SALES_CHANNEL
  )
  const logger = container.resolve(
    ContainerRegistrationKeys.LOGGER
  )
  const query = container.resolve(
    ContainerRegistrationKeys.QUERY
  )

  const defaultSalesChannel = await salesChannelModuleService
    .listSalesChannels({
      name: "Default Sales Channel",
    })

  const sizeOptions = ["S", "M", "L", "XL"]
  const colorOptions = ["Black", "White"]
  const currency_code = "eur"
  const productsNum = 50

  const productsData = new Array(productsNum).fill(0).map((_, index) => {
  const title = faker.commerce.product() + "_" + index
  return {
    title,
    is_giftcard: true,
    description: faker.commerce.productDescription(),
    status: ProductStatus.PUBLISHED,
    options: [
      {
        title: "Size",
        values: sizeOptions,
      },
      {
        title: "Color",
        values: colorOptions,
      },
    ],
    images: [
      {
        url: faker.image.urlPlaceholder({
          text: title,
        }),
      },
      {
        url: faker.image.urlPlaceholder({
          text: title,
        }),
      },
    ],
    variants: new Array(10).fill(0).map((_, variantIndex) => ({
      title: `${title} ${variantIndex}`,
      sku: `variant-${variantIndex}${index}`,
      prices: new Array(10).fill(0).map((_, priceIndex) => ({
        currency_code,
        amount: 10 * priceIndex,
      })),
      options: {
        Size: sizeOptions[Math.floor(Math.random() * 3)],
        Color: colorOptions[Math.floor(Math.random() * 1)]
      },
    })),
    shipping_profile_id: "sp_123",
    sales_channels: [
      {
        id: defaultSalesChannel[0].id,
      },
    ],
  }
})

const { result: products } = await createProductsWorkflow(container).run({
  input: {
    products: productsData,
  },
})

logger.info(`Seeded ${products.length} products.`)

logger.info("Seeding inventory levels.")

const { data: stockLocations } = await query.graph({
  entity: "stock_location",
  fields: ["id"],
})

const { data: inventoryItems } = await query.graph({
  entity: "inventory_item",
  fields: ["id"],
})

const inventoryLevels = inventoryItems.map((inventoryItem) => ({
  location_id: stockLocations[0].id,
  stocked_quantity: 1000000,
  inventory_item_id: inventoryItem.id,
}))

await createInventoryLevelsWorkflow(container).run({
  input: {
    inventory_levels: inventoryLevels,
  },
})

logger.info("Finished seeding inventory levels data.")
}