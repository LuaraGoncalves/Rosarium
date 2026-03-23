import { useEffect, useState } from 'react'
import { santosApi } from '../services/santos.api'
import { Santo } from '../types/santo'

export function useSantos() {
  const [santos, setSantos] = useState<Santo[]>([])
  const [santoDoDia, setSantoDoDia] = useState<Santo | null>(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSantos = async () => {
      try {
        setLoading(true)
        
        const [listaSantos, hojeSanto] = await Promise.all([
          santosApi.getTodosSantos().catch(() => []),
          santosApi.getSantoDoDia().catch(() => null)
        ])
        
        setSantos(listaSantos)
        setSantoDoDia(hojeSanto)
      } catch (err: any) {
        setError(err.message || 'Erro ao buscar dados dos santos')
        console.error('Erro na API de Santos:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSantos()
  }, [])

  return { santos, santoDoDia, loading, error }
}
