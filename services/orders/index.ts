import { DBClient } from '../../utils';

export class BooksService {
    static async fetchAllOrders() {
        try {
            const client = new DBClient();
            const sql = await client.getClient();
            const result: Array<any> = await sql`SELECT * FROM books`;
            return result;
        } catch (error) {
            console.error('Error executing SQL query:', error);
        }
    }
    static async fetchOrderById(id: string) {
        try {
            const client = new DBClient();
            const sql = await client.getClient();
            const result: Array<any> = await sql`SELECT * FROM books where bookid=${id}`;
            return result;
        } catch (error) {
            console.error('Error executing SQL query:', error);
        }
    }
}

