import jwt, { Secret } from 'jsonwebtoken';
import { DBClient } from '../../utils';
interface IAccessTokenInput {
    clientName: string;
    clientEmail: string;
}
export class ClientService {
    static async createAccessToken({ clientName = '', clientEmail = '' }: IAccessTokenInput) {
        try {
            const client = new DBClient();
            const sql = await client.getClient();
            const key: any | Secret = process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET;
            const accessToken: string = jwt.sign({ name: clientName, email: clientEmail }, key, { expiresIn: '7d' });
            const result: any = await sql`insert into clients (clientName, clientEmail, clientToken) values (${clientName}, ${clientEmail}, ${accessToken})`;
            console.log(result);
            return accessToken;
        } catch (error) {
            console.error('Error executing SQL query:', error);
        }
    }
    static async getClientByName(name: string) {
        try {
            const client = new DBClient();
            const sql = await client.getClient();
            const result: any = await sql`SELECT * FROM clients where clientname=${name}`;
            console.log(result);
            return result;
        } catch (error) {
            console.error('Error executing SQL query:', error);
        }
    }
}

