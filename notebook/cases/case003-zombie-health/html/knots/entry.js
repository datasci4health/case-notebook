(function() { PlayerManager.instance().presentKnot(` <!-- Panel North -->
 <!-- =========== -->
 <div class="panel_north">
   <!-- <div class="home_item"><a href="index.html">Zombie Health</a></div> -->
   
  <div class="main_menu"> &nbsp;&nbsp;&nbsp; <a href="report.html" target="_blank" onclick="exportScore()">relatório</a> <br>
     <hr> </div>
 </div>
 <!-- Panel Center -->
 <!-- ============ -->
 <div class="panel_center">
   <div class="panel_inner_center">

      <div class="panel_presentation">
        <div class="panel_case">
          <div class="case_title">Zombie Health</div>
      
          <div class="case_text">


               <div class="panel_image">
                  <img  src="images/presentation.png">
               </div>
            
               <div class="panel-left-pict-text">
                  <h1>Você é um Médico Girafa (girafas não viram zumbis).</h1>


                     <div id="registration-form">
                       <p>Identificação: <input type="text" id="idInput"></input></p>
                       <p>Nome fantasia: <input type="text" id="nameInput"></input></p>
                       <p>Idade: <input type="text" id="ageInput"></input></p>
                       <div class="central-buttons">
                          <dcc-trigger action="control/register" label="Registrar"></dcc-trigger>
                       </div>
                     </div>
               
                     <div id="signed-user"  style="display:none">
                       <div class="central-buttons">
                          <dcc-trigger action="navigate/knot/start" label="Entrar"></dcc-trigger>
                       </div>
                     </div>
               
                     <div id="invalid-id" style="display:none">
                       <p class="alert-message">Este nome fantasia já existe.</p>
                     </div>
               
                     <div id="answer-all" style="display:none">
                       <p class="alert-message">Por favor, responda todas as questões.</p>
                     </div>
            

               </div>
              

          </div>
          
        </div>
      </div>

   </div>
 </div>`) })();