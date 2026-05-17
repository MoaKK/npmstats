// these are based on npm package name rules: https://github.com/npm/validate-npm-package-name
const SCOPED_PACKAGE_REGEX = /^(@[a-z0-9-~][a-z0-9-._~]*\/)[a-z0-9-~][a-z0-9-._~]*$/;
const UNSCOPED_PACKAGE_REGEX = /^[a-z0-9-~][a-z0-9-._~]*$/;
const USERNAME_REGEX = /^[a-zA-Z0-9_-]{1,100}$/;
const MAX_PACKAGE_NAME_LENGTH = 214;

function isValidPackageName(name: string): boolean {
  if (!name || name.length > MAX_PACKAGE_NAME_LENGTH) return false;
  return SCOPED_PACKAGE_REGEX.test(name) || UNSCOPED_PACKAGE_REGEX.test(name);
}

function isValidUsername(username: string): boolean {
  if (!username) return false;
  return USERNAME_REGEX.test(username);
}

function sanitizePackageName(name: string): string {
  return name.trim().toLowerCase();
}

function sanitizeUsername(username: string): string {
  return username.trim().toLowerCase();
}

export { isValidPackageName, isValidUsername, sanitizePackageName, sanitizeUsername };
