// import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { ClientService } from '../../../../services/client';

export async function GET(req: NextRequest, { params }: any) {
    try {
        if (params?.name) {
            const { name } = params;
            const client = await ClientService.getClientByName(name);
            console.log(client);
            if (client && client?.length > 0) return NextResponse.json({ client }, { status: 200 });
            else return NextResponse.json({ error: `No record found containing name:${name}` }, { status: 404 });
        } else {
            return NextResponse.json({ error: 'Please send the required name to get client data' }, { status: 400 });
        }
    } catch (err) {
        return NextResponse.json({ error: 'Something Went Wrong' }, { status: 500 });
    }
}

