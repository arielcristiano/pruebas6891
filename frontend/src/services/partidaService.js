// Servicio para llamar al endpoint /api/partidas del backend
export async function buscarPartidas(filters = {}) {
  const params = new URLSearchParams();
  if (filters.juego) params.append('juego', filters.juego);
  if (filters.region) params.append('region', filters.region);
  if (filters.rangoMin !== undefined && filters.rangoMin !== '') params.append('rangoMin', filters.rangoMin);
  if (filters.rangoMax !== undefined && filters.rangoMax !== '') params.append('rangoMax', filters.rangoMax);
  if (filters.fecha) params.append('fecha', filters.fecha); // expects YYYY-MM-DD
  if (filters.latenciaMax !== undefined && filters.latenciaMax !== '') params.append('latenciaMax', filters.latenciaMax);
  if (filters.page) params.append('page', filters.page);
  if (filters.pageSize) params.append('pageSize', filters.pageSize);

  const url = `http://localhost:8080/api/partidas?${params.toString()}`;

  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error fetching partidas: ${res.status} ${text}`);
  }
  return res.json();
}
