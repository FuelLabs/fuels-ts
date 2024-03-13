import { request } from 'http';
import { parse } from 'url';

export async function urlIsLive(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const req = request(parse(url), () => {
      resolve(true);
    });

    req.on('error', () => resolve(false));

    req.end();
  });
}
