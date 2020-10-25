const fs = require("fs")

const StorageFacade = require("../Facades/StorageFacade.js")
const { randomFileName, getFileExtension } = require("../utils")

async function storeLocal(file) {
    try {
        const filename = randomFileName() + getFileExtension(file.filename)

        await StorageFacade.uploadFileLocal(file.path, filename)

        await fs.promises.unlink(file.path)

        return filename
    } catch (error) {
        console.error(error)
        return false
    }
}

module.exports = { storeLocal }