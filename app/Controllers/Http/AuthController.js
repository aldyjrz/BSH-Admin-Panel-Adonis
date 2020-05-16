'use strict'

class AuthController {

    async postLogin({ request, response, auth }) {
       const { email, password } = request.all()
       return await auth.authenticator('jwt').withRefreshToken().attempt(email, password)
    }
    
    async postRefreshTokenJwt({ request, response, auth }) {
        try{
            const refreshToken = request.input('refresh_token')
            return await auth.newRefreshToken().generateForRefreshToken(refreshToken)
        }catch{
            return response.send({ message: 'Failed: Invalid Refresh Token.', success:false})
        }
    }

    async postLogout({ auth, response }) {
        try{
            const apiToken = auth.getAuthHeader()
            await auth.authenticator('jwt').revokeTokens([apiToken])
            return response.send({ message: 'Logout successfully!', success:true})
        }catch{
            return response.send({ message: 'Failed: Invalid Refresh Token.', success:false})
        }
    }
}

module.exports = AuthController
