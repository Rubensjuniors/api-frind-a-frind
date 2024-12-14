export class OrganizationDoesNotExistError extends Error {
  constructor() {
    super('Organization does not exist!')
  }
}
