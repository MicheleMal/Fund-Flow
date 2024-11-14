import * as crypto from 'crypto';

const alg = 'aes-256-cbc';

export const encryptEmail = (email: string): string => {
  const iv = Buffer.from(process.env.iv, "hex");
  const key = Buffer.from(process.env.KEY_CRYPTO_DECRYPT, "hex")
  
  const chiper = crypto.createCipheriv(alg, key, iv);

  let encryptedEmail = chiper.update(email, 'utf-8', 'hex');
  encryptedEmail += chiper.final('hex');

  return encryptedEmail;
};

export const decryptEmail = (encryptedEmail: string): string => {
  const iv = Buffer.from(process.env.iv, "hex");
  const key = Buffer.from(process.env.KEY_CRYPTO_DECRYPT, "hex")

  const decipher = crypto.createDecipheriv(alg, key, iv);

  let decryptedEmail = decipher.update(encryptedEmail, 'hex', 'utf-8');
  
  decryptedEmail += decipher.final('utf-8');

  return decryptedEmail;
};
