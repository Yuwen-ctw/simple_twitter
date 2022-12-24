import { createContext, useContext, useState } from 'react'

const defaultContextValue = {
  isEdited: null,
  showEditModal: null,
  handleToggleEditModal: null,
  handleEdit: null,
}

const EditContext = createContext(defaultContextValue)

export const useEdit = () => useContext(EditContext)

export const EditContextProvider = ({ children }) => {
  const [isEdited, setIsEdited] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  function handleToggleEditModal() {
    setIsEdited(false)
    setShowEditModal(!showEditModal)
  }

  function handleEdit() {
    setShowEditModal(false)
    setIsEdited(true)
  }

  return (
    <EditContext.Provider
      value={{
        isEdited,
        showEditModal,
        handleToggleEditModal,
        handleEdit,
      }}
    >
      {children}
    </EditContext.Provider>
  )
}
