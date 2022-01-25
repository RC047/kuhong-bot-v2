const roles = {
  /*
  'Role Name': <Minimal Level To Obtain this Role>
  */
  'Bronze': 0,
  'Silver': 10,
  'Gold': 25,
  'Platinum': 50,
  'Diamond': 75,
  'Master': 100
}

module.exports = {
  before(m) {
    let user = global.db.data.users[m.sender]
    let level = user.level
    let role = (Object.entries(roles).sort((a, b) => b[1] - a[1]).find(([,minLevel]) => level >= minLevel) || Object.entries(roles)[0])[0]
    user.role = role
    return true
  }
}