export interface Kue{
    id: string;
    nama: string;
    deskripsiSingkat: string;
    deskripsiLengkap: string;
    harga: number;
    gambarUrl: string;
    kategori: string;
    rating?: number;
    bahanUtama?:string;
}