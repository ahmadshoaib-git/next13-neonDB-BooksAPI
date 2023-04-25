import { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { BooksService } from '../../../services/books';
import { IBook } from '../../../services/books/books.interface';
import { IError } from '../../../services/errorInterface';

export async function GET(res: NextApiResponse<IBook | IError>) {
    try {
        const data = await BooksService.fetchAllBooks();
        return NextResponse.json(data);
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error',
        });
    }
}

