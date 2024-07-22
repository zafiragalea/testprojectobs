import { handleSubmit, handleEdit, handleDelete } from '../User';

describe('handleSubmit', () => {
  it('should call createUser with valid form data', () => {
    const event = { preventDefault: jest.fn() };
    const setFormData = jest.fn();
    const formData = {
      name: 'Lalali',
      username: 'lll',
      email: 'lalali@gmail.com',
      phone: '777722228888',
      gender: 'Male',
      password: 'password1',
      confirmPassword: 'password1',
    };
    const createUser = jest.fn();

    handleSubmit(event, formData, setFormData, createUser);

    expect(createUser).toHaveBeenCalledWith(formData);
    expect(setFormData).not.toHaveBeenCalled();
  });

  it('should not call createUser with invalid form data', () => {
    const event = { preventDefault: jest.fn() };
    const setFormData = jest.fn();
    const formData = {
      name: '',
      username: '',
      email: 'lalali@gmail.com',
      phone: '777722228888',
      gender: 'Male',
      password: 'password1',
      confirmPassword: 'password1',
    };
    const createUser = jest.fn();

    handleSubmit(event, formData, setFormData, createUser);

    expect(createUser).not.toHaveBeenCalled();
    expect(setFormData).toHaveBeenCalledWith(expect.any(Object));
  });
});

describe('handleEdit', () => {
  it('should call editUser with the correct user ID', () => {
    const userId = '1';
    const editUser = jest.fn();

    handleEdit(userId, editUser);

    expect(editUser).toHaveBeenCalledWith(userId);
  });
});

describe('handleDelete', () => {
  it('should call deleteUser with the correct user ID when confirmed', () => {
    window.confirm = jest.fn(() => true);
    const userId = '1';
    const deleteUser = jest.fn();

    handleDelete(userId, deleteUser);

    expect(window.confirm).toHaveBeenCalledWith(
      'Are you sure you want to delete this user?'
    );
    expect(deleteUser).toHaveBeenCalledWith(userId);
  });

  it('should not call deleteUser when not confirmed', () => {
    window.confirm = jest.fn(() => false);
    const userId = '1';
    const deleteUser = jest.fn();

    handleDelete(userId, deleteUser);

    expect(window.confirm).toHaveBeenCalledWith(
      'Are you sure you want to delete this user?'
    );
    expect(deleteUser).not.toHaveBeenCalled();
  });
});
