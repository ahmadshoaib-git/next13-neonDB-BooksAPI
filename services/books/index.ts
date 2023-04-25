import { DBClient } from '../../utils';
import { IBook } from './books.interface';

export class BooksService {
    static async fetchAllBooks() {
        try {
            const client = new DBClient();
            const sql = await client.getClient();
            const result: any = await sql`SELECT bookid,bookname,booktype,available FROM books`;
            return result;
        } catch (error) {
            console.error('Error executing SQL query:', error);
        }
    }
    static async fetchBookById(id: string) {
        try {
            const client = new DBClient();
            const sql = await client.getClient();
            const result: Array<IBook> = await sql`SELECT * FROM books where bookid=${id}`;
            return result;
        } catch (error) {
            console.error('Error executing SQL query:', error);
        }
    }
}

