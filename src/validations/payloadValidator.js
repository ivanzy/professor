const validate = (payload) => {
  if (!(payload.name && typeof payload.name === "string"))
    return false;
  if (
    !(payload.lambda && typeof payload.lambda === "number")
  )
    return false;
  if (!(payload.time && typeof payload.time === "number"))
    return false;
  if (!(payload.url && typeof payload.url === "object"))
    return false;
  if (
    !(
      payload.url.get && typeof payload.url.get === "string"
    )
  )
    return false;
  if (
    !(
      payload.url.post && typeof payload.url.post === "string"
    )
  )
    return false;
  if (
    !(
      payload.url.put && typeof payload.url.put === "string"
    )
  )
    return false;
  if (
    !(
      payload.url.delete && typeof payload.url.delete === "string"
    )
  )
    return false;
  if (
    !(
      payload.url.patch && typeof payload.url.patch === "string"
    )
  )
    return false;

  return true;
};

module.exports = validate;
