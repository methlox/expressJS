const { authRegisterController } = require('../../controllers/auth');
const User = require('../../database/schemas/User');
const { hashPassword } = require('../../utils/helpers');

jest.mock('../../utils/helpers', () => ({
    hashPassword: jest.fn((x) => x),
}));

jest.mock('../../database/schemas/User');

// A STUB- fake request body that'll be passed into authRegisterController
const request = {
    body: {
        email: 'fake_email',
        password: 'fake_password',
    },
};

const response = {
    status: jest.fn((x) => x),
    send: jest.fn((x) => x),
}

// MOCKING
it('if user exists it should send a status code of 400', async () => {
    User.findOne.mockImplementationOnce(() => ({
        id: 1,
        email: 'email',
        password: 'password',
    }));
    await authRegisterController(request, response);
    expect(response.status).toHaveBeenCalledWith(400); // ASSERTING
    expect(response.send).toHaveBeenCalledTimes(1);
})

it('if user is created it should send a status code of 201', async () => {
    // User.findOne.mockImplementationOnce(() => undefined);
    User.findOne.mockResolvedValueOnce(undefined); // same as above commented out line
    // hashPassword.mockResolvedValueOnce('hash');
    User.create.mockResolvedValueOnce({
        id: 1,
        email: 'email',
        password: 'password',
    });

    await authRegisterController(request, response);
    expect(hashPassword).toHaveBeenCalledWith('fake_password');
    expect(User.create).toHaveBeenCalledWith({
        email: 'fake_email',
        password: 'fake_password',
    });
    expect(response.send).toHaveBeenCalledWith(201);
});