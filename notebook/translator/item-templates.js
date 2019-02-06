(function() {
Translator.htmlTemplates = {
option:
`<dcc-trigger link='[link].html' label='[display]' [image][location]></dcc-trigger>`,
divert:
`<dcc-link link='[link].html' label='[target]'></dcc-link>`,
talk:
`<dcc-talk character='[character]' speech='[speech]'>
</dcc-talk>`,
input:
`<dcc-input variable='[variable]'[rows][vocabulary]> 
</dcc-input>`,
domain:
`[natural]`,
selctxopen:
`

<dcc-group-selector evaluation='[evaluation]'[states][colors]>

`,
selctxclose:
`

</dcc-group-selector>

`,
selector:
`<dcc-state-selector>[expression]</dcc-state-selector>`
};
})();