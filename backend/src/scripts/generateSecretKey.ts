
import { randomBytes } from "crypto";  

const secretKey = randomBytes(32).toString("hex");
console.log("Generated JWT Secret Key:", secretKey);
