(function() { DCCPlayerServer.playerObj ={"id":"case001-development","knots":{"Case 001":{"type":"knot","title":"Case 001","categories":["start","dialog_left"],"_source":"== Case 001 (start,dialog_left) ==\n:NURSE Agnes: Doctor, we have a man (51 years old) who entered the emergency department reporting chest pain. His vital signs are ABP: 144x92mmHG; HR: 78bpm; RR: 21rpm; Temp: 37oC; O2Sat: 98%.\n\n++ Let us go! (talk-action) -> Level 1\n\n","annotations":[],"content":[{"type":"talk","character":"NURSE Agnes","speech":"Doctor, we have a man (51 years old) who entered the emergency department reporting chest pain. His vital signs are ABP: 144x92mmHG; HR: 78bpm; RR: 21rpm; Temp: 37oC; O2Sat: 98%.","seq":2},{"type":"option","label":"Let us go!","rule":"talk-action","target":"Level 1","seq":3},{"type":"text","content":"\n","seq":4}]},"Level 1":{"type":"knot","title":"Level 1","categories":["decision"],"_source":"== Level 1 (decision) ==\n\n:PATIENT Jakob: Doctor, I am feeling chest pain since yesterday. The pain is continuous and is located just in the middle of my chest, worsening when I breathe and when I lay down on my bed. I suffer from arterial hypertension and smoke 20 cigarettes every day. My father had a “heart attack” at my age and I am very worried about it.\n\n<b>PHYSICAL EXAMINATION</b> <br> The cardiac and pulmonary auscultation are normal; chest pain does not worse with palpation of the thorax; there is no jugular stasis nor lower limb edema.\n\n++ Generate hypothesis (action-1) -> Generate hypothesis 1\n++ More information (action-2) -> More information 1\n++ Call the supervisor (action-3) -> Call the supervisor 1a\n\n","annotations":[],"content":[{"type":"text","content":"\n","seq":2},{"type":"talk","character":"PATIENT Jakob","speech":"Doctor, I am feeling chest pain since yesterday. The pain is continuous and is located just in the middle of my chest, worsening when I breathe and when I lay down on my bed. I suffer from arterial hypertension and smoke 20 cigarettes every day. My father had a “heart attack” at my age and I am very worried about it.","seq":3},{"type":"text","content":"<b>PHYSICAL EXAMINATION</b> <br> The cardiac and pulmonary auscultation are normal; chest pain does not worse with palpation of the thorax; there is no jugular stasis nor lower limb edema.\n\n","seq":4},{"type":"option","label":"Generate hypothesis","rule":"action-1","target":"Generate hypothesis 1","seq":5},{"type":"option","label":"More information","rule":"action-2","target":"More information 1","seq":6},{"type":"option","label":"Call the supervisor","rule":"action-3","target":"Call the supervisor 1a","seq":7},{"type":"text","content":"\n","seq":8}]},"Generate hypothesis 1":{"type":"knot","title":"Generate hypothesis 1","categories":["input"],"_source":"== Generate hypothesis 1 (input) ==\n:PATIENT Jakob:.\n{?1 hypothesis:mesh#pericarditis,myopericarditis,pericardial inflammation,pericardial infection,pericardial effusion;infarction,myocardial infarction,coronary syndrome,acute coronary syndrome,ischemia,myocardial ischemia,coronary insufficiency,angina,angina pectoris}\n\n++ Submit hypothesis (submit-input) -> Check hypothesis 1\n\n","annotations":[],"content":[{"type":"talk","character":"PATIENT Jakob","speech":".","seq":2},{"type":"input","variable":"hypothesis","rows":1,"vocabulary":"mesh","right":["pericarditis","myopericarditis","pericardial inflammation","pericardial infection","pericardial effusion"],"wrong":["infarction","myocardial infarction","coronary syndrome","acute coronary syndrome","ischemia","myocardial ischemia","coronary insufficiency","angina","angina pectoris"],"seq":3},{"type":"text","content":"\n\n","seq":4},{"type":"option","label":"Submit hypothesis","rule":"submit-input","target":"Check hypothesis 1","seq":5},{"type":"text","content":"\n","seq":6}]},"More information 1":{"type":"knot","title":"More information 1","categories":["information"],"_source":"== More information 1 (information) ==\n\n:PATIENT Jakob: <b>MORE INFORMATION</b> <br> The patient never felt chest pain before. He exercises regularly and has lost weight in the last three months. He takes amlodipine and losartan regularly. Two weeks ago, he had an auto-limited gastroenteritis episode. He denies recent travels and surgery .\n\n++ Generate hypothesis (action-1) -> Generate hypothesis 1\n++ Call the supervisor (action-2) -> Call the supervisor 1a\n\n","annotations":[],"content":[{"type":"text","content":"\n","seq":2},{"type":"talk","character":"PATIENT Jakob","speech":"<b>MORE INFORMATION</b> <br> The patient never felt chest pain before. He exercises regularly and has lost weight in the last three months. He takes amlodipine and losartan regularly. Two weeks ago, he had an auto-limited gastroenteritis episode. He denies recent travels and surgery .","seq":3},{"type":"option","label":"Generate hypothesis","rule":"action-1","target":"Generate hypothesis 1","seq":4},{"type":"option","label":"Call the supervisor","rule":"action-2","target":"Call the supervisor 1a","seq":5},{"type":"text","content":"\n","seq":6}]},"Call the supervisor 1a":{"type":"knot","title":"Call the supervisor 1a","categories":["detailed"],"_source":"== Call the supervisor 1a (detailed) ==\n:SUPERVISOR Harry:.\nHi! I am glad that you called me. Chest pain is an important complaint at the emergency department and we have to exclude the fatal causes: myocardial infarction (MI), acute aortic dissection (AAD), pulmonary embolism PE), hypertensive pneumothorax (HP), and Boerhaave Syndrome (BS).\n\nThe best way to find out what is happening with your patient, my young padawan, is to gather as much information as possible through history taking and physical examination. We need to search for the signs and symptoms that can guide our clinical reasoning process by changing the pre-test probabilities of each disease.\n\n++ See likelihood tables (action-1) -> Call the supervisor 1b \n\n","annotations":[],"content":[{"type":"talk","character":"SUPERVISOR Harry","speech":".","seq":2},{"type":"text","content":"Hi! I am glad that you called me. Chest pain is an important complaint at the emergency department and we have to exclude the fatal causes: myocardial infarction (MI), acute aortic dissection (AAD), pulmonary embolism PE), hypertensive pneumothorax (HP), and Boerhaave Syndrome (BS).\n\nThe best way to find out what is happening with your patient, my young padawan, is to gather as much information as possible through history taking and physical examination. We need to search for the signs and symptoms that can guide our clinical reasoning process by changing the pre-test probabilities of each disease.\n\n","seq":3},{"type":"option","label":"See likelihood tables","rule":"action-1","target":"Call the supervisor 1b","seq":4},{"type":"text","content":"\n","seq":5}]},"Call the supervisor 1b":{"type":"knot","title":"Call the supervisor 1b","categories":["detailed"],"_source":"== Call the supervisor 1b (detailed) ==\n:SUPERVISOR Harry:.\nDo you know the concept of Likelihood ratio (LR)? -> Likelihood Ratio\n\n++ Clinical History Myocardial Infarction\n++ Physical Examination Myocardial Infarction\n++ Clinical History Aortic Dissection\n++ Physical Examination Aortic Dissection\n++ Pulmonary Embolism Wells Criteria\n\n++ Continue talking (action-1) -> Call the supervisor 1c \n\n","annotations":[],"content":[{"type":"talk","character":"SUPERVISOR Harry","speech":".","seq":2},{"type":"text","content":"Do you know the concept of Likelihood ratio (LR)? ","seq":3},{"type":"divert","target":"Likelihood Ratio","seq":4},{"type":"text","content":"\n\n","seq":5},{"type":"option","label":"Clinical History Myocardial Infarction","seq":6},{"type":"option","label":"Physical Examination Myocardial Infarction","seq":7},{"type":"option","label":"Clinical History Aortic Dissection","seq":8},{"type":"option","label":"Physical Examination Aortic Dissection","seq":9},{"type":"option","label":"Pulmonary Embolism Wells Criteria","seq":10},{"type":"text","content":"\n","seq":11},{"type":"option","label":"Continue talking","rule":"action-1","target":"Call the supervisor 1c","seq":12},{"type":"text","content":"\n","seq":13}]},"Call the supervisor 1c":{"type":"knot","title":"Call the supervisor 1c","categories":["detailed"],"_source":"== Call the supervisor 1c (detailed) ==\n:SUPERVISOR Harry:.\nHypertensive pneumothorax is more common in tall and thin young adults (primary pneumothorax) or in patients with chronic pulmonary diseases or chest trauma (secondary pneumothorax). On physical examination, we expect asymmetry in lung auscultation and the trachea may be dislocated to the contralateral side of the pneumothorax.\n\nBoerhaave Syndrome is more common in patients who presented vomiting before the chest pain started, were submitted to endoscopic procedures or had chest trauma.\n\nHow does this information can help you to solve your case?\n\n++ Back to the case (action-1) -> Level 1\n\n","annotations":[],"content":[{"type":"talk","character":"SUPERVISOR Harry","speech":".","seq":2},{"type":"text","content":"Hypertensive pneumothorax is more common in tall and thin young adults (primary pneumothorax) or in patients with chronic pulmonary diseases or chest trauma (secondary pneumothorax). On physical examination, we expect asymmetry in lung auscultation and the trachea may be dislocated to the contralateral side of the pneumothorax.\n\nBoerhaave Syndrome is more common in patients who presented vomiting before the chest pain started, were submitted to endoscopic procedures or had chest trauma.\n\nHow does this information can help you to solve your case?\n\n","seq":3},{"type":"option","label":"Back to the case","rule":"action-1","target":"Level 1","seq":4},{"type":"text","content":"\n","seq":5}]},"Likelihood Ratio":{"type":"knot","title":"Likelihood Ratio","categories":["detailed"],"_source":"== Likelihood Ratio (detailed) ==\n\nLikelihood ratio (LR) - like sensitivity and specificity, LR describe the discriminatory power of features in a clinical context, estimating the probability of disease. When the LR is higher than 1, the feature increases the probability; when lower than 1, reduces it.\n\n++ Back (action-1) -> Call the supervisor 1\n\n","annotations":[],"content":[{"type":"text","content":"\nLikelihood ratio (LR) - like sensitivity and specificity, LR describe the discriminatory power of features in a clinical context, estimating the probability of disease. When the LR is higher than 1, the feature increases the probability; when lower than 1, reduces it.\n\n","seq":2},{"type":"option","label":"Back","rule":"action-1","target":"Call the supervisor 1","seq":3},{"type":"text","content":"\n","seq":4}]},"Clinical History Myocardial Infarction":{"type":"knot","title":"Clinical History Myocardial Infarction","categories":["detailed"],"_source":"== Clinical History Myocardial Infarction (detailed) ==\n![Clinical History Myocardial Infarction](images/ebm-clinical-history-myocardial-infarction.png)\n\n++ Back (action-1) -> Call the supervisor 1\n\n","annotations":[],"content":[{"type":"text","content":"![Clinical History Myocardial Infarction](images/ebm-clinical-history-myocardial-infarction.png)\n\n","seq":2},{"type":"option","label":"Back","rule":"action-1","target":"Call the supervisor 1","seq":3},{"type":"text","content":"\n","seq":4}]},"Physical Examination Myocardial Infarction":{"type":"knot","title":"Physical Examination Myocardial Infarction","categories":["detailed"],"_source":"== Physical Examination Myocardial Infarction (detailed) ==\n![Physical Examination Myocardial Infarction](images/ebm-physical-examination-myocardial-infarction.png)\n\n++ Back (action-1) -> Call the supervisor 1\n\n","annotations":[],"content":[{"type":"text","content":"![Physical Examination Myocardial Infarction](images/ebm-physical-examination-myocardial-infarction.png)\n\n","seq":2},{"type":"option","label":"Back","rule":"action-1","target":"Call the supervisor 1","seq":3},{"type":"text","content":"\n","seq":4}]},"Clinical History Aortic Dissection":{"type":"knot","title":"Clinical History Aortic Dissection","categories":["detailed"],"_source":"== Clinical History Aortic Dissection (detailed) ==\n![Clinical History Aortic Dissection](images/ebm-clinical-history-aortic-dissection.png)\n\n++ Back (action-1) -> Call the supervisor 1\n\n","annotations":[],"content":[{"type":"text","content":"![Clinical History Aortic Dissection](images/ebm-clinical-history-aortic-dissection.png)\n\n","seq":2},{"type":"option","label":"Back","rule":"action-1","target":"Call the supervisor 1","seq":3},{"type":"text","content":"\n","seq":4}]},"Physical Examination Aortic Dissection":{"type":"knot","title":"Physical Examination Aortic Dissection","categories":["detailed"],"_source":"== Physical Examination Aortic Dissection (detailed) ==\n![Physical Examination Aortic Dissection](images/ebm-physical-examination-aortic-dissection.png)\n\n++ Back (action-1) -> Call the supervisor 1\n\n","annotations":[],"content":[{"type":"text","content":"![Physical Examination Aortic Dissection](images/ebm-physical-examination-aortic-dissection.png)\n\n","seq":2},{"type":"option","label":"Back","rule":"action-1","target":"Call the supervisor 1","seq":3},{"type":"text","content":"\n","seq":4}]},"Pulmonary Embolism Wells Criteria":{"type":"knot","title":"Pulmonary Embolism Wells Criteria","categories":["detailed"],"_source":"== Pulmonary Embolism Wells Criteria (detailed) ==\n![Pulmonary Embolism Wells Criteria](images/ebm-pulmonary-embolism-wells-criteria.png)\n\n++ Back (action-1) -> Call the supervisor 1\n\n","annotations":[],"content":[{"type":"text","content":"![Pulmonary Embolism Wells Criteria](images/ebm-pulmonary-embolism-wells-criteria.png)\n\n","seq":2},{"type":"option","label":"Back","rule":"action-1","target":"Call the supervisor 1","seq":3},{"type":"text","content":"\n","seq":4}]},"Check hypothesis 1":{"type":"knot","title":"Check hypothesis 1","categories":["check_input"],"_source":"== Check hypothesis 1 (check_input) ==\n\n{{symptoms#contribution to diagnostics: ,+,=,-;lightgrey,green,blue,red\nNurse: Doctor, please you have to evaluate a {man(male)} ({51 years-old(aging=51)#=}) who entered the emergency department reporting {chest pain#=}.His vital signs are {ABP: 144x92mmHG#=}; {HR: 78bpm#=}; {RR: 21rpm#=}; {Temp: 37oC#=}; {O2Sat: 98%#=}.\n\nPatient: Doctor, I am feeling chest pain since yesterday. The {pain is continuous#=} and {is located just in the middle of my chest#=}, {worsening when I breathe#+} and {when I lay down on my bed#+}. I have {arterial hypertension#-} and {I smoke 20 cigarettes(smoking=20/day)#-} every day. {My father had a \"heart attack\"#-} at my age and I am very worried about it.\n\nYou perform physical examination: {cardiac and pulmonary auscultation are normal#-}; {chest pain does not worse with palpation of the thorax#=}; {there is no jugular stasis#=} {nor lower limb edema#=}.\n}}\n++ Submit (submit-input) -> Order EKG \n\n","annotations":[{"type":"context","context":"symptoms","evaluation":"contribution to diagnostics","options":" ,+,=,-","annotations":[{"type":"annotation","natural":{"complete":"man","expression":"man"},"formal":{"complete":"male","expression":"male"}},{"type":"annotation","natural":{"complete":"51 years-old","expression":"51 years-old"},"formal":{"complete":"aging=51","expression":"aging","specification":"51"},"value":"="},{"type":"annotation","natural":{"complete":"chest pain","expression":"chest pain"},"value":"="},{"type":"annotation","natural":{"complete":"ABP: 144x92mmHG","expression":"ABP","specification":"144x92mmHG"},"value":"="},{"type":"annotation","natural":{"complete":"HR: 78bpm","expression":"HR","specification":"78bpm"},"value":"="},{"type":"annotation","natural":{"complete":"RR: 21rpm","expression":"RR","specification":"21rpm"},"value":"="},{"type":"annotation","natural":{"complete":"Temp: 37oC","expression":"Temp","specification":"37oC"},"value":"="},{"type":"annotation","natural":{"complete":"O2Sat: 98%","expression":"O2Sat","specification":"98%"},"value":"="},{"type":"annotation","natural":{"complete":"pain is continuous","expression":"pain is continuous"},"value":"="},{"type":"annotation","natural":{"complete":"is located just in the middle of my chest","expression":"is located just in the middle of my chest"},"value":"="},{"type":"annotation","natural":{"complete":"worsening when I breathe","expression":"worsening when I breathe"},"value":"+"},{"type":"annotation","natural":{"complete":"when I lay down on my bed","expression":"when I lay down on my bed"},"value":"+"},{"type":"annotation","natural":{"complete":"arterial hypertension","expression":"arterial hypertension"},"value":"-"},{"type":"annotation","natural":{"complete":"I smoke 20 cigarettes","expression":"I smoke 20 cigarettes"},"formal":{"complete":"smoking=20/day","expression":"smoking","specification":"20","rate":"day"},"value":"-"},{"type":"annotation","natural":{"complete":"My father had a \"heart attack\"","expression":"My father had a \"heart attack\""},"value":"-"},{"type":"annotation","natural":{"complete":"cardiac and pulmonary auscultation are normal","expression":"cardiac and pulmonary auscultation are normal"},"value":"-"},{"type":"annotation","natural":{"complete":"chest pain does not worse with palpation of the thorax","expression":"chest pain does not worse with palpation of the thorax"},"value":"="},{"type":"annotation","natural":{"complete":"there is no jugular stasis","expression":"there is no jugular stasis"},"value":"="},{"type":"annotation","natural":{"complete":"nor lower limb edema","expression":"nor lower limb edema"},"value":"="}]}],"content":[{"type":"text","content":"\n","seq":2},{"type":"context-open","context":"symptoms","evaluation":"contribution to diagnostics","options":" ,+,=,-","colors":"lightgrey,green,blue,red","seq":3},{"type":"text","content":"Nurse: Doctor, please you have to evaluate a man (","seq":4},{"type":"selector","expression":"51 years-old","value":"=","seq":5},{"type":"text","content":") who entered the emergency department reporting ","seq":6},{"type":"selector","expression":"chest pain","value":"=","seq":7},{"type":"text","content":".His vital signs are ","seq":8},{"type":"selector","expression":"ABP: 144x92mmHG","value":"=","seq":9},{"type":"text","content":"; ","seq":10},{"type":"selector","expression":"HR: 78bpm","value":"=","seq":11},{"type":"text","content":"; ","seq":12},{"type":"selector","expression":"RR: 21rpm","value":"=","seq":13},{"type":"text","content":"; ","seq":14},{"type":"selector","expression":"Temp: 37oC","value":"=","seq":15},{"type":"text","content":"; ","seq":16},{"type":"selector","expression":"O2Sat: 98%","value":"=","seq":17},{"type":"text","content":".\n\nPatient: Doctor, I am feeling chest pain since yesterday. The ","seq":18},{"type":"selector","expression":"pain is continuous","value":"=","seq":19},{"type":"text","content":" and ","seq":20},{"type":"selector","expression":"is located just in the middle of my chest","value":"=","seq":21},{"type":"text","content":", ","seq":22},{"type":"selector","expression":"worsening when I breathe","value":"+","seq":23},{"type":"text","content":" and ","seq":24},{"type":"selector","expression":"when I lay down on my bed","value":"+","seq":25},{"type":"text","content":". I have ","seq":26},{"type":"selector","expression":"arterial hypertension","value":"-","seq":27},{"type":"text","content":" and ","seq":28},{"type":"selector","expression":"I smoke 20 cigarettes","value":"-","seq":29},{"type":"text","content":" every day. ","seq":30},{"type":"selector","expression":"My father had a \"heart attack\"","value":"-","seq":31},{"type":"text","content":" at my age and I am very worried about it.\n\nYou perform physical examination: ","seq":32},{"type":"selector","expression":"cardiac and pulmonary auscultation are normal","value":"-","seq":33},{"type":"text","content":"; ","seq":34},{"type":"selector","expression":"chest pain does not worse with palpation of the thorax","value":"=","seq":35},{"type":"text","content":"; ","seq":36},{"type":"selector","expression":"there is no jugular stasis","value":"=","seq":37},{"type":"text","content":" ","seq":38},{"type":"selector","expression":"nor lower limb edema","value":"=","seq":39},{"type":"text","content":".\n","seq":40},{"type":"context-close","seq":41},{"type":"text","content":"\n","seq":42},{"type":"option","label":"Submit","rule":"submit-input","target":"Order EKG","seq":43},{"type":"text","content":"\n","seq":44}]},"Order EKG":{"type":"knot","title":"Order EKG","categories":["decision_eletro"],"_source":"== Order EKG (decision_eletro) ==\nOur patient denies any recent long trip, immobilization or surgery.\n\nThe blood pressure is symmetric in the four limbs. \n\nGame: What do you want to do?\n++ Generate hypothesis (action-1) -> Generate hypothesis 2\n++ More information (action-2) -> More information 2\n++ Call the supervisor (action-3) -> Call the supervisor 2\n\n++ Magnify (ekg-image) -> Magnify EKG\n\n","annotations":[],"content":[{"type":"text","content":"Our patient denies any recent long trip, immobilization or surgery.\n\nThe blood pressure is symmetric in the four limbs. \n\nGame: What do you want to do?\n","seq":2},{"type":"option","label":"Generate hypothesis","rule":"action-1","target":"Generate hypothesis 2","seq":3},{"type":"option","label":"More information","rule":"action-2","target":"More information 2","seq":4},{"type":"option","label":"Call the supervisor","rule":"action-3","target":"Call the supervisor 2","seq":5},{"type":"text","content":"\n","seq":6},{"type":"option","label":"Magnify","rule":"ekg-image","target":"Magnify EKG","seq":7},{"type":"text","content":"\n","seq":8}]},"Magnify EKG":{"type":"knot","title":"Magnify EKG","categories":["magnify_eletro"],"_source":"== Magnify EKG (magnify_eletro) ==\n\n![EKG](images/ekg-original.png)\n\n","annotations":[],"content":[{"type":"text","content":"\n![EKG](images/ekg-original.png)\n\n","seq":2}]},"Generate hypothesis 2":{"type":"knot","title":"Generate hypothesis 2","categories":["input"],"_source":"== Generate hypothesis 2 (input) ==\n:PATIENT Jakob:.\n{?1 hypothesis:mesh#pericarditis,myopericarditis,pericardial inflammation,pericardial infection,pericardial effusion;infarction,myocardial infarction,coronary syndrome,acute coronary syndrome,ischemia,myocardial ischemia,coronary insufficiency,angina,angina pectoris}\n\n++ Submit hypothesis (submit-input) -> Check hypothesis 2\n\n","annotations":[],"content":[{"type":"talk","character":"PATIENT Jakob","speech":".","seq":2},{"type":"input","variable":"hypothesis","rows":1,"vocabulary":"mesh","right":["pericarditis","myopericarditis","pericardial inflammation","pericardial infection","pericardial effusion"],"wrong":["infarction","myocardial infarction","coronary syndrome","acute coronary syndrome","ischemia","myocardial ischemia","coronary insufficiency","angina","angina pectoris"],"seq":3},{"type":"text","content":"\n\n","seq":4},{"type":"option","label":"Submit hypothesis","rule":"submit-input","target":"Check hypothesis 2","seq":5},{"type":"text","content":"\n","seq":6}]},"More information 2":{"type":"knot","title":"More information 2","categories":["details_eletro"],"_source":"== More information 2 (details_eletro) ==\n\nEKG description\n![EKG Description](images/ekg-description.png)\n\n++ EKG Analysis (action-1)\n\n","annotations":[],"content":[{"type":"text","content":"\nEKG description\n![EKG Description](images/ekg-description.png)\n\n","seq":2},{"type":"option","label":"EKG Analysis","rule":"action-1","seq":3},{"type":"text","content":"\n","seq":4}]},"EKG Analysis":{"type":"knot","title":"EKG Analysis","categories":["notice"],"_source":"== EKG Analysis (notice) ==\n\nImage zoom.\n\n","annotations":[],"content":[{"type":"text","content":"\nImage zoom.\n\n","seq":2}]},"Call the supervisor 2":{"type":"knot","title":"Call the supervisor 2","categories":["presentation","notice"],"_source":"== Call the supervisor 2 (presentation,notice) ==\n![EKG-A](images/ampliacao-eletro.gif)\n\nWe did not find features that increase the likelihood of myocardial ischemia. Moreover, our patient has a pleuritic chest pain that gets worse when the patient lays down.\n\nIn the EKG we found ST-segment elevation in almost all leads. Also, we found a depression of the PR segment in the DII lead.\n\n","annotations":[],"content":[{"type":"text","content":"![EKG-A](images/ampliacao-eletro.gif)\n\nWe did not find features that increase the likelihood of myocardial ischemia. Moreover, our patient has a pleuritic chest pain that gets worse when the patient lays down.\n\nIn the EKG we found ST-segment elevation in almost all leads. Also, we found a depression of the PR segment in the DII lead.\n\n","seq":2}]},"Check hypothesis 2":{"type":"knot","title":"Check hypothesis 2","_source":"== Check hypothesis 2 ==\n![EKG-A](images/ampliacao-eletro.gif)\n++ Submit -> Final report\n\n","annotations":[],"content":[{"type":"text","content":"![EKG-A](images/ampliacao-eletro.gif)\n","seq":2},{"type":"option","label":"Submit","target":"Final report","seq":3},{"type":"text","content":"\n","seq":4}]},"Final report":{"type":"knot","title":"Final report","_source":"== Final report ==\n# Feedback\nScore: ...\nEvaluation: ...\nTwo columns","annotations":[],"content":[{"type":"text","content":"# Feedback\nScore: ...\nEvaluation: ...\nTwo columns","seq":2}]}},"start":"Case 001"}})();