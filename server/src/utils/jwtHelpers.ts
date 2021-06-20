import * as jwt from 'jsonwebtoken';
import sequelize from '../db/sequelize/models/index';
const Token = sequelize.models['tokens'];

export const generateAccessToken = (
  id: number,
  name: string,
  roles: string[],
  driver_info?: {}, 
) => {
  const accessToken = jwt.sign(
    { id, name, roles, driver_info },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: process.env.ACCESS_TOKEN_TIME },
  );

  return accessToken;
};

export let refreshTokens: Array<string> = [];

export const generateRefreshToken = (
  id: number,
  name: string,
  roles: string[],
  driver_info?: {},
) => {
  const refreshToken = jwt.sign(
    { id, name, roles, driver_info },
    process.env.REFRESH_TOKEN_SECRET_KEY,
    { expiresIn: process.env.REFRESH_TOKEN_TIME },
  );
  refreshTokens.push(refreshToken);
  return refreshToken;
};

export const deleteToken = (body: any, refreshToken: string) => {
  refreshTokens = refreshTokens.filter((token) => token !== body.token);
  // const tokenData = Token.deleteOne({refreshToken})
  // return tokenData;
};

export const saveToken = (userId: number, refreshToken: string) => {
  const tokenData = Token.findOne({ where: { user_id: userId } });
  if (tokenData) {
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }
  const token = Token.create({ user_id: userId, refreshToken });
  return token;
};
