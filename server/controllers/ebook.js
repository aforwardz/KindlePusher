const { mysql } = require('../qcloud')

module.exports = async ctx => {
  // 增
  var book = {
    name: "平凡的世界"
  }
  // await mysql("eBook").insert(book)
  // 查
  var res = await mysql().select('*').table('eBook').where({ 'name': book.name })
  // 改
  // await mysql("eBook").update({ price: 66 }).where({ id })
  // 删
  // await mysql("eBook").del().where({ id })

  ctx.state.data = "OjbK"
}