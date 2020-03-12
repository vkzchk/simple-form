import React from 'react'
import styles from './data.module.css'

const Data = (props) => {
  return props.data.map(info => {
    return (
      <div key={info.paperId} className={styles.result}>
        <ul>
          <li>paperId: {info.paperId}</li>
          <li>clntId: {info.clntId}</li>
          <li>carId: {info.carId}</li>
          <li>licencePlate: {info.licencePlate}</li>
          <li>makeYear: {info.makeYear}</li>
          <li>brand: {info.brand}</li>
          <li>model: {info.model}</li>
          <li>commercialDesc: {info.commercialDesc}</li>
          <li>vin: {info.vin}</li>
          <li>totalWeight: {info.totalWeight}</li>
          <li>ownWeight: {info.ownWeight}</li>
          <li>category: {info.category}</li>
          <li>capacity: {info.capacity}</li>
          <li>fuel: {info.fuel}</li>
          <li>color: {info.color}</li>
          <li>note: {info.note}</li>
          <li>seria: {info.seria}</li>
          <li>number: {info.number}</li>
          <li>status: {info.status.status}</li>
          <li>dfirstReg: {info.dfirstReg}</li>
          <li>dreg: {info.dreg}</li>
          <li>dend: {info.dend}</li>
          <li>nchassis: {info.nchassis}</li>
          <li>nseating: {info.nseating}</li>
          <li>nstandup: {info.nstandup}</li>
        </ul>
      </div>)
  })
}

export default Data