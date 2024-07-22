import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import User from './User';
import { GetAllAccounts, CreateUser, EditUser, DeleteUser, GetUserbyCode } from '../Redux/ActionCreater';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  user: {
    userlist: [],
    isloading: false,
    errormessage: '',
    userdata: {}
  }
};

const store = mockStore(initialState);

describe('User Component', () => {
  beforeEach(() => {
    store.clearActions();
  });

  test('renders loading spinner when data is loading', () => {
    const loadingState = {
      ...initialState,
      user: {
        ...initialState.user,
        isloading: true
      }
    };

    render(
      <Provider store={mockStore(loadingState)}>
        <User loaduser={() => {}} />
      </Provider>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('renders error message when there is an error', () => {
    const errorState = {
      ...initialState,
      user: {
        ...initialState.user,
        errormessage: 'Error loading users'
      }
    };

    render(
      <Provider store={mockStore(errorState)}>
        <User loaduser={() => {}} />
      </Provider>
    );

    expect(screen.getByText(/error loading users/i)).toBeInTheDocument();
  });

  test('opens dialog on Add new user button click', () => {
    render(
      <Provider store={store}>
        <User loaduser={() => {}} />
      </Provider>
    );

    fireEvent.click(screen.getByText(/add new user/i));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  test('submits user form and dispatches CreateUser action', async () => {
    render(
      <Provider store={store}>
        <User loaduser={() => {}} />
      </Provider>
    );

    fireEvent.click(screen.getByText(/add new user/i));

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'johndoe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/phone/i), { target: { value: '1234567890' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      const actions = store.getActions();
      expect(actions).toContainEqual(CreateUser({
        id: '',
        name: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
        phone: '1234567890',
        gender: '',
        password: 'password123',
        profilePicture: ''
      }));
    });
  });

  test('opens edit dialog and dispatches GetUserbyCode action', () => {
    const user = { id: '1', name: 'John Doe', username: 'johndoe' };

    render(
      <Provider store={store}>
        <User loaduser={() => {}} />
      </Provider>
    );

    fireEvent.click(screen.getByText(/edit/i));

    expect(store.getActions()).toContainEqual(GetUserbyCode('1'));
  });

  test('dispatches DeleteUser action on delete button click', () => {
    const user = { id: '1' };

    render(
      <Provider store={store}>
        <User loaduser={() => {}} />
      </Provider>
    );

    fireEvent.click(screen.getByText(/delete/i));

    expect(window.confirm).toHaveBeenCalledWith('Do you want to delete this account?');
    expect(store.getActions()).toContainEqual(DeleteUser('1'));
  });
});
