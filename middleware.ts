import * as jose from 'jose';
import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';

const secret = process.env.NEXT_PUBLIC_SECRET;

// eslint-disable-next-line no-implicit-globals
export default async function middleware(req: NextRequest) {
    const {cookies, nextUrl} = req;
    const jwt = cookies.get('affilERP');

    const loginUrl = nextUrl.clone();
    loginUrl.pathname = '/auth/login';

    if (nextUrl.pathname.startsWith('/protected')) {
        if (jwt === undefined) {
            return NextResponse.redirect(loginUrl);
        }

        try {
            const {payload: jwtData} = await jose.jwtVerify(jwt, new TextEncoder().encode(secret));

            if (jwtData) {
                return NextResponse.next();
            }

            return NextResponse.redirect(loginUrl);
        } catch (error) {
            return NextResponse.redirect(loginUrl);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/protected/:path*'],
};
