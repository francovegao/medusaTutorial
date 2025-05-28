//File to use JS SDK that simplifies sending requests to the server's API routes
import Medusa from "@medusajs/js-sdk"

export const sdk = new Medusa({
  baseUrl: import.meta.env.VITE_BACKEND_URL || "/",  //URL to medusa server
  debug: import.meta.env.DEV,     //to neable logging debug messages. Should only be enabled in development
  auth: { 
    type: "session",              //Auth method used in the client application
  },
})