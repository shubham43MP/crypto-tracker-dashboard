
type CoinHeaderProps = {
  imageUrl: string;
  name: string;
  symbol: string;
  id?: string
}

export const CoinHeader = ({
  imageUrl,
  name,
  symbol,
  id
}: CoinHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
    <img
      src={imageUrl}
      alt={name}
      className="w-24 h-24 rounded-full border shadow"
    />
    <div className="text-center md:text-left">
      <h1 className="text-3xl font-bold text-black dark:text-gray-200">
        {name}{" "}
        <span className="uppercase text-black dark:text-gray-200 text-xl font-medium">
          ({symbol})
        </span>
      </h1>
      <p className="text-black dark:text-gray-200 mt-1">ID: {id}</p>
    </div>
  </div>
  )
}