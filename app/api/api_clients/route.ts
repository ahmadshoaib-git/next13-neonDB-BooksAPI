import { NextRequest, NextResponse } from 'next/server';
import { ClientService } from '../../../services/client';

export async function POST(request: NextRequest) {
    try {
        const req = await request.json();
        const { clientName, clientEmail } = req;
        if (clientName && clientEmail) {
            const _clientName: string = clientName as string;
            const _clientEmail: string = clientEmail as string;
            const data = await ClientService.createAccessToken({ _clientName, _clientEmail });
            return NextResponse.json(data);
        } else return NextResponse.json({ error: `Invalid Client Name ${clientName} and Client Email ${clientEmail}` }, { status: 400 });
    } catch (err) {
        return NextResponse.json({ error: 'Something Went Wrong' }, { status: 500 });
    }
}

