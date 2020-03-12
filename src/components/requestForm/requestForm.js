import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import * as axios from 'axios'
import styles from './requestForm.module.css'
import Data from '../data/data'
import ErrorMessage from '../error/error-message'

const validationSchema = Yup.object().shape({
  paperId: Yup.number().required()
})

const RequestForm = () => {

  const [isAuth, setAuth] = useState(false)
  const [data, setData] = useState([]);
  const [error, setError] = useState(false)

  const getDataByPapreId = (values) => {
    const accessToken = localStorage.getItem('access_token')
    axios.get(`http://mainapi.hsc.gov.ua/tst-sprlics-service/sprlics/${values.paperId}`, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    })
      .then(response => {
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
        initialValues={{ paperId: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true)
          getDataByPapreId(values)
          resetForm()
          setSubmitting(false)
        }}
      >
        {
          ({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <Form className={styles.contactForm} onSubmit={handleSubmit}>
              <label htmlFor="paperId">PaperId</label>
              <Field name="paperId"
                className={touched.paperId && errors.paperId ? styles.hasError : null}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.paperId}
              />
              <button
                type="submit"
                disabled={isSubmitting}
              >
                Get PaperID
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

export default RequestForm


