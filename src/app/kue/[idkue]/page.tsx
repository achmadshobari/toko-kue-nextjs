import React from "react";
import Link from "next/link";
import { Kue } from "@/types/kue";
import Image from "next/image";

interface DetailKuePageProps {
  params: {
    idKue: string;
  };
}

async function getDetailKue(id: string): Promise<Kue | null> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/kue/${id}`, {
    cache: "force-cache",
  });
  console.log(response);
  if (!response.ok) {
    if (response.status === 404) {
      console.log("e");
      return null;
    }

    console.error(
      "Gagal mengambil detail kue:",
      response.status,
      response.statusText
    );
  }
  return response.json();
}

export default async function HalamanDetailKue({ params }: DetailKuePageProps) {
  const idKue = params.idKue;
  const kue = await getDetailKue(idKue);

  if (!kue) {
    return (
      <div className="text-center py-18">
        <h1 className="text-2xl font-bold text-red-688">Kue tidak ditemukan</h1>
        <p className="mt-4">Maaf, kue dengan ID {idKue} tidak kami temukan</p>
        <Link
          href="/"
          className="mt-6 inline-block bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Kembali ke daftar kue
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Link
        href="/"
        className="text-blue-600 hover:underline mb-6 inline-block"
      >
        &larr; Kembali ke Semua Kue
      </Link>
      <article className="bg-white shadow-xl rounded-lg overflow-hidden md:flex">
        <div className="md:w-1/2 relative h-64 md:h-auto">
          {" "}
          {/* Butuh tinggi untuk 'fill' atau set rasio aspek */}
          <Image
            src={kue.gambarUrl}
            alt={kue.nama}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 50vw"
            priority // Penting untuk gambar utama di atas lipatan (Above The Fold)
          />
        </div>
        <div className="md:w-1/2 p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            {kue.nama}
          </h1>
          <p className="text-sm text-gray-500 mb-4">Kategori: {kue.kategori}</p>

          <p className="text-2xl font-semibold text-pink-600 mb-6">
            Rp {kue.harga.toLocaleString("id-ID")}
          </p>

          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Deskripsi Lengkap:
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            {kue.deskripsiLengkap}
          </p>

          {kue.bahanUtama && kue.bahanUtama.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-1">
                Bahan Utama:
              </h3>
              <ul className="list-disc list-inside text-gray-600">
                {kue.bahanUtama.map((bahan, index) => (
                  <li key={index}>{bahan}</li>
                ))}
              </ul>
            </div>
          )}

          {kue.rating && (
            <p className="text-yellow-500 font-semibold mb-6">
              Rating: {"⭐".repeat(Math.floor(kue.rating))} (
              {kue.rating.toFixed(1)})
            </p>
          )}

          {/* Tombol Tambah ke Keranjang akan kita buat sebagai Client Component nanti */}
          <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors text-lg">
            Tambah ke Keranjang
          </button>
          {/* <tombol-tambah-keranjang kue={kue} /> */}
        </div>
      </article>
    </div>
  );
}
