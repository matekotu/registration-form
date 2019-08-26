import React from 'react';

import './RegistrationForm.css';

const jobJson = require('../data/jobs.json');


class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      gender: 'female',
      birthDate: '',
      jobPosition: '',
      bio: '',
      validationFail: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let value = e.target.value;

    if(e.target.id === 'gender') {
      value = e.target.checked ? 'male' : 'female';
    }

    this.setState({
      [e.target.id]: value
    });
  }

  validate() {
    return this.state.firstName.length > 0 &&
    this.state.lastName.length > 0 &&
    this.state.birthDate !== '' &&
    new Date(this.state.birthDate).getTime() <= new Date().getTime() &&
    this.state.bio.length <= 128;
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.validate()) {
      this.setState({validationFail: false});
      alert('Registration completed successful');
    } else {
      this.setState({validationFail: true});
    }
  }

  render() {
    const firstNameInputClassName = (this.state.validationFail && this.state.firstName.length === 0) ? 'registrationForm__input registrationForm__input--warning' : 'registrationForm__input';
    const lastNameInputClassName = this.state.validationFail && this.state.lastName.length === 0 ? 'registrationForm__input registrationForm__input--warning' : 'registrationForm__input';
    const birthDateInputClassName = this.state.validationFail && this.state.birthDate === '' ? 'registrationForm__input registrationForm__input--warning' : 'registrationForm__input';
    const jobPositionSelectClassName = this.state.validationFail && this.state.jobPosition === '' ? 'registrationForm__select registrationForm__select--warning' : 'registrationForm__select';
    const spanWarning = <span className='registrationForm__span--warning'>Field can't be empty</span>;
    const spanDataWarning = <span className='registrationForm__span--warning'>Invalid date</span>;

    return (
      <div>
        <h1 className='registrationForm__description'>Registration Form</h1>
        <form onSubmit={this.handleSubmit} className='registrationForm'>
          <div>
            <label htmlFor='firstName' className='registrationForm__label'>First name *</label>
            <input id='firstName' type='text' required value={this.state.firstName} onChange={this.handleChange} className={firstNameInputClassName} autoFocus></input>
            {(this.state.validationFail && this.state.firstName.length === 0) ? spanWarning : null}
          </div>

          <br></br>

          <div>
            <label htmlFor='lastName' className='registrationForm__label'>Last name *</label>
            <input id='lastName' type='text' required value={this.state.lastName} onChange={this.handleChange} className={lastNameInputClassName}></input>
            {(this.state.validationFail && this.state.lastName.length === 0) ? spanWarning : null}
          </div>
          <br></br>

          <div>
            <label htmlFor='gender' className='registrationForm__label registrationForm__labelGender'>Gender
            </label>
            <label>
              <span className='registrationForm__switch'>
                <input id='gender' type='checkbox' onChange={this.handleChange}></input>
                <span className='registrationForm__slider'></span>
              </span>
              <span>{this.state.gender}</span>
            </label>
          </div>
          <br></br>

          <div>
            <label htmlFor='birthDate' className='registrationForm__label'>Birth date *</label>
            <input id='birthDate' type='date' required value={this.state.birthDate} onChange={this.handleChange} className={birthDateInputClassName}></input>
            {(this.state.validationFail && this.state.birthDate === '') ? spanWarning : null}
            {(this.state.validationFail && (new Date(this.state.birthDate).getTime() >= new Date().getTime())) ? spanDataWarning : null}
          </div>
          <br></br>

          <div>
            <label htmlFor="jobPosition" className='registrationForm__label'>Choose a job position *</label>
            <select id="jobPosition" required value={this.state.jobPosition} onChange={this.handleChange} className={jobPositionSelectClassName}>
              <option value=''>--Please choose an option--</option>
              {
                jobJson.jobs.map((job) => (
                  <option key={job.id} value={job.jobTitle}>{job.jobTitle}</option>
                ))
              }
            </select>
            {(this.state.validationFail && this.state.jobPosition === '') ? spanWarning : null}
          </div>
          <br></br>

          <div>
            <label htmlFor='bio' className='registrationForm__label registrationForm__labelBio'>Bio</label>
            <textarea id='bio' maxLength='128' value={this.state.bio} onChange={this.handleChange} className='registrationForm__textarea' placeholder='Write your bio...'></textarea>
            <span className='registrationForm__span--information'>{this.state.bio.length}/128 characters</span>
          </div>

          <button type='submit' onClick={this.handleSubmit} className='registrationForm__submitButton'>Submit</button>
        </form>
      </div>
    );
  }
}

export default RegistrationForm;
