 const cart = document.querySelectorAll('.top-sellers .btn');
 const topPicks = [
     {
         type : 'classicPizza',
         price : 13.95,
         inCart : 0
     },
     {
         type : 'pestoPizza',
         price : 17.95,
         inCart: 0
     },
     {
         type : 'margheritaPizza',
         price : 15.95,
         inCart: 0
     }
 ];

      for(let i=0 ; i<cart.length;i++)
        {
           cart[i].addEventListener('click',() => {
                cartItems();
           })
        }

      function onLoadCartNum()
      {
          let pizzaNums=localStorage.getItem('cartItems');

          if( pizzaNums )
          {
              document.querySelector('.total-items-badge').textContent = pizzaNums;
          }
      }

      function cartItems(){
          let pizzaNums = localStorage.getItem('cartItems');

          pizzaNums = parseInt(pizzaNums);

          if ( pizzaNums )
          {
              localStorage.setItem('cartItems' , pizzaNums+1);
               document.querySelector('.total-items-badge').textContent=pizzaNums+1;
          }
          else
          {
              localStorage.setItem('cartItems' , 1);
              document.querySelector('.total-items-badge').textContent=1;
          }

      }
      onLoadCartNum();

