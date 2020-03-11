import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'

import styles from './requestForm.module.css'

const uuidv4 = require('uuid/v4')

const validationSchema = Yup.object().shape({
  requestId: Yup.string().required(),
  requestType: Yup.string().required(),
  requestTime: Yup.string().default(() => new Date()),
  requestBody: Yup.string().required()
    .min(3, "Must have at least 3 characters")
    .max(200, "Must be shorter than 200")
})


const RequestForm = ({ requestTypeArray }) => {

  const elements = requestTypeArray.map((item, index) => {
    return (
      <option key={index + 1} value={item}>{item}</option>
    )
  })


  return (
    <div className={styles.contact}>
      <Formik
        initialValues={{ requestId: uuidv4(), requestType: "", requestTime: new Date().toJSON(), requestBody: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          fetch('http://qzwxsdcvfrty.com/myproject/users/simpleform/', {
            method: 'POST',
            headers: { "Content-Type": "text/plain" },
            body: JSON.stringify(values)
          })
            .then(res => res.json())
            .catch(e => console.log(e))
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <label htmlFor="select" style={{ display: 'block' }}>
              Type:
            </label>
            <select
              name="requestType"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.requestType || "DEFAULT"}
              className={touched.requestType && errors.requestType ? styles.hasError : null}
            >
              <option value="DEFAULT" disabled>Choose a type...</option>
              {elements}
            </select>
            <br />
            <label htmlFor="text">Text: </label>
            <textarea
              type="text"
              name="requestBody"
              placeholder="Write something here.."
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.requestBody}
              className={touched.requestBody && errors.requestBody ? styles.hasError : null}
            />
            <br />
            <button type="submit" disabled={isSubmitting}>
              Send
            </button>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default RequestForm