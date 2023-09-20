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
  if (!(payload.url && isValidURL(payload.url))) return false; // Corrected the URL validation
  if (
    !(
      payload.withFeatures !== undefined && 
      typeof payload.withFeatures === "boolean"
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
