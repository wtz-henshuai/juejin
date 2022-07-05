const config = require('./config')
const { getCookie } = require('./lib/cookie')
const JuejinHttp = require('./lib/api')
const email = require('./lib/email')
const html = require('./lib/html')
const signIn = async () => {
    const cookie = await getCookie()
    if (!cookie) {
        console.log(`获取cookie失败[1]`)
        await email.send({
            to: config.user.email,
            text: `用户【${config.user.mobile}】签到失败  [获取cookie失败]`,
            subject: `【掘金】签到失败！`
        })
        return
    }
    try {
        const API = new JuejinHttp(cookie)
        const isCheckIn = await API.queryTodayStatus()
        const baseResult = {}
        let lotteryName = ''
        if (isCheckIn) {
            console.log(`今日已签到`)
            return
        } else {
            await API.handleCheckIn()
            console.log(`签到成功`)
        }
        const userInfo = await API.queryUserProfile()
        const { free_count } = await API.queryLotteryConfig()
        if (!free_count) {
            console.log(`今日已免费抽奖`)
        } else {
            const { lotteries } = await API.queryLuckyList()
            const luckyId = lotteries && lotteries[0] ? lotteries[0]['history_id'] : 0
            const { has_dip, dip_action, total_value } = await API.handleDipLucky(luckyId)
            if (has_dip) {
                console.log(`今日已沾过喜气`)
            }
            if (dip_action === 1) {
                console.log(`沾喜气成功`)
            }
            console.log(`当前喜气值：${total_value}`)
            baseResult['dip_total'] = total_value
            const { lottery_name } = await API.handleLotteryDraw()
            lotteryName = lottery_name
            baseResult['lottery_name'] = lottery_name
            console.log(`抽奖成功：${lotteryName}`)
        }
        const totalPoint = await API.queryTotalPoint()
        console.log(`当前矿石：${totalPoint}`)
        baseResult['point_total'] = totalPoint
        console.log(`签到成功`)
        const lotteryText = lotteryName ? `，获得[${lotteryName}]` : ''
        await email.send({
            to: config.user.email,
            text: `用户【${config.user.mobile}】签到成功 ${lotteryText}，当前矿石：${totalPoint}`,
            subject: `【掘金】签到提醒`,
            html: html(userInfo, baseResult)
        })

    } catch (err) {
        console.log(`签到失败`)
        console.log(err)
        await email.send({
            to: config.user.email,
            text: `用户【${config.user.mobile}】签到失败  [${err.message || 'error'}]`,
            subject: `【掘金】签到失败！`
        })
    }
}

signIn()