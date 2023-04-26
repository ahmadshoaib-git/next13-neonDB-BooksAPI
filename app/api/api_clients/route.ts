import Joi from 'joi';
import { NextRequest, NextResponse } from 'next/server';
import { ClientService } from '../../../services/client';

export async function POST(request: NextRequest) {
    try {
        const req = await request.json();
        const { clientName, clientEmail } = req;
        const schema = Joi.object({
            clientName: Joi.string().min(3).max(255).required(),
            clientEmail: Joi.string().email().required(),
        });
        const check = schema.validate({ clientName, clientEmail });
        console.log(check);
        if (check.error) {
            console.log(check.error?.details[0]?.message);
            return NextResponse.json({ error: check.error?.details[0]?.message }, { status: 400 });
        }
        const checkClient = await ClientService.getClientByName(clientName);
        if (checkClient && checkClient?.length > 0) {
            return NextResponse.json({ error: `User with name:${name} already exists, please submit unique name.` }, { status: 404 });
        }
        const data = await ClientService.createAccessToken({ clientName, clientEmail });
        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({ error: 'Something Went Wrong' }, { status: 500 });
    }
}

