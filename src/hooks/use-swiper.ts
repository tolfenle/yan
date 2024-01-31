/*
 * @Author       : wfl
 * @LastEditors  : wfl
 * @description  :
 * @updateInfo   :
 * @Date         : 2023-11-30 15:52:55
 * @LastEditTime : 2023-11-30 15:55:20
 */
export const useSwiperConfig = (param = {}) => {

  return {
    row: 4,
    col: 1,
    loop: true,
    spaceBetween: 8,
    autoplay: {
      delay: 3000,
      pauseOnMouseEnter: true,
    },
    direction: 'vertical',
    effect: 'slide',
    slidesPerGroup: 1,
    ...param,
  }
}
