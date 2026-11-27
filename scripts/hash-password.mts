import bcrypt from "bcryptjs";

const password = process.argv[2];
if (!password || password.length < 10) {
  console.error("Kullanım: npm run hash-password -- '<en az 10 karakterlik şifre>'");
  process.exit(1);
}
const hash = await bcrypt.hash(password, 12);
console.log(`ADMIN_PASSWORD_HASH_B64=${Buffer.from(hash).toString("base64")}`);
