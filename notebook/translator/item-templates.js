(function() {
Translator.htmlTemplates = {
option:
`<dcc-trigger id='dcc[seq]' type='[subtype]' link='[link].html' label='[display]' [image][location]></dcc-trigger>`,
divert:
`<dcc-trigger id='dcc[seq]' type='++' link='[link].html' label='[display]'></dcc-trigger>`,
talk:
`<dcc-talk id='dcc[seq]' character='[character]' speech='[speech]'>
</dcc-talk>`,
talkopen:
`

<dcc-talk id='dcc[seq]' character='[character]'>

`,
talkclose:
`

</dcc-talk>

`,
input:
`<dcc-input id='dcc[seq]' variable='[variable]'[rows][vocabulary]> 
</dcc-input>`,
domain:
`[natural]`,
selctxopen:
`

<dcc-group-selector id='dcc[seq]' evaluation='[evaluation]'[states][colors]>

`,
selctxclose:
`

</dcc-group-selector>

`,
selector:
`<dcc-state-selector id='dcc[seq]'>[expression]</dcc-state-selector>`
};
})();