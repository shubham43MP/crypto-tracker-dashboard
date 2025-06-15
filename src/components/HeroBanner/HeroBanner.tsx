export const HeroBanner = () => (
  <section className="bg-gradient-to-r from-cyan-300 to-cyan-500 dark:from-cyan-800 dark:to-gray-900 text-white py-16 px-4">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="flex-1 text-center md:text-left space-y-4">
        <h1 className="text-4xl sm:text-5xl text-black bg- dark:text-gray-200 font-extrabold leading-tight">
          Track Crypto Like a Pro
        </h1>
        <p className="text-lg sm:text-xl text-black dark:text-gray-200">
          Real-time prices, market cap, and trends. Stay ahead in the crypto
          game.
        </p>
        <button className="mt-4 mb-20 md:mb-0 px-6 py-3 text-black dark:text-gray-200 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold transition">
          Explore Top Coins
        </button>
      </div>
      <div className="flex-1 animate-bounce">
        <img
          src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png"
          alt="Bitcoin"
          className="w-64 h-64 mx-auto md:mx-0 animate-bounce-slow"
        />
      </div>
    </div>
  </section>
);
