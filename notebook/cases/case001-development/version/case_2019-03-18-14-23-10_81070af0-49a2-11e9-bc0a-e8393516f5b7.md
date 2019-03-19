Start
=====

## Case 001 (start,dialog_left)
:NURSE Agnes: Doctor, we have a man (51 years old) who entered the emergency department reporting chest pain. His vital signs are ABP: 144x92mmHG; HR: 78bpm; RR: 21rpm; Temp: 37oC; O2Sat: 98%.

** Let us go! -> Cycle 1.Begin

Cycle 1
=======

## Begin (information) ##

:PATIENT Jakob: Doctor, I am feeling chest pain since yesterday. The pain is continuous and is located just in the middle of my chest, worsening when I breathe and when I lay down on my bed. I suffer from arterial hypertension and smoke 20 cigarettes every day. My father had a “heart attack” at my age and I am very worried about it.

<b>PHYSICAL EXAMINATION</b> <br> The cardiac and pulmonary auscultation are normal; chest pain does not worse with palpation of the thorax; there is no jugular stasis nor lower limb edema.

:Jacinto:What do you want to do?

** Generate hypothesis
** More information
** Call the supervisor -> Call the supervisor A

## Generate hypothesis (input)
What is your main diagnostic hypothesis?
:PATIENT Jakob:.
{?1 hypothesis:mesh#pericarditis,myopericarditis,pericardial inflammation,pericardial infection,pericardial effusion;infarction,myocardial infarction,coronary syndrome,acute coronary syndrome,ischemia,myocardial ischemia,coronary insufficiency,angina,angina pectoris}

** Submit hypothesis -> Check hypothesis

## More information (information)

<b>MORE INFORMATION</b> <br> The patient never felt chest pain before. He exercises regularly and has lost weight in the last three months. He takes amlodipine and losartan regularly. Two weeks ago, he had an auto-limited gastroenteritis episode. He denies recent travels and surgery.
:PATIENT Jakob:.

:Jacinto:What do you want to do?

** Generate hypothesis -> Generate hypothesis
** Call the supervisor -> Call the supervisor A

## Call the supervisor A (detailed)
:SUPERVISOR Harry:
Hi! I am glad that you called me. Chest pain is an important complaint at the emergency department and we have to exclude the fatal causes: myocardial infarction (MI), acute aortic dissection (AAD), pulmonary embolism PE), hypertensive pneumothorax (HP), and Boerhaave Syndrome (BS).

The best way to find out what is happening with your patient, my young padawan, is to gather as much information as possible through history taking and physical examination. We need to search for the signs and symptoms that can guide our clinical reasoning process by changing the pre-test probabilities of each disease.
::

** See likelihood tables -> Call the supervisor B 

## Call the supervisor B (detailed)
:SUPERVISOR Harry:.
Do you know the concept of Likelihood ratio (LR)? -> Likelihood Ratio

++ Clinical History Myocardial Infarction
++ Physical Examination Myocardial Infarction
++ Clinical History Aortic Dissection
++ Physical Examination Aortic Dissection
++ Pulmonary Embolism Wells Criteria

** Continue talking -> Call the supervisor C 

## Call the supervisor C (detailed)
:SUPERVISOR Harry:.
Hypertensive pneumothorax is more common in tall and thin young adults (primary pneumothorax) or in patients with chronic pulmonary diseases or chest trauma (secondary pneumothorax). On physical examination, we expect asymmetry in lung auscultation and the trachea may be dislocated to the contralateral side of the pneumothorax.

Boerhaave Syndrome is more common in patients who presented vomiting before the chest pain started, were submitted to endoscopic procedures or had chest trauma.

How does this information can help you to solve your case?

** Back to the case -> Begin

## Likelihood Ratio (detailed)

Likelihood ratio (LR) - like sensitivity and specificity, LR describe the discriminatory power of features in a clinical context, estimating the probability of disease. When the LR is higher than 1, the feature increases the probability; when lower than 1, reduces it.

** Back -> Call the supervisor

## Clinical History Myocardial Infarction (detailed)
![Clinical History Myocardial Infarction](images/ebm-clinical-history-myocardial-infarction.png)

