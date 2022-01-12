import { ChangeEvent, FC, FormEvent, useState } from 'react'
import Head from 'finpok/components/Shared/Head'
import FormInput from '../components/Shared/FormInput/FormInput'
import { useAuthDispatch } from 'finpok/store/auth/AuthProvider'
import { useFormErrorHandleling } from 'finpok/hooks/useFormErrorHandleling'
import { LoginCredentials } from 'finpok-core/domain'

const Login: FC = () => {
  const [loginForm, setLoginForm] = useState<LoginCredentials>({
    email: '',
    password: '',
  })

  const { login } = useAuthDispatch()

  const { formData, errorValidation } = useFormErrorHandleling([
    { name: 'email', type: 'email', value: loginForm.email, required: true },
    { name: 'password', type: 'text', value: loginForm.password, required: true },
  ])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
  }

  const submitAuth = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    errorValidation()

    if (!formData.email.isValid && !formData.password.isValid) {
      await login(loginForm)
    }
  }

  return (
    <>
      <Head title="TOP PAGE" />
      <div className="hero min-h-screen">
        <div className="text-center hero-content">Welcome</div>
        <form className="p-10 card bg-base-200" onSubmit={submitAuth}>
          <FormInput
            id="login-email"
            name="email"
            label="Email"
            labelOnError="Email is required"
            placeholder="Write your email here"
            type="email"
            autoComplete="on"
            value={loginForm.email}
            shouldShowError={formData.email.shouldShow}
            onChange={onChange}
          />
          <FormInput
            id="login-password"
            name="password"
            label="Password"
            labelOnError="Password is required"
            placeholder="Write your password here"
            type="password"
            value={loginForm.password}
            shouldShowError={formData.password.shouldShow}
            onChange={onChange}
          />
          <button type="submit" className="btn btn-primary mt-4">
            Log in
          </button>
        </form>
      </div>
    </>
  )
}

export default Login
