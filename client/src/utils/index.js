export function createListeners(target, events) {
    events.forEach(([name, fn]) => {
        target.addEventListener(name, fn, false)
    })

    return () => events.forEach(([name, fn]) => {
        target.removeEventListener(name, fn, false)
    })
}

export function getFileExtension(filename) {
    return filename.match(/\.[0-9a-z]+$/i)[0]
}