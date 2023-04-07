module.exports = {
  type: 'object',
  properties: {
      email: {
          type: 'string',
          description: "this is name of user",
          required: true,
          example : "jhon@mail.com"
      },
      password: {
          type: 'string',
          description : "ini adalah password yang and input",
          required: true,
      },
      confirmationPassword: {
          description : "ini adalah password yang and input",
          required: true,
      }
  }
}
