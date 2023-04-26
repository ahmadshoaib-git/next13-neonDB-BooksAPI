import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { OrdersService } from '../../../services/orders';
import { BooksService } from '../../../services/books';
import { ClientService } from '../../../services/client';
import { IBook } from '../../../services/books/books.interface';
import { IError } from '../../../services/errorInterface';
import Joi from 'joi';

export async function GET(res: NextApiResponse<IBook | IError>) {
    try {
        const data = await OrdersService.fetchAllOrders();
        return NextResponse.json(data);
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
        });
    }
}

export async function POST(request: NextRequest) {
    try {
        const req = await request.json();
        const { bookId, clientName, quantity } = req;
        const schema = Joi.object({
            bookId: Joi.string().min(10).max(255).required(),
            clientName: Joi.string().min(1).max(255).required(),
            quantity: Joi.number().positive().greater(0).required(),
        });
        const timestamp = new Date().toISOString();
        const check = schema.validate({ bookId, clientName, quantity });
        console.log(check);
        if (check.error) {
            console.log(check.error?.details[0]?.message);
            return NextResponse.json({ error: check.error?.details[0]?.message }, { status: 400 });
        }
        const checkBookData = await BooksService.fetchBookById(bookId);
        if (!checkBookData?.length || checkBookData?.length === 0) {
            return NextResponse.json({ error: `Invalid book Id:${bookId}` }, { status: 400 });
        }
        const checkClientData = await ClientService.getClientByName(clientName);
        if (!checkClientData?.length || checkClientData?.length === 0) {
            return NextResponse.json({ error: `Invalid Client Name:${clientName}` }, { status: 400 });
        }
        const data = await OrdersService.placeOrder(bookId, clientName, quantity, timestamp);
        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json({ error: 'Something Went Wrong' }, { status: 500 });
    }
}

