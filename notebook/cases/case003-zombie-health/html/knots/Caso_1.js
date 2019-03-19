(function() { PlayerManager.instance().presentKnot(`<div class="panel_presentation">
  <div class="panel_case">
    <div class="case_text">
     <!-- Panel North -->
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
          <p><img src="images/1.png" alt="Rot_Donnadd" />
Rot Donnadd se apresentou na clínica para ser atendido. O que você deseja fazer?
<dcc-trigger id='dcc3' type='++' link='Lingua_amarela' label='Examinar língua' ></dcc-trigger>
<dcc-trigger id='dcc5' type='++' link='Paralisia' label='Ver movimentos' ></dcc-trigger>
<dcc-trigger id='dcc7' type='++' link='Dedos_ok' label='Analisar as mãos' ></dcc-trigger>
<dcc-trigger id='dcc9' type='++' link='Membros_ok' label='Examinar membros' ></dcc-trigger>
<dcc-trigger id='dcc11' type='++' link='Sem_dor' label='Sente dor?' ></dcc-trigger>
<dcc-trigger id='dcc13' type='++' link='Sem_raiva' label='Ver humor' ></dcc-trigger>
<dcc-trigger id='dcc15' type='++' link='Tratamento_1' label='Aplicar tratamento' ></dcc-trigger></p>
          </div>
          
        </div>
      </div>
   </div>
 </div>
    </div>
    
  </div>
</div>
`) })();