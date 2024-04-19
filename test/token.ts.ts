import { TokenService } from "../src/services/token-service";

describe('POST /api/token', () => {
  it('should return 200', async () => {
    const token = await TokenService.generateToken();
    
    const validateTokenResponse = await TokenService.validateToken(token);

    expect(validateTokenResponse.merchant_id).toBe("M123456789");
  
  });
})