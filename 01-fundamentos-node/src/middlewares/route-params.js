export function routeParams(route) {
  return (req, res) => {
    const routeParams = req.url.match(route.path)
    
    if (routeParams.groups?.query) {
      delete routeParams.groups?.query
    }

    req.params = routeParams.groups
  }
}