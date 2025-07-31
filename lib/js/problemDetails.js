export class ProblemDetails extends Error {
  constructor(status, headers, title, type, detail) {
    super(title);
    Object.assign(this, { status, headers, type, detail, title });
  }
}
