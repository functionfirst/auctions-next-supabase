import Link from 'next/link'

function AuthLoginLink () {
  return (
    <p className="text-center text-gray-500 mt-6">
      Already have an account?
      {' '}
      <Link href="/login">
        <a className="text-indigo-600 hover:text-indigo-800">
          Log In
        </a>
      </Link>
    </p>
  )
}

export default AuthLoginLink
