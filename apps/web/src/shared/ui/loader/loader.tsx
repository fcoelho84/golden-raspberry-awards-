export const Loader = () => {
  return (
    <div
      data-testid="loader"
      className="flex min-w-full items-center justify-center p-8"
    >
      <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
    </div>
  )
}
