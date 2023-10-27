import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import './infoContainer.css'
import { editUserThunk } from "../../store/session"

function InfoContainer({label,
    desc,
    type,
    variables,
    otherEdit,
    changeOther,
    restoreUser}) {
    const dispatch = useDispatch()
    const [editForm, setEditForm] = useState(false)
    const [values, setValues] = useState({...variables})
    const [disableButton, setDisableButton] = useState(true)
    const [errors, setErrors] = useState({})
    const [onSubmit, setOnSubmit] = useState(false)
    const currUser = useSelector(state => state.session.user)
    const entries = Object.entries(variables)
    const validEmailCheck = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const validAddressCheck = /^[a-zA-Z0-9\s,'-]*$/

    useEffect(() => {
        const errorList = {}
        if (editForm) {
            switch(type) {
                case 'name':
                    if (values['First Name'].length === 0) errorList['First Name'] = 'First name is required'
                    if (values['Last Name'].length === 0) errorList['Last Name'] = 'Last name is required'
                    if (values['First Name'] === variables['First Name']
                        && values['Last Name'] === variables['Last Name']) errorList['First Name'] = null
                    break;
                case 'email':
                    if (!values['Email address'].match(validEmailCheck)) errorList['Email address'] = 'Not a valid email'
                    if (values['Email address'].length === 0) errorList['Email address'] = 'Email is required'
                    if (values['Email address'] === variables['Email address']) errorList['Email address'] = null
                    break;
                case 'password':
                    if (values['Old Password'].length < 6) errorList['Old Password'] = 'Required field with 6 or more characters'
                    if (values['New Password'].length < 6) errorList['New Password'] = 'Required field with 6 or more characters'
                    if (values['Confirm New Password'].length < 6) errorList['Confirm New Password'] = 'Required field with 6 or more characters'
                    if (values['New Password'] !== values['Confirm New Password']) errorList['Confirm New Password'] = 'Passwords do not match'
                    break;
                case 'address':
                    if (!values['Address'].match(validAddressCheck)) errorList['Old Password'] = 'Not a valid address'
                    if (values['City'].length < 3) errorList['City'] = 'Required field with 3 or more characters'
                    if (values['State'].length < 1) errorList['State'] = 'Required field'
                default: break
            }
        }
        if (Object.keys(errorList).length) setDisableButton(true)
        else setDisableButton(false)
        setErrors(() => {return {...errorList}})
    }, [values])

    const handleSubmit = e => {
        e.preventDefault()
        setErrors({})
        setOnSubmit(true)

        const checkUser = { id: currUser.id }

        if (values['First Name'] && values['Last Name']) {
            checkUser.firstname = values['First Name']
            checkUser.lastname = values['Last Name']
        } else if (values['Email address']) checkUser.email = values['Email address']
        else if (values['Old Password'] && values['New Password']) {
            checkUser.oldPassword = values['Old Password']
            checkUser.newPassword = values['New Password']
        } else if (values['Address'] && values['City'] && values['State']) {
            checkUser.address = values['Address']
            checkUser.city = values['City']
            checkUser.state = values['State']
        }


        dispatch(editUserThunk(checkUser))
        .then(() => {
            restoreUser()
            setEditForm(false)
            changeOther()
        })
        .catch(async res => {
            const data = await res.json()
            setErrors(() => {return {...data}})
        })
    }

    return (
        <div className="info-container">
            <div className={(otherEdit && !editForm && "info-label gray") || "info-label"}>{label}</div>
            <button
                className={(otherEdit && !editForm && "info-edit-button gray") || "info-edit-button"}
                onClick={() => {
                    changeOther()
                    setEditForm(prev => !prev)
                    if (!editForm) setValues(() => {return {...variables}})
                }}
                disabled={otherEdit && !editForm}>
                {(!editForm && 'Edit') || 'Cancel'}
            </button>
            {!editForm && <div className={(otherEdit && "curr-info gray") || "curr-info"}>
                {entries.map(entry => <span key={entry[0]}>{` ${entry[1]}`}
                {(entry[0] == 'City' || entry[0] == 'Address') && ','}
            </span>)}
            </div>}
            {editForm && type !== 'password' && <div className="info-edit-panel">
                <div>{desc}</div>
                <form onSubmit={handleSubmit}>
                    <div className={`info-inputs-div ${entries.length > 2 ? 'col' : ''}`}>
                        {entries.map(entry =>
                        <span key={entry[0]} className={entry[0]}>
                            <div className="info-input-label">{entry[0]}</div>
                            <input
                                className="info-input"
                                placeholder={entry[0]}
                                value={values[entry[0]]}
                                onChange={e => setValues(prev => {return {...prev, [entry[0]]: e.target.value}})} />
                            <div className="error-msg">{errors[entry[0]] && errors[entry[0]]}&nbsp;</div>
                        </span>)}
                    </div>
                    <button
                        disabled={disableButton}
                        className="save-personal">Save</button>
                </form>
            </div>}
            {editForm && type === 'password' && <div className="info-edit-panel">
                <div>{desc}</div>
                <form onSubmit={handleSubmit}>
                    <div className='info-inputs-div col'>
                        {entries.map(entry =>
                        <span key={entry[0]} className={entry[0]}>
                            <div className="info-input-label">{entry[0]}</div>
                            <input
                                className="info-input"
                                placeholder={entry[0]}
                                value={values[entry[0]]}
                                type='password'
                                onChange={e => setValues(prev => {return {...prev, [entry[0]]: e.target.value}})} />
                            <div className="error-msg">{onSubmit && errors[entry[0]] && errors[entry[0]]}&nbsp;</div>
                        </span>)}
                    </div>
                    <button
                        disabled={disableButton}
                        className="save-personal">Save</button>
                </form>
            </div>}
        </div>
    )
}

export default InfoContainer
