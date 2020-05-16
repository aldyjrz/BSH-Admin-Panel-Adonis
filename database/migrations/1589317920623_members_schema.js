'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MembersSchema extends Schema {
  up () {
    this.create('members', (table) => {
      table.increments()
      table.string('nama',255)
      table.string('email',100)
      table.string('IMEI',255)
      table.string('IMSI',255)
      table.string('type',15).nullable()
      table.string('api_token',255)
      table.string('created_by',200).nullable()
      table.timestamp('expired_date').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('members')
  }
}

module.exports = MembersSchema
