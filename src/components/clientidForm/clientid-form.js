import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import * as axios from 'axios'
import styles from './clientid-form.module.css'
import Data from '../data/data'
import ErrorMessage from '../error/error-message'

const validationSchema = Yup.object().shape({
  clientId: Yup.number().required()
})

const ClientIdForm = () => {

  const [isAuth, setAuth] = useState(false)
  const [data, setData] = useState([]);
  const [error, setError] = useState(false)

  const getDataByClientId = (values) => {
    const accessToken = localStorage.getItem('access_token')
    axios.get(`http://mainapi.hsc.gov.ua/tst-sprlics-service/sprlics/person/${values.clientId}`, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    })
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          setAuth({ isAuth: true })
          setData(response.data)
        } else {
          setError({ error: true })
        }
      })
      .catch(error => {
        setError({ error: true })
        setData(error.response)
      })
  }
  return (
    <div className={styles.contact}>
      <Formik
        initialValues={{ clientId: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true)
          getDataByClientId(values)
          resetForm()
          setSubmitting(false)
        }}
      >
        {
          ({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <Form className={styles.contactForm} onSubmit={handleSubmit}>
              <label htmlFor="clientId">ClientId</label>
              <Field name="clientId"
                className={touched.clientId && errors.clientId ? styles.hasError : null}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.clientId}
              />
              <button
                type="submit"
                disabled={isSubmitting}
              >
                Get data by ClientID
              </button>
            </Form>
          )
        }
      </Formik>
      {
        isAuth && <Data data={data} />
      }
      {
        error && <ErrorMessage />
      }
    </div >
  )
}

export default ClientIdForm
