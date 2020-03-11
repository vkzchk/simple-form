import React from 'react'
import { Formik, Form, Field } from 'formik'
import styles from './authForm.module.css'
import * as Yup from 'yup'

const validationSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
  client_id: Yup.string().required(),
  client_secret: Yup.string().required()
})

const getAuthToken = (values) => {
  fetch('http://mainapi.hsc.gov.ua/auth-server/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-encoded' },
    body: `grant_type=password&username=${values.username}&password=${values.password}&client_id=${values.client_id}&client_secret=${values.client_secret}`
  }
  )
    .then(res => console.log(res))
    .catch(e => console.log(e))
}

const Auth = () => {
  return (
    <div className={styles.contact}>
      <Formik
        initialValues={{ username: '', password: '', client_id: '', client_secret: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true)
          getAuthToken(values)
          actions.resetForm()
          actions.setSubmitting(false)
        }}
      >
        {
          ({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <Form className={styles.contactForm} onSubmit={handleSubmit}>
              <label htmlFor="username">username</label>
              <Field name="username"
                className={touched.requestType && errors.requestType ? styles.hasError : null}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
              <label htmlFor="password">password</label>
              <Field name="password" type="password"
                className={touched.requestType && errors.requestType ? styles.hasError : null}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <label htmlFor="client_id">client_id</label>
              <Field name="client_id"
                className={touched.requestType && errors.requestType ? styles.hasError : null}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.client_id}
              />
              <label htmlFor="client_secret">client_secret</label>
              <Field name="client_secret"
                className={touched.requestType && errors.requestType ? styles.hasError : null}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.client_secret}
              />
              <button
                type="submit"
                disabled={isSubmitting}
              >
                Get Auth Token
              </button>
            </Form>
          )
        }
      </Formik>
    </div>

  )
}

export default Auth

