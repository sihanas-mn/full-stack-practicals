import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::book.book', ({ strapi }) => ({
	async getUserId(ctx: any) {
		try {
			const token = await strapi.plugin('users-permissions').service('jwt').getToken(ctx);
			return token?.id;
		} catch {
			return undefined;
		}
	},

	async catalog(ctx: any) {
		if (!(await this.getUserId(ctx))) return ctx.unauthorized('Authentication required');
		const search = typeof ctx.query.search === 'string' ? ctx.query.search : undefined;
		const where = search
			? { $or: [{ title: { $containsi: search } }, { isbn: { $containsi: search } }] }
			: {};
		ctx.body = {
			data: await strapi.db.query('api::book.book').findMany({
				where,
				orderBy: { title: 'asc' },
				populate: ['author', 'category', 'cover_image'],
			}),
		};
	},

	async dashboard(ctx: any) {
		if (!(await this.getUserId(ctx))) return ctx.unauthorized('Authentication required');
		ctx.body = { data: await strapi.service('api::book.book').dashboardStats() };
	},
}));
