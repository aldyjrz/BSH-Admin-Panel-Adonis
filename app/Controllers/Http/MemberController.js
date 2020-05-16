'use strict'

const Member = use('App/Models/Member')
const { validate } = use('Validator')

class MemberController {

    async postMember({ request, response, auth }) {

        var { nama, email,IMEI,IMSI,type,api_token,created_by,expired_date } = request.only(['nama','email','IMEI','IMSI','type','api_token','created_by','expired_date'])
        
        const rules = {
            nama: 'required',
            email: 'required|email',
            IMEI: 'required',
            IMSI: 'required',
            type: 'required',
            api_token: 'required',
            created_by: 'required',
            expired_date: 'required'
        }
    
        const validation = await validate(request.all(), rules)

        created_by = auth.current.user.username

        if (validation.fails()) {
            return response.send({ message: validation.messages(), success:false})
        } else {
            await Member.create({nama, email,IMEI,IMSI,type,api_token,created_by,expired_date})
            return response.send({ message: 'Member has been created.', success:true})
        }

    }

    async postEditMember({request, response, auth, params}) {

        const id = params.id
        const { nama, email,IMEI,IMSI,type,api_token,created_by,expired_date } = request.only(['nama','email','IMEI','IMSI','type','api_token','created_by','expired_date'])
        
        const rules = {
            nama: 'required',
            email: 'required|email',
            IMEI: 'required',
            IMSI: 'required',
            type: 'required',
            api_token: 'required',
            created_by: 'required',
            expired_date: 'required'
        }

        const validation = await validate(request.all(), rules)

        if (validation.fails()) {
            return response.send({ message: validation.messages(), success:false})
        } else {
            await Member.query().where('id', id).update(request.all())
            return response.send({ message: 'Member has been edited.', success:true})
        }

    }

    async postDeleteMember({request, response, auth, params}) {
        const { id } = params.id
        const member = await Member.find(id)
        await member.delete()
        return response.send({ message: 'Member has been deleted.', success:true})
    }

    async postCheckMember({request, response, auth}) {
        const { IMEI, IMSI } = request.only(['nama','email','IMEI','IMSI','type','api_token','created_by','expired_date'])
        
        const rules = {
            IMEI: 'required',
            IMSI: 'required'
        }

        const validation = await validate(request.all(), rules)

        if (validation.fails()) {
            return response.send({ message: validation.messages(), success:false})
        } else {
            await Member.findByOrFail(['IMEI', IMEI,'IMSI', IMSI])
            //await Member.query().where('id', id).update(request.all())
            return response.send({ message: 'Member has been edited.', success:true})
        }
    }

}

module.exports = MemberController
