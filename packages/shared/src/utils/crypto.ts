import { randomBytes, createHash } from 'crypto';

export function generateRandomId(length: number = 32): string {
  return randomBytes(length).toString('hex');
}

export function hashString(input: string): string {
  return createHash('sha256').update(input).digest('hex');
}

export function generateToken(): string {
  return randomBytes(32).toString('hex');
}
