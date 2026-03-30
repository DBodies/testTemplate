import { startServer } from "./server.js"
import { initMongoDb } from "./DB/initMongoDb.js"

const boot = async () => {
    await initMongoDb()
    startServer()
}
boot()
