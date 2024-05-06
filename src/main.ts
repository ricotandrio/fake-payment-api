import { web } from "./app/web";

web.listen(3000, () => {
  console.log('Fake Payment API is running...');
  console.log('Booting server...');
  console.log(`Server is running on http://localhost:3000`);
});