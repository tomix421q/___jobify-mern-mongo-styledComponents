import { toast } from 'react-toastify'
import { JobsContainer, SearchContainer } from '../components'
import customFetch from '../utils/customFetch'
import { useContext, createContext, useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

const allJobsQuery = (params) => {
  const { search, jobStatus, jobType, sort, page } = params
  return {
    queryKey: ['jobs', search ?? '', jobStatus ?? 'all', jobType ?? 'all', sort ?? 'newest', page ?? 1],
    queryFn: async () => {
      const { data } = await customFetch.get('/jobs', {
        params,
      })
      return data
    },
  }
}

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]) //search container
    await queryClient.ensureQueryData(allJobsQuery(params))
    return { searchValues: { ...params } }
  }

const AllJobsContext = createContext()

function AllJobs() {
  const { searchValues } = useLoaderData()
  const { data } = useQuery(allJobsQuery(searchValues))

  return (
    <div>
      <AllJobsContext.Provider value={{ data, searchValues }}>
        <SearchContainer />
        <JobsContainer />
      </AllJobsContext.Provider>
    </div>
  )
}

export const useAllJobsContext = () => useContext(AllJobsContext)
export default AllJobs
