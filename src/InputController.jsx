import React from 'react'
import './InputController.css'

const InputController = (props) => {
    return (
        <div className='input-controller'>
            {props.label &&
                <>
                    <label>{props.label}</label>
                    <input {...props} />
                </>
            }
        </div>
    )
}

export default InputController