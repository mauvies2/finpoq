import { ChangeEvent, FormEvent, useState } from 'react'
import Head from 'finpok/components/Shared/Head'
import FormInput from '../components/Shared/FormInput/FormInput'
import { useNavigate } from 'react-router-dom'
import { register } from 'finpok/services/ApiService'
import { useFormErrorHandleling } from 'finpok/hooks/useFormErrorHandleling'
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'
import { useAuthDispatch } from 'finpok/store/auth/AuthProvider'
import FieldError from 'finpok/components/Shared/FieldError/FieldError'
import Button from 'finpok/components/Shared/Button'

type FormValues = {
  name: string
  email: string
  password: string
  repeatedPassword: string
}

export const useAuthWithGoogle = () => {
  const [couldAuth, setCouldAuth] = useState<null | boolean>(null)
  const { googleLogin } = useAuthDispatch()

  const handleGoogleAuth = async (googleData: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ('tokenId' in googleData) {
      await googleLogin({
        _id: googleData.googleId,
        name: googleData.profileObj.name,
        email: googleData.profileObj.email,
        imageUrl: googleData.profileObj.imageUrl,
        token: googleData.tokenId,
      })
    }
  }

  const handleGoogleFailure = () => {
    setCouldAuth(false)
  }

  return { handleGoogleAuth, handleGoogleFailure, couldAuth }
}

const Register = () => {
  const navigate = useNavigate()
  const { handleGoogleAuth, handleGoogleFailure, couldAuth } = useAuthWithGoogle()

  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    email: '',
    password: '',
    repeatedPassword: '',
  })

  const [showPasswordAlert, setShowPasswordAlert] = useState<boolean>(false)

  const { formData, validateForm } = useFormErrorHandleling([
    { name: 'name', type: 'text', value: formValues.name, required: true },
    { name: 'email', type: 'email', value: formValues.email, required: true },
    { name: 'password', type: 'password', value: formValues.password, required: true },
  ])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })

    if (formValues.password === e.target.value) {
      setShowPasswordAlert(false)
    }
  }

  const handleRegister = async () => {
    const { email, password, name } = formValues
    const credentials = { email, password, name }

    try {
      const response = await register(credentials)
      if (response) navigate('/login')
    } catch (e) {
      return e
    }
  }

  const submitAuth = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isFormValid = validateForm()

    if (formValues.password === formValues.repeatedPassword && isFormValid) {
      handleRegister()
      return
    }

    setShowPasswordAlert(true)
  }

  return (
    <>
      <Head title="Register user" />
      <section className="mx-auto flex min-h-[calc(100vh-7rem)] w-[300px] flex-col justify-center text-center">
        <p>Continue with a Google account.</p>
        <GoogleLogin
          clientId={
            typeof import.meta.env.VITE_GOOGLE_CLIENT_ID === 'string' ? import.meta.env.VITE_GOOGLE_CLIENT_ID : ''
          }
          buttonText="Log in with google"
          onSuccess={handleGoogleAuth}
          onFailure={handleGoogleFailure}
          className="my-7 flex w-[300px] justify-center"
        ></GoogleLogin>
        <FieldError condition={couldAuth === false}>Google authentication failed</FieldError>
        <p className="mb-7">Or use your info.</p>
        <form className="w-[300px] text-left" onSubmit={submitAuth}>
          <FormInput
            id="register-name"
            labelClass="mt-8"
            name="name"
            label="Name"
            labelOnError="Name is required"
            placeholder="Write your name here"
            type="name"
            value={formValues.name}
            shouldShowError={formData.name.shouldShow}
            onChange={onChange}
          />
          <FormInput
            id="register-email"
            name="email"
            label="Email"
            labelOnError="Email is required"
            placeholder="Write your email here"
            type="email"
            value={formValues.email}
            shouldShowError={formData.email.shouldShow}
            onChange={onChange}
          />
          <FormInput
            id="register-password"
            name="password"
            label="Password"
            labelOnError="Password is required"
            placeholder="Write your password here"
            type="password"
            value={formValues.password}
            shouldShowError={formData.password.shouldShow}
            onChange={onChange}
          />
          <FormInput
            id="register-repeated-password"
            name="repeatedPassword"
            label="Repeat password"
            labelOnError="Password do not match"
            placeholder="Write your password again"
            type="password"
            value={formValues.repeatedPassword}
            shouldShowError={showPasswordAlert}
            onChange={onChange}
          />
          <Button type="submit" className="mt-4 w-full">
            Register
          </Button>
        </form>
      </section>
    </>
  )
}

export default Register
