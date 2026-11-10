export default {
  async fetch(req) {
    const cors = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,OPTIONS',
      'Access-Control-Allow-Headers': '*',
    };

    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: cors });
    }

    const target = new URL(req.url).searchParams.get('url');
    if (!target) {
      return new Response(JSON.stringify({ error: 'missing ?url=' }), {
        status: 400,
        headers: { ...cors, 'Content-Type': 'application/json' }
      });
    }

    try {
      const r = await fetch(target, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36',
          'Accept': 'application/json'
        }
      });

      return new Response(r.body, {
        status: r.status,
        headers: { ...cors, 'Content-Type': 'application/json' }
      });
    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), {
        status: 500,
        headers: { ...cors, 'Content-Type': 'application/json' }
      });
    }
  }
};