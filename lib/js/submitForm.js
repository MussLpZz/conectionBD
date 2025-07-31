import { consumeJson } from './consumeJson.js';
export function submitForm(url, event, method = 'POST') {
  event.preventDefault();
  return consumeJson(fetch(url, {
    method,
    headers: { Accept: 'application/json, application/problem+json' },
    body: new FormData(event.target)
  }));
}
