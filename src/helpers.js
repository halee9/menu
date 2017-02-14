export function setUpdatable(obj){
  let res = {};
  res.data = Object.keys(obj).reduce((result, key) => {
    if (key == 'id' || key == '_id') res.id = obj[key];
    else result[key] = obj[key];
    return result;
  }, {});
  return res;
}
