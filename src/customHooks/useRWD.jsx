import { useState, useEffect } from 'react'

const useRWD = () => {
  const [isOnMobile, setIsOnMobile] = useState(true)
  const [isOnTablet, setIsOnTablet] = useState(false)
  const [isOnDesktop, setIsOnDesktop] = useState(false)
  useEffect(() => {
    /*Check the screen size on every render, prevent possible bugs by
        checking the screen size and setting the isOnMobile when necessary.
        */
    function handleResize() {
      if (window.innerWidth < 768) {
        setIsOnMobile(true)
        setIsOnTablet(false)
        setIsOnDesktop(false)
      } else if (window.innerWidth < 1200) {
        setIsOnMobile(false)
        setIsOnTablet(true)
        setIsOnDesktop(false)
      } else {
        setIsOnMobile(false)
        setIsOnTablet(false)
        setIsOnDesktop(true)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    //Cleanup the useEffect when the component unmounts
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return { isOnMobile, isOnTablet, isOnDesktop }
}
export default useRWD
