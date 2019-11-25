export const parsingArrayRoles = (roles, typeOfRole) => {
  return roles.some(role => {
    if (role.dataValues.userRole === typeOfRole) {
      return true;
    }
    return false;
  });
};
