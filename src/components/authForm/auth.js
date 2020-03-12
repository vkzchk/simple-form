import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import styles from './authForm.module.css'
import * as Yup from 'yup'
import * as axios from 'axios'
import { Redirect } from 'react-router-dom'


const validationSchema = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
  client_id: Yup.string().required(),
  client_secret: Yup.string().required()
})


const Auth = () => {
  const [isAuth, setAuth] = useState(false)

  const getAuthToken = (values) => {
    axios({
      url: 'http://mainapi.hsc.gov.ua/auth-server/oauth/token',
      method: 'post',
      auth: {
        username: values.client_id,
        password: values.client_secret
      },
      data: `grant_type=password&username=${values.username}&password=${values.password}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => {
        if (response.status === 200) {
          setAuth({ isAuth: true })
        }
        localStorage.setItem('access_token', response.data.access_token)
      })
      .catch(e => console.log(e))
  }

  if (isAuth) {
    return <Redirect to={'/'} />
  }

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
                className={touched.username && errors.username ? styles.hasError : null}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
              <label htmlFor="password">password</label>
              <Field name="password" type="password"
                className={touched.password && errors.password ? styles.hasError : null}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <label htmlFor="client_id">client_id</label>
              <Field name="client_id"
                className={touched.client_id && errors.client_id ? styles.hasError : null}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.client_id}
              />
              <label htmlFor="client_secret">client_secret</label>
              <Field name="client_secret"
                className={touched.client_secret && errors.client_secret ? styles.hasError : null}
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

