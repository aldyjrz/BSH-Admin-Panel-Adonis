'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')


Route.group(()=>{
    Route.post('users/login', 'AuthController.postLogin')
    Route.post('users/refresh-token', 'AuthController.postRefreshTokenJwt').middleware(['auth:jwt'])
    Route.get('users/logout', 'AuthController.postLogout').middleware(['auth:jwt'])

    Route.post('member/create', 'MemberController.postMember').middleware(['auth:jwt'])
    Route.post('member/edit/:id', 'MemberController.postEditMember').middleware(['auth:jwt'])
    Route.post('member/delete/:id', 'MemberController.postDeleteMember').middleware(['auth:jwt'])

    Route.post('member/check', 'MemberController.postCheckMember').middleware(['auth:jwt'])

}).prefix('api')


