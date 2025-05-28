//File that exports the definition of the module and its main service
import { Module } from "@medusajs/framework/utils"
import BrandModuleService from "./service"

export const BRAND_MODULE = "brand"  //Module's name, will be used when using the module in other customizations

//Use Module to create the module's definition
//Two parameters: Module's name="brand", object with required property "service" indicating the module's main service
export default Module(BRAND_MODULE, {
  service: BrandModuleService,
})