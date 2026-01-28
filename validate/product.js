module.exports.createPost = async (req, res, next) => {
  if(!req.body.title) {
    req.flash('error', 'Title is required')
    res.redirect(req.get('referer'))
    return
  }
  next()
}
