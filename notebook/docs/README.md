# Case Notebook Markdown Extension Language

Language to write narratives in markdown style.


This is an extension of the markdown language as specified in: https://daringfireball.net/projects/markdown/syntax


# Case

Each case is a set of knots.

# Knot

Knots are equivalent to markdown headers, as specified in https://daringfireball.net/projects/markdown/syntax#header

The following examples present two alternative approaches do declare a knot entitled `Emergency Room`.
```
Emergency Roon
==============
```
alternative:
```
# Emergency Roon
```

A knot can be related to a category, which is specified between parenthesis besides 
the title. For example, to relate the `Emergency Room` to the `information` category.

```
Emergency Roon (information)
============================
```
alternative:
```
# Emergency Roon (information)
```

The category is fundamental to define how the knot is presented. It indicates a template 
that will be used to render the knot when it is played.

# Divert

At any point of the text it is possible to specify a `divert`, i.e., a link that deviates the 
action to another knot. A divert is specified by an arrow followed by its target knot. 
The following example

```
You can ask for more information and advices in the -> Supervisor Room
```

The target after the arrow will be transformed into a link or button. When the user 
clicks on it the flow deviates to the  `== Supervisor Room`==` knot.

# Option

Options have the same role of diverts but they are designed to be arranged together 
as a set of options to be selected by the user. Each option is defined in a line started 
by two bullets `**` or `++`.

After the bullets you can specify the options whose descriptions are, in the simplest 
case, equal to the name of the target knot. For example:  

```
What do you want to do?
** Generate hypothesis
** More information
** Call the supervisor
```

When the description of the options is different than the title of the knot, the description 
can be followed by an arrow and the title of the target knot, as the example:

```
What do you want to do?
** Generate hypothesis -> Generate hypothesis 1
** More information -> More information 1
** Call the supervisor -> Call the supervisor 1a
```
