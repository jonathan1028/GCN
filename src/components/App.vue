<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
// @import '../../node_modules/bootstrap/scss/bootstrap.scss';
// @import "../assets/scss/style.scss";
// @import "../assets/scss/main.scss";

@import "../assets/global.scss";
/* ------------------------ Application Padding, Margin, & Background --------------- */
/* Removes default margin and padding for all html elements */
* { margin: 0; padding: 0; }
html {
  background-color: var(--background-color4);
}
/* ------------------------- Application Variables ------------------------- */
:root {
  --page-height: 100vh;
  --page-width: 100vw;

  --font-color1: #47535e;
  --font-color3: #f7ca44;
  --font-color4: lightgray;

  --background-color1: #fc0;
  --background-color2: white;
  --background-color3: #555;
  --background-color4: #e7e9ea;

  --theme-color1: #f7ca44;
  --theme-color2: #fff2c7;
  --theme-color3: #47535d;
  --theme-color4: lightgray;
  --theme-color5: #e7e9ea;
  --color2: rgb(42, 177, 182);
  --link-color: rgb(48,62,240);
  --shadow3: 1.5vh -1vh 1vh rgba(0, 7, 2, 0.3);
  --shadow1: 0 .5vh 2vh rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  --shadow2: 1.5vh -1vh 1vh rgba(0, 0, 0, 0.3);
  --text-color1: #47535d;
}
/* ---------------------------- Application Font Styling -------------------------- */
html {
  font-family: 'Open Sans', sans-serif;
}
h1 {
  font-size: 5vh;
}
h2 {
  font-size: 3vh;
}
h3 {
  font-size: 2vh;
}
h4 {
  font-size: 1.8vh;
}
p {
  font-size: 2.5vh;
}
a {
  font-size: 2vh;
  text-decoration: none;
}
/* ---------------------------------  Application Layout ------------------------ */
// .app {
//   height: 100vh; /* Extends page to bottom of view port even if page content is not long enough */
//   display: grid;
//   grid: 15vh auto 10vh / 1fr;
// }
// .app-header {
//   grid-column:  1 / -1; /* -1 causes header to expand to the end of grid regardless of number of columns*/
//   position: sticky; /* For fixed header */
//   top: 0; /* For fixed header */
//   border: .15vh solid #BFBFBF;
//   background-color: white;
//   // @include shadow2;
//   @include inset-shadow4;
// }
// .main-content {
//   grid-column-start:  1;
//   grid-column-end:  -1;
// }
// .footer {
//   grid-column:  1 / -1; /* -1 causes header to expand to the end of grid regardless of number of columns*/
//   background-color: rgb(52,62,71);
// }
/* ---------------------------------------- Application Component Styling ---------------------------- */
._page {
  height: calc(.98 * -var(--page-height));
  width: calc(.90 * var(--page-width));
  background-color: white;
  margin: auto;
  padding: 1vw;
  -webkit-box-shadow: 0 .25vh 1vh #777;
  -moz-box-shadow: 0 .25vh 1vh #777;
  box-shadow: 0 .5vh 2vh #777;
}
._box {
  background-color: white;
  // -webkit-box-shadow: 0 .25vh 1vh #777;
  // -moz-box-shadow: 0 .25vh 1vh #777;
  // box-shadow: 0 .5vh 2vh #777;
  // border-radius: 3vh;
  border: .1vh solid lightgray;
}
._modal {
  margin-top: 5vh;
  border: .5vh solid rgb(70, 70, 70);
  -webkit-box-shadow: 0 .25vh 1vh #777;
  -moz-box-shadow: 0 .25vh 1vh #777;
  box-shadow: 2vh 5vh 2vh #777;
}
._card {
}
.small_logo {
    background:url("/static/images/b1/small_logo_without_text.png") no-repeat;
    background-size:contain;
}
/* ---------------------------------------- Application Form Styling ---------------------------- */
// label {
//   width: 30%;
//   display: block;
//   text-align: right;
//   padding-right: 5%;
//   /* border: .5px solid lightgray; */
//   display: flex;
//   align-items: center;
//   justify-content: flex-end;
// }
// .field {
//   width: 50%;
//   /* border: .5px solid lightgray; */
//   margin-bottom: 1%;
//   display: flex;
//   align-items: center;
//   justify-content: flex-start;
// }
// input{
//   height: 3vh;
//   font-size: 2vh;
//   border: .25vh solid lightgray;
// }
// input:hover{
//   border-bottom: .25vh solid var(--color1);
// }
/* ----------------------------------------- Application List Styling -------------------------- */
li {
  list-style-type: none;
}
/* ------------------------------------ Application Button Styling ----------------------------- */
._button1 {
  width: 100%;
  height: 6vh;
  color: var(--font-color1);
  font-size: 2vh;
  background-color: var(--background-color1);
  border-radius: 3vh;
  text-align: center;
  white-space: nowrap;
  border: none;
}
._button2 {
  width: 100%;
  background-color: #fff2c7;
  border-radius: 3vh;
  border: .1vh solid #47535d;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
}
._button3 {
  width: 100%;
  height: 6vh;
  font-size: 2vh;
  background-color: var(--background-color3);
  color: white;
  border-radius: 3vh;
  // text-align: center;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  // display: flex;
  // align-self: flex-start;
  // justify-self: center;
}

