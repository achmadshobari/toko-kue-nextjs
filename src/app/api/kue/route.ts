import { NextResponse } from "next/server";

inport kueLengkap from '@/data/daftar-kue.json';

export async function GET(request: Request){
    return NextResponse.json(kueLengkap);
}