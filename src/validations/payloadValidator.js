const validate = (payload) => {
  if (!(payload.name && typeof payload.name === "string"))
    return false;
  if (!(payload.time && typeof payload.time === "number"))
    return false;
  if (
    !(
      payload.numberOfEdges &&
      typeof payload.numberOfEdges === "number"
    )
  )
    return false;

  return true;
};

function isValidURL(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}
module.exports = validate;
