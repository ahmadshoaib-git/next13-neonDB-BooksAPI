// import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { OrdersService } from '../../../../services/orders';

export async function GET(req: NextRequest, { params }: any) {
    try {
        if (params?.id) {
            const { id } = params;
            const order = await OrdersService.fetchOrderById(id);
            console.log(order);
            if (order && order?.length > 0) return NextResponse.json({ order }, { status: 200 });
            else return NextResponse.json({ error: `No record found containing Id : ${id}` }, { status: 404 });
        } else {
            return NextResponse.json({ error: 'Please send the required id to get order data' }, { status: 400 });
        }
    } catch (err) {
        return NextResponse.json({ error: 'Something Went Wrong' }, { status: 500 });
    }
}

