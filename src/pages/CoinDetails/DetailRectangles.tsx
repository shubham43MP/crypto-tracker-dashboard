
type DetailRectanglesProps = {
  label: string;
  value: string
}

export const DetailRectangles = ({
  label,
  value
}: DetailRectanglesProps) => {
  return (
  <div
    key={label}
    className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center shadow-sm"
  >
    <h4 className="text-sm text-black dark:text-gray-200 font-medium">
      {label}
    </h4>
    <p className="text-lg font-bold text-black dark:text-gray-200 mt-1 break-words truncate">
      {value}
    </p>
  </div>
  )
}