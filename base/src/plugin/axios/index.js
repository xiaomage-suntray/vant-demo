import axios from 'axios'
import util from '@/libs/util'
import merge from 'lodash/merge'

// 创建一个错误
function errorCreat (msg) {
    const err = new Error(msg)
    return err
    // throw err
}

// 创建一个 axios 实例
const service = axios.create({
    baseURL: process.env.VUE_APP_TEST,
    timeout: 5000 // 请求超时时间
})

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
service.adornUrl = (actionName) => {
    // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
    // return (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? '/proxyApi/' : window.SITE_CONFIG.baseUrl) + actionName
    return process.env.VUE_APP_API + actionName
}


/**
 * get请求参数处理
 * @param {*} params 参数对象
 * @param {*} openDefultParams 是否开启默认参数?
 */
service.adornParams = (params = {}, openDefultParams = true) => {
    var defaults = {
        't': new Date().getTime()
    }
    return openDefultParams ? merge(defaults, params) : params
}

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
service.adornData = (data = {}, openDefultdata = true, contentType = 'json') => {
    var defaults = {
        't': new Date().getTime()
    }
    data = openDefultdata ? merge(defaults, data) : data
    return contentType === 'json' ? JSON.stringify(data) : data
}
// 请求拦截器
service.interceptors.request.use(
    config => {
    // 在请求发送之前做一些处理
        const token = util.cookies.get('token')
        if (token && token !== 'undefined') {
            // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
            config.headers['X-Token'] = token
            config.headers['token'] = token // 请求头带上token
        }
        return config
    },
    error => {
    // 发送失败
        Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
    // dataAxios 是 axios 返回数据中的 data
        const dataAxios = response.data
        // 这个状态码是和后端约定的
        let code = dataAxios.code
        // 根据 code 进行判断
        if (code === undefined) {
            // 如果没有 code 代表这不是项目后端开发的接口 比如可能是 SuntrayAdmin 请求最新版本
            return dataAxios
        } else {
            // 有 code 代表这是一个后端接口 可以进行进一步的判断
            switch (code) {
            case 0:
                // [ 示例 ] code === 0 代表没有错误
                return dataAxios
            case 401:
                // [ 示例 ] 其它和后台约定的 code
                errorCreat(`[ code: 401 ] ${dataAxios.msg}: ${response.config.url}`)
                // 删除cookie
                util.cookies.remove('token')
                util.cookies.remove('uuid')
                // 跳转路由
                break
            default:
                // 不是正确的 code
                errorCreat(`${dataAxios.msg}`)
                break
            }
        }
    },
    error => {
        if (error && error.response) {
            switch (error.response.status) {
            case 400:
                error.message = '请求错误'
                break
            case 401:
                error.message = '未授权，请登录'
                break
            case 403:
                error.message = '拒绝访问'
                break
            case 404:
                error.message = `请求地址出错: ${error.response.config.url}`
                break
            case 408:
                error.message = '请求超时'
                break
            case 500:
                error.message = '服务器内部错误'
                break
            case 501:
                error.message = '服务未实现'
                break
            case 502:
                error.message = '网关错误'
                break
            case 503:
                error.message = '服务不可用'
                break
            case 504:
                error.message = '网关超时'
                break
            case 505:
                error.message = 'HTTP版本不受支持'
                break
            default:
                break
            }
        }
        return Promise.reject(error)
    }
)

export default service
