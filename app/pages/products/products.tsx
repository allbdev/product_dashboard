import { ProductsTable } from '~/components/custom/Products/Table'
import { ProductsList } from '~/components/custom/Products/List'
import { useIsMobile } from '~/hooks/use-mobile'
import { FilterProvider } from '~/hooks/useFilter'
import { SearchBar } from '~/components/custom/SearchBar'
import { Outlet } from 'react-router'

export function Products() {
  const isMobile = useIsMobile()

  if (isMobile === undefined) {
    return null
  }

  return (
    <FilterProvider>
      <div className='size-full p-4 flex flex-col gap-4 min-w-0'>
        <SearchBar />
        {!isMobile ? (
          <div className='flex-1 min-h-0'>
            <ProductsTable />
          </div>
        ) : (
          <ProductsList />
        )}
      </div>
      <Outlet />
    </FilterProvider>
  )
}
