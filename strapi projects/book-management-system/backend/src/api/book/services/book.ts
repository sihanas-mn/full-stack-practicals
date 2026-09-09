import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::book.book', ({ strapi }) => ({
	async dashboardStats() {
		const [books, borrowed, users, pendingFines] = await Promise.all([
			strapi.db.query('api::book.book').count({ where: { publishedAt: { $notNull: true } } }),
			strapi.db.query('api::borrow-record.borrow-record').count({
				where: { lend_status: { $in: ['Borrowed', 'Late'] } },
			}),
			strapi.db.query('plugin::users-permissions.user').count(),
			strapi.db.query('api::fine.fine').count({ where: { paid: false } }),
		]);

		return { totalBooks: books, availableBooks: Math.max(0, books - borrowed), borrowedBooks: borrowed, users, pendingFines };
	},
}));
