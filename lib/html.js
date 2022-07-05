const repair = i => {
  return i.toString().padStart(2, '0')
}
const timeStr = _ => {
  const date = new Date()
  const year = date.getFullYear()
  const month = repair(date.getMonth() + 1)
  const day = repair(date.getDate())
  const hour = repair(date.getHours())
  const minute = repair(date.getMinutes())
  const second = repair(date.getSeconds())

  //当前时间 
  return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}
const html = (userinfo, res) => {
  const time = timeStr()
  const tpl = `
        <style>
      .juejin {
        border-radius: 10px;
        overflow: hidden;
        width: 300px;
        background-color: #f7f7f8;
      }
      .juejin .banner {
        width: 300px;
        height: 300px;
        position: relative;
      }
      .juejin .banner img {
        width: 100%;
        height: 100%;
      }
      .juejin .banner-img{
          filter: blur(11px);
        -webkit-filter: blur(11px);
      }
      .juejin .banner img.avatar {
        width: 50px;
        height: 50px;
        left: 50%;
        bottom: 0;
        transform: translate(-50%, 50%);
        position: absolute;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: 0 2px 0 #cad4d4, 0 3px 10px rgb(243 49 128 / 15%),
          0 0px 10px rgb(243 49 128 / 15%), 0 0px 4px rgb(0 0 0 / 35%),
          0 5px 20px rgb(243 49 128 / 25%), 0 15px 40px rgba(69, 206, 174, 0.75),
          inset 0 0 15px rgb(255 255 255 / 5%);
      }
      .juejin .items {
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-top: 50px;
        font-size: 14px;
        color: #b3b1b2;
      }
      .juejin .items .item {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
      }
      .juejin  p {
        line-height: 1.2 !important;
        margin: 5px 0 !important;
        padding: 0 !important;
      }

      .juejin .items .item p:last-child {
        font-weight: bold;
        font-size: 16px;
        color: #5e5e5e;
      }
      .juejin .foot {
        font-size: 12px;
        text-align: center;
        color: #999;
        padding: 10px;
        margin-top: 10px;
      }
      .juejin .info {
        width: 100%;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 30px;
        text-align: center;
        color: #fff;
        font-size: 14px;
      }
      .juejin .info .username {
        font-weight: bold;
        font-size: 15px;
      }
    </style>
    <div class="juejin">
      <div class="banner">
        <img
        class="banner-img"
          src="${userinfo.avatar_large}"
          alt=""
        />
        <div class="info">
          <p class="username">@${userinfo.user_name}</p>
          <p class="phone">${userinfo.phone}</p>
        </div>
        <img
          src="${userinfo.avatar_large}"
          class="avatar"
          alt=""
        />
      </div>
      <div class="items">
        <div class="item">
          <p>矿石</p>
          <p>${res.point_total || 0}</p>
        </div>
        <div class="item">
          <p>幸运值</p>
          <p>${res.dip_total || 0}</p>
        </div>
        <div class="item">
          <p>奖品</p>
          <p>${res.lottery_name || '-'}</p>
        </div>
      </div>
      <div class="foot">
        <p>${time}</p>
        <p style="margin-top:10px !important;">签到成功！</p>
      </div>
    </div>
    `
  return tpl
}

module.exports = html