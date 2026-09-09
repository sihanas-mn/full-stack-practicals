import { factories } from '@strapi/strapi';

const activeStatuses = ['Borrowed', 'Late'];
const defaultLoanDays = 14;
const finePerDay = 1;

export default factories.createCoreService('api::borrow-record.borrow-record', ({ strapi }) => ({
	async borrowBook(bookId: number, userId: number, dueDate?: string) {
		const book = await strapi.db.query('api::book.book').findOne({ where: { id: bookId } });
		if (!book) throw new Error('Book not found');

		const activeLoan = await strapi.db.query('api::borrow-record.borrow-record').findOne({
			where: { book: bookId, lend_status: { $in: activeStatuses } },
		});
		if (activeLoan) throw new Error('This book is currently borrowed');

		const borrowDate = new Date();
		const due = dueDate ? new Date(dueDate) : new Date(borrowDate);
		if (!dueDate) due.setDate(due.getDate() + defaultLoanDays);
		if (Number.isNaN(due.getTime()) || due <= borrowDate) {
			throw new Error('Due date must be a valid future date');
		}

		return strapi.db.query('api::borrow-record.borrow-record').create({
			data: {
				book: bookId,
				users_permissions_user: userId,
				borrow_date: borrowDate,
				due_date: due,
				return_date: null,
				lend_status: 'Borrowed',
			},
			populate: ['book', 'users_permissions_user'],
		});
	},

	async returnBook(recordId: number, userId: number) {
		const record = await strapi.db.query('api::borrow-record.borrow-record').findOne({
			where: { id: recordId },
			populate: ['book', 'users_permissions_user'],
		});
		if (!record) throw new Error('Borrow record not found');
		if (record.users_permissions_user?.id !== userId) throw new Error('You can only return your own books');
		if (record.lend_status === 'Returned') throw new Error('This book has already been returned');

		const returnDate = new Date();
		const dueDate = new Date(record.due_date);
		const isLate = returnDate > dueDate;
		const updated = await strapi.db.query('api::borrow-record.borrow-record').update({
			where: { id: recordId },
			data: { return_date: returnDate, lend_status: 'Returned' },
			populate: ['book', 'users_permissions_user'],
		});

		if (isLate) {
			const daysLate = Math.max(1, Math.ceil((returnDate.getTime() - dueDate.getTime()) / 86400000));
			const amount = daysLate * finePerDay;
			const fine = await strapi.db.query('api::fine.fine').findOne({ where: { borrow_record: recordId } });
			if (fine) {
				await strapi.db.query('api::fine.fine').update({
					where: { id: fine.id },
					data: { amount, reason: `${daysLate} day(s) late` },
				});
			} else {
				await strapi.db.query('api::fine.fine').create({
					data: {
						amount,
						paid: false,
						reason: `${daysLate} day(s) late`,
						borrow_record: recordId,
						users_permissions_user: userId,
					},
				});
			}
		}

		return updated;
	},

	async findForUser(userId: number) {
		const records = await strapi.db.query('api::borrow-record.borrow-record').findMany({
			where: { users_permissions_user: userId },
			orderBy: { borrow_date: 'desc' },
			populate: ['book', 'users_permissions_user'],
		});

		const now = Date.now();
		await Promise.all(records.filter((record: any) => record.lend_status === 'Borrowed' && new Date(record.due_date).getTime() < now).map((record: any) => (
			strapi.db.query('api::borrow-record.borrow-record').update({ where: { id: record.id }, data: { lend_status: 'Late' } })
		)));
		return records.map((record: any) => record.lend_status === 'Borrowed' && new Date(record.due_date).getTime() < now ? { ...record, lend_status: 'Late' } : record);
	},
}));
