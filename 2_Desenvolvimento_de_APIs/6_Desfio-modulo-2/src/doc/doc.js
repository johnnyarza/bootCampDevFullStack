module.exports = swaggerDocument = {
  swagger: '2.0',
  info: {
    description: 'Grades Control API',
    version: '1.0.0',
    title: 'Grade Control API',
  },
  host: '192.168.0.205:3003',
  tags: [
    {
      name: 'grades',
      description: 'grades management',
    },
  ],
  paths: {
    '/grades': {
      get: {
        tags: ['grades'],
        summary: 'Get existing grades',
        description: 'Get existing grades description',
        produces: ['application/JSON'],
        responses: {
          '200': {
            description: 'succefull operation',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/getGrade',
              },
            },
          },
          '400': {
            description: 'Error occured',
          },
        },
      },
      post: {
        tags: ['grades'],
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
              $ref: '#/definitions/postGrade',
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
    getGrade: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          example: 1,
        },
        student: {
          type: 'string',
          example: 'Guilherme Assis',
        },
        type: {
          type: 'number',
          example: 'Fórum',
        },
        value: {
          type: 'number',
          example: 50,
        },
        timestamp: {
          type: 'string',
          example: '2020-05-19T18:21:24.964Z',
        },
      },
    },
    postGrade: {
      type: 'object',
      properties: {
        student: {
          type: 'string',
          example: 'Guilherme Assis',
        },
        subject: {
          type: 'string',
          example: '01-JavaScript',
        },
        type: {
          type: 'number',
          example: 'Fórum',
        },
        value: {
          type: 'number',
          example: 50,
        },
      },
    },
  },
};
