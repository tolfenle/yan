/*
 * @Author: fj
 * @LastEditors: fj
 * @description:
 * @updateInfo: 本次更新内容：
 * @Date: 2024-01-09 16:03:08
 * @LastEditTime: 2024-01-09 16:10:50
 */
export const useCarousel = (param = {}) => {

  return {
    loop: true,
    autoplay:true,
    spaceBetween: 20,
    direction: 'vertical',
    effect: 'slide',
    slidesPerView: 1,
    draggable:true,
    interval:2000,
    ...param,
  }
}
