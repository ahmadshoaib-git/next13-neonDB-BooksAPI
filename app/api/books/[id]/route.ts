// import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { BooksService } from '../../../../services/books';
import { IBook } from '../../../../services/books/books.interface';
import { IError } from '../../../../services/errorInterface';

export async function GET(req: NextRequest, { params }: any) {
    try {
        if (params?.id) {
            const { id } = params;
            const book = await BooksService.fetchBookById(id);
            console.log(book);
            if (book && book?.length > 0) return NextResponse.json({ book }, { status: 200 });
            else return NextResponse.json({ error: `No record found containing Id : ${id}` }, { status: 404 });
        } else {
            return NextResponse.json({ error: 'Please send the required id to get book data' }, { status: 400 });
        }
    } catch (err) {
        return NextResponse.json({ error: 'Something Went Wrong' }, { status: 500 });
    }
}

