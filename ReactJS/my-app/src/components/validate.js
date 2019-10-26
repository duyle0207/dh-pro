import React, { Component } from 'react';
import { Formik, Form, Field } from 'formik';
// import * as Yup from 'yup';
import Email from "./field";

function validateEmail(value) {
    let error;
    if (!value) {
        error = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        error = 'Invalid email address';
    }
    return error;
}

function validateUsername(value) {
    let error;
    if (value === 'admin') {
        error = 'Nice try!';
    }
    return error;
}



class FieldLevelValidationExample extends Component {
    render() {
        return (
            <div>
                <h1>Signup</h1>
                <Formik
                    onSubmit={values => {
                        console.log(values);
                    }}
                    >
                    {({ errors, touched, isValidating }) => (
                        <Form>
                            <Email errors={errors} validateEmail={validateEmail} touched={touched}></Email>

                            <Field name="username" validate={validateUsername} />
                            {errors.username && touched.username && <div>{errors.username}</div>}

                            <button type="submit">Submit</button>
                        </Form>
                    )}
                </Formik>
            </div>
        )
    }
}

export default FieldLevelValidationExample;