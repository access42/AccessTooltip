AccessTooltip
=============

A lightweight Javascript function to make the title attribute accessible for keyboard user.

# Instruction ([French version bellow](#french-version))

## Implementation
Insert the code right before the closing &lt;/body&gt; element of your HTML document. 

	&lt;script type="text/javascript" src="AccessTooltip.js"&gt;&lt;/script&gt;

Then call the function right before the closing &lt;/body&gt; element of your HTML document.

	&lt;script type="text/javascript"&gt;
	AccessTooltip({
		objs : 'a, button, input, textarea, select',
		tooltipClassName : 'Ctooltip',
		toolTipBetween : 5,
		toolTipUp : false,
		mouse : true,
		tempDelay : 4000,
		useAriaDP : false,
		useEscClose : true
	});
	&lt;/script&gt;

## Parameters
- required objs : query selector for elements to set (tagName or any CSS selector)
- required tooltipClassName : tooltip CSS design classname
- required toolTipBetween : distance in pixels between the tooltip and the focused element
- optionnal tooltipUp : false to set the tooltip above, true to set over the focused element
- optionnal mouse : false to ignore, true to set mouse mode(replace native title by tooltip on mouseover)
- optionnal tempDelay : displaying delay in millisecondes ( 0 to ignore)
- optionnal useAriaDP : true to use the tooltip design pattern ARIA
- optionnal useEscClose : true to allow tooltip closed by ESC Key (note : true by default when useAriaDP is set)

## Finally, create a CSS class for the tooltip, for example :

	Ctooltip{
		position:absolute;
		background-color:#FFFFF0;
		border:1px solid gray;
		border-radius:3px;
		padding:3px;
		box-shadow:2px 2px 2px #000;
		color:#000;
		font-size:80%;
	}


## Demonstration

<a href="http://www.access42.net">Access42.net</a>

<a id="french-version"></a>

# Instruction

## Implémentation

Insérer le code de la fonction juste avant la balise de fermeture du &lt;/body&gt; :

	&lt;script type="text/javascript" src="AccessTooltip.js"&gt;&lt;/script&gt;

Puis appeler la fonction de la même manière

	&lt;script type="text/javascript"&gt;
		AccessTooltip({
			objs : 'a, button, input, textarea, select',
			tooltipClassName : 'Ctooltip',
			toolTipBetween : 5,
			toolTipUp : false,
			mouse : true,
			tempDelay : 4000,
			useAriaDP : false,
			useEscClose : true
		});
	&lt;/script&gt;

## Paramètres
- requis objs : liste des sélecteurs CSS correspondant aux éléments à traiter.
- requis tooltipClassName : classe CSS utilisée pour la bulle d'aide
- requis toolTipBetween : décalage vertical, en pixel, entre la bulle d'aide et l'élément selectionné
- optionnel tooltipUp : false pour faire apparaitre la bulle d'aide en dessous de l'élément selectionné, true pour la faire apparaitre au dessus
- optionnel mouse : true pour remplacer, à la souris, le title par la bulle d'aide
- optionnel tempDelay : temps d'affichage de la bulle d'aide en millisecondes (0 pour qu'elle reste visible jusqu'à la perte de focus)
- optionnel useAriaDP : true pour utiliser le design pattern ARIA tooltip
- optionnel useEscClose : true pour autoriser la fermeture de l'infobulle via la touche ESC (true par défaut avec le DP ARIA tooltip)

## Enfin créer une classe CSS pour l'infobulle, par exemple :

	Ctooltip{
		position:absolute;
		background-color:#FFFFF0;
		border:1px solid gray;
		border-radius:3px;
		padding:3px;
		box-shadow:2px 2px 2px #000;
		color:#000;
		font-size:80%;
	}

## Démonstration

<a href="http://www.access42.net">Access42.net</a>