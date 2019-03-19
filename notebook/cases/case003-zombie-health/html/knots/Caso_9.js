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
      
          <div class="case_text">
          <p><img src="images/9.png" alt="Fnebnooss" />
Fnebnooss se apresentou na clínica para ser atendido. O que você deseja fazer?
<dcc-trigger id='dcc3' type='++' link='Paralisia_ok' label='Ver movimentos' ></dcc-trigger>
<dcc-trigger id='dcc5' type='++' link='Lingua_ok' label='Examinar língua' ></dcc-trigger>
<dcc-trigger id='dcc7' type='++' link='Dedos_ok' label='Analisar as mãos' ></dcc-trigger>
<dcc-trigger id='dcc9' type='++' link='Membros_problema' label='Examinar membros' ></dcc-trigger>
<dcc-trigger id='dcc11' type='++' link='Dor_problema' label='Sente dor?' ></dcc-trigger>
<dcc-trigger id='dcc13' type='++' link='Raiva_ok' label='Ver humor' ></dcc-trigger>
<dcc-trigger id='dcc15' type='++' link='Tratamento_9' label='Aplicar tratamento' ></dcc-trigger></p>
          </div>
          
        </div>
      </div>
   </div>
 </div>`) })();