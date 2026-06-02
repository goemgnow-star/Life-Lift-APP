import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client({
  clientId: process.env.OAUTH_CLIENT_ID,
  clientSecret: process.env.OAUTH_CLIENT_SECRET,
  redirectUri: process.env.OAUTH_REDIRECT_URI,
});

export const getOAuthAuthorizationUrl = (): string => {
  return client.generateAuthUrl({
    access_type: 'offline',
    scope: ['openid', 'email', 'profile'],
  });
};

export const verifyAndExchangeCode = async (code: string) => {
  const { tokens } = await client.getToken(code);
  const ticket = await client.verifyIdToken({
    idToken: tokens.id_token!,
    audience: process.env.OAUTH_CLIENT_ID,
  });
  
  return ticket.getPayload();
};
