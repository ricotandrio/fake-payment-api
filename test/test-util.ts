import { prismaClient } from "../src/app/database";

export class CleaningTest {

  static async delete() {
    await prismaClient.token.deleteMany(
      {
        where: {
          token_type: "access"
        }
      }
    );

    await prismaClient.user.deleteMany(
      {
        where: {
          user_id: "testuser"
        }
      }
    );
  }

  static async insert() {
    await prismaClient.auth.create({
      data: {
        client_id: "testclient",
        client_secret: "testsecret",
        redirect_uri: "http://localhost:3000",
        
        is_active: true,
        updated_at: new Date(),
        created_by: "testuser",
        updated_by: "testuser"
      }
    });

    await prismaClient.user.create({
      data: {
        user_id: "testuser",
        user_email: "testuser@mail.com",
        user_name: "testuser",
        client_id: "testclient",

        is_active: true,
        updated_at: new Date(),
        created_by: "testuser",
        updated_by: "testuser"
      }
    });
  }
}