import Layout from '@/components/Layout'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/initSupabase'
import AuctionAPIService from '@/services/AuctionAPIService'

const auctionAPIService = new AuctionAPIService(supabase)

function MyAuctions() {
  const [auctions, setAuctions] = useState([])
  const user = supabase.auth.user()

  useEffect(async () => {
    const { data, error } = await auctionAPIService.myAuctions(user.id)

    if (error) {

    } else {
      setAuctions(data)
    }
  }, [user])

  return (
    <Layout>
      <Head>
        <title>My Auctions - Realtime Auctions</title>
      </Head>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-semibold text-2xl mb-4">
            My Auctions
          </h1>

          <Link href="/auctions/create">
            <a className="px-6 py-3 rounded-full uppercase tracking-wider font-semibold text-xs bg-indigo-500 hover:bg-indigo-700 text-white">
              Create an Auction
            </a>
          </Link>
        </div>

        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {auctions.map((auction) => (
                    <tr key={auction.id}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        <Link href={`/auctions/${auction.id}/edit`}>
                          <a className="text-indigo-600 hover:text-indigo-900">
                            {auction.name}
                          </a>
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-2 inline-block text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {auction.enabled ? 'Active' : 'Inactive' }
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default MyAuctions
