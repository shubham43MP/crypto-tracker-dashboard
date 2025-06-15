type ErrorScreenProps = {
  error: string
}

export const ErrorScreen = ({
  error
}: ErrorScreenProps) => {
  return (
    <div className="flex items-center justify-center h-screen text-red-600 text-lg p-4 text-center">
    {error}
  </div>
  )
}