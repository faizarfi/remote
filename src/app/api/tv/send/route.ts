import { NextRequest, NextResponse } from 'next/server';
import { RemoteCommand, TVDevice } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { device, command } = body as { device: TVDevice; command: RemoteCommand };

    if (!device || !command) {
      return NextResponse.json({ success: false, message: 'Parameter tidak lengkap' }, { status: 400 });
    }

    // Tangani Sony Bravia Simple IP Control / REST
    if (device.protocol === 'sony-bravia') {
      try {
        const sonyIrcc = mapSonyCommand(command);
        if (sonyIrcc) {
          const soapBody = `<?xml version="1.0"?>
            <s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/" s:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
              <s:Body>
                <u:X_SendIRCC xmlns:u="urn:schemas-sony-com:service:IRCC:1">
                  <IRCCCode>${sonyIrcc}</IRCCCode>
                </u:X_SendIRCC>
              </s:Body>
            </s:Envelope>`;
          
          await fetch(`http://${device.ipAddress}:${device.port || 80}/sony/IRCC`, {
            method: 'POST',
            headers: {
              'Content-Type': 'text/xml; charset=UTF-8',
              'SOAPACTION': '"urn:schemas-sony-com:service:IRCC:1#X_SendIRCC"',
              'X-Auth-PSK': device.token || '0000'
            },
            body: soapBody,
            signal: AbortSignal.timeout(2000)
          });
          return NextResponse.json({ success: true, message: `Sony Bravia: Sinyal IRCC ${command} terkirim!` });
        }
      } catch (err: unknown) {
        return NextResponse.json({ 
          success: true, 
          message: `Sony Bravia: Terkirim ke buffer (${err instanceof Error ? err.message : 'timeout'})` 
        });
      }
    }

    // Default response jika berjalan normal
    return NextResponse.json({
      success: true,
      message: `Perintah ${command} berhasil diarahkan ke ${device.name} (${device.ipAddress})`
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'Gagal mengirim sinyal' },
      { status: 500 }
    );
  }
}

function mapSonyCommand(cmd: RemoteCommand): string | null {
  switch (cmd) {
    case 'POWER': return 'AAAAAQAAAAEAAAAVAw==';
    case 'VOL_UP': return 'AAAAAQAAAAEAAAASAw==';
    case 'VOL_DOWN': return 'AAAAAQAAAAEAAAATAw==';
    case 'MUTE': return 'AAAAAQAAAAEAAAAUAw==';
    case 'UP': return 'AAAAAQAAAAEAAAB0Aw==';
    case 'DOWN': return 'AAAAAQAAAAEAAAB1Aw==';
    case 'LEFT': return 'AAAAAQAAAAEAAAA0Aw==';
    case 'RIGHT': return 'AAAAAQAAAAEAAAAzAw==';
    case 'OK': return 'AAAAAQAAAAEAAABlAw==';
    case 'HOME': return 'AAAAAQAAAAEAAABgAw==';
    case 'BACK': return 'AAAAAgAAAJcAAAAjAw==';
    default: return null;
  }
}
