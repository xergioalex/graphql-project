const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools')
const casual = require('casual')

const typeDefs = `
  # Esto es un curso en el sistema
  type Curso {
    id: ID!
    titulo: String!
    # Esta es la descripción del curso
    descripcion: String!
    profesor: Profesor
    rating: Float @deprecated(reason: "No creemos más en los puntajes")
    comentarios: [Comentario]
  }

  type Profesor {
    id: ID!
    nombre: String!
    nacionalidad: String!
    genero: Genero
  }

  enum Genero {
    MASCULINO
    FEMENINO 
  }

  type Comentario {
    id: ID!
    nombre: String!
    cuerpo: String!
  }

  type Query {
    cursos: [Curso]
    comentarios: [Comentario]
    profesores: [Profesor]
    curso(id: Int): Curso
    profesor(id: Int): Profesor
  }
`

const resolvers = {
  Query: {
    cursos: () => {
      return [{
        id: 1,
        titulo: 'Curso de GraphQL',
        descripcion: 'Aprendiendo GraphQL',
        profesor: {
          nombre: 'Sergio'
        }
      },
      {
        id: 2,
        titulo: 'Curso de Javascript',
        descripcion: 'Aprendiendo Javascript'
      }]
    },
    comentarios: () => {
      return [
        {
          id: 1,
          nombre: 'Comentario 1',
          cuerpo: 'Cuerpo comentario 1'
        },
        {
          id: 2,
          nombre: 'Comentario 2',
          cuerpo: 'Cuerpo comentario 2'
        },
        {
          id: 3,
          nombre: 'Comentario 3',
          cuerpo: 'Cuerpo comentario 3'
        },
        {
          id: 4,
          nombre: 'Comentario 4',
          cuerpo: 'Cuerpo comentario 4'
        }
      ]
    }
  },
  Curso: {
    profesor: () => {
      return {
        nombre: 'Sergio Alexander Florez Galeano',
        nacionalidad: 'Colombiano'
      }
    },
    comentarios: () => {
      return [{
        id:1,
        nombre: 'Comentario 1',
        cuerpo: 'Cuerpo comentario 2'
      },
      {
        id:2,
        nombre: 'Comentario 2',
        cuerpo: 'Cuerpo comentario 2'
      }]
    }
  }
}

const schema = makeExecutableSchema({ 
  typeDefs,
  resolvers
})

addMockFunctionsToSchema({
  schema,
  mocks: {
    Curso: () => {
      return {
        id: casual.uuid,
        titulo: casual.sentence,
        descripcion: casual.sentences(2)
      }
    },
    Profesor: () => {
      return {
        nombre: casual.name,
        nacionalidad: casual.country
      }
    }
  },
  preserveResolvers: true
})

module.exports = schema
