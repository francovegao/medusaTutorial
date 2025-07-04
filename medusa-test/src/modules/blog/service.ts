import { MedusaService } from "@medusajs/framework/utils"
import Post from "./models/post"

// recommended to define type in another file
type ModuleOptions = {
  capitalize?: boolean
}

class BlogModuleService extends MedusaService({
  Post,
}){
    protected options_: ModuleOptions

    constructor({}, options?: ModuleOptions) {
    super(...arguments)

    this.options_ = options || {
      capitalize: false,
    }
  }

}

export default BlogModuleService