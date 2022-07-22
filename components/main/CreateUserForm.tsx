import { ChangeEvent, FormEvent, useState } from 'react';
import { useErsContext } from '../../store/ers/ErsContext';
import { EModalComponent, EModalToggleState, IApiDataProps, IFormValues } from '../../ts_ui';
import {
  CloseButton,
  Form,
  FormBtnContainer,
  FormContainer,
  FormContainerDetails,
  SubmitButton,
} from './CreateUserForm.styles';
import FormElements from './FormElements';

type dynamicKey = keyof IFormValues;

const CreateUserForm = () => {
  const { modalHandler, updateEmployeesWithNewUserData, state } = useErsContext();

  let initialValues: IFormValues = { firstName: '', lastName: '', email: '' };
  let method: string = 'POST';
  let url: string = '/api/employees';

  if (state.editing) {
    const { firstName, lastName, email } = state.editInfo;
    initialValues = { firstName, lastName, email };

    method = 'PATCH';
    url = `/api/employees/${state.editInfo.id}`;
  }

  const [users, setUsers] = useState<IFormValues>(initialValues);

  const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    setUsers({
      ...users,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...users,
        }),
      });

      if (!response.ok) {
        console.log(
          'Something Went Wrong: Possible Server Error',
          response.status
          // add a div to bottom of form and display 'api' error message - message: {'could not insert data'}
        );
      }

      const { data }: IApiDataProps = await response.json();
      updateEmployeesWithNewUserData(data);
      modalHandler(EModalToggleState.hide, EModalComponent.createUserForm);
    } catch (error: any) {
      // add a div to bottom of form and display 'fetch' error message - network error
      console.log(error.message);
    }
  };

  const inputs = [
    {
      id: 'firstname',
      name: 'firstName',
      type: 'text',
      placeholder: 'Your First Name',
      pattern: '^[A-Za-z0-9]{2,16}$',
      autofocus: true,
      labelText: 'First Name',
      errorMessage: `Username should be 2-16 characters and shouldn't include any special
      characters.`,
    },
    {
      id: 'lastname',
      name: 'lastName',
      type: 'text',
      placeholder: 'Your Last Name',
      pattern: '^[A-Za-z0-9]{2,16}$',
      labelText: 'Last Name',
      errorMessage: `Username should be 2-16 characters and shouldn't include any special
      characters.`,
    },
    {
      id: 'email',
      name: 'email',
      type: 'email',
      placeholder: 'name@email.com',
      labelText: 'Email',
      errorMessage: 'Email is invalid.',
    },
  ];

  return (
    <FormContainer>
      <FormContainerDetails>
        <p>Add New Employee</p>
      </FormContainerDetails>
      <Form onSubmit={submitHandler}>
        {inputs.map((input, index) => {
          return (
            <FormElements
              key={index}
              {...input}
              onChange={changeHandler}
              value={users[input.name as dynamicKey]}
            />
          );
        })}
        <FormBtnContainer>
          <CloseButton
            type='button'
            onClick={() => modalHandler(EModalToggleState.hide, EModalComponent.createUserForm)}
          >
            Close
          </CloseButton>
          <SubmitButton type='submit'>Submit</SubmitButton>
        </FormBtnContainer>
      </Form>
    </FormContainer>
  );
};

export default CreateUserForm;
