
/**
 * 函数将 Tue Jun 22 2021 22:38:04 GMT+0800 (中国标准时间) 转化成 2021-11-22
 * @param {*} obj 
 * @param {*} opt 年月日
 * @returns 
 */
export const formatDate = (obj,opt = {y:true,m:true,d:true}) =>{
    const t = new Date(obj);
    const y = t.getFullYear();
    let m = '0' + (t.getMonth()+1);
    m = m.substring(m.length - 2,m.length);
    let d = '0' + t.getDate();
    d = d.substring(d.length-2,d.length);
    
    const res = [];
    if (opt.y) { res.push(y); }
    if (opt.m) { res.push(m); }
    if (opt.d) { res.push(d); }

    return res.join('-');
}

//防抖函数处理
export function debounce(func,delay){
    let timer;

    return function(...args){
        if(timer){
            clearInterval(timer)
        }
            timer =setInterval(()=>{
                func.apply(this,args);
            },delay);
    };
}

// 数组筛选id
export function findIndex (allList, list) {
  if(typeDetection(allList,'Array')){
    return allList.findIndex((item) => {
      return item.id === list.id;
    });
  }
  return -2
   
  }


  export function formatPlayCount (count) {
    if (!count) {
      return 0;
    }
    if (count < 1e5) {
      return Math.floor(count);
    } else {
      return Math.floor(count / 10000) + '万';
    }
  }


  // export function imageRatio (width = 0, height = width) {
  //   return `?param=${window.devicePixelRatio * width}x${window.devicePixelRatio * height}`;
  // }
  export function imageRatio (width = 0, height = width) {
    return `?param=${width}x${height}`;
  }

/**
 * 
 * @param {*} obj 
 * @param {*} type  首字母大写
 * @returns 
 */
  export function typeDetection(obj,type){
    return Object.prototype.toString.call(obj) === `[Object ${type}]`
  }