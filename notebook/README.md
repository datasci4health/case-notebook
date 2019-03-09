# Case Notebook System and Health Case Examples

## Directory Map

* **author** - Front-end of the authoring environment that runs in the client side. The `author.html` plus the `js/author.js` files are the main modules. The Javascript files of the module are in the `[js]` directory.

* **cases** (temporary) - Cases developed using the authoring tool, composed by a markdown file with the case, plus additional resources, e.g., images. Each directory contains all data of a case. The narrative of a case is inside a markdown `case.md` file in the root of the respective case directory. This is a temporary solution since the cases will be stored in a database.

* **dccs** - Digital Content Components (DCCs) library. The authoring environment and the generated cases use web components to execute active web tasks, e.g., buttons, animations, inputs, etc. These web components follow the DCC standard and are stored in this directory.

* **docs** - General documentation of the system. For example, the markdown extension is documented in this directory.

* **nbextensions** (deprecated) - Previous version of the authoring environment that was an extension of Jupyter.

* **player** - Kernel of the HTML cases player. This kernel is used by the `translator` module to produce the final HTML version of the cases, which have the player kernel inside them.

* **server** - Notebook REST server module. In the current version, it serves the authoring environment managing cases; in the future, it will also serve the player. Details concerning its services and operation are described at [Notebook Server README](server/README.md).

* **shared** (temporary) - Resources (e.g., images) shared among cases. This is a temporary solution since these resources will be stored in a database.

* **templates** - Template families (or sets) containing HTML, CSS, images and Javascript for each knot type. They are used to generate the final cases. Each subdirectory contains a family of templates (or a template set). Details concerning templates are described at [Templates README](templates/README.md).

* **tools** (outdated) - Contains auxiliary tools used in the project. It currently contains an outdated tool that converts CSV files in cases.

* **translator** - Translates the markdown document of a case to the final case executed in the player using HTML, CSS, and Javascript. In the process, it produces an intermediary object representation of the case.

* **version** (temporary) - Files of the previous version of the system, temporarily stored here to be consulted during the migration to the new version.
