import Button from '../Shared/Button'
import GoogleAuth from 'react-google-login'
import { useAuthWithGoogle } from 'finpok/hooks/useAuthWithGoogle'

export const GoogleLogin = () => {
  const { handleGoogleAuth, handleGoogleFailure } = useAuthWithGoogle()

  return (
    <GoogleAuth
      clientId={typeof import.meta.env.VITE_GOOGLE_CLIENT_ID === 'string' ? import.meta.env.VITE_GOOGLE_CLIENT_ID : ''}
      render={(renderProps) => (
        <Button
          btnType="secondary"
          className="flex w-full justify-center"
          height="l"
          style={{ color: '#777', borderColor: '#777' }}
          onClick={renderProps.onClick}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24px"
              height="24px"
              x="0"
              y="0"
              preserveAspectRatio="xMinYMin meet"
              focusable="false"
              className="mr-3"
            >
              <g>
                <path
                  fill="#E94435"
                  d="M12.1,5.8c1.6-0.1,3.1,0.5,4.3,1.6l2.6-2.7c-1.9-1.8-4.4-2.7-6.9-2.7c-3.8,0-7.2,2-9,5.3l3,2.4C7.1,7.2,9.5,5.7,12.1,5.8z"
                ></path>
                <path
                  fill="#F8BB15"
                  d="M5.8,12c0-0.8,0.1-1.6,0.4-2.3l-3-2.4C2.4,8.7,2,10.4,2,12c0,1.6,0.4,3.3,1.1,4.7l3.1-2.4C5.9,13.6,5.8,12.8,5.8,12z"
                ></path>
                <path
                  fill="#34A751"
                  d="M15.8,17.3c-1.2,0.6-2.5,1-3.8,0.9c-2.6,0-4.9-1.5-5.8-3.9l-3.1,2.4C4.9,20,8.3,22.1,12,22c2.5,0.1,4.9-0.8,6.8-2.3L15.8,17.3z"
                ></path>
                <path
                  fill="#547DBE"
                  d="M22,12c0-0.7-0.1-1.3-0.2-2H12v4h6.1v0.2c-0.3,1.3-1.1,2.4-2.2,3.1l3,2.4C21,17.7,22.1,14.9,22,12z"
                ></path>
              </g>
            </svg>
          }
        >
          Log in with Google
        </Button>
      )}
      className="relative h-8 w-[88%] border-none shadow-none"
      buttonText="Log in with google"
      onSuccess={handleGoogleAuth}
      onFailure={handleGoogleFailure}
    />
  )
}