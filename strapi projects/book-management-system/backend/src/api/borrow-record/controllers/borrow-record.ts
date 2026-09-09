import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::borrow-record.borrow-record', ({ strapi }) => ({
	async getUserId(ctx: any) {
		try {
			const token = await strapi.plugin('users-permissions').service('jwt').getToken(ctx);
			return token?.id;
		} catch {
			return undefined;
		}
	},

	async borrow(ctx: any) {
		const userId = await this.getUserId(ctx);
		if (!userId) return ctx.unauthorized('Authentication required');
		const { bookId, dueDate } = ctx.request.body ?? {};
		if (!bookId) return ctx.badRequest('bookId is required');

		try {
			ctx.body = { data: await strapi.service('api::borrow-record.borrow-record').borrowBook(Number(bookId), userId, dueDate) };
		} catch (error) {
			return ctx.badRequest(error instanceof Error ? error.message : 'Unable to borrow book');
		}
	},

	async return(ctx: any) {
		const userId = await this.getUserId(ctx);
		if (!userId) return ctx.unauthorized('Authentication required');
		try {
			ctx.body = { data: await strapi.service('api::borrow-record.borrow-record').returnBook(Number(ctx.params.id), userId) };
		} catch (error) {
			return ctx.badRequest(error instanceof Error ? error.message : 'Unable to return book');
		}
	},

	async mine(ctx: any) {
		const userId = await this.getUserId(ctx);
		if (!userId) return ctx.unauthorized('Authentication required');
		ctx.body = { data: await strapi.service('api::borrow-record.borrow-record').findForUser(userId) };
	},
}));
