import Joi from 'joi';
import { NextRequest, NextResponse } from 'next/server';
import { ClientService } from '../../../services/client';

export async function POST(request: NextRequest) {
    try {
        // console.log(request);
        const req = await request.json();
        // console.log(request.headers);
        // const { authorization } = request.headers;
        // console.log('authorization >', request.headers?.authorization || '');
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
        if (!checkClient || checkClient?.length === 0) {
            const data = await ClientService.createAccessToken({ clientName, clientEmail });
            return NextResponse.json(data);
        } else return NextResponse.json({ error: `User with name:${name} already exists, please submit unique name.` }, { status: 404 });
    } catch (err) {
        return NextResponse.json({ error: 'Something Went Wrong' }, { status: 500 });
    }
}

