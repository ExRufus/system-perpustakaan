const baseRespone = (data, status, msg) => {
  return {
    status,
    data,
    message: msg

  }
}

module.exports = baseRespone;