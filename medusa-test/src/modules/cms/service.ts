//Will provide methods to connect and perform actions with the third-party system
import { Logger, ConfigModule } from "@medusajs/framework/types"

//Options passed to the module when it's later added in Medusa's configurations. 
//These options are useful to pass secret keys or configurations that ensure your module is re-usable across applications.
export type ModuleOptions = {
  apiKey: string
}

//The module's container. Since a module is isolated, it has a local container different than the Medusa container you use in other customizations.
//This container holds Framework tools like the Logger utility and resources within the module.
type InjectedDependencies = {
  logger: Logger
  configModule: ConfigModule
}

//Class that will hold the methods to connect to the third party system
//Accepts two parameters: module's container, options passed to the module
class CmsModuleService {
  private options_: ModuleOptions
  private logger_: Logger
   
  constructor({ logger }: InjectedDependencies, options: ModuleOptions) {
    this.logger_ = logger
    this.options_ = options

    // When integrating a third-party system that has a Node.js SDK or client, you can initialize that client in the constructor to be used in the service's methods.

  }

  // a dummy method to simulate sending a request,
  // in a realistic scenario, you'd use an SDK, fetch, or axios clients
  private async sendRequest(url: string, method: string, data?: any) {
    this.logger_.info(`Sending a ${method} request to ${url}.`)
    this.logger_.info(`Request Data: ${JSON.stringify(data, null, 2)}`)
    this.logger_.info(`API Key: ${JSON.stringify(this.options_.apiKey, null, 2)}`)
  }

  async createBrand(brand: Record<string, unknown>) {
    await this.sendRequest("/brands", "POST", brand)
  }

  async deleteBrand(id: string) {
    await this.sendRequest(`/brands/${id}`, "DELETE")
  }

  async retrieveBrands(): Promise<Record<string, unknown>[]> {
    await this.sendRequest("/brands", "GET")

    return []
  }
}


export default CmsModuleService