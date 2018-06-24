import React, { Fragment } from 'react';
import { ValidatorComponent } from 'react-form-validator-core';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

class InputValidator extends ValidatorComponent {
	errorText() {
		const { isValid } = this.state;

		if (isValid) {
			return null;
		}

		return <Fragment>{this.getErrorMessage()}</Fragment>;
	}

	render() {
		const {
			errorMessages,
			validators,
			requiredError,
			validatorListener,
			...props
		} = this.props;

		return (
			<FormControl
				required={props.required}
				error={!this.state.isValid}
			>
				<FormLabel component="legend">{props.label}</FormLabel>
				<Input {...props}/>
				<FormHelperText>{this.errorText()}</FormHelperText>
			</FormControl>
		);
	}
}

export default InputValidator;
