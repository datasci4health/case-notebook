(function() { PlayerManager.instance().presentKnot(`<div class="panel-left-pict">
   <div class="panel-left-pict-image">
      <img  src="images/entrance.jpg">
   </div>

   <div class="panel-left-pict-text">
      <h1>Sign In</h1>
      <div id="request-id">
        <p>User id (e-mail): <input type='text' id="idInput"></input></p>
        <div class="central-buttons">
           <dcc-trigger action="control/signin" label="Sign In"></dcc-trigger>
        </div>
      </div>

      <div id="signed-user" style="display:none">
        <p id="user-name" >Welcome </p>
        <div class="central-buttons">
           <dcc-trigger link="<<" label="Proceed"></dcc-trigger>
        </div>
      </div>

      <div id="invalid-id" style="display:none">
        <p class="alert-message">Invalid user id (e-mail). Please, register if you are a new user.</p>
        <div class="central-buttons">
           <dcc-trigger link="register" label="Register"></dcc-trigger>
        </div>
      </div>
   </div>
</div>`) })();