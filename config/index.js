module.exports = {
  baseUrl (categoryId,startPage) {
    return `https://www.pearvideo.com/category_loading.jsp?reqType=5&categoryId=${categoryId}&start=${startPage}`
  }
}