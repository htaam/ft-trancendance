
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';


//basically the fetch is used to get information from a service, a proxy is created 
//is necessary to create a resquest (you can create using diferent formats, but the most commonly used are json and xml) here we are using json
//method is where you define the type of request you want to execute (POST, GET, UPDATE, DELETE)
//the first data provided is the api/service address
//the headers are normally used to provide information about authentication type, user, token and service name.
//The body contains normally the object information expected to be received on the endpoint, if you dont provide the necessary information a error will be generated
//You can see the expected objects formats on dtos folder.
@Injectable()
export class Auth42Service {
  async accessToken(req: string) {
    try {
      const response = await fetch('https://api.intra.42.fr/oauth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `grant_type=authorization_code&client_id=${process.env.UID_42AUTH}&client_secret=${process.env.SECRET_42AUTH}&code=${req}&redirect_uri=${process.env.URI_42AUTH}`,
      });
      const data = await response.json();
      if (!data)
        throw new HttpException('Empty user token', HttpStatus.BAD_REQUEST);
      return data;
    } catch (error) {
      throw new HttpException('Get user token error', HttpStatus.BAD_REQUEST);
    }
  }

  async getUserInformation(token: string) {
    try {
      const response = await fetch('https://api.intra.42.fr/v2/me', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.log('Error on fetch');
    }
    return null;
  }
}