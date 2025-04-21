import { useNavigate } from "react-router"

export const useRouter = () => {
  const navigate = useNavigate()

  // const push = (path: string) => {
  //   navigate(path)
  // }
  const push = (path: string, state?: unknown) => {
    navigate(path, { state })
  }

  const replace = (path: string) => {
    navigate(path, { replace: true })
  }

  const back = () => {
    navigate(-1)
  }

  return {
    push,
    replace,
    back
  }
}
