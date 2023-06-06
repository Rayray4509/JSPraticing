     let eattingCounter = { 
        score:0,
        collision:false,
        collisions:[],
        xx:player.x-food.x,
        yy:player.y-food.y,
        length:Math.sqrt(Math.pow(xx,2)+Math.pow(yy,2)), //計算距離
        elW:false,
        elC:false,
        elFood:false,
        foodState:0,
        init(foods,state){
          this.elFood = foods;
          this.foodState = state;
        },

        eatFood(){               
          if(this.length < player.width && this.foodState != true ){//限制條件
            this.elW = document.querySelector(".world");
            this.foodState = true   
            elW.removeChild(elFood);//移除顯示
            score++;   
            } 
                    this.collisions.push(this.foodState);
                },
        creatCounter(){
            this.elC = document.createElement("div");
            this.elC.setAttribute("class", "star");                  
            this.elW.appendChild(this.elC);
            elC.innerText =`score:${score}`;//更新分數
                },
            }
            //需先執行init(foods,state)並且塞入星星HTML握持物件與星星狀態
            //需要先執行 creatCounter()
            //執行eatFood()前需要將握有htmltag加入陣列