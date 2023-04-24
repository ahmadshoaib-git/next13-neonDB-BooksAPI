import postgres from 'postgres';

// Singleton class for DB connection
class DBClient {
    private static instance: DBClient;
    private client: any;

    constructor() {
        if (DBClient.instance) {
            return DBClient.instance;
        }

        this.client = this.connectClient();
        DBClient.instance = this;
    }

    connectClient = async () => {
        const client = await postgres(process.env.NEXT_PUBLIC_DATABASE_URL || '', {
            host: process.env.NEXT_PUBLIC_PGHOST,
            port: 5432,
            database: process.env.NEXT_PUBLIC_PGDATABASE,
            username: process.env.NEXT_PUBLIC_PGUSER,
            password: process.env.NEXT_PUBLIC_PGPASSWORD,
        });
        return client;
    };
    getClient = () => this.client;
}
export { DBClient };

