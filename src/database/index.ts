import { AppDataSource } from "../data-source"

AppDataSource.initialize()
    .then(() => {
      console.log("Successfully connected to Database")
    })
    .catch((error) => console.log(error))