import { fetchFromAmo, type AmoResponse } from "./client"

interface AmoPipelineStatusRaw {
  id: number
  name: string
  sort: number
  is_editable: boolean
  pipeline_id: number
  color: string
  type: number
}

interface AmoPipelineRaw {
  id: number
  name: string
  sort: number
  is_main: boolean
  is_unsorted_on: boolean
  _embedded: {
    statuses: AmoPipelineStatusRaw[]
  }
}

export interface PipelineStatusInfo {
  id: number
  name: string
  sort: number
  color: string
  type: number // 0=normal, 142=won, 143=lost
}

export interface AmoPipelineInfo {
  id: number
  name: string
  isMain: boolean
  statuses: PipelineStatusInfo[]
}

export async function getAmoPipelines(): Promise<AmoPipelineInfo[]> {
  const data = await fetchFromAmo<
    AmoResponse<{ pipelines: AmoPipelineRaw[] }>
  >("/leads/pipelines")

  console.log("[AmoCRM] Raw pipelines response:", data)

  return data._embedded.pipelines
    .sort((a, b) => a.sort - b.sort)
    .map((p) => ({
      id: p.id,
      name: p.name,
      isMain: p.is_main,
      statuses: p._embedded.statuses
        .sort((a, b) => a.sort - b.sort)
        .map((s) => ({
          id: s.id,
          name: s.name,
          sort: s.sort,
          color: s.color,
          type: s.type,
        })),
    }))
}
