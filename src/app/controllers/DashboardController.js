const { User, Appointment } = require('../models')
const moment = require('moment')
const { Op: sequelizeOperators } = require('sequelize')
const sequelize = require('sequelize')

class DashboardController {
  async index (req, res) {
    const user = req.session.user
    const providers = await User.findAll({ where: { provider: true } })

    if (user.provider) {
      const appointments = await Appointment.findAll({
        include: [{ model: User, as: 'client' }],
        where: {
          provider_id: user.id,
          date: {
            [sequelizeOperators.gte]: moment().startOf('day').format()
          }
        },
        order: [
          ['date', 'ASC']
        ]
      })

      appointments.map(appointment => {
        appointment.dateOnly = moment(appointment.date).format('YYYY-MM-DD')
        appointment.time = moment(appointment.date).format('HH:mm')
      })

      const otherProviders = providers.filter(
        provider => provider.id !== user.id
      )

      return res.render('dashboard-professional', {
        appointments,
        otherProviders
      })
    }
    return res.render('dashboard-client', { providers })
  }
}

module.exports = new DashboardController()
