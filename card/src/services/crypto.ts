import crypto from 'crypto';

export class Crypto {
  encryptionMethod = 'AES-256-CBC';

  static encrypt(tobeHahsedText: string) {
    const key = crypto
      .createHash('sha512')
      .update(process.env.SECRET_KEY!, 'utf-8')
      .digest('hex')
      .substring(0, 32);
    const iv = crypto
      .createHash('sha512')
      .update(process.env.SECRET_IV!, 'utf-8')
      .digest('hex')
      .substring(0, 16);
  }
}
