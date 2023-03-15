import { API_URL } from '@/lib/constants'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function Users() {


  const { isLoading, error, data } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetch(`${API_URL}/users`).then((res) => res.json()),
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>
  }


  return (
    <>
      <div>Users</div>
    </>

  )
}
