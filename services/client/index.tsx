import jwt, { Secret } from 'jsonwebtoken';
import { DBClient } from '../../utils';
interface IAccessTokenInput {
    _clientName: string;
    _clientEmail: string;
}
export class ClientService {
    static async createAccessToken({ _clientName = '', _clientEmail = '' }: IAccessTokenInput) {
        try {
            const client = new DBClient();
            const sql = await client.getClient();
            const key: any | Secret = process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET;
            const accessToken: string = jwt.sign({ name: _clientName, email: _clientEmail }, key, { expiresIn: '7d' });
            const result: any = await sql`insert into clients (clientName, clientEmail, clientToken) values (${_clientName}, ${_clientEmail}, ${accessToken})`;
            console.log(result);
            return accessToken;
        } catch (error) {
            console.error('Error executing SQL query:', error);
        }
    }
}

