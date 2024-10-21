import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { User } from "../../Domain/User";

//separar en otro archivo la BD
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const USERS_TABLE = process.env.USERS_TABLE!;

export class UserRepository {

  async create(user: User): Promise<void> {
    const params = {
      TableName: USERS_TABLE,
      Item: user,
    };

    try {
      const command = new PutCommand(params);
      await docClient.send(command);
    } catch (error) {
      console.error("Error saving user:", error);
      throw new Error("Could not save user");
    }
  }

  async find(userId: String): Promise<User | null> {

    const params = {
      TableName: USERS_TABLE,
      Key: { userId },
    };

    try {
      const command = new GetCommand(params);
      const { Item } = await docClient.send(command);

      if (Item) {
        const user: User = Item as User; 
        return user;
      } else {
        return null;
      }

    } catch (error) {
      console.error("Error finding user:", error);
      throw new Error("Could not find user");
    }
  }

}
