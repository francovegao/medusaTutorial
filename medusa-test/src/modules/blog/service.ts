import { MedusaService } from "@medusajs/framework/utils"
import Post from "./models/post"
import { ClientService } from "./services"

// recommended to define type in another file
type ModuleOptions = {
  capitalize?: boolean
}

type InjectedDependencies = {
  clientService: ClientService
}

class BlogModuleService extends MedusaService({
  Post,
}){
    protected options_: ModuleOptions
    protected clientService_: ClientService

    constructor({ clientService }: InjectedDependencies, options?: ModuleOptions) {
    super(...arguments)

    this.options_ = options || {
      capitalize: false,
    }

    this.clientService_ = clientService
  }

}

export default BlogModuleService