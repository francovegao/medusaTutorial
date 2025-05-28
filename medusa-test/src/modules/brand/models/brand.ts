//Define the new DATA MODEL
import { model } from "@medusajs/framework/utils"

//model.define --> accepts two parameters: name, object with data model schema
export const Brand = model.define("brand", {
  id: model.id().primaryKey(),
  name: model.text(),
})