import { Logger } from "@medusajs/framework/types"

type InjectedDependencies = {
  logger: Logger
}

export class ClientService {
  protected logger_: Logger

  constructor({ logger }: InjectedDependencies) {
    this.logger_ = logger
  }
}