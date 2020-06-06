export const swaggerDocument = {
  swagger: '2.0',
  info: {
    description: 'My bank API description',
    version: '1.0.0',
    title: 'My bank API',
  },
  host: 'localhost:3000',
  tags: [
    {
      name: 'account',
      description: 'Account management',
    },
  ],
  paths: {
    '/account': {
      get: {
        tags: ['account'],
        summary: 'Get existing accounts',
        description: 'Get existing accounts description',
        produces: ['application/JSON'],
        responses: {
          '200': {
            description: 'succefull operation',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/Account',
              },
            },
          },
          '400': {
            description: 'Error occured',
          },
        },
      },
      post: {
        tags: ['account'],
        summary: 'Create new account',
        description: 'Create new account with the received params',
        consumes: ['application/JSON'],
        parameters: [
          {
            in: 'body',
            name: 'body',
            description: 'Account Object',
            required: true,
            schema: {
              $ref: '#/definitions/Account',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Account created',
          },
          '400': {
            description: 'Error occured',
          },
        },
      },
    },
  },
  definitions: {
    Account: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Guilherme Assis',
        },
        balance: {
          type: 'number',
          example: 742.34,
        },
      },
    },
  },
};
