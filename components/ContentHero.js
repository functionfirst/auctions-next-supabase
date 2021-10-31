import IconGlobe from './IconGlobe'
import IconLightning from './IconLightning'
import IconNotification from './IconNotification'
import IconScales from './IconScales'

function ContentHero () {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Realtime Auctions
          </h2>

          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {/* Sell online in realtime */}
            Create your own online Auction
          </p>

          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <IconGlobe className="h-6 w-6" />
                </div>

                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Access a Global Market
                </p>
              </dt>

              <dd className="mt-2 ml-16 text-base text-gray-500">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <IconScales className="h-6 w-6" />
                </div>

                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  No Hidden Costs
                </p>
              </dt>

              <dd className="mt-2 ml-16 text-base text-gray-500">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <IconLightning className="h-6 w-6" />
                </div>

                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Data in Realtime
                </p>
              </dt>

              <dd className="mt-2 ml-16 text-base text-gray-500">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
              </dd>
            </div>

            <div className="relative">
              <dt>
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <IconNotification className="h-6 w-6" />
                </div>

                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                  Auction Notifications
                </p>
              </dt>

              <dd className="mt-2 ml-16 text-base text-gray-500">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

export default ContentHero
