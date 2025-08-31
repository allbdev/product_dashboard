import { getCategories } from '~/api/categories'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { useQuery } from '@tanstack/react-query'
import { useController, type Control } from 'react-hook-form'
import { Label } from '../ui/label'

export const CategorySelect = ({
  control,
  label,
  onChange
}: {
  control: Control<any>
  label?: string
  onChange?: (value: string) => void
}) => {
  const { field } = useController({ control, name: 'category' })
  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  })

  return (
    <>
      {label && <Label htmlFor={'category-select'}>{label}</Label>}
      <Select
        disabled={isLoading}
        onValueChange={value => {
          field.onChange(value)
          onChange?.(value)
        }}
        value={field.value}
      >
        <SelectTrigger id={'category-select'} className='w-full relative'>
          <SelectValue placeholder='Select a category' />
        </SelectTrigger>
        <SelectContent>
          {data?.map(category => (
            <SelectItem key={category.slug} value={category.slug}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  )
}
