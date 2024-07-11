import crypto from 'crypto';

export class Crypto {
  encryptionMethod = 'AES-256-CBC';

  encrypt(tobeHahsedText: string) {
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

    const encryptor = crypto.createCipheriv(this.encryptionMethod, key, iv);

    const encryptedString =
      encryptor.update(tobeHahsedText, 'utf8', 'base64') +
      encryptor.final('base64');

    return `${Buffer.from(encryptedString).toString('base64')}.${key}.${iv}`;
  }
}
