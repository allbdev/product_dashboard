import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Skeleton } from '../ui/skeleton'

export const TableSkeleton = () => {
  return (
    <div className='h-full w-full overflow-auto'>
      <Table className='relative table-fixed w-full'>
        <TableHeader className='sticky border-none top-0 z-10 bg-white shadow-[0_1px_0_0_rgb(229,231,235)]'>
          <TableRow>
            <TableHead style={{ width: '30%' }}>
              <TextSkeleton />
            </TableHead>
            <TableHead style={{ width: '30%' }}>
              <TextSkeleton />
            </TableHead>
            <TableHead style={{ width: '15%' }}>
              <TextSkeleton />
            </TableHead>
            <TableHead style={{ width: '10%' }}>
              <TextSkeleton />
            </TableHead>
            <TableHead style={{ width: '8%' }}>
              <TextSkeleton />
            </TableHead>
            <TableHead style={{ width: '7%' }} />
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 10 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className='flex items-center gap-2 min-w-0'>
                  <Skeleton className='size-10 shrink-0' />
                  <Skeleton className='w-20 h-4' />
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className='w-24 h-4' />
              </TableCell>
              <TableCell>
                <Skeleton className='w-16 h-4' />
              </TableCell>
              <TableCell>
                <Skeleton className='w-12 h-4' />
              </TableCell>
              <TableCell>
                <Skeleton className='w-8 h-4' />
              </TableCell>
              <TableCell>
                <Skeleton className='w-8 h-8' />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

const TextSkeleton = () => {
  return <Skeleton className='w-20 h-4' />
}
