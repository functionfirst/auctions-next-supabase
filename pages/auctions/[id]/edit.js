import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import parseISO from 'date-fns/parseISO'
import format from 'date-fns/format'
import { supabase } from '@/lib/initSupabase'
import Head from 'next/head'
import AuctionAPIService from '@/services/AuctionAPIService'
import BaseLabel from '@/components/BaseLabel'
import BaseToggle from '@/components/BaseToggle'
import BaseInput from '@/components/BaseInput'
import BaseText from '@/components/BaseText'
import LoadingButton from '@/components/LoadingButton'
import { useUser } from '@/contexts/UserContext'

const auctionAPIService = new AuctionAPIService(supabase)

function EditAuction () {
  const router = useRouter()
  const { user } = useUser()
  const auctionId = router.query.id
  const [auction, setAuction] = useState({})
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [dirtyAuction, setDirtyAuction] = useState({})

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target

    const setData = prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    })

    setAuction(setData)

    setDirtyAuction(setData)
  }

  const auctionNormaliser = useCallback((auction) => {
    auction.created_at = format(parseISO(auction.created_at), "io MMM yyyy 'at' HH:mm")
    auction.updated_at = format(parseISO(auction.updated_at), "io MMM yyyy 'at' HH:mm")
    auction.start_date = format(parseISO(auction.start_date), "yyyy-MM-dd'T'hh:mm")
    auction.end_date = format(parseISO(auction.end_date), "yyyy-MM-dd'T'hh:mm")
    setAuction(auction)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      // @todo secure this to the loggedin user
      const { data, error: err } = await auctionAPIService.findById(auctionId)
  
      if (err) {
        console.log(err.message)
      } else {
        auctionNormaliser(data)
      }
    }

    fetchData()
  }, [auctionId, auctionNormaliser])

  async function submit(e) {
    e.preventDefault()
    setError(null)
    setSaving(true)

    const isFormDirty = Boolean(Object.values(dirtyAuction).length)

    if (!isFormDirty) {
      console.log('Do not submit. Form isn\'t dirty')
      return
    }

    const { data, error: err } = await auctionAPIService.updateAuction(auctionId, user.id, dirtyAuction)

    if (err) {
      console.log(err.message)
    } else {
      setDirtyAuction({})
    }

    setSaving(false)
  }

  return (
    <>
      <Head>
        <title>{auction.name} - Realtime Auctions</title>
      </Head>

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="font-semibold text-2xl mb-4">
          Edit Auction
        </h1>

        <form
          className="grid gap-6"
          onSubmit={submit}
        >
          <h3 className="font-medium text-lg">Auction Details</h3>

          <div>
            <BaseLabel htmlFor="name">
              Name
            </BaseLabel>

            <BaseInput
              attributes={{
                id: 'name',
                name: 'name',
                value: auction.name,
                onChange: handleChange,
                required: true
              }}
            />

            <p className="text-sm mt-1">
              Auction url:
              {' '}
              <Link href={`/auctions/${auction.id}/${auction.slug}`}>
                <a className="text-indigo-600 hover:text-indigo-800" target="_blank">
                  /auctions/{auction.id}/{auction.slug}
                </a>
              </Link>
            </p>
          </div>

          <div>
            <BaseLabel htmlFor="description">
              Description
            </BaseLabel>

            <BaseText
              attributes={{
                id: 'description',
                name: 'description',
                rows: 6,
                value: auction.description,
                onChange: handleChange
              }}
            />
          </div>

          <hr className="border-t border-gray-300" />

          <h3 className="font-medium text-lg">Auction Status</h3>

          <BaseToggle
            attributes={{
              id: 'enabled',
              name: 'enabled',
              checked: auction.enabled,
              onChange: handleChange
            }}
          >
            Allow users to find this auction
          </BaseToggle>

          <BaseToggle
            attributes={{
              id: 'featured',
              name: 'featured',
              checked: auction.featured,
              onChange: handleChange
            }}
          >
            Display as a featured auction
          </BaseToggle>

          <div className="flex gap-6">
            <div className="flex-1">
              <BaseLabel htmlFor="start_date">
                Start Date
              </BaseLabel>

              <BaseInput
                attributes={{
                  id: 'start_date',
                  name: 'start_date',
                  value: auction.start_date,
                  onChange: handleChange,
                  type: 'datetime-local'
                }}
              />
            </div>

            <div className="flex-1">
              <BaseLabel htmlFor="end_date">
                End Date
              </BaseLabel>

              <BaseInput
                attributes={{
                  id: 'end_date',
                  name: 'end_date',
                  value: auction.end_date,
                  onChange: handleChange,
                  type: 'datetime-local'
                }}
              />
            </div>
          </div>

          <hr className="border-t border-gray-300" />

          <h3 className="text-lg font-medium">Pricing</h3>

          <div className="w-1/2">
            <BaseLabel htmlFor="start_amount">
              Start Amount (£)
            </BaseLabel>

            <BaseInput
              attributes={{
                id: 'start_amount',
                name: 'start_amount',
                value: auction.start_amount,
                onChange: handleChange,
                min: 0,
                type: 'number',
                required: true
              }}
            />
          </div>

          <div className="flex gap-6">
            <div className="flex-1">
              <BaseLabel htmlFor="estimate_min">
                Estimate Min (£)
              </BaseLabel>

              <BaseInput
                attributes={{
                  id: 'estimate_min',
                  name: 'estimate_min',
                  value: auction.estimate_min,
                  onChange: handleChange,
                  min: 0,
                  type: 'number',
                  required: true
                }}
              />
            </div>

            <div className="flex-1">
              <BaseLabel htmlFor="estimate_max">
                Estimate Max (£)
              </BaseLabel>

              <BaseInput
                attributes={{
                  id: 'estimate_max',
                  name: 'estimate_max',
                  value: auction.estimate_max,
                  onChange: handleChange,
                  min: 0,
                  type: 'number',
                  required: true
                }}
              />
            </div>
          </div>

          <hr className="border-t border-gray-300" />

          <div className="flex items-center justify-between mb-6">
            <div className="text-gray-600 text-xs grid gap-1">
              <p>
                Updated at:
                <span className="font-semibold">{auction.updated_at}</span>
              </p>

              <p>
                Created at:
                <span className="font-semibold">{auction.created_at}</span>
              </p>
            </div>

            <LoadingButton
              saving={saving}
              loadingText="Saving changes.."
            >
              Update Auction
            </LoadingButton>
          </div>
        </form>
      </div>
    </>
  )
}

EditAuction.authRequired = true

export default EditAuction
