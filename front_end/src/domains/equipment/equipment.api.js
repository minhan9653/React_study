// domains/factory/factory.api.js
export async function fetchFactories(params) {
  const query = new URLSearchParams(params).toString();

  const res = await fetch(
    `http://localhost:8080/api/factories?${query}`
  );

  if (!res.ok) {
    throw new Error("Factory 조회 실패");
  }

  return res.json();
}
