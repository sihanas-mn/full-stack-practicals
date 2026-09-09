import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::fine.fine', ({ strapi }) => ({
	async findForUser(userId: number) {
		return strapi.db.query('api::fine.fine').findMany({
			where: { users_permissions_user: userId },
			orderBy: { createdAt: 'desc' },
			populate: ['borrow_record', 'borrow_record.book'],
		});
	},
}));
