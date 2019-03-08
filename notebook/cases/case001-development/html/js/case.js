(function() { DCCPlayerServer.playerObj ={"id":"case001-development","knots":{"Case 001":{"type":"knot","title":"Case 001","categories":["start","dialog_left"],"level":1,"_source":"# Case 001 (start,dialog_left) #\n:NURSE Agnes: Doctor, we have a man (51 years old) who entered the emergency department reporting chest pain. His vital signs are ABP: 144x92mmHG; HR: 78bpm; RR: 21rpm; Temp: 37oC; O2Sat: 98%.\n\n** Let us go! -> Level 1\n\n","annotations":[],"content":[{"type":"text","content":"\n","seq":2},{"type":"talk","character":"NURSE Agnes","speech":"Doctor, we have a man (51 years old) who entered the emergency department reporting chest pain. His vital signs are ABP: 144x92mmHG; HR: 78bpm; RR: 21rpm; Temp: 37oC; O2Sat: 98%.","seq":3},{"type":"text","content":"\n\n","seq":4},{"type":"option","subtype":"**","label":"Let us go!","target":"Level 1","seq":5},{"type":"text","content":"\n\n","seq":6}]},"Level 1":{"type":"knot","title":"Level 1","categories":["information"],"level":1,"_source":"# Level 1 (information) #\n\n:PATIENT Jakob: Doctor, I am feeling chest pain since yesterday. The pain is continuous and is located just in the middle of my chest, worsening when I breathe and when I lay down on my bed. I suffer from arterial hypertension and smoke 20 cigarettes every day. My father had a “heart attack” at my age and I am very worried about it.\n\n<b>PHYSICAL EXAMINATION</b> <br> The cardiac and pulmonary auscultation are normal; chest pain does not worse with palpation of the thorax; there is no jugular stasis nor lower limb edema.\n\n:Jacinto:What do you want to do?\n\n** Generate hypothesis -> Generate hypothesis 1\n** More information -> More information 1\n** Call the supervisor -> Call the supervisor 1a\n\n","annotations":[],"content":[{"type":"text","content":"\n\n","seq":2},{"type":"talk","character":"PATIENT Jakob","speech":"Doctor, I am feeling chest pain since yesterday. The pain is continuous and is located just in the middle of my chest, worsening when I breathe and when I lay down on my bed. I suffer from arterial hypertension and smoke 20 cigarettes every day. My father had a “heart attack” at my age and I am very worried about it.","seq":3},{"type":"text","content":"\n\n<b>PHYSICAL EXAMINATION</b> <br> The cardiac and pulmonary auscultation are normal; chest pain does not worse with palpation of the thorax; there is no jugular stasis nor lower limb edema.\n\n","seq":4},{"type":"talk","character":"Jacinto","speech":"What do you want to do?","seq":5},{"type":"text","content":"\n\n","seq":6},{"type":"option","subtype":"**","label":"Generate hypothesis","target":"Generate hypothesis 1","seq":7},{"type":"text","content":"\n","seq":8},{"type":"option","subtype":"**","label":"More information","target":"More information 1","seq":9},{"type":"text","content":"\n","seq":10},{"type":"option","subtype":"**","label":"Call the supervisor","target":"Call the supervisor 1a","seq":11},{"type":"text","content":"\n\n","seq":12}]},"Generate hypothesis 1":{"type":"knot","title":"Generate hypothesis 1","categories":["input"],"level":1,"_source":"# Generate hypothesis 1 (input) #\nWhat is your main diagnostic hypothesis?\n:PATIENT Jakob:.\n{?1 hypothesis1:mesh#pericarditis,myopericarditis,pericardial inflammation,pericardial infection,pericardial effusion;infarction,myocardial infarction,coronary syndrome,acute coronary syndrome,ischemia,myocardial ischemia,coronary insufficiency,angina,angina pectoris}\n\n** Submit hypothesis -> Check hypothesis 1\n\n","annotations":[],"content":[{"type":"text","content":"\nWhat is your main diagnostic hypothesis?\n","seq":2},{"type":"talk","character":"PATIENT Jakob","speech":".","seq":3},{"type":"text","content":"\n","seq":4},{"type":"input","variable":"hypothesis1","rows":1,"vocabulary":"mesh","right":["pericarditis","myopericarditis","pericardial inflammation","pericardial infection","pericardial effusion"],"wrong":["infarction","myocardial infarction","coronary syndrome","acute coronary syndrome","ischemia","myocardial ischemia","coronary insufficiency","angina","angina pectoris"],"seq":5},{"type":"text","content":"\n\n","seq":6},{"type":"option","subtype":"**","label":"Submit hypothesis","target":"Check hypothesis 1","seq":7},{"type":"text","content":"\n\n","seq":8}]},"More information 1":{"type":"knot","title":"More information 1","categories":["information"],"level":1,"_source":"# More information 1 (information) #\n\n<b>MORE INFORMATION</b> <br> The patient never felt chest pain before. He exercises regularly and has lost weight in the last three months. He takes amlodipine and losartan regularly. Two weeks ago, he had an auto-limited gastroenteritis episode. He denies recent travels and surgery.\n:PATIENT Jakob:.\n\n:Jacinto:What do you want to do?\n\n** Generate hypothesis -> Generate hypothesis 1\n** Call the supervisor -> Call the supervisor 1a\n\n","annotations":[],"content":[{"type":"text","content":"\n\n<b>MORE INFORMATION</b> <br> The patient never felt chest pain before. He exercises regularly and has lost weight in the last three months. He takes amlodipine and losartan regularly. Two weeks ago, he had an auto-limited gastroenteritis episode. He denies recent travels and surgery.\n","seq":2},{"type":"talk","character":"PATIENT Jakob","speech":".","seq":3},{"type":"text","content":"\n\n","seq":4},{"type":"talk","character":"Jacinto","speech":"What do you want to do?","seq":5},{"type":"text","content":"\n\n","seq":6},{"type":"option","subtype":"**","label":"Generate hypothesis","target":"Generate hypothesis 1","seq":7},{"type":"text","content":"\n","seq":8},{"type":"option","subtype":"**","label":"Call the supervisor","target":"Call the supervisor 1a","seq":9},{"type":"text","content":"\n\n","seq":10}]},"Call the supervisor 1a":{"type":"knot","title":"Call the supervisor 1a","categories":["detailed"],"level":1,"_source":"# Call the supervisor 1a (detailed) #\n:SUPERVISOR Harry:\nHi! I am glad that you called me. Chest pain is an important complaint at the emergency department and we have to exclude the fatal causes: myocardial infarction (MI), acute aortic dissection (AAD), pulmonary embolism PE), hypertensive pneumothorax (HP), and Boerhaave Syndrome (BS).\n\nThe best way to find out what is happening with your patient, my young padawan, is to gather as much information as possible through history taking and physical examination. We need to search for the signs and symptoms that can guide our clinical reasoning process by changing the pre-test probabilities of each disease.\n::\n\n** See likelihood tables -> Call the supervisor 1b \n\n","annotations":[],"content":[{"type":"text","content":"\n","seq":2},{"type":"talk-open","character":"SUPERVISOR Harry","seq":3},{"type":"text","content":"\nHi! I am glad that you called me. Chest pain is an important complaint at the emergency department and we have to exclude the fatal causes: myocardial infarction (MI), acute aortic dissection (AAD), pulmonary embolism PE), hypertensive pneumothorax (HP), and Boerhaave Syndrome (BS).\n\nThe best way to find out what is happening with your patient, my young padawan, is to gather as much information as possible through history taking and physical examination. We need to search for the signs and symptoms that can guide our clinical reasoning process by changing the pre-test probabilities of each disease.\n","seq":4},{"type":"talk-close","seq":5},{"type":"text","content":"\n\n","seq":6},{"type":"option","subtype":"**","label":"See likelihood tables","target":"Call the supervisor 1b","seq":7},{"type":"text","content":"\n\n","seq":8}]},"Call the supervisor 1b":{"type":"knot","title":"Call the supervisor 1b","categories":["detailed"],"level":1,"_source":"# Call the supervisor 1b (detailed) #\n:SUPERVISOR Harry:.\nDo you know the concept of Likelihood ratio (LR)? -> Likelihood Ratio\n\n++ Clinical History Myocardial Infarction\n++ Physical Examination Myocardial Infarction\n++ Clinical History Aortic Dissection\n++ Physical Examination Aortic Dissection\n++ Pulmonary Embolism Wells Criteria\n\n** Continue talking -> Call the supervisor 1c \n\n","annotations":[],"content":[{"type":"text","content":"\n","seq":2},{"type":"talk","character":"SUPERVISOR Harry","speech":".","seq":3},{"type":"text","content":"\nDo you know the concept of Likelihood ratio (LR)? ","seq":4},{"type":"divert","target":"Likelihood Ratio","seq":5},{"type":"text","content":"\n\n","seq":6},{"type":"option","subtype":"++","label":"Clinical History Myocardial Infarction","seq":7},{"type":"text","content":"\n","seq":8},{"type":"option","subtype":"++","label":"Physical Examination Myocardial Infarction","seq":9},{"type":"text","content":"\n","seq":10},{"type":"option","subtype":"++","label":"Clinical History Aortic Dissection","seq":11},{"type":"text","content":"\n","seq":12},{"type":"option","subtype":"++","label":"Physical Examination Aortic Dissection","seq":13},{"type":"text","content":"\n","seq":14},{"type":"option","subtype":"++","label":"Pulmonary Embolism Wells Criteria","seq":15},{"type":"text","content":"\n\n","seq":16},{"type":"option","subtype":"**","label":"Continue talking","target":"Call the supervisor 1c","seq":17},{"type":"text","content":"\n\n","seq":18}]},"Call the supervisor 1c":{"type":"knot","title":"Call the supervisor 1c","categories":["detailed"],"level":1,"_source":"# Call the supervisor 1c (detailed) #\n:SUPERVISOR Harry:.\nHypertensive pneumothorax is more common in tall and thin young adults (primary pneumothorax) or in patients with chronic pulmonary diseases or chest trauma (secondary pneumothorax). On physical examination, we expect asymmetry in lung auscultation and the trachea may be dislocated to the contralateral side of the pneumothorax.\n\nBoerhaave Syndrome is more common in patients who presented vomiting before the chest pain started, were submitted to endoscopic procedures or had chest trauma.\n\nHow does this information can help you to solve your case?\n\n** Back to the case -> Level 1\n\n","annotations":[],"content":[{"type":"text","content":"\n","seq":2},{"type":"talk","character":"SUPERVISOR Harry","speech":".","seq":3},{"type":"text","content":"\nHypertensive pneumothorax is more common in tall and thin young adults (primary pneumothorax) or in patients with chronic pulmonary diseases or chest trauma (secondary pneumothorax). On physical examination, we expect asymmetry in lung auscultation and the trachea may be dislocated to the contralateral side of the pneumothorax.\n\nBoerhaave Syndrome is more common in patients who presented vomiting before the chest pain started, were submitted to endoscopic procedures or had chest trauma.\n\nHow does this information can help you to solve your case?\n\n","seq":4},{"type":"option","subtype":"**","label":"Back to the case","target":"Level 1","seq":5},{"type":"text","content":"\n\n","seq":6}]},"Likelihood Ratio":{"type":"knot","title":"Likelihood Ratio","categories":["detailed"],"level":1,"_source":"# Likelihood Ratio (detailed) #\n\nLikelihood ratio (LR) - like sensitivity and specificity, LR describe the discriminatory power of features in a clinical context, estimating the probability of disease. When the LR is higher than 1, the feature increases the probability; when lower than 1, reduces it.\n\n** Back -> Call the supervisor 1\n\n","annotations":[],"content":[{"type":"text","content":"\n\nLikelihood ratio (LR) - like sensitivity and specificity, LR describe the discriminatory power of features in a clinical context, estimating the probability of disease. When the LR is higher than 1, the feature increases the probability; when lower than 1, reduces it.\n\n","seq":2},{"type":"option","subtype":"**","label":"Back","target":"Call the supervisor 1","seq":3},{"type":"text","content":"\n\n","seq":4}]},"Clinical History Myocardial Infarction":{"type":"knot","title":"Clinical History Myocardial Infarction","categories":["detailed"],"level":1,"_source":"# Clinical History Myocardial Infarction (detailed) #\n![Clinical History Myocardial Infarction](images/ebm-clinical-history-myocardial-infarction.png)\n\n** Back -> Call the supervisor 1\n\n","annotations":[],"content":[{"type":"text","content":"\n![Clinical History Myocardial Infarction](images/ebm-clinical-history-myocardial-infarction.png)\n\n","seq":2},{"type":"option","subtype":"**","label":"Back","target":"Call the supervisor 1","seq":3},{"type":"text","content":"\n\n","seq":4}]},"Physical Examination Myocardial Infarction":{"type":"knot","title":"Physical Examination Myocardial Infarction","categories":["detailed"],"level":1,"_source":"# Physical Examination Myocardial Infarction (detailed) #\n![Physical Examination Myocardial Infarction](images/ebm-physical-examination-myocardial-infarction.png)\n\n** Back -> Call the supervisor 1\n\n","annotations":[],"content":[{"type":"text","content":"\n![Physical Examination Myocardial Infarction](images/ebm-physical-examination-myocardial-infarction.png)\n\n","seq":2},{"type":"option","subtype":"**","label":"Back","target":"Call the supervisor 1","seq":3},{"type":"text","content":"\n\n","seq":4}]},"Clinical History Aortic Dissection":{"type":"knot","title":"Clinical History Aortic Dissection","categories":["detailed"],"level":1,"_source":"# Clinical History Aortic Dissection (detailed) #\n![Clinical History Aortic Dissection](images/ebm-clinical-history-aortic-dissection.png)\n\n** Back -> Call the supervisor 1\n\n","annotations":[],"content":[{"type":"text","content":"\n![Clinical History Aortic Dissection](images/ebm-clinical-history-aortic-dissection.png)\n\n","seq":2},{"type":"option","subtype":"**","label":"Back","target":"Call the supervisor 1","seq":3},{"type":"text","content":"\n\n","seq":4}]},"Physical Examination Aortic Dissection":{"type":"knot","title":"Physical Examination Aortic Dissection","categories":["detailed"],"level":1,"_source":"# Physical Examination Aortic Dissection (detailed) #\n![Physical Examination Aortic Dissection](images/ebm-physical-examination-aortic-dissection.png)\n\n** Back -> Call the supervisor 1\n\n","annotations":[],"content":[{"type":"text","content":"\n![Physical Examination Aortic Dissection](images/ebm-physical-examination-aortic-dissection.png)\n\n","seq":2},{"type":"option","subtype":"**","label":"Back","target":"Call the supervisor 1","seq":3},{"type":"text","content":"\n\n","seq":4}]},"Pulmonary Embolism Wells Criteria":{"type":"knot","title":"Pulmonary Embolism Wells Criteria","categories":["detailed"],"level":1,"_source":"# Pulmonary Embolism Wells Criteria (detailed) #\n![Pulmonary Embolism Wells Criteria](images/ebm-pulmonary-embolism-wells-criteria.png)\n\n** Back -> Call the supervisor 1\n\n","annotations":[],"content":[{"type":"text","content":"\n![Pulmonary Embolism Wells Criteria](images/ebm-pulmonary-embolism-wells-criteria.png)\n\n","seq":2},{"type":"option","subtype":"**","label":"Back","target":"Call the supervisor 1","seq":3},{"type":"text","content":"\n\n","seq":4}]},"Check hypothesis 1":{"type":"knot","title":"Check hypothesis 1","categories":["selector"],"level":1,"_source":"# Check hypothesis 1 (selector) #\n\n:Jacinto:Let us check out your hypothesis. Highlight in green the findings that corroborate your hypothesis; in blue those that are neutral; and in red the ones speaking against your hypothesis.\n\n{{symptoms#contribution to diagnostics: ,+,=,-\nNurse: Doctor, please you have to evaluate a {man(male)} ({51 years-old(aging=51)#=}) who entered the emergency department reporting {chest pain#=}.His vital signs are {ABP: 144x92mmHG#=}; {HR: 78bpm#=}; {RR: 21rpm#=}; {Temp: 37oC#=}; {O2Sat: 98%#=}.\n\nPatient: Doctor, I am feeling chest pain since yesterday. The {pain is continuous#=} and {is located just in the middle of my chest#=}, {worsening when I breathe#+} and {when I lay down on my bed#+}. I have {arterial hypertension#-} and {I smoke 20 cigarettes(smoking=20/day)#-} every day. {My father had a \"heart attack\"#-} at my age and I am very worried about it.\n\nYou perform physical examination: {cardiac and pulmonary auscultation are normal#-}; {chest pain does not worse with palpation of the thorax#=}; {there is no jugular stasis#=} {nor lower limb edema#=}.\n}}\n\n** Submit -> Order EKG \n\n","annotations":[{"type":"context","context":"symptoms","evaluation":"contribution to diagnostics","options":" ,+,=,-","annotations":[{"type":"annotation","natural":{"complete":"man","expression":"man"},"formal":{"complete":"male","expression":"male"}},{"type":"annotation","natural":{"complete":"51 years-old","expression":"51 years-old"},"formal":{"complete":"aging=51","expression":"aging","specification":"51"},"value":"="},{"type":"annotation","natural":{"complete":"chest pain","expression":"chest pain"},"value":"="},{"type":"annotation","natural":{"complete":"ABP: 144x92mmHG","expression":"ABP","specification":"144x92mmHG"},"value":"="},{"type":"annotation","natural":{"complete":"HR: 78bpm","expression":"HR","specification":"78bpm"},"value":"="},{"type":"annotation","natural":{"complete":"RR: 21rpm","expression":"RR","specification":"21rpm"},"value":"="},{"type":"annotation","natural":{"complete":"Temp: 37oC","expression":"Temp","specification":"37oC"},"value":"="},{"type":"annotation","natural":{"complete":"O2Sat: 98%","expression":"O2Sat","specification":"98%"},"value":"="},{"type":"annotation","natural":{"complete":"pain is continuous","expression":"pain is continuous"},"value":"="},{"type":"annotation","natural":{"complete":"is located just in the middle of my chest","expression":"is located just in the middle of my chest"},"value":"="},{"type":"annotation","natural":{"complete":"worsening when I breathe","expression":"worsening when I breathe"},"value":"+"},{"type":"annotation","natural":{"complete":"when I lay down on my bed","expression":"when I lay down on my bed"},"value":"+"},{"type":"annotation","natural":{"complete":"arterial hypertension","expression":"arterial hypertension"},"value":"-"},{"type":"annotation","natural":{"complete":"I smoke 20 cigarettes","expression":"I smoke 20 cigarettes"},"formal":{"complete":"smoking=20/day","expression":"smoking","specification":"20","rate":"day"},"value":"-"},{"type":"annotation","natural":{"complete":"My father had a \"heart attack\"","expression":"My father had a \"heart attack\""},"value":"-"},{"type":"annotation","natural":{"complete":"cardiac and pulmonary auscultation are normal","expression":"cardiac and pulmonary auscultation are normal"},"value":"-"},{"type":"annotation","natural":{"complete":"chest pain does not worse with palpation of the thorax","expression":"chest pain does not worse with palpation of the thorax"},"value":"="},{"type":"annotation","natural":{"complete":"there is no jugular stasis","expression":"there is no jugular stasis"},"value":"="},{"type":"annotation","natural":{"complete":"nor lower limb edema","expression":"nor lower limb edema"},"value":"="}]}],"content":[{"type":"text","content":"\n\n","seq":2},{"type":"talk","character":"Jacinto","speech":"Let us check out your hypothesis. Highlight in green the findings that corroborate your hypothesis; in blue those that are neutral; and in red the ones speaking against your hypothesis.","seq":3},{"type":"text","content":"\n\n","seq":4},{"type":"context-open","context":"symptoms","evaluation":"contribution to diagnostics","options":" ,+,=,-","seq":5},{"type":"text","content":"Nurse: Doctor, please you have to evaluate a man (","seq":6},{"type":"selector","expression":"51 years-old","value":"=","seq":7},{"type":"text","content":") who entered the emergency department reporting ","seq":8},{"type":"selector","expression":"chest pain","value":"=","seq":9},{"type":"text","content":".His vital signs are ","seq":10},{"type":"selector","expression":"ABP: 144x92mmHG","value":"=","seq":11},{"type":"text","content":"; ","seq":12},{"type":"selector","expression":"HR: 78bpm","value":"=","seq":13},{"type":"text","content":"; ","seq":14},{"type":"selector","expression":"RR: 21rpm","value":"=","seq":15},{"type":"text","content":"; ","seq":16},{"type":"selector","expression":"Temp: 37oC","value":"=","seq":17},{"type":"text","content":"; ","seq":18},{"type":"selector","expression":"O2Sat: 98%","value":"=","seq":19},{"type":"text","content":".\n\nPatient: Doctor, I am feeling chest pain since yesterday. The ","seq":20},{"type":"selector","expression":"pain is continuous","value":"=","seq":21},{"type":"text","content":" and ","seq":22},{"type":"selector","expression":"is located just in the middle of my chest","value":"=","seq":23},{"type":"text","content":", ","seq":24},{"type":"selector","expression":"worsening when I breathe","value":"+","seq":25},{"type":"text","content":" and ","seq":26},{"type":"selector","expression":"when I lay down on my bed","value":"+","seq":27},{"type":"text","content":". I have ","seq":28},{"type":"selector","expression":"arterial hypertension","value":"-","seq":29},{"type":"text","content":" and ","seq":30},{"type":"selector","expression":"I smoke 20 cigarettes","value":"-","seq":31},{"type":"text","content":" every day. ","seq":32},{"type":"selector","expression":"My father had a \"heart attack\"","value":"-","seq":33},{"type":"text","content":" at my age and I am very worried about it.\n\nYou perform physical examination: ","seq":34},{"type":"selector","expression":"cardiac and pulmonary auscultation are normal","value":"-","seq":35},{"type":"text","content":"; ","seq":36},{"type":"selector","expression":"chest pain does not worse with palpation of the thorax","value":"=","seq":37},{"type":"text","content":"; ","seq":38},{"type":"selector","expression":"there is no jugular stasis","value":"=","seq":39},{"type":"text","content":" ","seq":40},{"type":"selector","expression":"nor lower limb edema","value":"=","seq":41},{"type":"text","content":".\n","seq":42},{"type":"context-close","seq":43},{"type":"text","content":"\n\n","seq":44},{"type":"option","subtype":"**","label":"Submit","target":"Order EKG","seq":45},{"type":"text","content":"\n\n","seq":46}]},"Order EKG":{"type":"knot","title":"Order EKG","categories":["decision_eletro"],"level":1,"_source":"# Order EKG (decision_eletro) #\nOur patient denies any recent long trip, immobilization or surgery.\n\nThe blood pressure is symmetric in the four limbs. \n\nGame: What do you want to do?\n++ Generate hypothesis (action-1) -> Generate hypothesis 2\n++ More information (action-2) -> More information 2\n++ Call the supervisor (action-3) -> Call the supervisor 2\n\n++ Magnify (ekg-image) -> Magnify EKG\n\n","annotations":[],"content":[{"type":"text","content":"\nOur patient denies any recent long trip, immobilization or surgery.\n\nThe blood pressure is symmetric in the four limbs. \n\nGame: What do you want to do?\n","seq":2},{"type":"option","subtype":"++","label":"Generate hypothesis","rule":"action-1","target":"Generate hypothesis 2","seq":3},{"type":"text","content":"\n","seq":4},{"type":"option","subtype":"++","label":"More information","rule":"action-2","target":"More information 2","seq":5},{"type":"text","content":"\n","seq":6},{"type":"option","subtype":"++","label":"Call the supervisor","rule":"action-3","target":"Call the supervisor 2","seq":7},{"type":"text","content":"\n\n","seq":8},{"type":"option","subtype":"++","label":"Magnify","rule":"ekg-image","target":"Magnify EKG","seq":9},{"type":"text","content":"\n\n","seq":10}]},"Magnify EKG":{"type":"knot","title":"Magnify EKG","categories":["magnify_eletro"],"level":1,"_source":"# Magnify EKG (magnify_eletro) #\n\n![EKG](images/ekg-original.png)\n\n","annotations":[],"content":[{"type":"text","content":"\n\n![EKG](images/ekg-original.png)\n\n","seq":2}]},"Generate hypothesis 2":{"type":"knot","title":"Generate hypothesis 2","categories":["input"],"level":1,"_source":"# Generate hypothesis 2 (input) #\n:PATIENT Jakob:.\n{?1 hypothesis:mesh#pericarditis,myopericarditis,pericardial inflammation,pericardial infection,pericardial effusion;infarction,myocardial infarction,coronary syndrome,acute coronary syndrome,ischemia,myocardial ischemia,coronary insufficiency,angina,angina pectoris}\n\n++ Submit hypothesis (submit-input) -> Check hypothesis 2\n\n","annotations":[],"content":[{"type":"text","content":"\n","seq":2},{"type":"talk","character":"PATIENT Jakob","speech":".","seq":3},{"type":"text","content":"\n","seq":4},{"type":"input","variable":"hypothesis","rows":1,"vocabulary":"mesh","right":["pericarditis","myopericarditis","pericardial inflammation","pericardial infection","pericardial effusion"],"wrong":["infarction","myocardial infarction","coronary syndrome","acute coronary syndrome","ischemia","myocardial ischemia","coronary insufficiency","angina","angina pectoris"],"seq":5},{"type":"text","content":"\n\n","seq":6},{"type":"option","subtype":"++","label":"Submit hypothesis","rule":"submit-input","target":"Check hypothesis 2","seq":7},{"type":"text","content":"\n\n","seq":8}]},"More information 2":{"type":"knot","title":"More information 2","categories":["details_eletro"],"level":1,"_source":"# More information 2 (details_eletro) #\n\nEKG description\n![EKG Description](images/ekg-description.png)\n\n++ EKG Analysis (action-1)\n\n","annotations":[],"content":[{"type":"text","content":"\n\nEKG description\n![EKG Description](images/ekg-description.png)\n\n","seq":2},{"type":"option","subtype":"++","label":"EKG Analysis","rule":"action-1","seq":3},{"type":"text","content":"\n\n","seq":4}]},"EKG Analysis":{"type":"knot","title":"EKG Analysis","categories":["notice"],"level":1,"_source":"# EKG Analysis (notice) #\n\nImage zoom.\n\n","annotations":[],"content":[{"type":"text","content":"\n\nImage zoom.\n\n","seq":2}]},"Call the supervisor 2":{"type":"knot","title":"Call the supervisor 2","categories":["presentation","notice"],"level":1,"_source":"# Call the supervisor 2 (presentation,notice) #\n![EKG-A](images/ampliacao-eletro.gif)\n\nWe did not find features that increase the likelihood of myocardial ischemia. Moreover, our patient has a pleuritic chest pain that gets worse when the patient lays down.\n\nIn the EKG we found ST-segment elevation in almost all leads. Also, we found a depression of the PR segment in the DII lead.\n\n","annotations":[],"content":[{"type":"text","content":"\n![EKG-A](images/ampliacao-eletro.gif)\n\nWe did not find features that increase the likelihood of myocardial ischemia. Moreover, our patient has a pleuritic chest pain that gets worse when the patient lays down.\n\nIn the EKG we found ST-segment elevation in almost all leads. Also, we found a depression of the PR segment in the DII lead.\n\n","seq":2}]},"Check hypothesis 2":{"type":"knot","title":"Check hypothesis 2","level":1,"_source":"# Check hypothesis 2 #\n![EKG-A](images/ampliacao-eletro.gif)\n++ Submit -> Final report\n\n","annotations":[],"content":[{"type":"text","content":"\n![EKG-A](images/ampliacao-eletro.gif)\n","seq":2},{"type":"option","subtype":"++","label":"Submit","target":"Final report","seq":3},{"type":"text","content":"\n\n","seq":4}]},"Final report":{"type":"knot","title":"Final report","level":1,"_source":"# Final report #\n","annotations":[],"content":[{"type":"text","content":"\n","seq":2}]},"Feedback":{"type":"knot","title":"Feedback","level":1,"_source":"# Feedback\nScore: ...\nEvaluation: ...\nTwo columns","annotations":[],"content":[{"type":"text","content":"\nScore: ...\nEvaluation: ...\nTwo columns","seq":2}]}},"start":"Case 001"}})();