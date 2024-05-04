import { web } from "./app/web";
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT;

web.listen(PORT, () => {
  console.log(`Server is running on port ${web.get('port')}`);
});