import Link from 'next/link'

function AuthSignupLink () {
  return (
    <p className="text-center text-gray-500 mt-6">
      Don't have an account?
      {' '}
      <Link href="/register">
        <a className="text-indigo-600 hover:text-indigo-800">
          Sign up
        </a>
      </Link>
    </p>
  )
}

export default AuthSignupLink
