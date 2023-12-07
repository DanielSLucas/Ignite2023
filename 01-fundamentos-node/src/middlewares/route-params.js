export function routeParams(route) {
  return (req, res) => {
    const routeParams = req.url.match(route.path)
    
    req.params = routeParams.groups
  }
}