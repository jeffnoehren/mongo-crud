module.exports = class Users {
  constructor(username, password, firstName, lastName, dob, createdAt, updatedAt) {
    this.username = username
    this.password = password
    this.firstName = firstName
    this.lastName = lastName
    this.dob = dob
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}