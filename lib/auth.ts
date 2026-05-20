export function isAuthed(headers: Headers) {
  const auth = headers.get("authorization");
  if (!auth?.startsWith("Basic ")) return false;
  const [user, pass] = Buffer.from(auth.slice(6), 'base64').toString().split(":");
  return user === process.env.BASIC_AUTH_USER && pass === process.env.BASIC_AUTH_PASS;
}
