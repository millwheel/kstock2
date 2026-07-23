import "server-only";
import bcrypt from "bcryptjs";

const ROUNDS = 12;

/** 평문 비밀번호를 bcrypt 해시로 변환한다. 저장 시 이 값만 DB에 넣는다. */
export function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, ROUNDS);
}

/** 평문 비밀번호가 해시와 일치하는지 검증한다. */
export function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}
