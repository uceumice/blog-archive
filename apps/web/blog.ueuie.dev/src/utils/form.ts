import type { AstroGlobal } from 'astro';

export async function submission<R extends unknown>(
  astro: AstroGlobal,
  actions: { [key in string]: () => R | Promise<R> }
): Promise<R | null> {
  if (astro.request.method !== 'POST') {
    return null;
  }

  const intent = await astro.request
    .clone()
    .formData()
    .then((data) => data.get('intent') as string | null);

  if (!intent) return null;

  const action = actions[intent];
  if (action) {
    return await action();
  }

  return null;
}
