const validate = (payload) => {
  if (!(payload.name && typeof payload.name === "string"))
    return false;
  if (
    !(payload.lambda && typeof payload.lambda === "number")
  )
    return false;
  if (!(payload.time && typeof payload.time === "number"))
    return false;
  if (!(payload.url && typeof payload.url === "string"))
    return false;
  return true;
};

module.exports = validate;
