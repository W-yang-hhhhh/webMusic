import axios from 'axios'
import {HOST} from '../common/js/config'

//接口配置数据
const apiConfig = {
    limit:30 //推荐歌曲数量
}

//获取歌单排行榜所有音乐
export function getAllRank (){

    const url = HOST+'/toplist';
    return axios.get(url)
}
/**
 * 获取推荐歌曲
 * @param {*} updateTime  更新时间
 */
export function getRecommendList (updateTime=null){
    let url = '';
    if(updateTime){
        url = HOST +`/top/playlist/highquality?before=${updateTime}&limit=${apiConfig.limit}`
    }else{
        url = HOST + `/top/playlist/highquality?limit=${apiConfig.limit}`;
    }
    return axios.get(url)
}

// 获取歌单详情
export function getMusicListDetail (id) {
    const url = HOST + `/playlist/detail?id=${id}`;
    return axios.get(url);
  }

  // 获取音乐播放地址
export function getMusicUrl (id) {
    const url = HOST + `/song/url?id=${id}`;
    return axios.get(url);
  }

  // 获取音乐详情（歌曲没有图片的时候要用）
export function getMusicDetail (id) {
    const url = HOST + `/song/detail?ids=${id}`;
    return axios.get(url);
  }

  // 获取歌曲歌词
export function getMusicLyric (id) {
    const url = HOST + `/lyric?id=${id}`;
    return axios.get(url);
  }


  // 获取歌手单曲
 export function getSingerInfo (id) {
    const url = HOST + `/artists?id=${id}`;
    return axios.get(url);
  }

//获取歌手专辑
  export function getSingerAlbums (id) {
    const url = HOST + `/artist/album?id=${id}`;
    return axios.get(url);
  }
 

  // 获取专辑详情
// https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%E8%8E%B7%E5%8F%96%E4%B8%93%E8%BE%91%E5%86%85%E5%AE%B9
export function getAlbumInfo (id) {
  const url = HOST + `/album?id=${id}`;
  return axios.get(url);
}

 