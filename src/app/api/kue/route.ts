import { NextResponse } from "next/server";
import kueLengkap from '@/data/daftar-kue.json';

export async function GET(request: Request){
    return NextResponse.json(kueLengkap);
}