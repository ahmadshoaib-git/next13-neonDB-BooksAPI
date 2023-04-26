import { DBClient } from '../../utils';
import { v4 as uuidv4 } from 'uuid';

export class OrdersService {
    static async fetchAllOrders() {
        try {
            const client = new DBClient();
            const sql = await client.getClient();
            const result: Array<any> = await sql`SELECT * FROM orders`;
            return result;
        } catch (error) {
            console.error('Error executing SQL query:', error);
        }
    }

    static async fetchOrderById(id: string) {
        try {
            const client = new DBClient();
            const sql = await client.getClient();
            const result: Array<any> = await sql`SELECT * FROM orders where orderid=${id}`;
            return result;
        } catch (error) {
            console.error('Error executing SQL query:', error);
        }
    }

    static async placeOrder(bookId: string, clientName: string, quantity: number, timestamp: string) {
        try {
            const client = new DBClient();
            const sql = await client.getClient();
            const orderId = uuidv4();
            const result: any =
                await sql`insert into orders (orderId, bookId, customerName, quantity, timestamp) values (${orderId}, ${bookId}, ${clientName}, ${quantity}, ${timestamp})`;
            console.log(result);
            return result;
        } catch (error) {
            console.error('Error executing SQL query:', error);
        }
    }
}

