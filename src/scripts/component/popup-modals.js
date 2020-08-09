import $ from "jquery";

class PopupModals extends HTMLElement {
   connectedCallback(){
       $(this).addClass('modal fade');
       $(this).attr("id", "popModals");
   }
   
   renderError(message) {
       this.innerHTML = `
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h3 class="modal-title h3 bold " id="mySmallModalLabel">Warning!</h3>
            </div>
            <div class="modal-body">
              <h5>${message}</h5>
            </div>
          </div>
        </div>`;

    $('#popModals').modal('show');

    setTimeout(function() {
      $('#popModals').modal('hide')
    }, 1200);

   }
}
 
customElements.define("popup-modals", PopupModals);