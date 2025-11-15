// functions/api/bv/step.js

export async function onRequestPost({ env }) {
  // 1) Trigga EN batch i workern
  await env.VALIDATE_MD_BV_API.fetch("https://dummy/run", {
    method: "POST",
  });

  // 2) Hämta uppdaterad status
  const statusResp = await env.VALIDATE_MD_BV_API.fetch(
    "https://dummy/status",
    { method: "GET" }
  );

  const status = await statusResp.json();

  return new Response(JSON.stringify(status), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

// GET: bara läsa status utan att trigga ny batch
export async function onRequestGet({ env }) {
  const statusResp = await env.VALIDATE_MD_BV_API.fetch(
    "https://dummy/status",
    { method: "GET" }
  );

  const status = await statusResp.json();

  return new Response(JSON.stringify(status), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}
