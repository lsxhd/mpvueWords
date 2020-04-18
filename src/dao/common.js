const paramsAppend = param => {
  let params = new URLSearchParams()
  for (let [k, v] of Object.entries(param)) {
    params.append(k, v)
  }
  return params
}

export { paramsAppend }
