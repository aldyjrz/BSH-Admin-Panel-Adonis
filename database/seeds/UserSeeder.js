'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/
const User = use('App/Models/User')
/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class UserSeeder {
  async run () {
    const u1 = new User()
    u1.username = 'alditoi'
    u1.password = 'alditoi'
    u1.email = 'alditoi@gmail.com'
    u1.created_by = 'admin aldy'
    await u1.save()
  }
}

module.exports = UserSeeder
