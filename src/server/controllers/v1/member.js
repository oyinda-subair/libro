import { Op } from 'sequelize'

import { Member } from '../../models'
import tools from '../tools'

export default {
  create(req, res) {
    return Member
      .findOne({
        where: {
          [Op.or]: [{ email: req.body.email }, { username: req.body.username }]
        }
      }).then((member) => {
        if (member) {
          return res.status(409).send({
            message:
            'create: Member with Email Address / Username Already Exists'
          });
        }
        Member.create(req.body).then((response) => {
          const token = tools.token(response)
          return res.status(201).send({
            token,
            message: 'create: Member successfully created'
          })
        }).catch(error => res.status(400).send({
          error, message: `create: Error creating member ${req.body.email}`
        }))
        return false
      })
  },
  all(req, res) {
    return Member
      .findAll()
      .then((members) => {
        if (!members) {
          return res.status(404).send({
            message: 'all: No Data returned'
          });
        }
        return res.status(200).send({
          data: members
        })
      }).catch(error => res.status(400).send({
        error, message: 'all: Error getting Members'
      }))
  },
  getById(req, res) {
    return Member
      .findById(req.params.id)
      .then((member) => {
        if (!member) {
          return res.status(404).send({
            message: `getById: No Member with member_id: ${req.params.id} found`
          });
        }
        return res.status(200).send({ data: member })
      }).catch(error => res.status(400).send({
        error, message: 'getById: Error getting Member'
      }))
  },
  getByEmail(req, res) {
    return Member
      .findOne({
        where: {
          email: req.params.email
        }
      }).then((member) => {
        if (!member) {
          return res.status(404).send({
            message:
            `getByEmail: No Member with email: ${req.params.email} found`
          });
        }
        return res.status(200).send({ data: member })
      }).catch(error => res.status(400).send({
        error, message: 'getByEmail: Error getting Member'
      }))
  },
  getByUsername(req, res) {
    return Member
      .findOne({
        where: {
          username: req.params.username
        }
      }).then((member) => {
        if (!member) {
          return res.status(404).send({
            message:
            `getByUsername: No Member with username: ${req.params.email} found`
          });
        }
        return res.status(200).send({ data: member })
      }).catch(error => res.status(400).send({
        error, message: 'getByUsername: Error getting Member'
      }))
  },
  updateRoleById(req, res) {
    return Member
      .findById(req.params.id)
      .then((member) => {
        if (!member) {
          return res.status(404).send({
            message:
            `updateRoleById: No Member with member_id: ${req.params.id} found`
          });
        }
        const info = req.body
        return member
          .update({
            role: member.roles.push(info.role) || member.roles
          }).then(newMemberDetails => res.status(200).send({
            data: newMemberDetails,
            token: info.username ? tools.token(info) : null,
            message: 'updateRoleById: Member Role successfully updated'
          })).catch(error => res.status(400).send({
            error, message: 'updateRoleById: Error updating Member role'
          }))
      })
  },
  updateById(req, res) {
    return Member
      .findById(req.params.id)
      .then((member) => {
        if (!member) {
          return res.status(404).send({
            message:
            `updateById: No Member with member_id: ${req.params.id} found`
          });
        }
        const info = req.body
        return member.update(req.body, { fields: Object.keys(req.body) })
          .then(newMemberDetails => res.status(200).send({
            data: newMemberDetails,
            token: info.username ? tools.token(info) : null,
            message: 'updateById: Member has been successfully updated'
          })).catch(error => res.status(400).send({
            error, message: 'updateById: Error updating Member'
          }))
      })
  },
  updatePassword(req, res) {
    return Member.findById(req.params.id)
      .then((member) => {
        if (!member) {
          return res.status(404).send({
            message:
            `updatePassword: No Member with member_id: ${req.params.id} found`
          });
        }
        const info = req.body
        const password = tools.hashPassword(info.password)
        return member
          .update({
            password: password || member.password
          }).then(newPassword => res.status(200).send({
            token: tools.token(member),
            message:
            `updatePassword: Password updated member_id: ${member.username}`
          })).catch(error => res.status(400).send({
            error, message: 'updatePassword: Error updating Member password'
          }))
      })
  },
  deleteById(req, res) {
    return Member.findById(req.params.id)
      .then((member) => {
        if (!member) {
          return res.status(404).send({
            message:
            `deleteById: No Member with member_id: ${req.params.id} found`
          });
        }
        return member
          .destroy()
          .then(() => res.status(200).send({
            message: `${member.username} deleted successfully`
          })).catch(error => res.status(400).send({
            error, message: 'deleteById: Error deleting Member'
          }))
      })
  }
}
