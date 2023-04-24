import { DBClient } from '../../utils';
import { IBook } from './books.interface';

export class BooksService {
    static async fetchAllBooks() {
        try {
            const client = new DBClient();
            const sql = await client.getClient();
            const result: Array<IBook> = await sql`SELECT * FROM books`;
            return result;
        } catch (error) {
            console.error('Error executing SQL query:', error);
        }
    }
}

