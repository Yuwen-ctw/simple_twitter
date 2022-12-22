import { useState, createContext, useContext } from 'react'
import { unfollowUser, followUser } from 'api/users'

const defaultContextValue = {
  toggledUser: null,
  handleToggleFollow: null,
}

const FollowContext = createContext(defaultContextValue)

export const useFollowToggled = () => useContext(FollowContext)

export function FollowToggledContextProvider({ children }) {
  const [toggledUser, setToggledUser] = useState({})

  async function handleToggleFollow(userId, isFollowed) {
    const { success, message } = isFollowed
      ? await unfollowUser(userId)
      : await followUser(userId)
    if (success) {
      setToggledUser({ id: userId, isFollowed: !isFollowed })
    } else {
      console.error(message)
    }
  }

  return (
    <FollowContext.Provider value={{ toggledUser, handleToggleFollow }}>
      {children}
    </FollowContext.Provider>
  )
}
