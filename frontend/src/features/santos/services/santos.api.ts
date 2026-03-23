import { api } from '@/shared/services/api'
import { Santo } from '../types/santo'

export const santosApi = {

  async getTodosSantos(): Promise<Santo[]> {
    const response = await api.get<Santo[]>('/santos')
    return response.data
  },

  async getSantoDoDia(): Promise<Santo | null> {
    try {
      const response = await api.get<Santo>('/santos/hoje')
      return response.data
    } catch (error) {

      return null
    }
  },

  async getSantoById(id: string): Promise<Santo> {
    const response = await api.get<Santo>(`/santos/${id}`)
    return response.data
  }
}
