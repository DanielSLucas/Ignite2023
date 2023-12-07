import { extractQueryParams } from "../utils/extract-query-params.js"

export function queryParams(route) {
  return (req, res) => {
    const routeParams = req.url.match(route.path)    

    req.query = routeParams.groups?.query 
      ? extractQueryParams(routeParams.groups.query)
      : {}
  }
}