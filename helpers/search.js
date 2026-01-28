module.exports = (searchStatus) => {
  let objSearch = {
    keyword: ""
  }
  if(searchStatus) {
    objSearch.keyword = searchStatus
    const reg = new RegExp(objSearch.keyword, "i")
    objSearch.regex = reg
  }
  return objSearch
}