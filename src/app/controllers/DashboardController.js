const { User } = require('../models')

class DashboardController {
  async index (req, res) {
    const user = req.session.user
    const providers = await User.findAll({ where: { provider: true } })

    if (user.provider) {
      const otherProviders = providers.filter(
        provider => provider.id !== user.id
      )
      console.log(otherProviders, 'otherProviders')
      return res.render('dashboard-professional', { otherProviders })
    }
    return res.render('dashboard-client', { providers })
  }
}

module.exports = new DashboardController()
