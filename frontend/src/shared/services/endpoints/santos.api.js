import { api } from "../api";

export async function getSantos() {
    const response = await api.get("/santos");
    return response.data;
}
