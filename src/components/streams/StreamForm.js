import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {

    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    };

    renderInput = (formProps) => {
        // return <input onChange={formProps.input.onChange} value={formProps.input.value}/>
        const className = `field ${formProps.meta.error && formProps.meta.touched ? "error": ""}`
        return (
            <div className={className}>
                <label>{formProps.label}</label>
                <input {...formProps.input} autoComplete="off" />
                {this.renderError(formProps.meta)}
            </div>
        )
    };

    onSubmit = (formValues) => {
        console.log(formValues);
        this.props.onSubmit(formValues);
    };

    render() {
        return (
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="description" component={this.renderInput} label="Enter Description" />
                <button className="ui button" type="submit">Submit</button>
            </form>
        )
    };
};

const validate = (formValues) => {
    let errors = {};
    if (!formValues.title) {
        errors.title = "You must enter a title"
    }
    if (!formValues.description) {
        errors.description = "Please enter the description"
    }
    return errors;
}

export default reduxForm({
    form: 'streamForm',
    validate: validate
})(StreamForm);