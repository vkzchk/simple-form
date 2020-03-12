import React from 'react'
import ReactJson from 'react-json-view'
import styles from './data.module.css'

const Data = (props) => {

  return (
    <div className={styles.result}>
      <ReactJson src={props.data} name="result"/>
    </div>
  )
}

export default Data