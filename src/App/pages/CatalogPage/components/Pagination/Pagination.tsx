import qs from "qs"
import React, { useEffect, useState } from 'react'
import { apiClient } from 'config/axiosConfig'
import { createPagination } from './utils'



const Pagination:React.FC = () => {
    const [currPage] = useState<number>(1)
    const [, setTotalPage] = useState<number>(4)



    // console.log(createPagination(totalPage, currPage), currPage)
    console.log(createPagination(6, 1), 1)
    console.log(createPagination(6, 2), 2)
    console.log(createPagination(6, 3), 3)
    console.log(createPagination(6, 4), 4)
    console.log(createPagination(6, 5), 5)
    console.log(createPagination(6, 6), 6)
   
    
    useEffect(() => {
        const params = {
            pagination: {
                page: currPage,
                pageSize: 9
            }
        }

        let queryParams = qs.stringify(params)
        apiClient.get(`/products?${queryParams}`)
        .then(({data}) => setTotalPage(data.meta.pagination.pageCount))
    }, [currPage])




  return (
    <div>Pagination</div>
  )
}

export default Pagination