._button4{
  font-size: 2vh;
  padding: 1vh;
  height: auto;
  width: auto;
  -webkit-box-shadow:0 0 0 rgba(0, 0, 0, 0.3), 0 0 0 rgba(0, 0, 0, 0.1) inset;
  -moz-box-shadow:0 0 0 rgba(0, 0, 0, 0.3), 0 0 0 rgba(0, 0, 0, 0.1) inset;
  box-shadow:0 0 0 rgba(0, 0, 0, 0.3), 0 0 0 rgba(0, 0, 0, 0.1) inset;
}
._button:hover{
  cursor: pointer;
  /* background-color: rgb(250, 250, 250); */
  // -webkit-box-shadow:0 .3vh 1vh rgba(0, 0, 0, 0.3), 0 0 2vh rgba(0, 0, 0, 0.1) inset;
  // -moz-box-shadow:0 .3vh 1vh rgba(0, 0, 0, 0.3), 0 0 2vh rgba(0, 0, 0, 0.1) inset;
  // box-shadow:0 .3vh 1vh rgba(0, 0, 0, 0.2), 0 0 2vh rgba(0, 0, 0, 0.1) inset;
}

._box-shadow1 {
  -webkit-box-shadow: 0 .25vh 1vh #777;
  -moz-box-shadow: 0 .25vh 1vh #777;
  box-shadow: 0 .25vh 1vh #777;
}
._box-shadow2 {
  -webkit-box-shadow: 0 .25vh 1vh #777;
  -moz-box-shadow: 0 .25vh 1vh #777;
  box-shadow: 0 .25vh 1vh #777;
}
// button{
//   font-size: 2vh;
//   padding: 1vh;
//   height: auto;
//   width: auto;
//   -webkit-box-shadow:0 .3vh 1vh rgba(0, 0, 0, 0.3), 0 0 2vh rgba(0, 0, 0, 0.1) inset;
//   -moz-box-shadow:0 .3vh 1vh rgba(0, 0, 0, 0.3), 0 0 2vh rgba(0, 0, 0, 0.1) inset;
//   box-shadow:0 .3vh 1vh rgba(0, 0, 0, 0.3), 0 0 4vh rgba(0, 0, 0, 0.1) inset;
// }
// button:hover{
//   cursor: pointer;
//   /* background-color: rgb(250, 250, 250); */
//   -webkit-box-shadow:0 .3vh 1vh rgba(0, 0, 0, 0.3), 0 0 2vh rgba(0, 0, 0, 0.1) inset;
//   -moz-box-shadow:0 .3vh 1vh rgba(0, 0, 0, 0.3), 0 0 2vh rgba(0, 0, 0, 0.1) inset;
//   box-shadow:0 .3vh 1vh rgba(0, 0, 0, 0.2), 0 0 2vh rgba(0, 0, 0, 0.1) inset;
// }
// .button2 {
//     color: white;
//     background-color: var(--color3);
//     font-size: 3vh;
//     cursor: pointer;
//     border-radius: 1.5vh;
//     border: thin solid #888;
//     box-shadow: 1vh 1vh 1vh grey;
//     white-space: nowrap;
//     padding-left: 3vh;
//     padding-right: 3vh;
// }
// .button2:hover {
//     background-color: var(--color-hover2);
//     color: white;
//     border-radius: 1.5vh;
//     border: thin solid white;
//     box-shadow: 1vh 1vh 1vh grey;
//     white-space: nowrap;
// }
/* Extra Small Devices, Phones */
@media (max-width : 480px) {
}
</style>
