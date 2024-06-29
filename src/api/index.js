export async function sendNotification(fcmtoken, pnType, delay) {
  const data = {
    v: 1,
    platform: 'app',
    admmdlid:
      '12f3894ed72fc7d4e3b98688b20513e20a3fa1adbd08b9662412322138d26533',
    scope: '8fbff85cb7a2b8cbd53b3086c0b16d4c1e96a5d748cbf8761bace32ab294e83a',
    //-->          ^ Yukarıdaki 4 key API'ın çalışması için zorunludur. Eksik olmaları durumunda API hata (418) verecektir.

    fcm_token: fcmtoken,
    pn_type: pnType,
    pn_delay: delay,
    dev_mode: false,
  };

  const response = await fetch('https://challenges.cask.com.tr/api', {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
}
