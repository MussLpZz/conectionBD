import { ProblemDetails } from './problemDetails';
export async function consumeJson(input) {
  const res = await input;
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new ProblemDetails(res.status, res.headers, body.title || body.error, body.type, body.detail);
  return body;
}
