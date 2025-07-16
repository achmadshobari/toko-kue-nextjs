import { NextResponse } from "next/server";
import kueLengkap from '@/data/daftar-kue.json';
import {kue} from '@/types/kue';

interface RouteParam{
    params:{
        id:string;
    }
}
