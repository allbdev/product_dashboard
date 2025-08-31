export const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className='bg-gray-800 text-white size-full flex flex-col gap-3 items-center justify-center rounded-lg'>
      <span>{message}</span>
      <p>Oops, looks like something went wrong. Try reloading the page.</p>
    </div>
  )
}
