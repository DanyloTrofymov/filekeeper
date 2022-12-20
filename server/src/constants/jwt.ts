import { SignOptions, VerifyOptions } from 'jsonwebtoken';

const issuer = 'Example Software',
    subject = 'example@gmail.com',
    audience = 'example.com';

export const signOptions: SignOptions = {
    issuer,
    subject,
    audience,
    algorithm: 'RS256',
};

export const verifyOptions: VerifyOptions = {
    issuer,
    subject,
    audience,
    algorithms: ['RS256'],
};

export const tokenExpireTime = {
    accessToken: '15m',
    refreshToken: '15d',
};
