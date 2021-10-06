console.log(document.querySelectorAll('.gallery'));

import $ from 'jquery';
import 'slick-carousel';

class SlickSlider {

   render() {
      $('.gallery').slick({
         infinite: true,
         slidesToShow: 3,
         slidesToScroll: 1,
         responsive: [
            {
               breakpoint: 1350,
               settings: {
                  slidesToShow: 2,
               },
            },
            {
               breakpoint: 850,
               settings: {
                  slidesToShow: 1,
               },
            },
         ]
      })
   }
}

export default new SlickSlider()