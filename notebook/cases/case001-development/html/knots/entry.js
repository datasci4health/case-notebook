(function() { PlayerManager.instance().presentKnot(`<div class="panel-left-pict">
   <div class="panel-left-pict-image">
      <img  src="images/entrance.jpg">
   </div>

   <div class="panel-left-pict-text">
      <h1>Welcome to Phil Muchbetter</h1>

      <div id="signin-register" class="central-buttons" style="display:none">
         <dcc-trigger link="signin.html" label="Sign In"></dcc-trigger>
         <dcc-trigger link="register.html" label="Register"></dcc-trigger>
      </div>
      
      <div id="signed-user"  style="display:none">
         <p id="user-id" >User id (e-mail): </p>
         <p id="user-name" >Name: </p>
         <div id="signin-register" class="central-buttons">
            <dcc-trigger action="knot/<</navigate" label="Proceed"></dcc-trigger>
            <dcc-trigger link="signin.html" label="Change User"></dcc-trigger>
         </div>
      </div>
   </div>
  
</div>
`) })();