(function() { PlayerManager.instance().presentKnot(`<div class="panel_presentation">
  <div class="panel_case">
    <div class="case_text">
    <p><img src="images/doctor.png" alt="Treatment" />
Qual é o tratamento que você deseja aplicar?
<dcc-trigger id='dcc3' type='++' link='Brigas_errado' label='Tratar Bactérias' ></dcc-trigger>
<dcc-trigger id='dcc5' type='++' link='Brigas_errado' label='Tratar Vírus' ></dcc-trigger>
<dcc-trigger id='dcc7' type='++' link='Brigas_errado' label='Tratar Zulumbriga' ></dcc-trigger>
<dcc-trigger id='dcc9' type='++' link='Brigas_certo' label='Tratar Brigas' ></dcc-trigger></p>
    </div>
    
  </div>
</div>
`) })();