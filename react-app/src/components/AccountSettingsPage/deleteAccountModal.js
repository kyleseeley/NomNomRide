import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from '../../context/Modal'
import { deleteUserThunk } from '../../store/session'
import { useHistory } from 'react-router-dom'
import './deleteAccount.css'

function DeleteAccountModal({ user }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [confirmation, setConfirmation] = useState('')
    const [disableButton, setDisableButton] = useState(true)
    const { closeModal } = useModal()

    useEffect(() => {
        if (confirmation === `delete account ${user.username}`) {
            setDisableButton(false)
        } else setDisableButton(true)
    }, [confirmation])

    const handleDelete = () => {
        dispatch(deleteUserThunk(user.id))
        .then(() => {
            closeModal()
            history.push('/')
        })
    }

    return (
        <div className='delete-account-container'>
            <h1>Delete Account</h1>
            <p>This action <b>cannot</b> be undone.</p>
            <p> All restaurants and reviews associated with your account will be deleted.</p>
            <p>Are you sure you want to delete your account?</p>
            <p>Type <span className='red-text'>delete account {user.username}</span> below to confirm.</p>
            <input
                value={confirmation}
                onChange={e => setConfirmation(e.target.value)}
                className='delete-confirmation'/>
            <div className='delete-acc-button-div'>
                <button
                    className='delete-acc-cancel'
                    onClick={closeModal}>
                        Cancel
                </button>
                <button
                    disabled={disableButton}
                    className='confirm-delete-acc-button'
                    onClick={handleDelete}>
                    Delete Account
                </button>
            </div>
        </div>
    )
}

export default DeleteAccountModal
