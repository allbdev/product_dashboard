import { ProductsTable } from '~/components/custom/Products/Table'
import { ProductsList } from '~/components/custom/Products/List'
import { useScreenSize } from '~/hooks/useSreenSize'

export function Home() {
  const { isWide } = useScreenSize()

  if (isWide === undefined) {
    return null
  }

  return <div className='size-full p-4'>{isWide ? <ProductsTable /> : <ProductsList />}</div>
}
