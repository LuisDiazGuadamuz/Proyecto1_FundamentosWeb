const API_URL = import.meta.env.VITE_API_URL || '/graphql'

async function executeGraphQL(query, variables = {}, token = null, signal) {
  const headers = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
    signal,
  })

  if (!response.ok) {
    throw new Error('No se pudo conectar con la API GraphQL.')
  }

  const result = await response.json()

  if (result.errors?.length) {
    throw new Error(result.errors[0].message)
  }

  return result.data
}

export async function login(email, password, signal) {
  const query = `
    mutation Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
        token
        user {
          id
          email
          role
          createdAt
        }
      }
    }
  `

  const data = await executeGraphQL(query, { email, password }, null, signal)
  return data.login
}

export async function getMe(token, signal) {
  const query = `
    query Me {
      me {
        id
        email
        role
        createdAt
      }
    }
  `

  const data = await executeGraphQL(query, {}, token, signal)
  return data.me
}

export async function createProperty(input, token, signal) {
  const query = `
    mutation CreateProperty($input: PropertyInput!) {
      createProperty(input: $input) {
        id
        name
        description
        location
        price
        images
        beds
        baths
        area
        type
        features
        createdAt
      }
    }
  `

  const data = await executeGraphQL(query, { input }, token, signal)
  return data.createProperty
}

export async function updateProperty(id, input, token, signal) {
  const query = `
    mutation UpdateProperty($id: ID!, $input: PropertyInput!) {
      updateProperty(id: $id, input: $input) {
        id
        name
        description
        location
        price
        images
        beds
        baths
        area
        type
        features
        createdAt
      }
    }
  `

  const data = await executeGraphQL(query, { id, input }, token, signal)
  return data.updateProperty
}

export async function deleteProperty(id, token, signal) {
  const query = `
    mutation DeleteProperty($id: ID!) {
      deleteProperty(id: $id)
    }
  `

  const data = await executeGraphQL(query, { id }, token, signal)
  return data.deleteProperty
}

export async function createInquiry(input, signal) {
  const query = `
    mutation CreateInquiry($input: InquiryInput!) {
      createInquiry(input: $input) {
        id
        name
        email
        message
        propertyId
        propertyName
        status
        createdAt
      }
    }
  `

  const data = await executeGraphQL(query, { input }, null, signal)
  return data.createInquiry
}

export async function getInquiries(token, signal) {
  const query = `
    query GetInquiries {
      inquiries {
        id
        name
        email
        message
        propertyId
        propertyName
        status
        createdAt
      }
    }
  `

  const data = await executeGraphQL(query, {}, token, signal)
  return data.inquiries ?? []
}

export async function updateInquiryStatus(id, status, token, signal) {
  const query = `
    mutation UpdateInquiryStatus($id: ID!, $status: String!) {
      updateInquiryStatus(id: $id, status: $status) {
        id
        status
      }
    }
  `

  const data = await executeGraphQL(query, { id, status }, token, signal)
  return data.updateInquiryStatus
}

export async function deleteInquiry(id, token, signal) {
  const query = `
    mutation DeleteInquiry($id: ID!) {
      deleteInquiry(id: $id)
    }
  `

  const data = await executeGraphQL(query, { id }, token, signal)
  return data.deleteInquiry
}

export async function getInquiryStats(token, signal) {
  const query = `
    query InquiryStats {
      inquiryStats {
        totalInquiries
        unreadInquiries
        totalProperties
      }
    }
  `

  const data = await executeGraphQL(query, {}, token, signal)
  return data.inquiryStats
}

export async function getProperties(signal) {
  const query = `
    query GetProperties {
      properties {
        id
        name
        description
        location
        price
        images
        beds
        baths
        area
        type
        features
        createdAt
      }
    }
  `

  const data = await executeGraphQL(query, {}, null, signal)
  return data.properties ?? []
}

export async function getPropertyById(id, signal) {
  const query = `
    query GetProperty($id: ID!) {
      property(id: $id) {
        id
        name
        description
        location
        price
        images
        beds
        baths
        area
        type
        features
        createdAt
      }
    }
  `

  const data = await executeGraphQL(query, { id }, null, signal)
  return data.property
}
