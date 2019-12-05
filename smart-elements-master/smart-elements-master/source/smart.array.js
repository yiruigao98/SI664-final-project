
/* Smart HTML Elements v4.6.0 (2019-Oct) 
Copyright (c) 2011-2019 jQWidgets. 
License: https://htmlelements.com/license/ */

Smart("smart-array",class extends Smart.BaseElement{static get properties(){return{arrayIndexingMode:{value:"LabVIEW",allowedValues:["LabVIEW","JavaScript"],type:"string"},changeProperty:{value:null,type:"function?"},columns:{value:1,type:"number"},customWidgetDefaultValue:{value:null,type:"any?"},dimensions:{value:1,type:"number"},elementHeight:{value:25,type:"number"},elementTemplate:{value:null,type:"function?"},elementWidth:{value:75,type:"number"},getElementValue:{value:null,type:"function?"},indexerHeight:{value:25,type:"number"},indexerWidth:{value:50,type:"number"},messages:{value:{en:{callbackFunctionRequired:"smart-array: When \"type\" is 'custom', the {{callback}} callback function has to be implemented."}},type:"object",extend:!0},rows:{value:1,type:"number"},setElementValue:{value:null,type:"function?"},showHorizontalScrollbar:{value:!1,type:"boolean"},showIndexDisplay:{value:!1,type:"boolean"},showSelection:{value:!1,type:"boolean"},showVerticalScrollbar:{value:!1,type:"boolean"},type:{value:"none",allowedValues:["none","boolean","numeric","string","custom"],type:"string"},value:{value:null,type:"array?",reflectToAttribute:!1}}}static get listeners(){return{resize:"_resizeHandler","horizontalScrollbar.change":"_scrollbarChangeHandler","horizontalScrollbar.click":"_scrollbarClickHandler","verticalScrollbar.change":"_scrollbarChangeHandler","verticalScrollbar.click":"_scrollbarClickHandler"}}static get requires(){return{"Smart.NumericTextBox":"smart.numerictextbox.js","Smart.ScrollBar":"smart.scrollbar.js","Smart.SwitchButton":"smart.switchbutton.js","Smart.TextBox":"smart.textbox.js"}}template(){return`<div>
                    <div id="indexerContainer" class="smart-indexer-container smart-hidden"></div>
                    <div id="bigContainer" class="smart-big-container smart-array-background">
                        <div id="centralContainer">
                            <div id="mainContainer" class="smart-main-container"></div>
                            <div id="horizontalScrollbarContainer" class="smart-scrollbar-container-horizontal smart-hidden">
                                <smart-scroll-bar id="horizontalScrollbar" animation="[[animation]]" min="0" max="0" value="0" step="1"></smart-scroll-bar>
                            </div>
                        </div>
                        <div id="verticalScrollbarContainer" class="smart-scrollbar-container-vertical smart-hidden">
                            <smart-scroll-bar id="verticalScrollbar" animation="[[animation]]" orientation="vertical" min="0" max="0" value="0" step="1"></smart-scroll-bar>
                        </div>
                    </div>
                </div>`}ready(){super.ready();const e=this;e._id=e.getAttribute("id")||Math.round(1e4*Math.random()),e._cachedWidth=e.offsetWidth,e._cachedHeight=e.offsetHeight,e._coordinates=[],e._getDefaultCellValue(),e._validateProperties(),e._addInitialDimensions(),"none"!==e.type&&(e._addElementStructure(),e._structureAdded=!0,e._initializeElements(!1)),e._getInitialFill(),e._updateWidgetWidth(),e._updateWidgetHeight(),e._cachedWidth=e.offsetWidth,e._cachedHeight=e.offsetHeight}addDimension(e){const l=this;if(!0!==l._suppressDimensionChange&&32===l.dimensions)return;const t=document.createElement("smart-numeric-text-box");t.className="smart-array-indexer",t.style.height=l.indexerHeight+"px",t.inputFormat="integer",t.spinButtons=!0,t.min=0,t.max=4294967295,t.disabled=l.disabled,t.animation=l.animation,t.validation="interaction",t.wordLength="uint64",t.onReady=function(){t.$upButton.addClass("smart-array-indexer-increment"),t.$downButton.addClass("smart-array-indexer-decrement")},l.$.indexerContainer.insertBefore(t,l.$.indexerContainer.children?l.$.indexerContainer.children[0]:null),t.$.listen("change",l._indexerChangeHandler.bind(l)),l._dimensions.push({index:l._dimensions.length,indexer:t}),"LabVIEW"===l.arrayIndexingMode?(l._indexers.unshift(t),l._coordinates.unshift(0)):(l._indexers.push(t),l._coordinates.push(0)),t.dimension=l._indexers.length-1,!0!==l._suppressDimensionChange&&(l.dimensions+=1,l.$.fireEvent("dimensionChange",{type:"add"})),!0!==l._initialDimensions&&!1!==e&&(l._validateValueArrayDimensions(),"LabVIEW"===l.arrayIndexingMode?l._filledUpTo.unshift(0):l._filledUpTo.push(0),!0===l._oneDimensionSpecialCase&&(l._oneDimensionSpecialCase=!1,l.$.verticalScrollbar.value=0,l._scroll())),l._absoluteSelectionStart!==void 0&&("LabVIEW"===l.arrayIndexingMode?l._absoluteSelectionStart.unshift(0):l._absoluteSelectionStart.push(0)),l._absoluteSelectionEnd!==void 0&&("LabVIEW"===l.arrayIndexingMode?l._absoluteSelectionEnd.unshift(0):l._absoluteSelectionEnd.push(0)),l._initialDimensions||l._refreshSelection(),!1===l._suppressDimensionChange&&!0===l.showIndexDisplay&&l.dimensions*(l.indexerHeight+4)-2>l._cachedHeight&&l._updateWidgetHeight("dimensions")}clearSelection(){const e=this;e._absoluteSelectionStart=void 0,e._absoluteSelectionEnd=void 0,e.showSelection&&e._clearSelection()}copyElementValueToClipboard(e,l){const t=this,n=t._getValueInCell(e,l);if(n!==void 0)try{const e=document.createElement("input");e.type="text",e.style.position="absolute",e.value=n,t.appendChild(e),e.focus(),e.setSelectionRange(0,e.value.length),document.execCommand("copy"),t.removeChild(e)}catch(e){}}deleteColumn(e){const l=this,t="LabVIEW"===l.arrayIndexingMode;let n;if(e=Math.max(0,e),n=t?l._filledUpTo[l._filledUpTo.length-1]:l._filledUpTo[0],e>n)return;if(0===n||l._oneDimensionSpecialCase&&0===e)return void l.emptyArray();const i=JSON.stringify(l.value);let a,s;if(t){a=l.dimensions-1,s=e+l._coordinates[a];const t=function(e,l){if(a!==l)for(let n=0;n<e.length;n++)t(e[n],l+1);else e.splice(s,1)};t(l.value,0)}else a=0,s=e+l._coordinates[0],l.value.splice(s,1);JSON.stringify(l.value)!==i&&(l._filledUpTo[a]--,l._scroll(),l.$.fireEvent("change",{value:l.value,oldValue:JSON.parse(i)}),l._setMaxValuesOfScrollBars())}deleteRow(e){const l=this,t=JSON.stringify(l.value),n="LabVIEW"===l.arrayIndexingMode;let i,a,s;if(e=Math.max(0,e),s=n?l._filledUpTo[l._filledUpTo.length-2]:l._filledUpTo[1],!(e>s)){if(0===s)return void l.emptyArray();if(1===l.dimensions){if(!l._oneDimensionSpecialCase)return void(0===e&&l.emptyArray());l.value.splice(e+l._coordinates[0],1),l._filledUpTo[0]--}else{if(n){i=l.dimensions-2,a=e+l._coordinates[i];const t=function(e,l){if(i!==l)for(let n=0;n<e.length;n++)t(e[n],l+1);else e.splice(a,1)};t(l.value,0)}else{i=1,a=e+l._coordinates[1];for(let e=0;e<l.value.length;e++){const t=l.value[e];t.splice(a,1)}}l._filledUpTo[i]--}t!==JSON.stringify(l.value)&&(l._scroll(),l.$.fireEvent("change",{value:l.value,oldValue:JSON.parse(t)}),l._setMaxValuesOfScrollBars())}}emptyArray(){const e=this;if("none"!==e.type){const l=e._cells,t=e.value;if(e.value=e._returnEmptyArray(),JSON.stringify(t)!==JSON.stringify(e.value)){for(let t=0;t<l.length;t++)for(let n=0;n<l[t].length;n++){const i=l[t][n].widget,a={x:n,y:t},s=e._getDefaultValue();i.classList.add("smart-array-element-empty"),e._areDifferent(e._getElementValue(i,a),s)&&(i.supressChange=!0,e._setElementValue(s,i,a))}e._getInitialFill(),e.clearSelection(),e.$.fireEvent("change",{value:e.value,oldValue:t})}}}endSelection(e,l){var t=Math.min;const n=this;if(void 0===n._absoluteSelectionStart)return;n._absoluteSelectionEnd=n._coordinates.slice(0);const a=n.dimensions;"LabVIEW"===n.arrayIndexingMode?(n._absoluteSelectionEnd[a-1]=t(l,n._filledUpTo[a-1]),1<a&&(n._absoluteSelectionEnd[a-2]=t(e,n._filledUpTo[a-2]))):(n._absoluteSelectionEnd[0]=t(l,n._filledUpTo[0]),1<a&&(n._absoluteSelectionEnd[1]=t(e,n._filledUpTo[1])));let s=!0;for(let t=0;t<a;t++)s=s&&n._absoluteSelectionStart[t]<=n._absoluteSelectionEnd[t];s?n._refreshSelection():(n._absoluteSelectionStart=void 0,n._absoluteSelectionEnd=void 0)}getElement(e,l){const t=this._cells;return void 0===t[e]||void 0===t[e][l]?void 0:t[e][l].widget}getElementSize(){const e=this;return{width:e.elementWidth,height:e.elementHeight}}getIndexerValue(){const e=this._indexers,l=[];for(let t=0;t<e.length;t++)l.push(e[t].val());return l}hitTest(e,l){const t=this,n=document.elementFromPoint(e,l);if(t.contains(n)){const e=n.closest(".smart-array-element"),l=n.closest(".smart-array-indexer");if(null!==e)return{type:"element",htmlElement:e,row:e.row,column:e.col};if(null!==l){let e=l.dimension;return"LabVIEW"===t.arrayIndexingMode&&(e=t.dimensions-e-1),{type:"indexer",htmlElement:l,dimension:e}}return{type:"array",htmlElement:t}}}insertColumnBefore(e,l){const t=this,n=JSON.stringify(t.value),i="LabVIEW"===t.arrayIndexingMode;let a;if(i&&!0!==l)return void t.insertRowBefore(e,!0);if(1!==t.dimensions){const l=t._filledUpTo.slice(0);if(i){a=e+t._coordinates[t.dimensions-2];const n=t.dimensions-2,s=function(e,l){if(n!==l)for(let t=0;t<e.length;t++)s(e[t],l+1);else e.splice(a,0,[])};s(t.value,0),l[n]++}else a=e+t._coordinates[0],t.value.splice(a,0,t._returnEmptyArray()[0]),l[0]++;t._fillValueArray(l,!0)}else if(i===t._oneDimensionSpecialCase)t.value.splice(e+t._coordinates[0],0,t._getDefaultValue()),t._scroll(),t._filledUpTo[0]++;else return;t.$.fireEvent("change",{value:t.value,oldValue:JSON.parse(n)}),t._setMaxValuesOfScrollBars()}insertRowBefore(e,l){const t=this,n=JSON.stringify(t.value),i="LabVIEW"===t.arrayIndexingMode;if(i&&!0!==l)return void t.insertColumnBefore(e,!0);if(1!==t.dimensions){const l=t._filledUpTo.slice(0);let n;if(i){const i=t.dimensions-1;n=e+t._coordinates[i];const a=function(e,l){if(i!==l)for(let t=0;t<e.length;t++)a(e[t],l+1);else e.splice(n,0,t._getDefaultValue())};a(t.value,0),l[i]++}else{n=e+t._coordinates[1];for(let e=0;e<t.value.length;e++){const l=t.value[e];l.splice(n,0,void 0)}l[1]++}t._fillValueArray(l,!0)}else if(i&&!t._oneDimensionSpecialCase||!i&&t._oneDimensionSpecialCase)t.value.splice(e+t._coordinates[0],0,t._getDefaultValue()),t._scroll(),t._filledUpTo[0]++;else return;t.$.fireEvent("change",{value:t.value,oldValue:JSON.parse(n)}),t._setMaxValuesOfScrollBars()}reinitializeArray(){const e=this;if("none"===e.type)return;const l=e.dimensions,t=JSON.stringify(e.value);if(1===e.dimensions)e.value.fill(e._getDefaultValue());else{const t=function(n,a){for(let s=0;s<n.length;s++)a===l?n[s]=e._getDefaultValue():t(n[s],a+1)};t(e.value,1)}t!==JSON.stringify(e.value)&&(e._scroll(),e.$.fireEvent("change",{value:e.value,oldValue:JSON.parse(t)}))}removeDimension(e,l){const t=this,n=t._dimensions.length-1;if(2>t._dimensions.length)return;if(2===t._dimensions.length){const e=t.rows;t.rows=1,t._changeRowsColumns("rows",e,1,void 0,!0)}t.$.indexerContainer.removeChild(t._dimensions[n].indexer),t._dimensions.pop();let i;"LabVIEW"===t.arrayIndexingMode?(i=t._coordinates[0],t._indexers.splice(0,1),t._coordinates.splice(0,1)):(i=t._coordinates[n],t._indexers.pop(),t._coordinates.pop()),!0!==t._suppressDimensionChange&&(t.dimensions-=1,t.$.fireEvent("dimensionChange",{type:"remove"})),!1!==l&&(t._removeDimensionFromJSArray(),"LabVIEW"===t.arrayIndexingMode?t._filledUpTo.splice(0,1):t._filledUpTo.pop()),t._absoluteSelectionStart!==void 0&&("LabVIEW"===t.arrayIndexingMode?t._absoluteSelectionStart.splice(0,1):t._absoluteSelectionStart.pop()),t._absoluteSelectionEnd!==void 0&&("LabVIEW"===t.arrayIndexingMode?t._absoluteSelectionEnd.splice(0,1):t._absoluteSelectionEnd.pop()),0<i&&t._scroll(),(1<t.dimensions&&!1===t._suppressDimensionChange&&!0===t.showIndexDisplay&&(t.dimensions+1)*(t.indexerHeight+4)-2>=t._cachedHeight||1===t.dimensions&&!0!==e)&&(t._updateWidgetHeight("dimensions"),1===t.dimensions&&t.showVerticalScrollbar&&t._showVerticalScrollbar(!1))}reset(e){const l=this;if("none"===l.type&&!0!==e)return;l.type="none";let t=l.rows;l.rows=1,l._changeRowsColumns("rows",t,1,!0),t=l.columns,l.columns=1,l._changeRowsColumns("columns",t,1);const n=l._cells[0][0];n.widget.$.unlisten("change"),n.widget.$.unlisten("click"),n.td.innerHTML="",l._table.classList.add("smart-hidden"),l._defaultValue=void 0;const i=l.value;l.value=null,l.$.fireEvent("change",{value:l.value,oldValue:i}),l.$.horizontalScrollbar.max=0,l.$.horizontalScrollbar.value=0,l.$.verticalScrollbar.max=0,l.$.verticalScrollbar.value=0}resizeElement(e,l){const t=this;if(e=parseInt(e,10),l=parseInt(l,10),e!==t.elementWidth||l!==t.elementHeight){if(e===t.elementWidth)return void t.setRowHeight(l);if(l===t.elementHeight)return void t.setColumnWidth(e);const n=t.getElementsByClassName("smart-array-element-"+t._id);if(t.elementWidth=e,t.elementHeight=l,"none"!==t.type){if(t._updateWidgetWidth(),t._updateWidgetHeight(),"custom"!==t.type)for(let t=0;t<n.length;t++)n[t].style.width=e+"px",n[t].style.height=l+"px";else if(t.changeProperty)t.changeProperty("width",e,n),t.changeProperty("height",l,n);else try{t.warn(t.localize("callbackFunctionRequired",{callback:"changeProperty"}))}catch(e){}t.$.fireEvent("sizeChange",{width:e,height:l})}}}selectAll(){const e=this;if(("LabVIEW"!==e.arrayIndexingMode||-1!==e._filledUpTo[0])&&("JavaScript"!==e.arrayIndexingMode||-1!==e._filledUpTo[e._filledUpTo.length-1])){const l=Array(e.dimensions);l.fill(0),e._absoluteSelectionStart=l,e._absoluteSelectionEnd=e._filledUpTo.slice(0),e._refreshSelection()}}selectElement(e,l){const t=this;t.startSelection(e,l),t.endSelection(e,l)}setColumnWidth(e,l){const t=this;if(e=parseInt(e,10),e!==t.elementWidth||!0===l){const l=t.getElementsByClassName("smart-array-element-"+t._id);if(t.elementWidth=e,"none"!==t.type){if("custom"!==t.type)for(let t=0;t<l.length;t++)l[t].style.width=e+"px";else if(t.changeProperty)t.changeProperty("width",e,l);else try{t.warn(t.localize("callbackFunctionRequired",{callback:"changeProperty"}))}catch(e){}t._updateWidgetWidth(),t.$.fireEvent("sizeChange",{width:e,height:t.elementHeight})}}}setDefaultValue(e){const l=this;l._areDifferent(e,l._defaultValue)&&(l._defaultValue=e,l._scroll())}setIndexerValue(e){const l=this;let t=!1;for(let n=0;n<e.length;n++){const i=e[n].index,a="LabVIEW"===l.arrayIndexingMode?l.dimensions-i-1:i,s=e[n].value,o=l._indexers[i];o!==void 0&&s!==l._coordinates[i]&&(t=!0,o.val(s),l._coordinates[i]=s,"none"!==l.type&&(0===a||1===a)&&l._syncScrollbar(a,s))}!0==t&&l._scroll()}setRowHeight(e,l){const t=this;if(e=parseInt(e,10),e!==t.elementHeight||!0===l){const l=t.getElementsByClassName("smart-array-element-"+t._id);if(t.elementHeight=e,"none"!==t.type){if("custom"!==t.type)for(let t=0;t<l.length;t++)l[t].style.height=e+"px";else if(t.changeProperty)t.changeProperty("height",e,l);else try{t.warn(t.localize("callbackFunctionRequired",{callback:"changeProperty"}))}catch(e){}t._updateWidgetHeight(),t.$.fireEvent("sizeChange",{width:t.elementWidth,height:e})}}}showLastElement(){const e=this,l=[];let t,n;if("none"!==e.type){if(1===e.dimensions){const l=parseFloat(e._indexers[0].value),t=e._oneDimensionSpecialCase?e.rows:e.columns,n=e._filledUpTo[0];return void((l+t<n+1||l>n)&&e.setIndexerValue([{index:0,value:n}]))}"LabVIEW"===e.arrayIndexingMode?(t=e.dimensions-1,n=e.dimensions-2):(t=0,n=1);for(let a,s=0;s<e.dimensions;s++){if(a=e._filledUpTo[s],s===t){const l=parseFloat(e._indexers[s].value);l+e.columns<a+1||l>a||(a=l)}else if(s===n){const l=parseFloat(e._indexers[s].value);l+e.rows<a+1||l>a||(a=l)}l.push({index:s,value:a})}e.setIndexerValue(l)}}startSelection(e,l){const t=this;t._absoluteSelectionStart=t._coordinates.slice(0),1===t.dimensions?t._absoluteSelectionStart[0]=l:"LabVIEW"===t.arrayIndexingMode?(t._absoluteSelectionStart[t.dimensions-1]=l,t._absoluteSelectionStart[t.dimensions-2]=e):(t._absoluteSelectionStart[0]=l,t._absoluteSelectionStart[1]=e),t._absoluteSelectionEnd=void 0}toggleElementGap(){const e=this;if("none"===e.type)return;let l;e._elementGap===void 0&&(e._elementGap=!1),e._elementGap?(l="remove",e._elementGap=!1):(l="add",e._elementGap=!0);for(let t=0;t<e.rows;t++)for(let n=0;n<e.columns;n++)e._cells[t][n].td.classList[l]("smart-array-table-data-gap");e._updateWidgetWidth(),e._updateWidgetHeight()}transposeArray(){const e=this;if(2===e.dimensions){const l=e.value[0].map(function(l,t){return e.value.map(function(e){return e[t]})}),t=JSON.stringify(e.value);e.value=l,e._scroll(),e.$.fireEvent("change",{value:l,oldValue:JSON.parse(t)}),e._filledUpTo.reverse()}}val(e,l){const t=this;let n;if(2===arguments.length){if("none"===t.type)return;n=JSON.stringify(t.value);let a,i=t.value;for(a=0;a<t.dimensions-1;a++){let e=l[a];e===void 0&&(e=0,l[a]=0),i[e]===void 0&&(i[e]=[]),i=i[e]}let s=l[a];s===void 0&&(s=0,l[a]=0),t._areDifferent(i[s],e)&&(i[s]=e,t._fillValueArray(l.slice(0)),t.$.fireEvent("change",{value:t.value,oldValue:JSON.parse(n),dimensionIndexes:l}))}else if(void 0!==e&&("object"!=typeof e||0!==Object.keys(e).length)){if("none"===t.type)return;const l=JSON.stringify(t.value);l!==JSON.stringify(e)&&(n=t.value,t.value=e,t._validateValue(),l!==JSON.stringify(t.value)&&(t._scroll(),t._getInitialFill(),t.$.fireEvent("change",{value:t.value,oldValue:n})))}else return t.value}propertyChangedHandler(e,l,t){super.propertyChangedHandler(e,l,t);const n=this;if(t!==l)switch(e){case"arrayIndexingMode":n.arrayIndexingMode=l;break;case"columns":case"rows":n._changeRowsColumns(e,l,t);break;case"customWidgetDefaultValue":"custom"===n.type&&(n._defaultValue=t,n._scroll());break;case"dimensions":n._addRemoveMultipleDimensions(l,t);break;case"animation":case"disabled":for(let l=0;l<n._indexers.length;l++)n._indexers[l][e]=t;if("none"!==n.type){const l=n.getElementsByClassName("smart-array-element-"+n._id);if("custom"!==n.type)for(let n=0;n<l.length;n++)l[n][e]=t;else if(n.changeProperty)n.changeProperty(e,t,l);else try{n.warn(n.localize("callbackFunctionRequired",{callback:"changeProperty"}))}catch(e){}n._scroll()}break;case"elementHeight":n.setRowHeight(t,!0);break;case"elementTemplate":if("none"!==n.type){const e=n.getElementsByClassName("smart-array-element-"+n._id);for(let l,t=0;t<e.length;t++)l=e[t],n.elementTemplate(l,{x:l.col,y:l.row})}break;case"elementWidth":n.setColumnWidth(t,!0);break;case"indexerHeight":for(let e=0;e<n._indexers.length;e++)n._indexers[e].style.height=t+"px";n._updateWidgetHeight();break;case"indexerWidth":n.$.indexerContainer.style.width=t+"px",n._updateWidgetWidth();break;case"showHorizontalScrollbar":if(!0===n._oneDimensionSpecialCase)return void(n.showHorizontalScrollbar=!1);n._showHorizontalScrollbar(t);break;case"showIndexDisplay":t?n.$indexerContainer.removeClass("smart-hidden"):n.$indexerContainer.addClass("smart-hidden"),n._updateWidgetWidth(),n._updateWidgetHeight("showIndexDisplay");break;case"showSelection":t?n._refreshSelection():n._clearSelection();break;case"showVerticalScrollbar":if(1===n.dimensions&&!1===n._oneDimensionSpecialCase)return void(n.showVerticalScrollbar=!1);n._showVerticalScrollbar(t);break;case"type":n._getDefaultCellValue(),"none"!==l&&"none"!==t?(n._initializeElements(!0),n._updateWidgetWidth(),n._updateWidgetHeight()):"none"===l?(n.value=n._returnEmptyArray(),!0===n._structureAdded?(n._initializeElements(!1),n._table.classList.remove("smart-hidden")):(n._addElementStructure(),n._structureAdded=!0,n._initializeElements(!1)),n.$.centralContainer.style.width="",n.$.bigContainer.style.width="",n.$.mainContainer.style.height="",n.$.bigContainer.style.height="",n._updateWidgetWidth(),n._updateWidgetHeight(),n._getInitialFill()):"none"===t&&n.reset(!0);break;case"value":JSON.stringify(l)!==JSON.stringify(t)&&(n._validateValue(),JSON.stringify(l)!==JSON.stringify(n.value)&&(n._scroll(),n._getInitialFill(),n.$.fireEvent("change",{value:n.value,oldValue:l})));}}_addDimensionToJSArray(e){const l=this;if("LabVIEW"===l.arrayIndexingMode)l.value=[l.value];else{e===void 0&&(e=l.dimensions-1);const t=function(l,n){for(let a=0;a<l.length;a++)n===e?l[a]=[l[a]]:t(l[a],n+1)};t(l.value,1)}}_addElementHandlers(e){const l=this;e.$.listen("change",function(t){if(!0!==e.supressChange||e instanceof Smart.NumericTextBox){e.$.removeClass("smart-array-element-empty");const t=e.col,n=e.row;l._updateValue(n,t,l._getElementValue(e,{x:t,y:n},!0))}else e.supressChange=!1;t.stopPropagation()}),e.$.listen("click",function(){l.$.fireEvent("elementClick",{element:e})})}_addElementStructure(){const e=this;e._cells=[],e._table=document.createElement("table"),e._table.className="smart-array-element-gap";const l=document.createElement("tbody"),t=document.createDocumentFragment();for(let l=0;l<e.rows;l++){const n=document.createElement("tr"),i=document.createDocumentFragment();n.classList.add("smart-array-table-row"),e._cells.push([]);for(let t=0;t<e.columns;t++){const t=document.createElement("td");t.classList.add("smart-array-table-data"),e._elementGap&&t.classList.add("smart-array-table-data-gap"),e._cells[l].push({td:t}),i.appendChild(t)}n.appendChild(i),t.appendChild(n)}l.appendChild(t),e._table.appendChild(l),e.$.mainContainer.appendChild(e._table),e._tableBody=l}_addInitialDimensions(){const e=this,l=e.dimensions;e._dimensions=[],e._indexers=[],e._suppressDimensionChange=!0,e._initialDimensions=!0;for(let t=0;t<l;t++)e.addDimension();e._suppressDimensionChange=!1,e._initialDimensions=!1}_addRemoveColumn(e){const l=this;if("add"===e){const e=l._tableBody.children;for(let t=0;t<l._cells.length;t++){const n=l._cells[t],i=document.createElement("td");i.classList.add("smart-array-table-data"),l._elementGap&&i.classList.add("smart-array-table-data-gap"),n.push({td:i}),e[t].appendChild(i),l._initializeWidget(t,n.length-1)}l.columns++,!0!==l._suppressScroll&&l._scroll()}else if("remove"===e&&1<l.columns){for(let e=0;e<l._cells.length;e++){const t=l._cells[e],n=t[t.length-1];n.widget.$.unlisten("change"),n.widget.$.unlisten("click"),n.td.parentElement.removeChild(n.td),t.pop()}l.columns--}}_addRemoveMultipleDimensions(e,l,t){const n=this;if((1>l||32<l)&&(n.dimensions=1,n.dimensions===e))return;let i=n.dimensions-e;if(n._suppressDimensionChange=!0,0<i){do n.addDimension(t),i-=1;while(0<i);n.$.fireEvent("dimensionChange",{type:"add"})}else if(0>i){if(1===l){const t=n.rows;n.rows=1,n.dimensions=e,n._changeRowsColumns("rows",t,1,void 0,!0),n.dimensions=l}do n.removeDimension(!0,t),i+=1;while(0>i);n.$.fireEvent("dimensionChange",{type:"remove"}),1===l&&n.showVerticalScrollbar&&n._showVerticalScrollbar(!1)}else return;n._suppressDimensionChange=!1,(!0!==n.showIndexDisplay||1!==l&&(0<l-e&&l*(n.indexerHeight+4)-2<n._cachedHeight||0>l-e&&e*(n.indexerHeight+4)-2<n._cachedHeight))&&1!==l||n._updateWidgetHeight("dimensions")}_addRemoveRow(e){const l=this;if("add"===e&&(1<l.dimensions||1===l.dimensions&&1===l.columns)){l._cells.push([]);const e=document.createElement("tr"),t=document.createDocumentFragment(),n=l._cells.length-1,a=[];e.classList.add("smart-array-table-row");for(let e=0;e<l.columns;e++){const e=document.createElement("td");e.classList.add("smart-array-table-data"),l._elementGap&&e.classList.add("smart-array-table-data-gap"),l._cells[n].push({td:e}),a.push(e),t.appendChild(e)}e.appendChild(t),l._tableBody.appendChild(e);for(let e=0;e<a.length;e++)l._initializeWidget(n,e);l.rows++,!0!==l._suppressScroll&&l._scroll()}else if("remove"===e&&1<l.rows){const e=l._tableBody.children[l._tableBody.children.length-1],t=l._cells[l._cells.length-1];for(let e=0;e<t.length;e++)t[e].widget.$.unlisten("change"),t[e].widget.$.unlisten("click");l._tableBody.removeChild(e),l._cells.pop(),l.rows--}}_addSelectionClass(e,l,t,n){const i=this;i.showSelection&&i._absoluteSelectionStart!==void 0&&i._absoluteSelectionEnd!==void 0&&(!1===n&&i._inSelection(e,l)?t.classList.add("smart-array-element-selected"):t.classList.remove("smart-array-element-selected"))}_areDifferent(e,l){if(e instanceof Date){if(l instanceof Date)return e.getTime()!==l.getTime();if("string"==typeof l)try{return e.getTime()!==new Date(l).getTime()}catch(e){}return!0}if(l instanceof Date){if("string"==typeof e)try{return l.getTime()!==new Date(e).getTime()}catch(e){}return!0}return"object"!=typeof e||typeof e!=typeof l?e!==l:JSON.stringify(e)!==JSON.stringify(l)}_changeRowsColumns(e,l,t,n,i){const a=this,s="_addRemove"+e.charAt(0).toUpperCase()+e.slice(1,e.length-1);if(1>t&&(a[e]=1,a[e]===l))return;if(1===a.dimensions)if(!0===a._oneDimensionSpecialCase){if("columns"===e&&1<a[e]){if(1<a.rows)return void(a.columns=1);a._oneDimensionSpecialCase=!1,a.showVerticalScrollbar&&(a._showVerticalScrollbar(!1),a._showHorizontalScrollbar(!0))}}else if("rows"===e){if(1<a.columns)return void(a.rows=1);1<a.rows&&(a._oneDimensionSpecialCase=!0,!0===a.showHorizontalScrollbar&&(a._showHorizontalScrollbar(!1),a._showVerticalScrollbar(!0)))}let o=a[e]-l;if(a[e]=l,0<o){a._suppressScroll=!0;do a[s]("add"),o-=1;while(0<o);a._suppressScroll=!1,a._scroll()}else if(0>o)do a[s]("remove"),o+=1;while(0>o);a.$.fireEvent("arraySizeChange",{type:e,number:a[e],oldNumber:l}),"columns"===e?(a._updateWidgetWidth(),a._setMaxValuesOfScrollBars("horizontal")):"rows"==e&&!0!==i&&(a._updateWidgetHeight(!0===n?"dimensions":void 0),a._setMaxValuesOfScrollBars("vertical"))}_clearSelection(){const e=this;for(let l=0;l<e.rows;l++)for(let t=0;t<e.columns;t++)e._cells[l][t].td.classList.remove("smart-array-element-selected")}_cloneValue(e){if("object"!=typeof e)return e;return e instanceof Date?new Date(e.getTime()):Array.isArray(e)||e instanceof Object?JSON.parse(JSON.stringify(e)):void 0}_fillValueArray(e,l){function t(l,s){for(let o=0;o<=e[s];o++)s===a-1?void 0===l[o]&&(l[o]=n._getDefaultValue()):(void 0===l[o]&&(l[o]=[]),t(l[o],s+1))}const n=this,a=n.dimensions;if(n._filledUpTo!==void 0&&!0!==l){let l=!0;for(let t=0;t<e.length;t++)l=l&&n._filledUpTo[t]>=e[t],e[t]=Math.max(e[t],n._filledUpTo[t]);if(!0==l)return void n._scroll()}n._filledUpTo=e.slice(0),t(n.value,0),n._scroll(),n._setMaxValuesOfScrollBars()}_getDefaultCellValue(){const e=this;switch(e.type){case"custom":e._defaultValue=null===e.customWidgetDefaultValue?void 0:e.customWidgetDefaultValue;break;case"numeric":e._defaultValue=0;break;case"boolean":e._defaultValue=!1;break;case"string":e._defaultValue="";}}_getDefaultValue(){const e=this;return e._cloneValue(e._defaultValue)}_getElementValue(e,l,t){const n=this;let i;return i=n.getElementValue?n.getElementValue(e,l):"boolean"===n.type?e.checked:e.value,!0===t?n._cloneValue(i):i}_getInitialFill(){const e=this;if(e._filledUpTo=[],"none"!==e.type){let l=e.value;for(let t=0;t<e.dimensions;t++){const n=l.length-1;e._filledUpTo[t]=n,l=l[n]}e._setMaxValuesOfScrollBars()}}_getMaxValuesOfScrollBars(e){const l=this,t=l._filledUpTo.length;let n,i,a,s=0;return("horizontal"===e?(a=l.$.horizontalScrollbar.value,n="LabVIEW"===l.arrayIndexingMode?l._filledUpTo[t-1]:l._filledUpTo[0],i=l.columns):(a=l.$.verticalScrollbar.value,n=l._oneDimensionSpecialCase?"LabVIEW"===l.arrayIndexingMode?l._filledUpTo[t-1]:l._filledUpTo[0]:"LabVIEW"===l.arrayIndexingMode?l._filledUpTo[t-2]:l._filledUpTo[1],i=l.rows),void 0===n)?0:(s=n-i+2,Math.max(s,a))}_getValueInCell(e,l){const t=this,n=t.value,i=t._coordinates,a=i.length;let s;if(1===a)s=!1===t._oneDimensionSpecialCase?n[l+i[0]]:n[e+i[0]];else{const o=i.slice(0);"LabVIEW"===t.arrayIndexingMode?(o[a-1]+=l,o[a-2]+=e):(o[0]+=l,o[1]+=e);const r=n[o[0]];if(r!==void 0){const e=r[o[1]];if(void 0!==e&&(s=e,2<a))for(let e=2;e<a&&void 0!==s;e++)s=s[o[e]]}}return s}_indexerChangeHandler(e){const l=this,t=l.context;l.context=l;const n=e.target.dimension,i="LabVIEW"===l.arrayIndexingMode?l.dimensions-n-1:n,a=parseFloat(e.detail.value);l._coordinates[i]=a,l._scroll(),"none"!==l.type&&(0===n||1===n)&&l._syncScrollbar(n,a),e.stopPropagation(),l.context=t}_initializeElements(e){function l(e){t.elementTemplate&&t.elementTemplate(e,{x:e.col,y:e.row})}const t=this,n=t._cells;if(t._initializeElement=function(){},"custom"!==t.type)switch(t.type){case"numeric":t._initializeElement=function(e,n){e.style.width=t.elementWidth+"px",e.style.height=t.elementHeight+"px",e.disabled=t.disabled,e.animation=t.animation,e.inputFormat="floatingPoint",e.spinButtons=!0,e.value=n,l(e)};break;case"boolean":t._initializeElement=function(e,n){e.style.width=t.elementWidth+"px",e.style.height=t.elementHeight+"px",e.disabled=t.disabled,e.animation=t.animation,e.checked=n,l(e)};break;case"string":t._initializeElement=function(e,n){e.style.width=t.elementWidth+"px",e.style.height=t.elementHeight+"px",e.disabled=t.disabled,e.animation=t.animation,e.value=n,l(e)};}else t._initializeElement=function(e,l){if(t.elementTemplate){const n={x:e.col,y:e.row};t.elementTemplate(e,n),void 0!==l&&t._setElementValue(l,e,n)}else t.error(t.localize("callbackFunctionRequired",{callback:"elementTemplate"}))};for(let l=0;l<n.length;l++)for(let i=0;i<n[l].length;i++){if(!0===e){const e=n[l][i];e.widget.$.unlisten("change"),e.widget.$.unlisten("click"),e.td.innerHTML=""}t._initializeWidget(l,i)}}_initializeWidget(e,l){const t=this,n=t._cells[e][l],i=t._getValueInCell(e,l);let a;switch(t.type){case"boolean":a=document.createElement("smart-switch-button");break;case"numeric":a=document.createElement("smart-numeric-text-box"),a.validation="interaction";break;case"string":a=document.createElement("smart-text-box");break;case"custom":a=document.createElement("div"),a.$=Smart.Utilities.Extend(a);}a.row=e,a.col=l,n.widget=a,t._initializeElement(a,i===void 0?t._getDefaultValue():i,n),n.td.appendChild(a),a.classList.add("smart-array-element"),a.classList.add("smart-array-element-"+t._id),i===void 0&&a.classList.add("smart-array-element-empty"),t._addElementHandlers(a)}_inSelection(e,l){const t=this,n=t._coordinates;let i,a,s,o,r=!0;if("LabVIEW"===t.arrayIndexingMode?(i=t.dimensions-1,a=t.dimensions-2):(i=0,a=1),t._oneDimensionSpecialCase?s=l+n[i]:(s=e+n[i],o=l+n[a]),1===t.dimensions)return!!(s>=t._absoluteSelectionStart[i]&&s<=t._absoluteSelectionEnd[i]);if(r=!!(s>=t._absoluteSelectionStart[i]&&s<=t._absoluteSelectionEnd[i]&&o>=t._absoluteSelectionStart[a]&&o<=t._absoluteSelectionEnd[a]),"LabVIEW"===t.arrayIndexingMode)for(let e=0;e<a;e++)r=r&&n[e]>=t._absoluteSelectionStart[e]&&n[e]<=t._absoluteSelectionEnd[e];else for(let e=2;e<t.dimensions;e++)r=r&&n[e]>=t._absoluteSelectionStart[e]&&n[e]<=t._absoluteSelectionEnd[e];return r}_moveScrollbar(e,l,t,n){if(isNaN(n))return;const i=this,a=i._getMaxValuesOfScrollBars(l),s=e.max;let o;o="LabVIEW"===i.arrayIndexingMode?i.dimensions-t-1:t,i._indexers[o].val(n),i._coordinates[o]=n,n<=a?e.max=a:n<=s&&(e.max=n),i._scroll(),i.$.fireEvent("scroll",{direction:l})}_refreshSelection(){const e=this;if(e.showSelection)for(let l=0;l<e.rows;l++)for(let t=0;t<e.columns;t++){const n=e._getValueInCell(l,t);e._addSelectionClass(t,l,e._cells[l][t].td,void 0===n)}}_removeDimensionFromJSArray(){const e=this;if("LabVIEW"===e.arrayIndexingMode)e.value=e.value[0];else{const l=e.dimensions+1,t=function(n,a,s,o){for(let r=0;r<n.length;r++)a!==l&&0<n[r].length?t(n[r],a+1,n,r):void 0===s?e.value=e.value[0]:s[o]=n[0]};t(e.value,1)}}_resizeHandler(){const e=this;if(e.offsetWidth!==e._cachedWidth)if("none"!==e.type){const l=e.offsetWidth-e._cachedWidth,t=e.elementWidth;if(Math.abs(l)<t)return void(e.style.width=e._cachedWidth+"px");const n=Math.round(l/t),i=e.columns,a=i+n;e.columns=a,e._changeRowsColumns("columns",i,a)}else e._updateWidgetWidth();if(e._cachedWidth=e.offsetWidth,e.offsetHeight!==e._cachedHeight)if("none"===e.type)e._updateWidgetHeight();else return void(e.style.height=e._cachedHeight+"px");e._cachedHeight=e.offsetHeight}_returnEmptyArray(){const e=this,l=[];let t=l;if(1<e.dimensions)for(let l=1;l<e.dimensions;l++)t[0]=[],t=t[0];return l}_scroll(){const e=this;if("none"!==e.type)for(let l=0;l<e._cells.length;l++)for(let t=0;t<e._cells[l].length;t++){const n=e._getValueInCell(l,t),i=e._cells[l][t].widget,a={x:t,y:l},s=e._getElementValue(i,a);let o;void 0===n?(i.classList.add("smart-array-element-empty"),e._areDifferent(s,e._defaultValue)?(i.supressChange=!0,e._setElementValue(e._getDefaultValue(),i,a)):i.supressChange=!1,o=!0):(i.classList.remove("smart-array-element-empty"),e._areDifferent(s,n)?(i.supressChange=!0,e._setElementValue(n,i,a)):i.supressChange=!1,o=!1),e._addSelectionClass(t,l,e._cells[l][t].td,o)}}_scrollbarChangeHandler(e){const l=this;let t,n;e.stopPropagation();"none"===l.type||(e.target===l.$.horizontalScrollbar?(t="horizontal",n=0):(t="vertical",n=l._oneDimensionSpecialCase?0:1),!0===l._suppressScrollbarEvent?l._suppressScrollbarEvent=!1:l._moveScrollbar(e.target,t,n,Math.round(e.detail.value)),!l._clickTriggered&&(l._changeTriggered=!0,setTimeout(function(){l._changeTriggered=!1},50)))}_scrollbarClickHandler(e){const l=e.target.closest(".smart-scroll-button");if(null===l)return;const t=this,n=l.parentElement.parentElement;if(l===n.$.farButton){if(t._changeTriggered)return;t._clickTriggered=!0,setTimeout(function(){t._clickTriggered=!1},50);const e=n.max;let l=n.value;!0===isNaN(l)&&(l=0),e===l&&(n.max=e+1,n.value=e+1)}}_setElementValue(e,l,t){const n=this;e=n._cloneValue(e),n.setElementValue?(n.setElementValue(e,l,t),!0===l.supressChange&&(l.supressChange=!1)):"boolean"===n.type?l.checked=e:l.value=e}_setMaxValuesOfScrollBars(e){const l=this;l.showHorizontalScrollbar&&(e===void 0||"horizontal"===e)&&(l.$.horizontalScrollbar.max=l._getMaxValuesOfScrollBars("horizontal")),l.showVerticalScrollbar&&(e===void 0||"vertical"===e)&&(l.$.verticalScrollbar.max=l._getMaxValuesOfScrollBars("vertical"))}_showHorizontalScrollbar(e){const l=this;if(l.showHorizontalScrollbar=e,l._updateWidgetHeight("showHorizontalScrollbar"),!0!==e)l.$horizontalScrollbarContainer.addClass("smart-hidden");else if(l.$horizontalScrollbarContainer.removeClass("smart-hidden"),"none"!==l.type){let e;e="LabVIEW"===l.arrayIndexingMode?l.dimensions-1:0,l._syncScrollbar(0,l._coordinates[e])}}_showVerticalScrollbar(e){const l=this;if(l.showVerticalScrollbar=e,l._updateWidgetWidth(!0),!0!==e)l.$verticalScrollbarContainer.addClass("smart-hidden");else if(l.$verticalScrollbarContainer.removeClass("smart-hidden"),"none"!==l.type){let e;e=l._oneDimensionSpecialCase?0:"LabVIEW"===l.arrayIndexingMode?l.dimensions-2:1,l._syncScrollbar(1,l._coordinates[e])}}_syncScrollbar(e,l){const t=this;let n,i;if(0===e&&!1===t._oneDimensionSpecialCase){if(!t.showHorizontalScrollbar)return;n=t._getMaxValuesOfScrollBars("horizontal"),i=t.$.horizontalScrollbar}else{if(!t.showVerticalScrollbar)return;n=t._getMaxValuesOfScrollBars("vertical"),i=t.$.verticalScrollbar}l>n&&(n=l);const a=i.max;a!==n&&(a>n&&(t._suppressScrollbarEvent=!0),i.max=n),i.value!==l&&(t._suppressScrollbarEvent=!0,i.value=l)}_updateValue(e,l,t){const n=this,i=n._getValueInCell(e,l);if(!n._areDifferent(t,i))return;const a=n._coordinates,s=a.slice(0),o=[];"LabVIEW"===n.arrayIndexingMode?(s[s.length-1]+=l,s[s.length-2]+=e):(s[0]+=l,s[1]+=e);for(let r=0;r<n.dimensions;r++)0==r?!1===n._oneDimensionSpecialCase?o.push(s[0]):o.push(e+a[0]):1==r?o.push(s[1]):o.push(s[r]);let r=n.value;for(let n=0;n<o.length;n++)(void 0===r[o[n]]||r[o[n]]===i)&&(n==o.length-1?r[o[n]]=t:r[o[n]]=[]),r=r[o[n]];n._fillValueArray(o.slice(0)),n.$.fireEvent("change",{value:t,oldValue:i,dimensionIndexes:o})}_updateWidgetHeight(e){const l=this,t=l.showHorizontalScrollbar?20:0;let n,i;if(l.showIndexDisplay){const e=parseInt(window.getComputedStyle(l._indexers[0]).marginBottom,10);i=l.dimensions*(l.indexerHeight+e)-e}else i=0;if("none"!==l.type)n=l.$.mainContainer.offsetHeight+t;else{if("showHorizontalScrollbar"===e){const e=l.$.bigContainer.offsetHeight;n=!0===l.showHorizontalScrollbar?e+20:e-20}else n="showIndexDisplay"===e&&!1===l.showIndexDisplay||"dimensions"===e?l.$.bigContainer.offsetHeight:l.offsetHeight;const i=18+t;n<i&&(n=i),l.$.mainContainer.style.height=n-t+"px"}l.$.verticalScrollbarContainer.style.height=n-t+"px",l.$.bigContainer.style.height=n+"px";const a=window.getComputedStyle(l);l._cachedHeight=Math.max(i,n)+parseInt(a.borderTopWidth,10)+parseInt(a.borderBottomWidth,10),"none"!==l.type&&(l.style.minHeight=l._cachedHeight+"px",l.style.maxHeight=l._cachedHeight+"px"),l.style.height=l._cachedHeight+"px"}_updateWidgetWidth(e){const l=this,t=l.showVerticalScrollbar?20:0,n=l.showIndexDisplay?l.indexerWidth:0,i=parseInt(window.getComputedStyle(l.$.bigContainer).marginLeft,10);let a,s,o;if("none"!==l.type)a=l.$.centralContainer.offsetWidth,s=a+t,o=s+n+i;else{o=l.offsetWidth,!0===e&&(!0===l.showVerticalScrollbar?o+=20:o-=20);const r=n+18+t;o<r&&(o=r),s=o-n-i,a=s-t,l.$.centralContainer.style.width=a+"px"}l.$.bigContainer.style.width=s+"px";const r=window.getComputedStyle(l);o+=parseInt(r.borderLeftWidth,10)+parseInt(r.borderRightWidth,10),l.style.width=o+"px",l._cachedWidth=o}_validateProperties(){const e=this;e._oneDimensionSpecialCase=!1,"none"===e.type?(e.rows=1,e.columns=1):(1>e.rows&&(e.rows=1),1>e.columns&&(e.columns=1)),(1>e.dimensions||32<e.dimensions)&&(e.dimensions=1),1===e.dimensions&&(1<e.columns?(e.rows=1,!0===e.showVerticalScrollbar&&(e.showVerticalScrollbar=!1)):1===e.rows?1===e.columns&&1===e.rows&&!0===e.showVerticalScrollbar&&(e.showVerticalScrollbar=!1):(e._oneDimensionSpecialCase=!0,!0===e.showHorizontalScrollbar&&(e.showHorizontalScrollbar=!1))),e._validateValue(),e.showIndexDisplay&&e.$indexerContainer.removeClass("smart-hidden"),e.$.indexerContainer.style.width=e.indexerWidth+"px",e.showHorizontalScrollbar&&e.$horizontalScrollbarContainer.removeClass("smart-hidden"),e.showVerticalScrollbar&&e.$verticalScrollbarContainer.removeClass("smart-hidden")}_validateValue(){const e=this;"none"===e.type?e.value=null:null===e.value||e.value===void 0?e.value=e._returnEmptyArray():e._validateValueArrayDimensions()}_validateValueArrayDimensions(){const e=this;let l=0,t=e.value,n=!1;for(;t.constructor===Array;)if(l++,t=t[0],void 0===t){n=!0;break}if(e.dimensions>l){if(n)return void(e.value=e._returnEmptyArray());for(;e.dimensions>l;)e._addDimensionToJSArray(l),l++}}});