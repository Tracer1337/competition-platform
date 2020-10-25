const StorageFacade = require("../Facades/StorageFacade.js")

async function getFile(req, res) {
    try {
        const file = await StorageFacade.getFileLocal(req.params.filename)
        res.end(file)
    } catch {
        res.status(404).end()
    }
}

module.exports = { getFile }