** Back -> Call the supervisor

## Physical Examination Myocardial Infarction (detailed)
![Physical Examination Myocardial Infarction](images/ebm-physical-examination-myocardial-infarction.png)

** Back -> Call the supervisor

## Clinical History Aortic Dissection (detailed)
![Clinical History Aortic Dissection](images/ebm-clinical-history-aortic-dissection.png)

** Back -> Call the supervisor

## Physical Examination Aortic Dissection (detailed)
![Physical Examination Aortic Dissection](images/ebm-physical-examination-aortic-dissection.png)

** Back -> Call the supervisor

## Pulmonary Embolism Wells Criteria (detailed)
![Pulmonary Embolism Wells Criteria](images/ebm-pulmonary-embolism-wells-criteria.png)

** Back -> Call the supervisor

## Check hypothesis (selector)

:Jacinto:Let us check out your hypothesis. Highlight in green the findings that corroborate your hypothesis; in blue those that are neutral; and in red the ones speaking against your hypothesis.

{{symptoms#contribution to diagnostics: ,+,=,-
Nurse: Doctor, please you have to evaluate a {man(male)} ({51 years-old(aging=51)#=}) who entered the emergency department reporting {chest pain#=}.His vital signs are {ABP: 144x92mmHG#=}; {HR: 78bpm#=}; {RR: 21rpm#=}; {Temp: 37oC#=}; {O2Sat: 98%#=}.

Patient: Doctor, I am feeling chest pain since yesterday. The {pain is continuous#=} and {is located just in the middle of my chest#=}, {worsening when I breathe#+} and {when I lay down on my bed#+}. I have {arterial hypertension#-} and {I smoke 20 cigarettes(smoking=20/day)#-} every day. {My father had a "heart attack"#-} at my age and I am very worried about it.

You perform physical examination: {cardiac and pulmonary auscultation are normal#-}; {chest pain does not worse with palpation of the thorax#=}; {there is no jugular stasis#=} {nor lower limb edema#=}.
}}

** Submit -> Review hypothesis 

## Review hypothesis (input)
If you whant to review your hypothesis, type below the new hypothesis.
:PATIENT Jakob:.
{?1 hypothesis:mesh#pericarditis,myopericarditis,pericardial inflammation,pericardial infection,pericardial effusion;infarction,myocardial infarction,coronary syndrome,acute coronary syndrome,ischemia,myocardial ischemia,coronary insufficiency,angina,angina pectoris}

** Submit -> Cycle 2.Order EKG

Cycle 2
=======

## Order EKG (decision_eletro)
Our patient denies any recent long trip, immobilization or surgery.

The blood pressure is symmetric in the four limbs. 

:Game: What do you want to do?
** Generate hypothesis
** More information
** Call the supervisor

++ Magnify (ekg-image) -> Magnify EKG

## Magnify EKG (magnify_eletro)

![EKG](images/ekg-original.png)

## Generate hypothesis (input)
What is your main diagnostic hypothesis?
:PATIENT Jakob:.
{?1 hypothesis:mesh#pericarditis,myopericarditis,pericardial inflammation,pericardial infection,pericardial effusion;infarction,myocardial infarction,coronary syndrome,acute coronary syndrome,ischemia,myocardial ischemia,coronary insufficiency,angina,angina pectoris}

** Submit hypothesis -> Check hypothesis

## More information (details_eletro) ##

EKG description
![EKG Description](images/ekg-description.png)

** EKG Analysis

## EKG Analysis (notice)

Image zoom.

## Call the supervisor (presentation,notice)
![EKG-A](images/ampliacao-eletro.gif)

We did not find features that increase the likelihood of myocardial ischemia. Moreover, our patient has a pleuritic chest pain that gets worse when the patient lays down.

In the EKG we found ST-segment elevation in almost all leads. Also, we found a depression of the PR segment in the DII lead.

## Check hypothesis
![EKG-A](images/ampliacao-eletro.gif)
** Submit -> Final.Final report

Final
=====

## Final report ##

Your answer for the first hypothesis was ~hypothesis1

## Feedback
Score: ...
Evaluation: ...
Two columns