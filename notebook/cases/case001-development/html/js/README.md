# Message Paths in the Bus

## Persisted Messages

All the internal paths are mapped to the external paths prefixing the path by: `/execution/<instance id>`, where `<instance id>` is the id of the case instance that is being executed.

### Entity: `dcc-input`
* `set <variable>` \[`/dcc-input/set/<variable>`\] - Notifies the input of a value by the user related to a `<variable>`.

## Messages Not Persisted

Messages to coordinate DCCs.

### Entity: `dcc-block`

Operations:
* `get xstyle` \[`/dcc-block/get/xstyle`\] - Requests to a DCC Styler the styling policy.

  return: \[`/dcc-block/xstyle`\] - one of the following values:
  * `in ` - default style defined inside the DCC;
  * `none` - no style defined;
  * `out` - style defined externally.

### Entity: `dcc-state-selector`

Operations:
* `get states` \[`/dcc-state-selector/get/states`\] - Requests for an upper level DCC (e.g., an aggregattor DCC) or a group coordinator DCC the set of possible states present in the selector.
  
  return: \[`/dcc-state-selector/states`\] - List of states separated by commas.
