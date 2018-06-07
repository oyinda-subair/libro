import controller from '../controllers/v1'

const homeController = controller.home
const memberController = controller.member


const Routes = (app) => {
  app.route('/').post(homeController.addMessage).get(homeController.home)

  /*
  Member Route using memberController
   */
  // POST GET /libro/v1/members
  app.route('/libro/v1/members')
    .post(memberController.create)
    .get(memberController.all)

  // GET PUT DELETE /libro/v1/member/:id'
  app.route('/libro/v1/members/:id')
    .get(memberController.getById)
    .put(memberController.updateById)
    .delete(memberController.deleteById)

  // GET /libro/v1/member/:email'
  app.route('/libro/v1/members/:email/email')
    .get(memberController.getByEmail)

  // GET /libro/v1/member/:username'
  app.route('/libro/v1/members/:username/username')
    .get(memberController.getByUsername)

  app.route('/libro/v1/members/:id/change_password')
    .put(memberController.updatePassword)

  app.route('/libro/v1/members/:id/update_role')
    .put(memberController.updateRoleById)
}

export default Routes;
