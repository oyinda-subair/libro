export default {
  home(req, res) {
    return res.status(200).send('Welcome to API crash course')
  },

  addMessage(req, res) {
    const message = `hello ${req.body.to}!`
    return res.send({ status: 'ok', message })
  }
}
