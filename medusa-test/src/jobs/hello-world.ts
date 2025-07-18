export default async function myCustomJob() {
  console.log("I'll be executed three times only.")
}

export const config = {
  name: "hello-world",
  // execute every minute
  schedule: "* * * * *",
  numberOfExecutions: 3,
}   