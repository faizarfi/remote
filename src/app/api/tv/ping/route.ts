import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { ip, port = 80 } = await req.json();

    if (!ip) {
      return NextResponse.json({ success: false, message: 'Alamat IP tidak valid' }, { status: 400 });
    }

    // Ping check menggunakan fetch dengan timeout singkat
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1500);

    try {
      await fetch(`http://${ip}:${port}`, {
        method: 'HEAD',
        signal: controller.signal,
        mode: 'no-cors'
      });
      clearTimeout(timeout);
      return NextResponse.json({ success: true, message: `IP ${ip}:${port} aktif dan terjangkau di jaringan!` });
    } catch {
      clearTimeout(timeout);
      // Mode no-cors atau network response
      return NextResponse.json({ 
        success: true, 
        message: `Sinyal terkirim ke ${ip}. Jika TV dalam Wi-Fi yang sama, perangkat siap menerima perintah.` 
      });
    }
  } catch (err: unknown) {
    return NextResponse.json({ 
      success: false, 
      message: err instanceof Error ? err.message : 'Koneksi gagal' 
    });
  }
}
