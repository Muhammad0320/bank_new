import crypto, { createCipheriv, createDecipheriv } from 'crypto';

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

    const encryptor = createCipheriv(this.encryptionMethod, key, iv);

    const encryptedString =
      encryptor.update(tobeHahsedText, 'utf8', 'base64') +
      encryptor.final('base64');

    return `${Buffer.from(encryptedString).toString('base64')}.${key}.${iv}`;
  }

  decrypt(encryptionString: string) {
    const [encryptedMessage, key, iv] = encryptionString.split('.');

    let buf: string | Buffer = Buffer.from(encryptedMessage, 'base64');

    buf = buf.toString('utf-8');

    const decryptor = createDecipheriv(this.encryptionMethod, key, iv);

    return decryptor.update(buf, 'base64', 'utf8') + decryptor.final('utf8');
  }
}
