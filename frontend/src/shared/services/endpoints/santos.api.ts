export async function getSantos() {
  const response = await fetch("http://localhost:3001/api/santos");
  return response.json();
}