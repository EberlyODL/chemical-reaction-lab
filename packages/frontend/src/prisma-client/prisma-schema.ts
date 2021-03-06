export const typeDefs = /* GraphQL */ `type AggregatePosition {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar Long

type Mutation {
  createPosition(data: PositionCreateInput!): Position!
  updateManyPositions(data: PositionUpdateInput!, where: PositionWhereInput): BatchPayload!
  deleteManyPositions(where: PositionWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Position {
  x: String!
  y: String!
  z: String!
}

type PositionConnection {
  pageInfo: PageInfo!
  edges: [PositionEdge]!
  aggregate: AggregatePosition!
}

input PositionCreateInput {
  x: String!
  y: String!
  z: String!
}

type PositionEdge {
  node: Position!
  cursor: String!
}

enum PositionOrderByInput {
  x_ASC
  x_DESC
  y_ASC
  y_DESC
  z_ASC
  z_DESC
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type PositionPreviousValues {
  x: String!
  y: String!
  z: String!
}

type PositionSubscriptionPayload {
  mutation: MutationType!
  node: Position
  updatedFields: [String!]
  previousValues: PositionPreviousValues
}

input PositionSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: PositionWhereInput
  AND: [PositionSubscriptionWhereInput!]
  OR: [PositionSubscriptionWhereInput!]
  NOT: [PositionSubscriptionWhereInput!]
}

input PositionUpdateInput {
  x: String
  y: String
  z: String
}

input PositionWhereInput {
  x: String
  x_not: String
  x_in: [String!]
  x_not_in: [String!]
  x_lt: String
  x_lte: String
  x_gt: String
  x_gte: String
  x_contains: String
  x_not_contains: String
  x_starts_with: String
  x_not_starts_with: String
  x_ends_with: String
  x_not_ends_with: String
  y: String
  y_not: String
  y_in: [String!]
  y_not_in: [String!]
  y_lt: String
  y_lte: String
  y_gt: String
  y_gte: String
  y_contains: String
  y_not_contains: String
  y_starts_with: String
  y_not_starts_with: String
  y_ends_with: String
  y_not_ends_with: String
  z: String
  z_not: String
  z_in: [String!]
  z_not_in: [String!]
  z_lt: String
  z_lte: String
  z_gt: String
  z_gte: String
  z_contains: String
  z_not_contains: String
  z_starts_with: String
  z_not_starts_with: String
  z_ends_with: String
  z_not_ends_with: String
  AND: [PositionWhereInput!]
  OR: [PositionWhereInput!]
  NOT: [PositionWhereInput!]
}

type Query {
  positions(where: PositionWhereInput, orderBy: PositionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Position]!
  positionsConnection(where: PositionWhereInput, orderBy: PositionOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PositionConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Subscription {
  position(where: PositionSubscriptionWhereInput): PositionSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  name: String!
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  name: String!
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type UserPreviousValues {
  id: ID!
  name: String!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
  OR: [UserSubscriptionWhereInput!]
  NOT: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  name: String
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  AND: [UserWhereInput!]
  OR: [UserWhereInput!]
  NOT: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
}
`