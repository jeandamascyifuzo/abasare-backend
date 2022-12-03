const sendError = (res, code, message, data) => {
    res.status(code).json({ "status": "error", message, data });
}

const success = (res, code, message, data) => {
    res.status(code).json({ "status": "1", message, data });
}

const fail = (res, code, message, data) => {
    res.status(code).json({ "status": "0", message, data });
}
export { sendError, success, fail }
