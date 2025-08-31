import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '~/components/ui/table'
import { Skeleton } from '../ui/skeleton'

export const TableSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <TextSkeleton />
          </TableHead>
          <TableHead>
            <TextSkeleton />
          </TableHead>
          <TableHead>
            <TextSkeleton />
          </TableHead>
          <TableHead>
            <TextSkeleton />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 10 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <TextSkeleton />
            </TableCell>
            <TableCell>
              <TextSkeleton />
            </TableCell>
            <TableCell>
              <TextSkeleton />
            </TableCell>
            <TableCell>
              <TextSkeleton />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

const TextSkeleton = () => {
  return <Skeleton className='w-20 h-4' />
}
