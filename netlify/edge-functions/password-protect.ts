type NetlifyContext = {
  next: () => Response | Promise<Response>;
};

declare const Netlify: {
  env: {
    get: (name: string) => string | undefined;
  };
};

const USERNAME_ENV = "SITE_USERNAME";
const PASSWORD_ENV = "SITE_PASSWORD";
const DEFAULT_USERNAME = "portfolio";
const REALM = "Protected Portfolio";

const unauthorizedHeaders = {
  "WWW-Authenticate": `Basic realm="${REALM}", charset="UTF-8"`,
  "Cache-Control": "no-store",
};

export default async (request: Request, context: NetlifyContext) => {
  const password = Netlify.env.get(PASSWORD_ENV);

  if (!password) {
    return new Response(
      `Password protection is enabled but ${PASSWORD_ENV} is not set in Netlify.`,
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
          "Content-Type": "text/plain; charset=UTF-8",
        },
      },
    );
  }

  const username = Netlify.env.get(USERNAME_ENV) || DEFAULT_USERNAME;
  const authorization = request.headers.get("Authorization");
  const expectedAuthorization = `Basic ${btoa(`${username}:${password}`)}`;

  if (authorization === expectedAuthorization) {
    return context.next();
  }

  return new Response("Authentication required.", {
    status: 401,
    headers: unauthorizedHeaders,
  });
};
