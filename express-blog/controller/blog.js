const {exec} = require('../db/mysql')

//获取博客列表
const getList = (author, keyword) => {

    let sql = `select * from blogs where 1=1 `

    if (author) {
        sql += `and author = '${author}' `
    }

    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }

    sql += `order by createtime desc;`

    return exec(sql)

    // return [
    //     {
    //         id: 1,
    //         title: '标题1',
    //         content: '内容1',
    //         createTime: 1620552356759,
    //         author: 'zs'
    //     },
    //     {
    //         id: 2,
    //         title: '标题2',
    //         content: '内容2',
    //         createTime: 1620552356760,
    //         author: 'ls'
    //     }
    // ]
}

//根据id获取博客详情
const getDetail = (id) => {
    const sql = `select * from blogs where id='${id}'`
    return exec(sql).then(rows => {
        return rows[0]
    })
    // return {
    //     id: 1,
    //     title: '标题1',
    //     content: '内容1',
    //     createTime: 1620552356759,
    //     author: 'zs'
    // }
}


const newBlog = (blogData = {}) => {
    const title = blogData.title
    const content = blogData.content
    const author = blogData.author
    const createtime = Date.now()

    const sql = `insert into blogs (title,content,createtime,author) 
    values('${title}','${content}',${createtime},'${author}')`

    return exec(sql).then(insertData => {
        console.log('new blog...', insertData)
        return {
            id: insertData.insertId
        }
    })
    // return {
    //     "id": 4
    // }
}


//更新博客
const updateBlog = (id, blogData = {}) => {
    const title = blogData.title
    const content = blogData.content

    const sql = `
        update blogs set title='${title}', content='${content}' where id=${id}
    `
    return exec(sql).then(updateData => {
        console.log('updateBlog...', updateData)
        if (updateData.affectedRows > 0) {
            return true
        }
        return false
    })
    // console.log('updateBlog blogData...', id, blogData)
    // return true
}

//删除博客
const deleteBlog = (id, author) => {
    const sql = `delete from blogs where id=${id} and author = '${author}'`
    return exec(sql).then(rows => {
        return rows
    })
}

//查询字段作为变量
// const getPsData = (tableName, columnItem, date) => {
//     let querySql = 'select ' + `${columnItem},` + ' time from`' + `${tableName}` + '` where 1=1 '
//     const interval = getDateInterval(date)
//     if (interval.startTime !== "" && interval.endTime !== "") {
//         querySql += `and time BETWEEN ${interval.startTime} AND ${interval.endTime} `
//     }
//     console.log('sql---', querySql)
//     return exec(querySql)
// }



//查询某个字段最大值
const getMaxData = (column) => {
    const sql = `select max(${column}) from blogs where 1=1 `
    return exec(sql).then(deleteData => {
        console.log('deleteBlog...', deleteData)
        if (deleteData.affectedRows > 0) {
            return true
        }
        return false
    })
}


module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}