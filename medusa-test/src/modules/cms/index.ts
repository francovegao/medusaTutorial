//Export the module definition indicating the module's name and service
import { Module } from "@medusajs/framework/utils"
import CmsModuleService from "./service"

export const CMS_MODULE = "cms"   //Module's name

export default Module(CMS_MODULE, {
  service: CmsModuleService,       //Module's service
})