import React from 'react';
import ReactDOM, {unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import RegistrationForm from '../components/RegistrationForm';
import ReactTestUtils from 'react-dom/test-utils';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('renders without crashing', () => {
  act(() => {
    ReactDOM.render(<RegistrationForm />, container);
  });
});

it('first input should have focus', () => {
  act(() => {
    ReactDOM.render(<RegistrationForm />, container);
  });

  const firstInput = container.querySelector('#firstName');
  const focusedElement = document.activeElement;

  expect(firstInput).toBe(focusedElement);
})

it('should render 4 span warnings if all 4 inputs are empty', () => {
  act(() => {
    ReactDOM.render(<RegistrationForm />, container);
  });

  const button = container.querySelector('button');

  act(() => {
    ReactTestUtils.Simulate.click(button);
  });

  const spans = container.querySelectorAll('.registrationForm__span--warning');

  expect(spans.length).toBe(4);
  spans.forEach((span) => {
    expect(span.textContent).toBe('Field can\'t be empty');
  });
});

it('should render span warnings if date is tommorow or further', () => {
  act(() => {
    ReactDOM.render(<RegistrationForm />, container);
  });

  const tommorowDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  const day = tommorowDate.getDate();
  const month = (tommorowDate.getMonth() + 1).length === 2 ? tommorowDate.getMonth() + 1 : `0${tommorowDate.getMonth() + 1}`;
  const year = tommorowDate.getFullYear();
  const birthDateInput = container.querySelector('#birthDate');
  birthDateInput.value = `${year}-${month}-${day}`;
  
  const button = container.querySelector('button');
  
  act(() => {
    ReactTestUtils.Simulate.change(birthDateInput);
    ReactTestUtils.Simulate.click(button);
  });
  
  const span = container.querySelector('#birthDate + span');

  expect(span.textContent).toBe('Invalid date');
});

it('should not render any span warning if all inputs are correct', () => {
  act(() => {
    ReactDOM.render(<RegistrationForm />, container);
  });

  const firstNameInput = container.querySelector('#firstName');
  const lastNameInput = container.querySelector('#lastName');
  const birthDateInput = container.querySelector('#birthDate');
  const jobPositionInput = container.querySelector('#jobPosition');
  firstNameInput.value = 'John';
  lastNameInput.value = 'Doe';
  birthDateInput.value = '2000-01-02';
  jobPositionInput.value = 'Tester';
  
  const button = container.querySelector('button');
  
  act(() => {
    ReactTestUtils.Simulate.change(firstNameInput);
    ReactTestUtils.Simulate.change(lastNameInput);
    ReactTestUtils.Simulate.change(birthDateInput);
    ReactTestUtils.Simulate.change(jobPositionInput);
    ReactTestUtils.Simulate.click(button);
  });

  const spans = container.querySelectorAll('.registrationForm__span--warning');

  expect(spans.length).toBe(0);
});
