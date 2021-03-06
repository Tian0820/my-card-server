const router = require('koa-router')()
const fs = require('fs')
const database = require('../lib/database')

router.prefix('/api/user')

router.get('/get', async function (ctx) {
    let info = await database.getByName(ctx.query.name)
    ctx.body = info[0]
});

router.get('/getAll', async function (ctx) {
    let info = await database.getAll()
    ctx.body = info
});

router.post('/delete', async function (ctx) {
    let name = ctx.request.body.name
    let friendToDelete = await database.getByName(name)
    let info = await database.deleteById(friendToDelete[0].id)
    ctx.body = {
        result: 'success',
        message: '删除成功！'
    }
})

router.post('/update', async function (ctx) {
    let name = ctx.request.body.name
    let friendToUpdate = await database.getByName(name)

    let info = await database.updateFriend(ctx.request.body.name, ctx.request.body.sex, ctx.request.body.tags, friendToUpdate[0].id)
    ctx.body = {
        result: 'success',
        message: '更新成功！'
    }
})

router.post('/add', async function (ctx) {

    let oldFriend = await database.getByName(ctx.request.body.name)

    if (oldFriend.length !== 0) {
        ctx.body = {
            result: 'error',
            message: '好友名称已存在！'
        }
    } else {
        let info = await database.addNewFriend(ctx.request.body.name, ctx.request.body.sex, ctx.request.body.tags)
        ctx.body = {
            result: 'success',
            message: '新增成功！'
        }
    }

})

router.get('/bar', function (ctx, next) {
    ctx.body = 'this is a users/bar response'
})

module.exports = router
