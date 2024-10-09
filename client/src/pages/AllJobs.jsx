import { toast } from 'react-toastify'
import { JobsContainer, SearchContainer } from '../components'
import customFetch from '../utils/customFetch'
import { useContext, createContext, useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'
import { param } from 'express/lib/router'

export const loader = async ({ request }) => {
  const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]) //search container
  try {
    const { data } = await customFetch.get('/jobs', {
      params,
    })
    return { data, searchValues: { ...params } }
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const AllJobsContext = createContext()

function AllJobs() {
  const { data, searchValues } = useLoaderData()

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
