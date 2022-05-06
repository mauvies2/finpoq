import { ReactNode, useState } from 'react'
import useClickOutside from 'finpok/hooks/useClickOutside'
import { useUiDispatch } from 'finpok/store/ui/UiProvider'

interface ModalProps {
  goBack?: number
  closeModalIcon?: boolean
  modalTitle?: string
  children: ReactNode
}

const Modal = ({ closeModalIcon = true, modalTitle, children, goBack = 1 }: ModalProps) => {
  const [modalRef, setModalRef] = useState<HTMLDivElement | null>()

  const { closeModal } = useUiDispatch()
  const { element: modal, wasClickOutside } = useClickOutside<HTMLDivElement>(() => closeModal(goBack))

  const heighFixed = modalRef && modalRef.offsetHeight > window.innerHeight * 0.6

  if (!children) return null

  return (
    <div
      className="animate-modalBg fixed top-0 left-0 right-0 z-50 h-screen md:flex md:items-center md:justify-center md:py-10"
      style={{ backgroundColor: 'rgb(0, 0, 0, 0.2)' }}
      ref={(newRef) => setModalRef(newRef)}
      onClick={(e) => wasClickOutside(e)}
    >
      <div
        className={`animate-modal fixed top-0 left-0 right-0 z-50 h-screen bg-white md:static md:mx-auto md:h-auto md:w-[40rem] md:rounded-lg ${
          heighFixed && 'md:max-h-[80vh]'
        }`}
        ref={modal}
      >
        <div className="flex h-16 w-full flex-shrink-0 items-center justify-between px-6">
          {goBack > 1 ? (
            <button onClick={() => closeModal(1)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 stroke-current text-gray-400"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
          ) : (
            <div />
          )}
          <div className="text-lg font-bold text-black">{modalTitle}</div>
          {closeModalIcon ? (
            <button onClick={() => closeModal(goBack)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 stroke-current text-gray-300"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ) : (
            <div />
          )}
        </div>
        <div className="bg-light-gray h-full w-full p-4 md:rounded-lg">{children}</div>
      </div>
    </div>
  )
}

export default Modal
