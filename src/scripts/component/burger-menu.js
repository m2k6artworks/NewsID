class BurgerMenu extends HTMLElement {
 
   connectedCallback(){
       this.render();
   }
 
   render() {
       this.innerHTML = `
      <div class="hamburger-menu">
        <input id="menu_toggle" type="checkbox" />
        <label class="menu_btn" for="menu_toggle">
          <span></span>
        </label>
        <div class="logo-head"> <a class="logo bold" href="#">NewsID</a> </div>
          <ul class="menu_box bold">
            <li><a href="#" class="menu_item category" id="business"><i class="fas fa-briefcase">&nbsp;&nbsp;</i> Business</a></li>
            <li><a href="#" class="menu_item category" id="entertainment"><i class="fas fa-gamepad">&nbsp;&nbsp;</i> Entertain</a></li>
            <li><a href="#" class="menu_item category" id="health"><i class="fas fa-heart">&nbsp;&nbsp;</i> Health</a></li>
            <li><a href="#" class="menu_item category" id="science"><i class="fas fa-atom">&nbsp;&nbsp;</i> Science</a></li>
            <li><a href="#" class="menu_item category" id="sports"><i class="fas fa-futbol">&nbsp;&nbsp;</i> Sports</a></li>
            <li><a href="#" class="menu_item category" id="technology"><i class="fas fa-satellite">&nbsp;&nbsp;</i> Technology</a></li>
          </ul>
        <div class="bodyblack" id="bodyblack"></div>
      </div>`;
   }
}
 
customElements.define("burger-menu", BurgerMenu);