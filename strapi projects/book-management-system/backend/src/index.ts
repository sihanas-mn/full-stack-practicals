export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: any }) {
    const authenticatedRole = await strapi.db.query('plugin::users-permissions.role').findOne({
      where: { type: 'authenticated' },
    });

    if (!authenticatedRole) return;

    const actions = [
      'plugin::users-permissions.user.me',
      'api::book.book.find',
      'api::book.book.dashboard',
      'api::borrow-record.borrow-record.mine',
      'api::fine.fine.mine',
    ];

    for (const action of actions) {
      const existingPermission = await strapi.db.query('plugin::users-permissions.permission').findOne({
        where: { action, role: authenticatedRole.id },
      });

      if (!existingPermission) {
        await strapi.db.query('plugin::users-permissions.permission').create({
          data: { action, role: authenticatedRole.id },
        });
      }
    }

    const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
      where: { type: 'public' },
    });

    if (!publicRole) return;

    const customActions = [
      'api::book.book.catalog',
      'api::book.book.dashboard',
      'api::borrow-record.borrow-record.borrow',
      'api::borrow-record.borrow-record.return',
      'api::borrow-record.borrow-record.mine',
      'api::fine.fine.mine',
    ];

    for (const action of customActions) {
      const existingPermission = await strapi.db.query('plugin::users-permissions.permission').findOne({
        where: { action, role: publicRole.id },
      });

      if (!existingPermission) {
        await strapi.db.query('plugin::users-permissions.permission').create({
          data: { action, role: publicRole.id },
        });
      }
    }
  },
};
