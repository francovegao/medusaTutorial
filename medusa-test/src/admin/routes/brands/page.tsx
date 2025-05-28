//UI component to show brands
import { defineRouteConfig } from "@medusajs/admin-sdk"
import { TagSolid } from "@medusajs/icons"
import { 
  Container,
    Heading,
  createDataTableColumnHelper,     //utility to create columns for the data table.
  DataTable,
  DataTablePaginationState,        // type that holds the pagination state of the data table.
  useDataTable,                    //hook to initialize and configure the data table.
} from "@medusajs/ui"
import { useQuery } from "@tanstack/react-query"
import { sdk } from "../../lib/sdk"
import { useMemo, useState } from "react"


type Brand = {
  id: string
  name: string
}
//Same as defined at -> /admin/brands/route.ts API route
type BrandsResponse = {
  brands: Brand[]
  count: number
  limit: number
  offset: number
}

//Define table's columns
const columnHelper = createDataTableColumnHelper<Brand>()

//Define two columns: ID and name of the brands
const columns = [
  columnHelper.accessor("id", {
    header: "ID",
  }),
  columnHelper.accessor("name", {
    header: "Name",
  }),
]

const BrandsPage = () => {
  // TODO retrieve brands
    const limit = 15
    const [pagination, setPagination] = useState<DataTablePaginationState>({   //Define state bariable to enable pagination in the DataTable
    pageSize: limit,                    
    pageIndex: 0,
    })
    const offset = useMemo(() => {             //indicates the number of items to skip before retrieving the current pages items
    return pagination.pageIndex * limit
    }, [pagination])

    //useQuery to query the medusa Server using Tanstack (React) Query
    const { data, isLoading } = useQuery<BrandsResponse>({
    queryFn: () => sdk.client.fetch(`/admin/brands`, {        //send request to custom api route
        query: {
        limit,
        offset,
        },
    }),
    queryKey: [["brands", limit, offset]],
    })

// TODO configure data table
//useDataTable hook initializes and configures the data table. accept an object with properties
    const table = useDataTable({
    columns,
    data: data?.brands || [],
    getRowId: (row) => row.id,
    rowCount: data?.count || 0,
    isLoading,
    pagination: {
        state: pagination,
        onPaginationChange: setPagination,
    },
    })

    //render data table that shows the brands with pagination
    //DataTable component accets the instance prop, which is the object returned by the useDataTable hook
  return (
            <Container className="divide-y p-0">
            {
            <DataTable instance={table}>
        <DataTable.Toolbar className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
            <Heading>Brands</Heading>
        </DataTable.Toolbar>
        <DataTable.Table />
        <DataTable.Pagination />
        </DataTable>}
            </Container>
  )
}

export const config = defineRouteConfig({
  label: "Brands",
  icon: TagSolid,
})

//React component to be rendered in the new page
export default BrandsPage