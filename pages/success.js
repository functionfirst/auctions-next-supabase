import LayoutAuth from '../components/LayoutAuth'
import Link from 'next/link'

function Success () {
  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl font-semibold">
          Check your email
        </h1>

        <p className="max-w-lg mx-auto my-6 text-gray-700">
          We have sent you an email containing an account confirmation link.
          Please check your email and use this link to activate your account.
        </p>

        <p className="max-w-xs mx-auto text-sm text-gray-500">
          Didn&apos;t receive the email? Check your spam filter or
          {' '}
          <Link href="/register">
            <a className="text-indigo-600 hover:text-indigo-800">
              try another email address
            </a>
          </Link>.
        </p>
      </div>
    </>
  )
}

Success.layout = LayoutAuth

export default Success
