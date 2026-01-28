module.exports = (urlPage, totalProducts) => {
  const currentPage = parseInt(urlPage) || 1
  const objPavigation = {
    limitProducts: 4,
    currentPage: currentPage
  }

  objPavigation.skipProducts = (objPavigation.currentPage - 1) * objPavigation.limitProducts
  const totalPages = Math.ceil(totalProducts / objPavigation.limitProducts)
  if(totalPages) {
    objPavigation.totalPage = totalPages
  }
  return objPavigation
}