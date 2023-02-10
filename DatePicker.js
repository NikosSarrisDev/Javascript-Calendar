"use strict"

function DatePicker (id) {

    this.id = id;

    this.date = new Date();

    const datepicker = document.getElementById(this.id);

    let currYear = this.date.getFullYear(),
    currMonth = this.date.getMonth();
    
    // let nextMonth = this.date.setMonth(date.getMonth() - 1),
    // prevMonth = this.date.setMonth(date.getMonth() + 1);

    // datepicker.querySelector("#prev").addEventListener("click" , () => {
    //   this.render(this.date.setMonth(date.getMonth() - 1));
    // })
  
    // datepicker.querySelector("#next").addEventListener("click" , () => {
  
    //   this.render(this.date.setMonth(date.getMonth() + 1));
  
    // })

    const prevNextIcon = document.querySelectorAll(".icons span");

    prevNextIcon.forEach(icon => { // getting prev and next icons
      icon.addEventListener("click", () => { // adding click event on both icons
          // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
          currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
          if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
              // creating a new date of current year & month and pass it as date value
              this.date = new Date(currYear, currMonth);
              currYear = this.date.getFullYear(); // updating current year with new date year
              currMonth = this.date.getMonth(); // updating current month with new date month
          } else {
              this.date = new Date(); // pass the current date as date value
          }
          this.render(this.date.setMonth(currMonth)) // calling render function
      });
      });
  
    datepicker.querySelector(".days").addEventListener("click" , (e) => {
      if(e.target && e.target.matches("li")){
        this.render(this.date.setDate(e.target.innerHTML));
      }
    });

}



DatePicker.prototype.render = function(dt) {
  
  this.date = new Date(dt);

  let currYear = this.date.getFullYear(),
  currMonth = this.date.getMonth();

  const datepicker = document.getElementById(this.id);

  const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
  
  const today = datepicker.querySelector(".current-date");
  const days_Tag = datepicker.querySelector(".days");
  
  // let isToday = new Date(dt).getDate();

  let firstDayofMonth = new Date(this.date.getFullYear(),this.date.getMonth(),1).getDay()

  let lastDayofMonth = new Date(this.date.getFullYear(),this.date.getMonth() + 1 ,0).getDate();

  let lastDayofLastMonth = new Date(this.date.getFullYear(),this.date.getMonth(),0).getDate();

  let lastday = new Date(this.date.getFullYear(), this.date.getMonth(), lastDayofMonth).getDate();

  //Οι μέρες 
  let dayTag = "";

  for (let i = firstDayofMonth ;i > 0 ;i--){

    dayTag += `<li "class="inactive">${lastDayofLastMonth - i + 1}</li>`;

  }

  for (let i = 1 ; i <= lastDayofMonth ; i++){
    // if(i === isToday){
    //   dayTag += `<li class="inactive">${i}</li>`
    // }else{
    //   dayTag += `<li>${i}</li>`;
    // }

    let isToday = i === this.date.getDate()  ? "active" : "";
        dayTag += `<li class="${isToday}">${i}</li>`;

  }

  for (let i = lastday ; i < 6; i++){
    dayTag += `<li class="inactive">${i - lastday + 1}</li>`
  }

  today.innerText = `${months[currMonth]} ${currYear}`; 
  //`${months[this.currMonth]} ${this.currYear}`;
  days_Tag.innerHTML = dayTag;


};

