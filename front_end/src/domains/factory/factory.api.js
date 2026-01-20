const BASE_URL = "http://localhost:8080/api/factories";

/* ==============================
   조회
============================== */
export async function fetchFactories(params) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}?${query}`);
  if (!res.ok) throw new Error("Factory 조회 실패");
  return res.json();
}

/* ==============================
   등록
============================== */
export async function createFactory(data) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Factory 등록 실패");
  return res.json();
}

/* ==============================
   수정
============================== */
export async function updateFactory(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Factory 수정 실패");
  return res.json();
}

/* ==============================
   삭제 (다건)
============================== */
export async function deleteFactories(ids) {
  const res = await fetch(BASE_URL, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ids),
  });

  if (!res.ok) throw new Error("Factory 삭제 실패");
}
