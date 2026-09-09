import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::fine.fine', ({ strapi }) => ({
	async getUserId(ctx: any) {
		try {
			const token = await strapi.plugin('users-permissions').service('jwt').getToken(ctx);
			return token?.id;
		} catch {
			return undefined;
		}
	},

	async mine(ctx: any) {
		const userId = await this.getUserId(ctx);
		if (!userId) return ctx.unauthorized('Authentication required');
		ctx.body = { data: await strapi.service('api::fine.fine').findForUser(userId) };
	},
}));
