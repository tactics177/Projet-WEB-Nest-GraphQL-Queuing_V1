import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

/**
 * Service responsible for authentication-related operations.
 */
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * Validates a user's credentials.
   * @param username - The username of the user.
   * @param pass - The password of the user.
   * @returns A Promise that resolves to the user object if the credentials are valid, otherwise null.
   */
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * Logs in a user and generates an access token.
   * @param user - The user object.
   * @returns An object containing the access token and the username.
   */
  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      username: user.username,
    };
  }

  /**
   * Registers a new user.
   * @param username - The username of the new user.
   * @param password - The password of the new user.
   * @returns A Promise that resolves to the created user object.
   */
  async register(username: string, password: string) {
    return this.userService.createUser(username, password);
  }
}
