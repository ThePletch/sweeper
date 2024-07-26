import type { Request, RequestHandler }  from 'express';
import nacl from "tweetnacl";

const verifyHeaders = (request: Request): boolean => {
  if (['x-signature-timestamp', 'x-signature-ed25519'].some((key) => request.headers[key] === undefined)) {
    return false;
  }

  return nacl.sign.detached.verify(
    Buffer.from(request.headers['x-signature-timestamp'] + JSON.stringify(request.body)),
    Buffer.from(request.headers['x-signature-ed25519'] as string, 'hex'),
    Buffer.from(process.env.PUBLIC_KEY ?? '', 'hex'),
  )
}

export const verifyHeadersMiddleware: RequestHandler = (req, res, next) => {
  if (!verifyHeaders(req)) {
    return res.status(401).send("invalid request signature");
  }

  return next();
}
