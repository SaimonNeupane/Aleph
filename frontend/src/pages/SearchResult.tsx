import React from 'react'

import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { requestQuery } from '../api/api'



export const SearchResults: any = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ""
  const { data, isLoading, refetch, isError } = useQuery({

    queryKey: ['result', query],
    queryFn: () => requestQuery(query),
    enabled: true
  })
  if (isLoading) {
    return <p>Loading</p>
  }
  if (isError) {
    return <p>An error occured</p>
  }
  const yes = data && data.length > 0
  return (
    <div>
      {
        yes ? (
          data.map((item, idx) => (
            <div key={idx}>
              <p>{item.title}</p>
              <a href={item.url}>{item.url}</a>
              <p>{item.content.slice(0, 100)}</p>
            </div>
          ))
        ) : <p>Oops!!!!!Not Crawled Yet </p>
      }
    </div >
  )


}






