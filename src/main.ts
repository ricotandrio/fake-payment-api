import { web } from "./app/web";
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT;
export const JWT_SECRET = process.env.JWT_SECRET;

web.listen(PORT, () => {
  console.log(`Server is running on port ${web.get('port')}`);
});