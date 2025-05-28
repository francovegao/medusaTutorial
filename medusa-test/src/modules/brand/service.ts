//Service that controls the operations performed on the brand data model
//Provides methods to manage the data model
import { MedusaService } from "@medusajs/framework/utils"
import { Brand } from "./models/brand"

//Generate a class with data management methods for the module's data models (objects)
class BrandModuleService extends MedusaService({
  Brand,  //Receives the object "Brand" as a parameter to generate the methods
}) {

}

//BrandModuleService now has methods like "createBrands, "retrieveBrands" to manage the (objects) data model
export default BrandModuleService