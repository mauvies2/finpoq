import { Link } from 'react-router-dom'
import { GoogleLogin } from 'finpoq/components/google-login/google-login'
import Button from 'finpoq/components/shared/button'
import FieldError from 'finpoq/components/shared/field-error/field-error'
import Head from 'finpoq/components/shared/head'
import { useAuthWithGoogle } from 'finpoq/hooks/use-auth-with-google'
import { useAuthState } from 'finpoq/store/auth/auth-provider'

const Home = () => {
  const { couldAuth } = useAuthWithGoogle()
  const { isLoggedIn, authUser } = useAuthState()

  return (
    <>
      <Head title="Homepage" />
      <header className="flex min-h-[calc(100vh-7rem)] max-w-[1150px] flex-col py-2 md:flex-row md:py-8">
        <div className="flex h-full flex-1 flex-col justify-center md:pr-4">
          <section className="flex w-full justify-center md:w-full md:flex-col lg:w-4/5">
            <h1 className="dark:text-dark-text text-center text-[2.3rem] font-extralight leading-[1.2] text-gray-600 md:pr-20 md:text-left md:text-[3rem]">
              Welcome {isLoggedIn ? <span>back {authUser?.name}</span> : <span>to your financial pocket!</span>}
            </h1>
          </section>
          <section className="mt-10 md:w-96 lg:mt-20">
            {isLoggedIn ? (
              <Link to="/portfolio" className="mt-8 w-full">
                <Button className="w-full" height="l">
                  Go to your portfolio
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/register" className="mt-8 w-full" tabIndex={-1}>
                  <Button className="w-full" height="l">
                    Sign up
                  </Button>
                </Link>
                <div className="dark:border-dark-text relative my-7 w-full border-b-2 md:my-10">
                  <p className="dark:bg-dark absolute left-1/2 flex w-14 -translate-x-1/2 -translate-y-1/2 transform justify-center bg-white">
                    or
                  </p>
                </div>
                <div className="flex w-full justify-center">
                  <GoogleLogin />
                </div>
                <FieldError condition={couldAuth === false}>Google authentication failed</FieldError>
              </>
            )}
          </section>
        </div>
        <div className="mt-10 flex-1 md:mt-0">
          <section className="flex h-full justify-center md:justify-end">
            <img src="https://static-exp1.licdn.com/sc/h/dxf91zhqd2z6b0bwg85ktm5s4" alt="Banner" className="w-full" />
          </section>
        </div>
      </header>
    </>
  )
}

export default Home
