import { NextResponse } from "next/server";
import kueLengkap from '@/data/daftar-kue.json';
import {Kue} from '@/types/kue';

export const dynamic = 'force-static'; 

interface RouteParam{
    params:{
        id:string;
    }
}

export async function GET(request: Request, {params}: RouteParam){
    const kueId = await params.id;
    const kueDitemukan = (kueLengkap as Kue[]).find(kue => kue.id === kueId);

    if(kueDitemukan){
        return NextResponse.json(kueDitemukan);
    }else{
        return NextResponse.json({message:`Kue dengan IS "${kueId}" tidak ditemukan`}, {status :404});
    }


}