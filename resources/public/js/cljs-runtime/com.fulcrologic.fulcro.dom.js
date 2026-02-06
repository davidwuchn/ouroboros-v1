goog.provide('com.fulcrologic.fulcro.dom');
goog.scope(function(){
  com.fulcrologic.fulcro.dom.goog$module$goog$object = goog.module.get('goog.object');
});
var module$node_modules$react$index=shadow.js.require("module$node_modules$react$index", {});
var module$node_modules$react_dom$index=shadow.js.require("module$node_modules$react_dom$index", {});





































































































































































































/**
 * Returns true if the given arg is a react element.
 */
com.fulcrologic.fulcro.dom.element_QMARK_ = (function com$fulcrologic$fulcro$dom$element_QMARK_(x){
return module$node_modules$react$index.isValidElement(x);
});
com.fulcrologic.fulcro.dom.child__GT_typed_child = (function com$fulcrologic$fulcro$dom$child__GT_typed_child(child){
if(typeof child === 'string'){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"string","string",-1989541586),child], null);
} else {
if(typeof child === 'number'){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"number","number",1570378438),child], null);
} else {
if(((cljs.core.vector_QMARK_(child)) || (((cljs.core.seq_QMARK_(child)) || (cljs.core.array_QMARK_(child)))))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"collection","collection",-683361892),child], null);
} else {
if((child == null)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"nil","nil",99600501),child], null);
} else {
if(cljs.core.truth_(com.fulcrologic.fulcro.dom.element_QMARK_(child))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"element","element",1974019749),child], null);
} else {
return null;
}
}
}
}
}
});
/**
 * Runtime parsing of DOM tag arguments. Returns a map with keys :css, :attrs, and :children.
 */
com.fulcrologic.fulcro.dom.parse_args = (function com$fulcrologic$fulcro$dom$parse_args(args){
var parse_css = (function com$fulcrologic$fulcro$dom$parse_args_$_parse_css(p__54719){
var vec__54720 = p__54719;
var args__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__54720,(0),null);
var result = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__54720,(1),null);
var pair = vec__54720;
var arg = cljs.core.first(args__$1);
if((arg instanceof cljs.core.Keyword)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.next(args__$1),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(result,new cljs.core.Keyword(null,"css","css",1135045163),arg)], null);
} else {
return pair;
}
});
var parse_attrs = (function com$fulcrologic$fulcro$dom$parse_args_$_parse_attrs(p__54724){
var vec__54725 = p__54724;
var args__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__54725,(0),null);
var result = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__54725,(1),null);
var pair = vec__54725;
var has_arg_QMARK_ = cljs.core.seq(args__$1);
var arg = cljs.core.first(args__$1);
if(((has_arg_QMARK_) && ((arg == null)))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.next(args__$1),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(result,new cljs.core.Keyword(null,"attrs","attrs",-2090668713),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"nil","nil",99600501),null], null))], null);
} else {
if(((cljs.core.object_QMARK_(arg)) && (cljs.core.not(com.fulcrologic.fulcro.dom.element_QMARK_(arg))))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.next(args__$1),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(result,new cljs.core.Keyword(null,"attrs","attrs",-2090668713),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"js-object","js-object",1830199158),arg], null))], null);
} else {
if(((cljs.core.map_QMARK_(arg)) && (cljs.core.not(com.fulcrologic.fulcro.dom.element_QMARK_(arg))))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.next(args__$1),cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(result,new cljs.core.Keyword(null,"attrs","attrs",-2090668713),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map","map",1371690461),arg], null))], null);
} else {
return pair;

}
}
}
});
var parse_children = (function com$fulcrologic$fulcro$dom$parse_args_$_parse_children(p__54729){
var vec__54730 = p__54729;
var args__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__54730,(0),null);
var result = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__54730,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,(function (){var G__54733 = result;
if(cljs.core.seq(args__$1)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__54733,new cljs.core.Keyword(null,"children","children",-940561982),cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(com.fulcrologic.fulcro.dom.child__GT_typed_child,args__$1));
} else {
return G__54733;
}
})()], null);
});
return cljs.core.second(parse_children(parse_attrs(parse_css(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [args,cljs.core.PersistentArrayMap.EMPTY], null)))));
});
/**
 * Equivalent to React.render
 */
com.fulcrologic.fulcro.dom.render = (function com$fulcrologic$fulcro$dom$render(component,el){
return module$node_modules$react_dom$index.render(component,el);
});
/**
 * This fn is outdated - it expects js/ReactDOMServer to be defined (used to be provided cljsjs.react.dom.server).
 *   It is better to do it yourself (under shadow-cljs):
 * 
 * ```clj
 * (ns ex (:require ["react-dom/server" :as react-dom-server] ...))
 * (react-dom-server/renderToString c)
 * ```
 */
com.fulcrologic.fulcro.dom.render_to_str = (function com$fulcrologic$fulcro$dom$render_to_str(c){
return ReactDOMServer.renderToString(c);
});
/**
 * Returns the dom node associated with a component's React ref.
 */
com.fulcrologic.fulcro.dom.node = (function com$fulcrologic$fulcro$dom$node(var_args){
var G__54737 = arguments.length;
switch (G__54737) {
case 1:
return com.fulcrologic.fulcro.dom.node.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return com.fulcrologic.fulcro.dom.node.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.dom.node.cljs$core$IFn$_invoke$arity$1 = (function (component){
return module$node_modules$react_dom$index.findDOMNode(component);
}));

(com.fulcrologic.fulcro.dom.node.cljs$core$IFn$_invoke$arity$2 = (function (component,name){
var G__54739 = component.refs;
var G__54739__$1 = (((G__54739 == null))?null:com.fulcrologic.fulcro.dom.goog$module$goog$object.get(G__54739,name));
if((G__54739__$1 == null)){
return null;
} else {
return module$node_modules$react_dom$index.findDOMNode(G__54739__$1);
}
}));

(com.fulcrologic.fulcro.dom.node.cljs$lang$maxFixedArity = 2);

/**
 * React component that wraps dom/input to prevent cursor madness.
 */
com.fulcrologic.fulcro.dom.Input = com.fulcrologic.fulcro.dom.inputs.StringBufferedInput(new cljs.core.Keyword("com.fulcrologic.fulcro.dom","Input","com.fulcrologic.fulcro.dom/Input",-2041077839),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"string->model","string->model",-134531957),cljs.core.identity,new cljs.core.Keyword(null,"model->string","model->string",-2085451701),cljs.core.identity], null));
/**
 * A wrapped input. Use this when you see the cursor jump around while you're trying to type in an input. Drop-in replacement
 * for `dom/input`.
 * 
 * NOTE: The onChange and onBlur handlers will receive a string value, not an event. If you want the raw event on changes use onInput.
 */
com.fulcrologic.fulcro.dom.ui_input = (function (){var factory = com.fulcrologic.fulcro.components.factory.cljs$core$IFn$_invoke$arity$2(com.fulcrologic.fulcro.dom.Input,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"keyfn","keyfn",780060332),new cljs.core.Keyword(null,"key","key",-1516042587)], null));
return (function (props){
var temp__5823__auto__ = new cljs.core.Keyword(null,"ref","ref",1289896967).cljs$core$IFn$_invoke$arity$1(props);
if(cljs.core.truth_(temp__5823__auto__)){
var ref = temp__5823__auto__;
var G__54742 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(props,new cljs.core.Keyword(null,"ref","ref",1289896967),(function (r){
var G__54743 = (function (){var G__54744 = r;
if((G__54744 == null)){
return null;
} else {
return com.fulcrologic.fulcro.dom.node.cljs$core$IFn$_invoke$arity$1(G__54744);
}
})();
return (ref.cljs$core$IFn$_invoke$arity$1 ? ref.cljs$core$IFn$_invoke$arity$1(G__54743) : ref.call(null, G__54743));
}));
return (factory.cljs$core$IFn$_invoke$arity$1 ? factory.cljs$core$IFn$_invoke$arity$1(G__54742) : factory.call(null, G__54742));
} else {
return (factory.cljs$core$IFn$_invoke$arity$1 ? factory.cljs$core$IFn$_invoke$arity$1(props) : factory.call(null, props));
}
});
})();
/**
 * Create a DOM element for which there exists no corresponding function.
 * Useful to create DOM elements not included in React.DOM. Equivalent
 * to calling `js/React.createElement`
 */
com.fulcrologic.fulcro.dom.create_element = (function com$fulcrologic$fulcro$dom$create_element(var_args){
var G__54751 = arguments.length;
switch (G__54751) {
case 1:
return com.fulcrologic.fulcro.dom.create_element.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return com.fulcrologic.fulcro.dom.create_element.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
var args_arr__5751__auto__ = [];
var len__5726__auto___56561 = arguments.length;
var i__5727__auto___56562 = (0);
while(true){
if((i__5727__auto___56562 < len__5726__auto___56561)){
args_arr__5751__auto__.push((arguments[i__5727__auto___56562]));

var G__56563 = (i__5727__auto___56562 + (1));
i__5727__auto___56562 = G__56563;
continue;
} else {
}
break;
}

var argseq__5752__auto__ = ((((2) < args_arr__5751__auto__.length))?(new cljs.core.IndexedSeq(args_arr__5751__auto__.slice((2)),(0),null)):null);
return com.fulcrologic.fulcro.dom.create_element.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5752__auto__);

}
});

(com.fulcrologic.fulcro.dom.create_element.cljs$core$IFn$_invoke$arity$1 = (function (tag){
return com.fulcrologic.fulcro.dom.create_element.cljs$core$IFn$_invoke$arity$2(tag,null);
}));

(com.fulcrologic.fulcro.dom.create_element.cljs$core$IFn$_invoke$arity$2 = (function (tag,opts){
return module$node_modules$react$index.createElement(tag,opts);
}));

(com.fulcrologic.fulcro.dom.create_element.cljs$core$IFn$_invoke$arity$variadic = (function (tag,opts,children){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$4(module$node_modules$react$index.createElement,tag,opts,children);
}));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.create_element.cljs$lang$applyTo = (function (seq54748){
var G__54749 = cljs.core.first(seq54748);
var seq54748__$1 = cljs.core.next(seq54748);
var G__54750 = cljs.core.first(seq54748__$1);
var seq54748__$2 = cljs.core.next(seq54748__$1);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__54749,G__54750,seq54748__$2);
}));

(com.fulcrologic.fulcro.dom.create_element.cljs$lang$maxFixedArity = (2));

/**
 * Given props, which can be nil, a js-obj or a clj map: returns a js object.
 */
com.fulcrologic.fulcro.dom.convert_props = (function com$fulcrologic$fulcro$dom$convert_props(props){
if((props == null)){
return ({});
} else {
if(cljs.core.map_QMARK_(props)){
return cljs.core.clj__GT_js(props);
} else {
return props;

}
}
});
/**
 * Used internally by the DOM element generation.
 */
com.fulcrologic.fulcro.dom.macro_create_element_STAR_ = (function com$fulcrologic$fulcro$dom$macro_create_element_STAR_(arr){
if(cljs.core.array_QMARK_(arr)){
} else {
throw (new Error("Assert failed: (array? arr)"));
}

return module$node_modules$react$index.createElement.apply(null,arr);
});
/**
 * Updates the state of the wrapped input element.
 */
com.fulcrologic.fulcro.dom.update_state = (function com$fulcrologic$fulcro$dom$update_state(component,next_props,value){
var on_change = com.fulcrologic.fulcro.dom.goog$module$goog$object.getValueByKeys(component,"state","cached-props","onChange");
var next_state = ({});
var inputRef = com.fulcrologic.fulcro.dom.goog$module$goog$object.get(next_props,"inputRef");
com.fulcrologic.fulcro.dom.goog$module$goog$object.extend(next_state,next_props,({"onChange": on_change}));

com.fulcrologic.fulcro.dom.goog$module$goog$object.set(next_state,"value",value);

if(cljs.core.truth_(inputRef)){
com.fulcrologic.fulcro.dom.goog$module$goog$object.remove(next_state,"inputRef");

com.fulcrologic.fulcro.dom.goog$module$goog$object.set(next_state,"ref",inputRef);
} else {
}

return component.setState(({"cached-props": next_state}));
});
if((typeof com !== 'undefined') && (typeof com.fulcrologic !== 'undefined') && (typeof com.fulcrologic.fulcro !== 'undefined') && (typeof com.fulcrologic.fulcro.dom !== 'undefined') && (typeof com.fulcrologic.fulcro.dom.form_elements_QMARK_ !== 'undefined')){
} else {
com.fulcrologic.fulcro.dom.form_elements_QMARK_ = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, ["option",null,"select",null,"input",null,"textarea",null], null), null);
}
com.fulcrologic.fulcro.dom.is_form_element_QMARK_ = (function com$fulcrologic$fulcro$dom$is_form_element_QMARK_(element){
var tag = element.tagName;
var and__5000__auto__ = tag;
if(cljs.core.truth_(and__5000__auto__)){
var G__54762 = clojure.string.lower_case(tag);
return (com.fulcrologic.fulcro.dom.form_elements_QMARK_.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.dom.form_elements_QMARK_.cljs$core$IFn$_invoke$arity$1(G__54762) : com.fulcrologic.fulcro.dom.form_elements_QMARK_.call(null, G__54762));
} else {
return and__5000__auto__;
}
});
com.fulcrologic.fulcro.dom.wrap_form_element = (function com$fulcrologic$fulcro$dom$wrap_form_element(element){
var ctor = (function (props){
var this$ = this;
(this$.state = (function (){var state = ({"ref": com.fulcrologic.fulcro.dom.goog$module$goog$object.get(props,"inputRef")});
com.fulcrologic.fulcro.dom.goog$module$goog$object.extend(state,props,({"onChange": goog.bind(com.fulcrologic.fulcro.dom.goog$module$goog$object.get(this$,"onChange"),this$)}));

com.fulcrologic.fulcro.dom.goog$module$goog$object.remove(state,"inputRef");

return ({"cached-props": state});
})());

return module$node_modules$react$index.Component.apply(this$,arguments);
});
(ctor.displayName = ["wrapped-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(element)].join(''));

goog.inherits(ctor,module$node_modules$react$index.Component);

var x54764_56580 = ctor.prototype;
(x54764_56580.onChange = (function (event){
var this$ = this;
var temp__5825__auto__ = com.fulcrologic.fulcro.dom.goog$module$goog$object.get(this$.props,"onChange");
if(cljs.core.truth_(temp__5825__auto__)){
var handler = temp__5825__auto__;
(handler.cljs$core$IFn$_invoke$arity$1 ? handler.cljs$core$IFn$_invoke$arity$1(event) : handler.call(null, event));

return com.fulcrologic.fulcro.dom.update_state(this$,this$.props,com.fulcrologic.fulcro.dom.goog$module$goog$object.getValueByKeys(event,"target","value"));
} else {
return null;
}
}));

(x54764_56580.UNSAFE_componentWillReceiveProps = (function (new_props){
var this$ = this;
var state_value = com.fulcrologic.fulcro.dom.goog$module$goog$object.getValueByKeys(this$,"state","cached-props","value");
var this_node = module$node_modules$react_dom$index.findDOMNode(this$);
var value_node = (cljs.core.truth_(com.fulcrologic.fulcro.dom.is_form_element_QMARK_(this_node))?this_node:goog.dom.findNode(this_node,(function (p1__54763_SHARP_){
return com.fulcrologic.fulcro.dom.is_form_element_QMARK_(p1__54763_SHARP_);
})));
var element_value = com.fulcrologic.fulcro.dom.goog$module$goog$object.get(value_node,"value");
if(cljs.core.truth_(goog.DEBUG)){
if(cljs.core.truth_((function (){var and__5000__auto__ = state_value;
if(cljs.core.truth_(and__5000__auto__)){
var and__5000__auto____$1 = element_value;
if(cljs.core.truth_(and__5000__auto____$1)){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(cljs.core.type(state_value),cljs.core.type(element_value));
} else {
return and__5000__auto____$1;
}
} else {
return and__5000__auto__;
}
})())){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"com.fulcrologic.fulcro.dom","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/dom.cljs",187,15,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["There is a mismatch for the data type of the value on an input with value ",element_value,". This will cause the input to miss refreshes. In general you should force the :value of an input to\n                be a string since that is how values are stored on most real DOM elements. See https://book.fulcrologic.com/#warn-dom-type-mismatch"], null);
}),null)),null,(288),null,null,null);
} else {
}
} else {
}

if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(state_value,element_value)){
return com.fulcrologic.fulcro.dom.update_state(this$,new_props,element_value);
} else {
return com.fulcrologic.fulcro.dom.update_state(this$,new_props,com.fulcrologic.fulcro.dom.goog$module$goog$object.get(new_props,"value"));
}
}));

(x54764_56580.render = (function (){
var this$ = this;
return module$node_modules$react$index.createElement(element,com.fulcrologic.fulcro.dom.goog$module$goog$object.getValueByKeys(this$,"state","cached-props"));
}));


var real_factory = (function() { 
var G__56592__delegate = function (args){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(module$node_modules$react$index.createElement,ctor,args);
};
var G__56592 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__56595__i = 0, G__56595__a = new Array(arguments.length -  0);
while (G__56595__i < G__56595__a.length) {G__56595__a[G__56595__i] = arguments[G__56595__i + 0]; ++G__56595__i;}
  args = new cljs.core.IndexedSeq(G__56595__a,0,null);
} 
return G__56592__delegate.call(this,args);};
G__56592.cljs$lang$maxFixedArity = 0;
G__56592.cljs$lang$applyTo = (function (arglist__56597){
var args = cljs.core.seq(arglist__56597);
return G__56592__delegate(args);
});
G__56592.cljs$core$IFn$_invoke$arity$variadic = G__56592__delegate;
return G__56592;
})()
;
return (function() { 
var G__56599__delegate = function (props,children){
var t = com.fulcrologic.fulcro.dom.goog$module$goog$object.get(props,"type");
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(t,"file")){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$4(module$node_modules$react$index.createElement,"input",props,children);
} else {
var temp__5823__auto__ = com.fulcrologic.fulcro.dom.goog$module$goog$object.get(props,"ref");
if(cljs.core.truth_(temp__5823__auto__)){
var r = temp__5823__auto__;
if(typeof r === 'string'){
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(real_factory,props,children);
} else {
var p = ({});
com.fulcrologic.fulcro.dom.goog$module$goog$object.extend(p,props);

com.fulcrologic.fulcro.dom.goog$module$goog$object.set(p,"inputRef",r);

com.fulcrologic.fulcro.dom.goog$module$goog$object.remove(p,"ref");

return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(real_factory,p,children);
}
} else {
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(real_factory,props,children);
}
}
};
var G__56599 = function (props,var_args){
var children = null;
if (arguments.length > 1) {
var G__56600__i = 0, G__56600__a = new Array(arguments.length -  1);
while (G__56600__i < G__56600__a.length) {G__56600__a[G__56600__i] = arguments[G__56600__i + 1]; ++G__56600__i;}
  children = new cljs.core.IndexedSeq(G__56600__a,0,null);
} 
return G__56599__delegate.call(this,props,children);};
G__56599.cljs$lang$maxFixedArity = 1;
G__56599.cljs$lang$applyTo = (function (arglist__56601){
var props = cljs.core.first(arglist__56601);
var children = cljs.core.rest(arglist__56601);
return G__56599__delegate(props,children);
});
G__56599.cljs$core$IFn$_invoke$arity$variadic = G__56599__delegate;
return G__56599;
})()
;
});
/**
 * Low-level form input, with no syntactic sugar. Used internally by DOM macros
 */
com.fulcrologic.fulcro.dom.wrapped_input = com.fulcrologic.fulcro.dom.wrap_form_element("input");
/**
 * Low-level form input, with no syntactic sugar. Used internally by DOM macros
 */
com.fulcrologic.fulcro.dom.wrapped_textarea = com.fulcrologic.fulcro.dom.wrap_form_element("textarea");
/**
 * Low-level form input, with no syntactic sugar. Used internally by DOM macros
 */
com.fulcrologic.fulcro.dom.wrapped_option = com.fulcrologic.fulcro.dom.wrap_form_element("option");
/**
 * Low-level form input, with no syntactic sugar. Used internally by DOM macros
 */
com.fulcrologic.fulcro.dom.wrapped_select = com.fulcrologic.fulcro.dom.wrap_form_element("select");
com.fulcrologic.fulcro.dom.arr_append_STAR_ = (function com$fulcrologic$fulcro$dom$arr_append_STAR_(arr,x){
arr.push(x);

return arr;
});
com.fulcrologic.fulcro.dom.arr_append = (function com$fulcrologic$fulcro$dom$arr_append(arr,tail){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(com.fulcrologic.fulcro.dom.arr_append_STAR_,arr,tail);
});
/**
 * Used internally by element generation.
 */
com.fulcrologic.fulcro.dom.macro_create_wrapped_form_element = (function com$fulcrologic$fulcro$dom$macro_create_wrapped_form_element(opts){
var tag = (opts[(0)]);
var props = (opts[(1)]);
var children = opts.splice((2));
var G__54773 = tag;
switch (G__54773) {
case "input":
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(com.fulcrologic.fulcro.dom.wrapped_input,props,children);

break;
case "textarea":
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(com.fulcrologic.fulcro.dom.wrapped_textarea,props,children);

break;
case "select":
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(com.fulcrologic.fulcro.dom.wrapped_select,props,children);

break;
case "option":
return cljs.core.apply.cljs$core$IFn$_invoke$arity$3(com.fulcrologic.fulcro.dom.wrapped_option,props,children);

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__54773)].join('')));

}
});
/**
 * Runtime interpretation of props. Used internally by element generation when the macro cannot expand the element at compile time.
 */
com.fulcrologic.fulcro.dom.macro_create_element = (function com$fulcrologic$fulcro$dom$macro_create_element(var_args){
var G__54775 = arguments.length;
switch (G__54775) {
case 2:
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$2 = (function (type,args){
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3(type,args,null);
}));

(com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3 = (function (type,args,csskw){
var vec__54777 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(com.fulcrologic.fulcro.components.force_children,args);
var seq__54778 = cljs.core.seq(vec__54777);
var first__54779 = cljs.core.first(seq__54778);
var seq__54778__$1 = cljs.core.next(seq__54778);
var head = first__54779;
var tail = seq__54778__$1;
var f = (cljs.core.truth_((com.fulcrologic.fulcro.dom.form_elements_QMARK_.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.dom.form_elements_QMARK_.cljs$core$IFn$_invoke$arity$1(type) : com.fulcrologic.fulcro.dom.form_elements_QMARK_.call(null, type)))?com.fulcrologic.fulcro.dom.macro_create_wrapped_form_element:com.fulcrologic.fulcro.dom.macro_create_element_STAR_);
if((head == null)){
var G__54780 = (function (){var G__54781 = [type,com.fulcrologic.fulcro.dom_common.add_kwprops_to_props(({}),csskw)];
com.fulcrologic.fulcro.dom.arr_append(G__54781,tail);

return G__54781;
})();
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__54780) : f.call(null, G__54780));
} else {
if(cljs.core.truth_(com.fulcrologic.fulcro.dom.element_QMARK_(head))){
var G__54782 = (function (){var G__54783 = [type,com.fulcrologic.fulcro.dom_common.add_kwprops_to_props(({}),csskw)];
com.fulcrologic.fulcro.dom.arr_append(G__54783,args);

return G__54783;
})();
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__54782) : f.call(null, G__54782));
} else {
if(cljs.core.object_QMARK_(head)){
var G__54784 = (function (){var G__54785 = [type,com.fulcrologic.fulcro.dom_common.add_kwprops_to_props(head,csskw)];
com.fulcrologic.fulcro.dom.arr_append(G__54785,tail);

return G__54785;
})();
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__54784) : f.call(null, G__54784));
} else {
if(cljs.core.map_QMARK_(head)){
var G__54787 = (function (){var G__54788 = [type,cljs.core.clj__GT_js(com.fulcrologic.fulcro.dom_common.add_kwprops_to_props(com.fulcrologic.fulcro.dom_common.interpret_classes(head),csskw))];
com.fulcrologic.fulcro.dom.arr_append(G__54788,tail);

return G__54788;
})();
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__54787) : f.call(null, G__54787));
} else {
var G__54789 = (function (){var G__54790 = [type,com.fulcrologic.fulcro.dom_common.add_kwprops_to_props(({}),csskw)];
com.fulcrologic.fulcro.dom.arr_append(G__54790,args);

return G__54790;
})();
return (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(G__54789) : f.call(null, G__54789));

}
}
}
}
}));

(com.fulcrologic.fulcro.dom.macro_create_element.cljs$lang$maxFixedArity = 3);

/**
 * Just like macro-create-element, but never wraps form input types.
 */
com.fulcrologic.fulcro.dom.macro_create_unwrapped_element = (function com$fulcrologic$fulcro$dom$macro_create_unwrapped_element(var_args){
var G__54794 = arguments.length;
switch (G__54794) {
case 2:
return com.fulcrologic.fulcro.dom.macro_create_unwrapped_element.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return com.fulcrologic.fulcro.dom.macro_create_unwrapped_element.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.dom.macro_create_unwrapped_element.cljs$core$IFn$_invoke$arity$2 = (function (type,args){
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3(type,args,null);
}));

(com.fulcrologic.fulcro.dom.macro_create_unwrapped_element.cljs$core$IFn$_invoke$arity$3 = (function (type,args,csskw){
var vec__54796 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(com.fulcrologic.fulcro.components.force_children,args);
var seq__54797 = cljs.core.seq(vec__54796);
var first__54798 = cljs.core.first(seq__54797);
var seq__54797__$1 = cljs.core.next(seq__54797);
var head = first__54798;
var tail = seq__54797__$1;
if((head == null)){
return com.fulcrologic.fulcro.dom.macro_create_element_STAR_((function (){var G__54799 = [type,com.fulcrologic.fulcro.dom_common.add_kwprops_to_props(({}),csskw)];
com.fulcrologic.fulcro.dom.arr_append(G__54799,tail);

return G__54799;
})());
} else {
if(cljs.core.truth_(com.fulcrologic.fulcro.dom.element_QMARK_(head))){
return com.fulcrologic.fulcro.dom.macro_create_element_STAR_((function (){var G__54800 = [type,com.fulcrologic.fulcro.dom_common.add_kwprops_to_props(({}),csskw)];
com.fulcrologic.fulcro.dom.arr_append(G__54800,args);

return G__54800;
})());
} else {
if(cljs.core.object_QMARK_(head)){
return com.fulcrologic.fulcro.dom.macro_create_element_STAR_((function (){var G__54801 = [type,com.fulcrologic.fulcro.dom_common.add_kwprops_to_props(head,csskw)];
com.fulcrologic.fulcro.dom.arr_append(G__54801,tail);

return G__54801;
})());
} else {
if(cljs.core.map_QMARK_(head)){
return com.fulcrologic.fulcro.dom.macro_create_element_STAR_((function (){var G__54802 = [type,cljs.core.clj__GT_js(com.fulcrologic.fulcro.dom_common.add_kwprops_to_props(com.fulcrologic.fulcro.dom_common.interpret_classes(head),csskw))];
com.fulcrologic.fulcro.dom.arr_append(G__54802,tail);

return G__54802;
})());
} else {
return com.fulcrologic.fulcro.dom.macro_create_element_STAR_((function (){var G__54803 = [type,com.fulcrologic.fulcro.dom_common.add_kwprops_to_props(({}),csskw)];
com.fulcrologic.fulcro.dom.arr_append(G__54803,args);

return G__54803;
})());

}
}
}
}
}));

(com.fulcrologic.fulcro.dom.macro_create_unwrapped_element.cljs$lang$maxFixedArity = 3);

/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (form "hello")
 * (form nil "hello")
 * 
 * These two are made equivalent at compile time
 * (form {:onClick f} "hello")
 * (form #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (form :#the-id.klass.other-klass "hello")
 * (form :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.form = (function com$fulcrologic$fulcro$dom$form(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56617 = arguments.length;
var i__5727__auto___56618 = (0);
while(true){
if((i__5727__auto___56618 < len__5726__auto___56617)){
args__5732__auto__.push((arguments[i__5727__auto___56618]));

var G__56619 = (i__5727__auto___56618 + (1));
i__5727__auto___56618 = G__56619;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.form.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.form.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__54810 = conformed_args__53323__auto__;
var map__54810__$1 = cljs.core.__destructure_map(map__54810);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54810__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54810__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54810__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("form",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.form.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.form.cljs$lang$applyTo = (function (seq54808){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq54808));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (audio "hello")
 * (audio nil "hello")
 * 
 * These two are made equivalent at compile time
 * (audio {:onClick f} "hello")
 * (audio #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (audio :#the-id.klass.other-klass "hello")
 * (audio :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.audio = (function com$fulcrologic$fulcro$dom$audio(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56621 = arguments.length;
var i__5727__auto___56622 = (0);
while(true){
if((i__5727__auto___56622 < len__5726__auto___56621)){
args__5732__auto__.push((arguments[i__5727__auto___56622]));

var G__56623 = (i__5727__auto___56622 + (1));
i__5727__auto___56622 = G__56623;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.audio.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.audio.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__54814 = conformed_args__53323__auto__;
var map__54814__$1 = cljs.core.__destructure_map(map__54814);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54814__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54814__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54814__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("audio",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.audio.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.audio.cljs$lang$applyTo = (function (seq54813){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq54813));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (input "hello")
 * (input nil "hello")
 * 
 * These two are made equivalent at compile time
 * (input {:onClick f} "hello")
 * (input #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (input :#the-id.klass.other-klass "hello")
 * (input :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.input = (function com$fulcrologic$fulcro$dom$input(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56628 = arguments.length;
var i__5727__auto___56629 = (0);
while(true){
if((i__5727__auto___56629 < len__5726__auto___56628)){
args__5732__auto__.push((arguments[i__5727__auto___56629]));

var G__56630 = (i__5727__auto___56629 + (1));
i__5727__auto___56629 = G__56630;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.input.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.input.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__54819 = conformed_args__53323__auto__;
var map__54819__$1 = cljs.core.__destructure_map(map__54819);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54819__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54819__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54819__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("input",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.input.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.input.cljs$lang$applyTo = (function (seq54817){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq54817));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (menuitem "hello")
 * (menuitem nil "hello")
 * 
 * These two are made equivalent at compile time
 * (menuitem {:onClick f} "hello")
 * (menuitem #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (menuitem :#the-id.klass.other-klass "hello")
 * (menuitem :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.menuitem = (function com$fulcrologic$fulcro$dom$menuitem(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56638 = arguments.length;
var i__5727__auto___56639 = (0);
while(true){
if((i__5727__auto___56639 < len__5726__auto___56638)){
args__5732__auto__.push((arguments[i__5727__auto___56639]));

var G__56641 = (i__5727__auto___56639 + (1));
i__5727__auto___56639 = G__56641;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.menuitem.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.menuitem.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__54823 = conformed_args__53323__auto__;
var map__54823__$1 = cljs.core.__destructure_map(map__54823);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54823__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54823__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54823__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("menuitem",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.menuitem.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.menuitem.cljs$lang$applyTo = (function (seq54822){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq54822));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (radialGradient "hello")
 * (radialGradient nil "hello")
 * 
 * These two are made equivalent at compile time
 * (radialGradient {:onClick f} "hello")
 * (radialGradient #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (radialGradient :#the-id.klass.other-klass "hello")
 * (radialGradient :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.radialGradient = (function com$fulcrologic$fulcro$dom$radialGradient(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56643 = arguments.length;
var i__5727__auto___56644 = (0);
while(true){
if((i__5727__auto___56644 < len__5726__auto___56643)){
args__5732__auto__.push((arguments[i__5727__auto___56644]));

var G__56645 = (i__5727__auto___56644 + (1));
i__5727__auto___56644 = G__56645;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.radialGradient.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.radialGradient.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__54825 = conformed_args__53323__auto__;
var map__54825__$1 = cljs.core.__destructure_map(map__54825);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54825__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54825__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54825__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("radialGradient",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.radialGradient.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.radialGradient.cljs$lang$applyTo = (function (seq54824){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq54824));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (feMerge "hello")
 * (feMerge nil "hello")
 * 
 * These two are made equivalent at compile time
 * (feMerge {:onClick f} "hello")
 * (feMerge #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (feMerge :#the-id.klass.other-klass "hello")
 * (feMerge :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.feMerge = (function com$fulcrologic$fulcro$dom$feMerge(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56650 = arguments.length;
var i__5727__auto___56651 = (0);
while(true){
if((i__5727__auto___56651 < len__5726__auto___56650)){
args__5732__auto__.push((arguments[i__5727__auto___56651]));

var G__56652 = (i__5727__auto___56651 + (1));
i__5727__auto___56651 = G__56652;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.feMerge.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.feMerge.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__54827 = conformed_args__53323__auto__;
var map__54827__$1 = cljs.core.__destructure_map(map__54827);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54827__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54827__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54827__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("feMerge",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.feMerge.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.feMerge.cljs$lang$applyTo = (function (seq54826){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq54826));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (set "hello")
 * (set nil "hello")
 * 
 * These two are made equivalent at compile time
 * (set {:onClick f} "hello")
 * (set #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (set :#the-id.klass.other-klass "hello")
 * (set :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.set = (function com$fulcrologic$fulcro$dom$set(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56658 = arguments.length;
var i__5727__auto___56659 = (0);
while(true){
if((i__5727__auto___56659 < len__5726__auto___56658)){
args__5732__auto__.push((arguments[i__5727__auto___56659]));

var G__56660 = (i__5727__auto___56659 + (1));
i__5727__auto___56659 = G__56660;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.set.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.set.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__54841 = conformed_args__53323__auto__;
var map__54841__$1 = cljs.core.__destructure_map(map__54841);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54841__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54841__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54841__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("set",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.set.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.set.cljs$lang$applyTo = (function (seq54833){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq54833));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (feSpecularLighting "hello")
 * (feSpecularLighting nil "hello")
 * 
 * These two are made equivalent at compile time
 * (feSpecularLighting {:onClick f} "hello")
 * (feSpecularLighting #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (feSpecularLighting :#the-id.klass.other-klass "hello")
 * (feSpecularLighting :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.feSpecularLighting = (function com$fulcrologic$fulcro$dom$feSpecularLighting(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56662 = arguments.length;
var i__5727__auto___56664 = (0);
while(true){
if((i__5727__auto___56664 < len__5726__auto___56662)){
args__5732__auto__.push((arguments[i__5727__auto___56664]));

var G__56665 = (i__5727__auto___56664 + (1));
i__5727__auto___56664 = G__56665;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.feSpecularLighting.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.feSpecularLighting.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__54866 = conformed_args__53323__auto__;
var map__54866__$1 = cljs.core.__destructure_map(map__54866);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54866__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54866__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54866__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("feSpecularLighting",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.feSpecularLighting.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.feSpecularLighting.cljs$lang$applyTo = (function (seq54845){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq54845));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (base "hello")
 * (base nil "hello")
 * 
 * These two are made equivalent at compile time
 * (base {:onClick f} "hello")
 * (base #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (base :#the-id.klass.other-klass "hello")
 * (base :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.base = (function com$fulcrologic$fulcro$dom$base(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56674 = arguments.length;
var i__5727__auto___56675 = (0);
while(true){
if((i__5727__auto___56675 < len__5726__auto___56674)){
args__5732__auto__.push((arguments[i__5727__auto___56675]));

var G__56676 = (i__5727__auto___56675 + (1));
i__5727__auto___56675 = G__56676;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.base.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.base.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__54884 = conformed_args__53323__auto__;
var map__54884__$1 = cljs.core.__destructure_map(map__54884);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54884__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54884__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54884__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("base",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.base.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.base.cljs$lang$applyTo = (function (seq54872){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq54872));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (h1 "hello")
 * (h1 nil "hello")
 * 
 * These two are made equivalent at compile time
 * (h1 {:onClick f} "hello")
 * (h1 #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (h1 :#the-id.klass.other-klass "hello")
 * (h1 :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.h1 = (function com$fulcrologic$fulcro$dom$h1(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56681 = arguments.length;
var i__5727__auto___56682 = (0);
while(true){
if((i__5727__auto___56682 < len__5726__auto___56681)){
args__5732__auto__.push((arguments[i__5727__auto___56682]));

var G__56683 = (i__5727__auto___56682 + (1));
i__5727__auto___56682 = G__56683;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.h1.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.h1.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__54886 = conformed_args__53323__auto__;
var map__54886__$1 = cljs.core.__destructure_map(map__54886);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54886__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54886__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54886__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("h1",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.h1.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.h1.cljs$lang$applyTo = (function (seq54885){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq54885));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (feOffset "hello")
 * (feOffset nil "hello")
 * 
 * These two are made equivalent at compile time
 * (feOffset {:onClick f} "hello")
 * (feOffset #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (feOffset :#the-id.klass.other-klass "hello")
 * (feOffset :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.feOffset = (function com$fulcrologic$fulcro$dom$feOffset(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56691 = arguments.length;
var i__5727__auto___56692 = (0);
while(true){
if((i__5727__auto___56692 < len__5726__auto___56691)){
args__5732__auto__.push((arguments[i__5727__auto___56692]));

var G__56693 = (i__5727__auto___56692 + (1));
i__5727__auto___56692 = G__56693;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.feOffset.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.feOffset.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__54896 = conformed_args__53323__auto__;
var map__54896__$1 = cljs.core.__destructure_map(map__54896);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54896__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54896__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54896__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("feOffset",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.feOffset.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.feOffset.cljs$lang$applyTo = (function (seq54892){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq54892));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (embed "hello")
 * (embed nil "hello")
 * 
 * These two are made equivalent at compile time
 * (embed {:onClick f} "hello")
 * (embed #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (embed :#the-id.klass.other-klass "hello")
 * (embed :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.embed = (function com$fulcrologic$fulcro$dom$embed(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56694 = arguments.length;
var i__5727__auto___56695 = (0);
while(true){
if((i__5727__auto___56695 < len__5726__auto___56694)){
args__5732__auto__.push((arguments[i__5727__auto___56695]));

var G__56696 = (i__5727__auto___56695 + (1));
i__5727__auto___56695 = G__56696;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.embed.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.embed.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__54903 = conformed_args__53323__auto__;
var map__54903__$1 = cljs.core.__destructure_map(map__54903);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54903__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54903__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54903__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("embed",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.embed.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.embed.cljs$lang$applyTo = (function (seq54898){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq54898));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (animateMotion "hello")
 * (animateMotion nil "hello")
 * 
 * These two are made equivalent at compile time
 * (animateMotion {:onClick f} "hello")
 * (animateMotion #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (animateMotion :#the-id.klass.other-klass "hello")
 * (animateMotion :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.animateMotion = (function com$fulcrologic$fulcro$dom$animateMotion(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56704 = arguments.length;
var i__5727__auto___56705 = (0);
while(true){
if((i__5727__auto___56705 < len__5726__auto___56704)){
args__5732__auto__.push((arguments[i__5727__auto___56705]));

var G__56706 = (i__5727__auto___56705 + (1));
i__5727__auto___56705 = G__56706;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.animateMotion.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.animateMotion.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__54910 = conformed_args__53323__auto__;
var map__54910__$1 = cljs.core.__destructure_map(map__54910);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54910__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54910__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54910__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("animateMotion",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.animateMotion.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.animateMotion.cljs$lang$applyTo = (function (seq54906){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq54906));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (h3 "hello")
 * (h3 nil "hello")
 * 
 * These two are made equivalent at compile time
 * (h3 {:onClick f} "hello")
 * (h3 #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (h3 :#the-id.klass.other-klass "hello")
 * (h3 :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.h3 = (function com$fulcrologic$fulcro$dom$h3(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56710 = arguments.length;
var i__5727__auto___56711 = (0);
while(true){
if((i__5727__auto___56711 < len__5726__auto___56710)){
args__5732__auto__.push((arguments[i__5727__auto___56711]));

var G__56712 = (i__5727__auto___56711 + (1));
i__5727__auto___56711 = G__56712;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.h3.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.h3.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__54916 = conformed_args__53323__auto__;
var map__54916__$1 = cljs.core.__destructure_map(map__54916);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54916__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54916__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54916__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("h3",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.h3.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.h3.cljs$lang$applyTo = (function (seq54913){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq54913));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (body "hello")
 * (body nil "hello")
 * 
 * These two are made equivalent at compile time
 * (body {:onClick f} "hello")
 * (body #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (body :#the-id.klass.other-klass "hello")
 * (body :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.body = (function com$fulcrologic$fulcro$dom$body(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56716 = arguments.length;
var i__5727__auto___56717 = (0);
while(true){
if((i__5727__auto___56717 < len__5726__auto___56716)){
args__5732__auto__.push((arguments[i__5727__auto___56717]));

var G__56719 = (i__5727__auto___56717 + (1));
i__5727__auto___56717 = G__56719;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.body.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.body.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__54923 = conformed_args__53323__auto__;
var map__54923__$1 = cljs.core.__destructure_map(map__54923);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54923__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54923__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54923__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("body",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.body.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.body.cljs$lang$applyTo = (function (seq54919){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq54919));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (hkern "hello")
 * (hkern nil "hello")
 * 
 * These two are made equivalent at compile time
 * (hkern {:onClick f} "hello")
 * (hkern #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (hkern :#the-id.klass.other-klass "hello")
 * (hkern :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.hkern = (function com$fulcrologic$fulcro$dom$hkern(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56725 = arguments.length;
var i__5727__auto___56726 = (0);
while(true){
if((i__5727__auto___56726 < len__5726__auto___56725)){
args__5732__auto__.push((arguments[i__5727__auto___56726]));

var G__56727 = (i__5727__auto___56726 + (1));
i__5727__auto___56726 = G__56727;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.hkern.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.hkern.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__54934 = conformed_args__53323__auto__;
var map__54934__$1 = cljs.core.__destructure_map(map__54934);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54934__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54934__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54934__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("hkern",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.hkern.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.hkern.cljs$lang$applyTo = (function (seq54932){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq54932));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (keygen "hello")
 * (keygen nil "hello")
 * 
 * These two are made equivalent at compile time
 * (keygen {:onClick f} "hello")
 * (keygen #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (keygen :#the-id.klass.other-klass "hello")
 * (keygen :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.keygen = (function com$fulcrologic$fulcro$dom$keygen(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56728 = arguments.length;
var i__5727__auto___56729 = (0);
while(true){
if((i__5727__auto___56729 < len__5726__auto___56728)){
args__5732__auto__.push((arguments[i__5727__auto___56729]));

var G__56730 = (i__5727__auto___56729 + (1));
i__5727__auto___56729 = G__56730;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.keygen.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.keygen.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__54938 = conformed_args__53323__auto__;
var map__54938__$1 = cljs.core.__destructure_map(map__54938);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54938__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54938__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54938__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("keygen",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.keygen.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.keygen.cljs$lang$applyTo = (function (seq54936){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq54936));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (font-face-format "hello")
 * (font-face-format nil "hello")
 * 
 * These two are made equivalent at compile time
 * (font-face-format {:onClick f} "hello")
 * (font-face-format #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (font-face-format :#the-id.klass.other-klass "hello")
 * (font-face-format :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.font_face_format = (function com$fulcrologic$fulcro$dom$font_face_format(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56734 = arguments.length;
var i__5727__auto___56735 = (0);
while(true){
if((i__5727__auto___56735 < len__5726__auto___56734)){
args__5732__auto__.push((arguments[i__5727__auto___56735]));

var G__56737 = (i__5727__auto___56735 + (1));
i__5727__auto___56735 = G__56737;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.font_face_format.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.font_face_format.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__54942 = conformed_args__53323__auto__;
var map__54942__$1 = cljs.core.__destructure_map(map__54942);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54942__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54942__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54942__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("font-face-format",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.font_face_format.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.font_face_format.cljs$lang$applyTo = (function (seq54940){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq54940));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (feFuncA "hello")
 * (feFuncA nil "hello")
 * 
 * These two are made equivalent at compile time
 * (feFuncA {:onClick f} "hello")
 * (feFuncA #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (feFuncA :#the-id.klass.other-klass "hello")
 * (feFuncA :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.feFuncA = (function com$fulcrologic$fulcro$dom$feFuncA(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56742 = arguments.length;
var i__5727__auto___56743 = (0);
while(true){
if((i__5727__auto___56743 < len__5726__auto___56742)){
args__5732__auto__.push((arguments[i__5727__auto___56743]));

var G__56744 = (i__5727__auto___56743 + (1));
i__5727__auto___56743 = G__56744;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.feFuncA.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.feFuncA.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__54957 = conformed_args__53323__auto__;
var map__54957__$1 = cljs.core.__destructure_map(map__54957);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54957__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54957__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54957__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("feFuncA",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.feFuncA.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.feFuncA.cljs$lang$applyTo = (function (seq54949){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq54949));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (progress "hello")
 * (progress nil "hello")
 * 
 * These two are made equivalent at compile time
 * (progress {:onClick f} "hello")
 * (progress #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (progress :#the-id.klass.other-klass "hello")
 * (progress :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.progress = (function com$fulcrologic$fulcro$dom$progress(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56745 = arguments.length;
var i__5727__auto___56746 = (0);
while(true){
if((i__5727__auto___56746 < len__5726__auto___56745)){
args__5732__auto__.push((arguments[i__5727__auto___56746]));

var G__56748 = (i__5727__auto___56746 + (1));
i__5727__auto___56746 = G__56748;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.progress.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.progress.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__54959 = conformed_args__53323__auto__;
var map__54959__$1 = cljs.core.__destructure_map(map__54959);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54959__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54959__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54959__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("progress",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.progress.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.progress.cljs$lang$applyTo = (function (seq54958){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq54958));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (main "hello")
 * (main nil "hello")
 * 
 * These two are made equivalent at compile time
 * (main {:onClick f} "hello")
 * (main #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (main :#the-id.klass.other-klass "hello")
 * (main :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.main = (function com$fulcrologic$fulcro$dom$main(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56754 = arguments.length;
var i__5727__auto___56755 = (0);
while(true){
if((i__5727__auto___56755 < len__5726__auto___56754)){
args__5732__auto__.push((arguments[i__5727__auto___56755]));

var G__56756 = (i__5727__auto___56755 + (1));
i__5727__auto___56755 = G__56756;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.main.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.main.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__54963 = conformed_args__53323__auto__;
var map__54963__$1 = cljs.core.__destructure_map(map__54963);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54963__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54963__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54963__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("main",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.main.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.main.cljs$lang$applyTo = (function (seq54962){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq54962));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (cite "hello")
 * (cite nil "hello")
 * 
 * These two are made equivalent at compile time
 * (cite {:onClick f} "hello")
 * (cite #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (cite :#the-id.klass.other-klass "hello")
 * (cite :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.cite = (function com$fulcrologic$fulcro$dom$cite(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56761 = arguments.length;
var i__5727__auto___56762 = (0);
while(true){
if((i__5727__auto___56762 < len__5726__auto___56761)){
args__5732__auto__.push((arguments[i__5727__auto___56762]));

var G__56764 = (i__5727__auto___56762 + (1));
i__5727__auto___56762 = G__56764;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.cite.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.cite.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__54971 = conformed_args__53323__auto__;
var map__54971__$1 = cljs.core.__destructure_map(map__54971);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54971__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54971__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54971__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("cite",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.cite.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.cite.cljs$lang$applyTo = (function (seq54966){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq54966));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (rect "hello")
 * (rect nil "hello")
 * 
 * These two are made equivalent at compile time
 * (rect {:onClick f} "hello")
 * (rect #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (rect :#the-id.klass.other-klass "hello")
 * (rect :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.rect = (function com$fulcrologic$fulcro$dom$rect(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56765 = arguments.length;
var i__5727__auto___56766 = (0);
while(true){
if((i__5727__auto___56766 < len__5726__auto___56765)){
args__5732__auto__.push((arguments[i__5727__auto___56766]));

var G__56769 = (i__5727__auto___56766 + (1));
i__5727__auto___56766 = G__56769;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.rect.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.rect.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__54982 = conformed_args__53323__auto__;
var map__54982__$1 = cljs.core.__destructure_map(map__54982);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54982__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54982__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54982__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("rect",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.rect.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.rect.cljs$lang$applyTo = (function (seq54976){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq54976));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (tref "hello")
 * (tref nil "hello")
 * 
 * These two are made equivalent at compile time
 * (tref {:onClick f} "hello")
 * (tref #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (tref :#the-id.klass.other-klass "hello")
 * (tref :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.tref = (function com$fulcrologic$fulcro$dom$tref(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56775 = arguments.length;
var i__5727__auto___56776 = (0);
while(true){
if((i__5727__auto___56776 < len__5726__auto___56775)){
args__5732__auto__.push((arguments[i__5727__auto___56776]));

var G__56778 = (i__5727__auto___56776 + (1));
i__5727__auto___56776 = G__56778;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.tref.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.tref.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__54989 = conformed_args__53323__auto__;
var map__54989__$1 = cljs.core.__destructure_map(map__54989);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54989__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54989__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54989__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("tref",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.tref.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.tref.cljs$lang$applyTo = (function (seq54984){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq54984));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (meshpatch "hello")
 * (meshpatch nil "hello")
 * 
 * These two are made equivalent at compile time
 * (meshpatch {:onClick f} "hello")
 * (meshpatch #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (meshpatch :#the-id.klass.other-klass "hello")
 * (meshpatch :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.meshpatch = (function com$fulcrologic$fulcro$dom$meshpatch(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56782 = arguments.length;
var i__5727__auto___56783 = (0);
while(true){
if((i__5727__auto___56783 < len__5726__auto___56782)){
args__5732__auto__.push((arguments[i__5727__auto___56783]));

var G__56784 = (i__5727__auto___56783 + (1));
i__5727__auto___56783 = G__56784;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.meshpatch.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.meshpatch.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__54999 = conformed_args__53323__auto__;
var map__54999__$1 = cljs.core.__destructure_map(map__54999);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54999__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54999__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__54999__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("meshpatch",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.meshpatch.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.meshpatch.cljs$lang$applyTo = (function (seq54992){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq54992));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (polyline "hello")
 * (polyline nil "hello")
 * 
 * These two are made equivalent at compile time
 * (polyline {:onClick f} "hello")
 * (polyline #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (polyline :#the-id.klass.other-klass "hello")
 * (polyline :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.polyline = (function com$fulcrologic$fulcro$dom$polyline(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56787 = arguments.length;
var i__5727__auto___56788 = (0);
while(true){
if((i__5727__auto___56788 < len__5726__auto___56787)){
args__5732__auto__.push((arguments[i__5727__auto___56788]));

var G__56789 = (i__5727__auto___56788 + (1));
i__5727__auto___56788 = G__56789;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.polyline.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.polyline.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55013 = conformed_args__53323__auto__;
var map__55013__$1 = cljs.core.__destructure_map(map__55013);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55013__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55013__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55013__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("polyline",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.polyline.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.polyline.cljs$lang$applyTo = (function (seq55007){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55007));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (metadata "hello")
 * (metadata nil "hello")
 * 
 * These two are made equivalent at compile time
 * (metadata {:onClick f} "hello")
 * (metadata #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (metadata :#the-id.klass.other-klass "hello")
 * (metadata :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.metadata = (function com$fulcrologic$fulcro$dom$metadata(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56792 = arguments.length;
var i__5727__auto___56793 = (0);
while(true){
if((i__5727__auto___56793 < len__5726__auto___56792)){
args__5732__auto__.push((arguments[i__5727__auto___56793]));

var G__56794 = (i__5727__auto___56793 + (1));
i__5727__auto___56793 = G__56794;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.metadata.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.metadata.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55016 = conformed_args__53323__auto__;
var map__55016__$1 = cljs.core.__destructure_map(map__55016);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55016__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55016__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55016__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("metadata",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.metadata.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.metadata.cljs$lang$applyTo = (function (seq55015){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55015));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (map "hello")
 * (map nil "hello")
 * 
 * These two are made equivalent at compile time
 * (map {:onClick f} "hello")
 * (map #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (map :#the-id.klass.other-klass "hello")
 * (map :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.map = (function com$fulcrologic$fulcro$dom$map(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56796 = arguments.length;
var i__5727__auto___56797 = (0);
while(true){
if((i__5727__auto___56797 < len__5726__auto___56796)){
args__5732__auto__.push((arguments[i__5727__auto___56797]));

var G__56798 = (i__5727__auto___56797 + (1));
i__5727__auto___56797 = G__56798;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.map.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.map.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55025 = conformed_args__53323__auto__;
var map__55025__$1 = cljs.core.__destructure_map(map__55025);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55025__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55025__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55025__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("map",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.map.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.map.cljs$lang$applyTo = (function (seq55020){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55020));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (object "hello")
 * (object nil "hello")
 * 
 * These two are made equivalent at compile time
 * (object {:onClick f} "hello")
 * (object #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (object :#the-id.klass.other-klass "hello")
 * (object :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.object = (function com$fulcrologic$fulcro$dom$object(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56799 = arguments.length;
var i__5727__auto___56800 = (0);
while(true){
if((i__5727__auto___56800 < len__5726__auto___56799)){
args__5732__auto__.push((arguments[i__5727__auto___56800]));

var G__56801 = (i__5727__auto___56800 + (1));
i__5727__auto___56800 = G__56801;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.object.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.object.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55028 = conformed_args__53323__auto__;
var map__55028__$1 = cljs.core.__destructure_map(map__55028);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55028__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55028__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55028__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("object",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.object.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.object.cljs$lang$applyTo = (function (seq55027){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55027));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (i "hello")
 * (i nil "hello")
 * 
 * These two are made equivalent at compile time
 * (i {:onClick f} "hello")
 * (i #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (i :#the-id.klass.other-klass "hello")
 * (i :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.i = (function com$fulcrologic$fulcro$dom$i(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56805 = arguments.length;
var i__5727__auto___56806 = (0);
while(true){
if((i__5727__auto___56806 < len__5726__auto___56805)){
args__5732__auto__.push((arguments[i__5727__auto___56806]));

var G__56808 = (i__5727__auto___56806 + (1));
i__5727__auto___56806 = G__56808;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.i.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.i.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55036 = conformed_args__53323__auto__;
var map__55036__$1 = cljs.core.__destructure_map(map__55036);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55036__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55036__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55036__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("i",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.i.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.i.cljs$lang$applyTo = (function (seq55031){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55031));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (font-face-name "hello")
 * (font-face-name nil "hello")
 * 
 * These two are made equivalent at compile time
 * (font-face-name {:onClick f} "hello")
 * (font-face-name #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (font-face-name :#the-id.klass.other-klass "hello")
 * (font-face-name :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.font_face_name = (function com$fulcrologic$fulcro$dom$font_face_name(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56809 = arguments.length;
var i__5727__auto___56810 = (0);
while(true){
if((i__5727__auto___56810 < len__5726__auto___56809)){
args__5732__auto__.push((arguments[i__5727__auto___56810]));

var G__56811 = (i__5727__auto___56810 + (1));
i__5727__auto___56810 = G__56811;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.font_face_name.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.font_face_name.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55041 = conformed_args__53323__auto__;
var map__55041__$1 = cljs.core.__destructure_map(map__55041);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55041__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55041__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55041__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("font-face-name",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.font_face_name.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.font_face_name.cljs$lang$applyTo = (function (seq55039){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55039));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (p "hello")
 * (p nil "hello")
 * 
 * These two are made equivalent at compile time
 * (p {:onClick f} "hello")
 * (p #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (p :#the-id.klass.other-klass "hello")
 * (p :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.p = (function com$fulcrologic$fulcro$dom$p(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56814 = arguments.length;
var i__5727__auto___56815 = (0);
while(true){
if((i__5727__auto___56815 < len__5726__auto___56814)){
args__5732__auto__.push((arguments[i__5727__auto___56815]));

var G__56816 = (i__5727__auto___56815 + (1));
i__5727__auto___56815 = G__56816;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.p.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.p.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55043 = conformed_args__53323__auto__;
var map__55043__$1 = cljs.core.__destructure_map(map__55043);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55043__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55043__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55043__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("p",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.p.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.p.cljs$lang$applyTo = (function (seq55042){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55042));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (feFuncR "hello")
 * (feFuncR nil "hello")
 * 
 * These two are made equivalent at compile time
 * (feFuncR {:onClick f} "hello")
 * (feFuncR #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (feFuncR :#the-id.klass.other-klass "hello")
 * (feFuncR :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.feFuncR = (function com$fulcrologic$fulcro$dom$feFuncR(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56817 = arguments.length;
var i__5727__auto___56818 = (0);
while(true){
if((i__5727__auto___56818 < len__5726__auto___56817)){
args__5732__auto__.push((arguments[i__5727__auto___56818]));

var G__56819 = (i__5727__auto___56818 + (1));
i__5727__auto___56818 = G__56819;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.feFuncR.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.feFuncR.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55047 = conformed_args__53323__auto__;
var map__55047__$1 = cljs.core.__destructure_map(map__55047);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55047__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55047__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55047__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("feFuncR",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.feFuncR.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.feFuncR.cljs$lang$applyTo = (function (seq55044){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55044));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (hatchpath "hello")
 * (hatchpath nil "hello")
 * 
 * These two are made equivalent at compile time
 * (hatchpath {:onClick f} "hello")
 * (hatchpath #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (hatchpath :#the-id.klass.other-klass "hello")
 * (hatchpath :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.hatchpath = (function com$fulcrologic$fulcro$dom$hatchpath(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56823 = arguments.length;
var i__5727__auto___56824 = (0);
while(true){
if((i__5727__auto___56824 < len__5726__auto___56823)){
args__5732__auto__.push((arguments[i__5727__auto___56824]));

var G__56826 = (i__5727__auto___56824 + (1));
i__5727__auto___56824 = G__56826;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.hatchpath.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.hatchpath.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55053 = conformed_args__53323__auto__;
var map__55053__$1 = cljs.core.__destructure_map(map__55053);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55053__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55053__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55053__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("hatchpath",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.hatchpath.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.hatchpath.cljs$lang$applyTo = (function (seq55050){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55050));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (altGlyphItem "hello")
 * (altGlyphItem nil "hello")
 * 
 * These two are made equivalent at compile time
 * (altGlyphItem {:onClick f} "hello")
 * (altGlyphItem #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (altGlyphItem :#the-id.klass.other-klass "hello")
 * (altGlyphItem :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.altGlyphItem = (function com$fulcrologic$fulcro$dom$altGlyphItem(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56828 = arguments.length;
var i__5727__auto___56829 = (0);
while(true){
if((i__5727__auto___56829 < len__5726__auto___56828)){
args__5732__auto__.push((arguments[i__5727__auto___56829]));

var G__56830 = (i__5727__auto___56829 + (1));
i__5727__auto___56829 = G__56830;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.altGlyphItem.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.altGlyphItem.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55055 = conformed_args__53323__auto__;
var map__55055__$1 = cljs.core.__destructure_map(map__55055);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55055__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55055__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55055__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("altGlyphItem",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.altGlyphItem.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.altGlyphItem.cljs$lang$applyTo = (function (seq55054){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55054));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (nav "hello")
 * (nav nil "hello")
 * 
 * These two are made equivalent at compile time
 * (nav {:onClick f} "hello")
 * (nav #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (nav :#the-id.klass.other-klass "hello")
 * (nav :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.nav = (function com$fulcrologic$fulcro$dom$nav(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56831 = arguments.length;
var i__5727__auto___56832 = (0);
while(true){
if((i__5727__auto___56832 < len__5726__auto___56831)){
args__5732__auto__.push((arguments[i__5727__auto___56832]));

var G__56833 = (i__5727__auto___56832 + (1));
i__5727__auto___56832 = G__56833;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.nav.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.nav.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55059 = conformed_args__53323__auto__;
var map__55059__$1 = cljs.core.__destructure_map(map__55059);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55059__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55059__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55059__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("nav",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.nav.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.nav.cljs$lang$applyTo = (function (seq55056){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55056));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (ruby "hello")
 * (ruby nil "hello")
 * 
 * These two are made equivalent at compile time
 * (ruby {:onClick f} "hello")
 * (ruby #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (ruby :#the-id.klass.other-klass "hello")
 * (ruby :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.ruby = (function com$fulcrologic$fulcro$dom$ruby(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56836 = arguments.length;
var i__5727__auto___56837 = (0);
while(true){
if((i__5727__auto___56837 < len__5726__auto___56836)){
args__5732__auto__.push((arguments[i__5727__auto___56837]));

var G__56838 = (i__5727__auto___56837 + (1));
i__5727__auto___56837 = G__56838;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.ruby.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.ruby.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55067 = conformed_args__53323__auto__;
var map__55067__$1 = cljs.core.__destructure_map(map__55067);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55067__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55067__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55067__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("ruby",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.ruby.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.ruby.cljs$lang$applyTo = (function (seq55063){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55063));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (switch "hello")
 * (switch nil "hello")
 * 
 * These two are made equivalent at compile time
 * (switch {:onClick f} "hello")
 * (switch #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (switch :#the-id.klass.other-klass "hello")
 * (switch :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.switch$ = (function com$fulcrologic$fulcro$dom$switch(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56841 = arguments.length;
var i__5727__auto___56842 = (0);
while(true){
if((i__5727__auto___56842 < len__5726__auto___56841)){
args__5732__auto__.push((arguments[i__5727__auto___56842]));

var G__56845 = (i__5727__auto___56842 + (1));
i__5727__auto___56842 = G__56845;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.switch$.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.switch$.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55073 = conformed_args__53323__auto__;
var map__55073__$1 = cljs.core.__destructure_map(map__55073);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55073__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55073__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55073__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("switch",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.switch$.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.switch$.cljs$lang$applyTo = (function (seq55068){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55068));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (a "hello")
 * (a nil "hello")
 * 
 * These two are made equivalent at compile time
 * (a {:onClick f} "hello")
 * (a #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (a :#the-id.klass.other-klass "hello")
 * (a :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.a = (function com$fulcrologic$fulcro$dom$a(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56846 = arguments.length;
var i__5727__auto___56848 = (0);
while(true){
if((i__5727__auto___56848 < len__5726__auto___56846)){
args__5732__auto__.push((arguments[i__5727__auto___56848]));

var G__56849 = (i__5727__auto___56848 + (1));
i__5727__auto___56848 = G__56849;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.a.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.a.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55079 = conformed_args__53323__auto__;
var map__55079__$1 = cljs.core.__destructure_map(map__55079);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55079__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55079__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55079__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("a",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.a.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.a.cljs$lang$applyTo = (function (seq55074){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55074));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (view "hello")
 * (view nil "hello")
 * 
 * These two are made equivalent at compile time
 * (view {:onClick f} "hello")
 * (view #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (view :#the-id.klass.other-klass "hello")
 * (view :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.view = (function com$fulcrologic$fulcro$dom$view(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56850 = arguments.length;
var i__5727__auto___56851 = (0);
while(true){
if((i__5727__auto___56851 < len__5726__auto___56850)){
args__5732__auto__.push((arguments[i__5727__auto___56851]));

var G__56852 = (i__5727__auto___56851 + (1));
i__5727__auto___56851 = G__56852;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.view.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.view.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55091 = conformed_args__53323__auto__;
var map__55091__$1 = cljs.core.__destructure_map(map__55091);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55091__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55091__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55091__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("view",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.view.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.view.cljs$lang$applyTo = (function (seq55088){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55088));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (menu "hello")
 * (menu nil "hello")
 * 
 * These two are made equivalent at compile time
 * (menu {:onClick f} "hello")
 * (menu #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (menu :#the-id.klass.other-klass "hello")
 * (menu :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.menu = (function com$fulcrologic$fulcro$dom$menu(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56855 = arguments.length;
var i__5727__auto___56856 = (0);
while(true){
if((i__5727__auto___56856 < len__5726__auto___56855)){
args__5732__auto__.push((arguments[i__5727__auto___56856]));

var G__56857 = (i__5727__auto___56856 + (1));
i__5727__auto___56856 = G__56857;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.menu.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.menu.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55097 = conformed_args__53323__auto__;
var map__55097__$1 = cljs.core.__destructure_map(map__55097);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55097__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55097__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55097__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("menu",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.menu.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.menu.cljs$lang$applyTo = (function (seq55095){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55095));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (blockquote "hello")
 * (blockquote nil "hello")
 * 
 * These two are made equivalent at compile time
 * (blockquote {:onClick f} "hello")
 * (blockquote #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (blockquote :#the-id.klass.other-klass "hello")
 * (blockquote :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.blockquote = (function com$fulcrologic$fulcro$dom$blockquote(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56858 = arguments.length;
var i__5727__auto___56859 = (0);
while(true){
if((i__5727__auto___56859 < len__5726__auto___56858)){
args__5732__auto__.push((arguments[i__5727__auto___56859]));

var G__56860 = (i__5727__auto___56859 + (1));
i__5727__auto___56859 = G__56860;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.blockquote.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.blockquote.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55105 = conformed_args__53323__auto__;
var map__55105__$1 = cljs.core.__destructure_map(map__55105);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55105__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55105__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55105__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("blockquote",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.blockquote.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.blockquote.cljs$lang$applyTo = (function (seq55103){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55103));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (img "hello")
 * (img nil "hello")
 * 
 * These two are made equivalent at compile time
 * (img {:onClick f} "hello")
 * (img #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (img :#the-id.klass.other-klass "hello")
 * (img :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.img = (function com$fulcrologic$fulcro$dom$img(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56861 = arguments.length;
var i__5727__auto___56862 = (0);
while(true){
if((i__5727__auto___56862 < len__5726__auto___56861)){
args__5732__auto__.push((arguments[i__5727__auto___56862]));

var G__56863 = (i__5727__auto___56862 + (1));
i__5727__auto___56862 = G__56863;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.img.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.img.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55113 = conformed_args__53323__auto__;
var map__55113__$1 = cljs.core.__destructure_map(map__55113);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55113__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55113__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55113__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("img",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.img.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.img.cljs$lang$applyTo = (function (seq55108){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55108));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (feFuncG "hello")
 * (feFuncG nil "hello")
 * 
 * These two are made equivalent at compile time
 * (feFuncG {:onClick f} "hello")
 * (feFuncG #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (feFuncG :#the-id.klass.other-klass "hello")
 * (feFuncG :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.feFuncG = (function com$fulcrologic$fulcro$dom$feFuncG(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56866 = arguments.length;
var i__5727__auto___56867 = (0);
while(true){
if((i__5727__auto___56867 < len__5726__auto___56866)){
args__5732__auto__.push((arguments[i__5727__auto___56867]));

var G__56874 = (i__5727__auto___56867 + (1));
i__5727__auto___56867 = G__56874;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.feFuncG.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.feFuncG.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55120 = conformed_args__53323__auto__;
var map__55120__$1 = cljs.core.__destructure_map(map__55120);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55120__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55120__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55120__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("feFuncG",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.feFuncG.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.feFuncG.cljs$lang$applyTo = (function (seq55117){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55117));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (text "hello")
 * (text nil "hello")
 * 
 * These two are made equivalent at compile time
 * (text {:onClick f} "hello")
 * (text #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (text :#the-id.klass.other-klass "hello")
 * (text :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.text = (function com$fulcrologic$fulcro$dom$text(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56879 = arguments.length;
var i__5727__auto___56880 = (0);
while(true){
if((i__5727__auto___56880 < len__5726__auto___56879)){
args__5732__auto__.push((arguments[i__5727__auto___56880]));

var G__56881 = (i__5727__auto___56880 + (1));
i__5727__auto___56880 = G__56881;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.text.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.text.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55127 = conformed_args__53323__auto__;
var map__55127__$1 = cljs.core.__destructure_map(map__55127);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55127__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55127__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55127__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("text",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.text.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.text.cljs$lang$applyTo = (function (seq55124){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55124));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (span "hello")
 * (span nil "hello")
 * 
 * These two are made equivalent at compile time
 * (span {:onClick f} "hello")
 * (span #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (span :#the-id.klass.other-klass "hello")
 * (span :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.span = (function com$fulcrologic$fulcro$dom$span(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56885 = arguments.length;
var i__5727__auto___56886 = (0);
while(true){
if((i__5727__auto___56886 < len__5726__auto___56885)){
args__5732__auto__.push((arguments[i__5727__auto___56886]));

var G__56887 = (i__5727__auto___56886 + (1));
i__5727__auto___56886 = G__56887;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.span.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.span.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55143 = conformed_args__53323__auto__;
var map__55143__$1 = cljs.core.__destructure_map(map__55143);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55143__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55143__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55143__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("span",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.span.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.span.cljs$lang$applyTo = (function (seq55136){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55136));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (track "hello")
 * (track nil "hello")
 * 
 * These two are made equivalent at compile time
 * (track {:onClick f} "hello")
 * (track #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (track :#the-id.klass.other-klass "hello")
 * (track :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.track = (function com$fulcrologic$fulcro$dom$track(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56888 = arguments.length;
var i__5727__auto___56890 = (0);
while(true){
if((i__5727__auto___56890 < len__5726__auto___56888)){
args__5732__auto__.push((arguments[i__5727__auto___56890]));

var G__56891 = (i__5727__auto___56890 + (1));
i__5727__auto___56890 = G__56891;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.track.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.track.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55150 = conformed_args__53323__auto__;
var map__55150__$1 = cljs.core.__destructure_map(map__55150);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55150__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55150__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55150__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("track",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.track.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.track.cljs$lang$applyTo = (function (seq55146){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55146));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (data "hello")
 * (data nil "hello")
 * 
 * These two are made equivalent at compile time
 * (data {:onClick f} "hello")
 * (data #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (data :#the-id.klass.other-klass "hello")
 * (data :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.data = (function com$fulcrologic$fulcro$dom$data(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56898 = arguments.length;
var i__5727__auto___56899 = (0);
while(true){
if((i__5727__auto___56899 < len__5726__auto___56898)){
args__5732__auto__.push((arguments[i__5727__auto___56899]));

var G__56900 = (i__5727__auto___56899 + (1));
i__5727__auto___56899 = G__56900;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.data.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.data.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55155 = conformed_args__53323__auto__;
var map__55155__$1 = cljs.core.__destructure_map(map__55155);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55155__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55155__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55155__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("data",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.data.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.data.cljs$lang$applyTo = (function (seq55153){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55153));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (u "hello")
 * (u nil "hello")
 * 
 * These two are made equivalent at compile time
 * (u {:onClick f} "hello")
 * (u #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (u :#the-id.klass.other-klass "hello")
 * (u :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.u = (function com$fulcrologic$fulcro$dom$u(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56903 = arguments.length;
var i__5727__auto___56904 = (0);
while(true){
if((i__5727__auto___56904 < len__5726__auto___56903)){
args__5732__auto__.push((arguments[i__5727__auto___56904]));

var G__56905 = (i__5727__auto___56904 + (1));
i__5727__auto___56904 = G__56905;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.u.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.u.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55163 = conformed_args__53323__auto__;
var map__55163__$1 = cljs.core.__destructure_map(map__55163);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55163__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55163__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55163__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("u",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.u.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.u.cljs$lang$applyTo = (function (seq55160){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55160));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (dl "hello")
 * (dl nil "hello")
 * 
 * These two are made equivalent at compile time
 * (dl {:onClick f} "hello")
 * (dl #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (dl :#the-id.klass.other-klass "hello")
 * (dl :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.dl = (function com$fulcrologic$fulcro$dom$dl(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56908 = arguments.length;
var i__5727__auto___56909 = (0);
while(true){
if((i__5727__auto___56909 < len__5726__auto___56908)){
args__5732__auto__.push((arguments[i__5727__auto___56909]));

var G__56910 = (i__5727__auto___56909 + (1));
i__5727__auto___56909 = G__56910;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.dl.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.dl.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55168 = conformed_args__53323__auto__;
var map__55168__$1 = cljs.core.__destructure_map(map__55168);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55168__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55168__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55168__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("dl",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.dl.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.dl.cljs$lang$applyTo = (function (seq55166){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55166));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (select "hello")
 * (select nil "hello")
 * 
 * These two are made equivalent at compile time
 * (select {:onClick f} "hello")
 * (select #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (select :#the-id.klass.other-klass "hello")
 * (select :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.select = (function com$fulcrologic$fulcro$dom$select(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56913 = arguments.length;
var i__5727__auto___56914 = (0);
while(true){
if((i__5727__auto___56914 < len__5726__auto___56913)){
args__5732__auto__.push((arguments[i__5727__auto___56914]));

var G__56915 = (i__5727__auto___56914 + (1));
i__5727__auto___56914 = G__56915;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.select.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.select.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55174 = conformed_args__53323__auto__;
var map__55174__$1 = cljs.core.__destructure_map(map__55174);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55174__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55174__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55174__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("select",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.select.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.select.cljs$lang$applyTo = (function (seq55169){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55169));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (polygon "hello")
 * (polygon nil "hello")
 * 
 * These two are made equivalent at compile time
 * (polygon {:onClick f} "hello")
 * (polygon #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (polygon :#the-id.klass.other-klass "hello")
 * (polygon :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.polygon = (function com$fulcrologic$fulcro$dom$polygon(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56921 = arguments.length;
var i__5727__auto___56922 = (0);
while(true){
if((i__5727__auto___56922 < len__5726__auto___56921)){
args__5732__auto__.push((arguments[i__5727__auto___56922]));

var G__56923 = (i__5727__auto___56922 + (1));
i__5727__auto___56922 = G__56923;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.polygon.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.polygon.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55187 = conformed_args__53323__auto__;
var map__55187__$1 = cljs.core.__destructure_map(map__55187);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55187__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55187__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55187__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("polygon",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.polygon.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.polygon.cljs$lang$applyTo = (function (seq55180){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55180));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (pattern "hello")
 * (pattern nil "hello")
 * 
 * These two are made equivalent at compile time
 * (pattern {:onClick f} "hello")
 * (pattern #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (pattern :#the-id.klass.other-klass "hello")
 * (pattern :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.pattern = (function com$fulcrologic$fulcro$dom$pattern(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56926 = arguments.length;
var i__5727__auto___56927 = (0);
while(true){
if((i__5727__auto___56927 < len__5726__auto___56926)){
args__5732__auto__.push((arguments[i__5727__auto___56927]));

var G__56928 = (i__5727__auto___56927 + (1));
i__5727__auto___56927 = G__56928;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.pattern.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.pattern.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55200 = conformed_args__53323__auto__;
var map__55200__$1 = cljs.core.__destructure_map(map__55200);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55200__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55200__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55200__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("pattern",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.pattern.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.pattern.cljs$lang$applyTo = (function (seq55194){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55194));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (html "hello")
 * (html nil "hello")
 * 
 * These two are made equivalent at compile time
 * (html {:onClick f} "hello")
 * (html #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (html :#the-id.klass.other-klass "hello")
 * (html :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.html = (function com$fulcrologic$fulcro$dom$html(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56932 = arguments.length;
var i__5727__auto___56933 = (0);
while(true){
if((i__5727__auto___56933 < len__5726__auto___56932)){
args__5732__auto__.push((arguments[i__5727__auto___56933]));

var G__56935 = (i__5727__auto___56933 + (1));
i__5727__auto___56933 = G__56935;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.html.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.html.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55208 = conformed_args__53323__auto__;
var map__55208__$1 = cljs.core.__destructure_map(map__55208);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55208__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55208__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55208__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("html",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.html.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.html.cljs$lang$applyTo = (function (seq55202){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55202));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (foreignObject "hello")
 * (foreignObject nil "hello")
 * 
 * These two are made equivalent at compile time
 * (foreignObject {:onClick f} "hello")
 * (foreignObject #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (foreignObject :#the-id.klass.other-klass "hello")
 * (foreignObject :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.foreignObject = (function com$fulcrologic$fulcro$dom$foreignObject(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56940 = arguments.length;
var i__5727__auto___56941 = (0);
while(true){
if((i__5727__auto___56941 < len__5726__auto___56940)){
args__5732__auto__.push((arguments[i__5727__auto___56941]));

var G__56943 = (i__5727__auto___56941 + (1));
i__5727__auto___56941 = G__56943;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.foreignObject.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.foreignObject.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55215 = conformed_args__53323__auto__;
var map__55215__$1 = cljs.core.__destructure_map(map__55215);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55215__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55215__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55215__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("foreignObject",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.foreignObject.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.foreignObject.cljs$lang$applyTo = (function (seq55212){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55212));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (thead "hello")
 * (thead nil "hello")
 * 
 * These two are made equivalent at compile time
 * (thead {:onClick f} "hello")
 * (thead #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (thead :#the-id.klass.other-klass "hello")
 * (thead :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.thead = (function com$fulcrologic$fulcro$dom$thead(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56944 = arguments.length;
var i__5727__auto___56945 = (0);
while(true){
if((i__5727__auto___56945 < len__5726__auto___56944)){
args__5732__auto__.push((arguments[i__5727__auto___56945]));

var G__56946 = (i__5727__auto___56945 + (1));
i__5727__auto___56945 = G__56946;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.thead.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.thead.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55224 = conformed_args__53323__auto__;
var map__55224__$1 = cljs.core.__destructure_map(map__55224);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55224__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55224__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55224__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("thead",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.thead.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.thead.cljs$lang$applyTo = (function (seq55217){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55217));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (path "hello")
 * (path nil "hello")
 * 
 * These two are made equivalent at compile time
 * (path {:onClick f} "hello")
 * (path #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (path :#the-id.klass.other-klass "hello")
 * (path :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.path = (function com$fulcrologic$fulcro$dom$path(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56951 = arguments.length;
var i__5727__auto___56952 = (0);
while(true){
if((i__5727__auto___56952 < len__5726__auto___56951)){
args__5732__auto__.push((arguments[i__5727__auto___56952]));

var G__56953 = (i__5727__auto___56952 + (1));
i__5727__auto___56952 = G__56953;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.path.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.path.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55235 = conformed_args__53323__auto__;
var map__55235__$1 = cljs.core.__destructure_map(map__55235);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55235__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55235__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55235__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("path",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.path.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.path.cljs$lang$applyTo = (function (seq55233){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55233));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (del "hello")
 * (del nil "hello")
 * 
 * These two are made equivalent at compile time
 * (del {:onClick f} "hello")
 * (del #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (del :#the-id.klass.other-klass "hello")
 * (del :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.del = (function com$fulcrologic$fulcro$dom$del(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56958 = arguments.length;
var i__5727__auto___56959 = (0);
while(true){
if((i__5727__auto___56959 < len__5726__auto___56958)){
args__5732__auto__.push((arguments[i__5727__auto___56959]));

var G__56961 = (i__5727__auto___56959 + (1));
i__5727__auto___56959 = G__56961;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.del.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.del.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55238 = conformed_args__53323__auto__;
var map__55238__$1 = cljs.core.__destructure_map(map__55238);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55238__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55238__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55238__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("del",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.del.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.del.cljs$lang$applyTo = (function (seq55237){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55237));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (altGlyph "hello")
 * (altGlyph nil "hello")
 * 
 * These two are made equivalent at compile time
 * (altGlyph {:onClick f} "hello")
 * (altGlyph #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (altGlyph :#the-id.klass.other-klass "hello")
 * (altGlyph :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.altGlyph = (function com$fulcrologic$fulcro$dom$altGlyph(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56973 = arguments.length;
var i__5727__auto___56975 = (0);
while(true){
if((i__5727__auto___56975 < len__5726__auto___56973)){
args__5732__auto__.push((arguments[i__5727__auto___56975]));

var G__56976 = (i__5727__auto___56975 + (1));
i__5727__auto___56975 = G__56976;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.altGlyph.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.altGlyph.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55245 = conformed_args__53323__auto__;
var map__55245__$1 = cljs.core.__destructure_map(map__55245);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55245__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55245__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55245__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("altGlyph",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.altGlyph.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.altGlyph.cljs$lang$applyTo = (function (seq55242){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55242));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (fieldset "hello")
 * (fieldset nil "hello")
 * 
 * These two are made equivalent at compile time
 * (fieldset {:onClick f} "hello")
 * (fieldset #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (fieldset :#the-id.klass.other-klass "hello")
 * (fieldset :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.fieldset = (function com$fulcrologic$fulcro$dom$fieldset(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56979 = arguments.length;
var i__5727__auto___56980 = (0);
while(true){
if((i__5727__auto___56980 < len__5726__auto___56979)){
args__5732__auto__.push((arguments[i__5727__auto___56980]));

var G__56981 = (i__5727__auto___56980 + (1));
i__5727__auto___56980 = G__56981;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.fieldset.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.fieldset.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55254 = conformed_args__53323__auto__;
var map__55254__$1 = cljs.core.__destructure_map(map__55254);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55254__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55254__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55254__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("fieldset",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.fieldset.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.fieldset.cljs$lang$applyTo = (function (seq55252){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55252));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (aside "hello")
 * (aside nil "hello")
 * 
 * These two are made equivalent at compile time
 * (aside {:onClick f} "hello")
 * (aside #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (aside :#the-id.klass.other-klass "hello")
 * (aside :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.aside = (function com$fulcrologic$fulcro$dom$aside(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56985 = arguments.length;
var i__5727__auto___56986 = (0);
while(true){
if((i__5727__auto___56986 < len__5726__auto___56985)){
args__5732__auto__.push((arguments[i__5727__auto___56986]));

var G__56988 = (i__5727__auto___56986 + (1));
i__5727__auto___56986 = G__56988;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.aside.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.aside.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55260 = conformed_args__53323__auto__;
var map__55260__$1 = cljs.core.__destructure_map(map__55260);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55260__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55260__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55260__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("aside",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.aside.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.aside.cljs$lang$applyTo = (function (seq55258){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55258));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (feBlend "hello")
 * (feBlend nil "hello")
 * 
 * These two are made equivalent at compile time
 * (feBlend {:onClick f} "hello")
 * (feBlend #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (feBlend :#the-id.klass.other-klass "hello")
 * (feBlend :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.feBlend = (function com$fulcrologic$fulcro$dom$feBlend(var_args){
var args__5732__auto__ = [];
var len__5726__auto___56995 = arguments.length;
var i__5727__auto___56996 = (0);
while(true){
if((i__5727__auto___56996 < len__5726__auto___56995)){
args__5732__auto__.push((arguments[i__5727__auto___56996]));

var G__56997 = (i__5727__auto___56996 + (1));
i__5727__auto___56996 = G__56997;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.feBlend.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.feBlend.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55266 = conformed_args__53323__auto__;
var map__55266__$1 = cljs.core.__destructure_map(map__55266);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55266__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55266__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55266__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("feBlend",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.feBlend.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.feBlend.cljs$lang$applyTo = (function (seq55265){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55265));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (figure "hello")
 * (figure nil "hello")
 * 
 * These two are made equivalent at compile time
 * (figure {:onClick f} "hello")
 * (figure #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (figure :#the-id.klass.other-klass "hello")
 * (figure :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.figure = (function com$fulcrologic$fulcro$dom$figure(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57003 = arguments.length;
var i__5727__auto___57004 = (0);
while(true){
if((i__5727__auto___57004 < len__5726__auto___57003)){
args__5732__auto__.push((arguments[i__5727__auto___57004]));

var G__57006 = (i__5727__auto___57004 + (1));
i__5727__auto___57004 = G__57006;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.figure.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.figure.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55271 = conformed_args__53323__auto__;
var map__55271__$1 = cljs.core.__destructure_map(map__55271);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55271__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55271__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55271__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("figure",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.figure.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.figure.cljs$lang$applyTo = (function (seq55269){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55269));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (textPath "hello")
 * (textPath nil "hello")
 * 
 * These two are made equivalent at compile time
 * (textPath {:onClick f} "hello")
 * (textPath #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (textPath :#the-id.klass.other-klass "hello")
 * (textPath :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.textPath = (function com$fulcrologic$fulcro$dom$textPath(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57008 = arguments.length;
var i__5727__auto___57009 = (0);
while(true){
if((i__5727__auto___57009 < len__5726__auto___57008)){
args__5732__auto__.push((arguments[i__5727__auto___57009]));

var G__57010 = (i__5727__auto___57009 + (1));
i__5727__auto___57009 = G__57010;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.textPath.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.textPath.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55292 = conformed_args__53323__auto__;
var map__55292__$1 = cljs.core.__destructure_map(map__55292);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55292__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55292__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55292__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("textPath",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.textPath.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.textPath.cljs$lang$applyTo = (function (seq55279){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55279));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (figcaption "hello")
 * (figcaption nil "hello")
 * 
 * These two are made equivalent at compile time
 * (figcaption {:onClick f} "hello")
 * (figcaption #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (figcaption :#the-id.klass.other-klass "hello")
 * (figcaption :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.figcaption = (function com$fulcrologic$fulcro$dom$figcaption(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57015 = arguments.length;
var i__5727__auto___57016 = (0);
while(true){
if((i__5727__auto___57016 < len__5726__auto___57015)){
args__5732__auto__.push((arguments[i__5727__auto___57016]));

var G__57017 = (i__5727__auto___57016 + (1));
i__5727__auto___57016 = G__57017;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.figcaption.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.figcaption.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55294 = conformed_args__53323__auto__;
var map__55294__$1 = cljs.core.__destructure_map(map__55294);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55294__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55294__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55294__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("figcaption",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.figcaption.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.figcaption.cljs$lang$applyTo = (function (seq55293){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55293));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (mask "hello")
 * (mask nil "hello")
 * 
 * These two are made equivalent at compile time
 * (mask {:onClick f} "hello")
 * (mask #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (mask :#the-id.klass.other-klass "hello")
 * (mask :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.mask = (function com$fulcrologic$fulcro$dom$mask(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57020 = arguments.length;
var i__5727__auto___57021 = (0);
while(true){
if((i__5727__auto___57021 < len__5726__auto___57020)){
args__5732__auto__.push((arguments[i__5727__auto___57021]));

var G__57022 = (i__5727__auto___57021 + (1));
i__5727__auto___57021 = G__57022;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.mask.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.mask.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55300 = conformed_args__53323__auto__;
var map__55300__$1 = cljs.core.__destructure_map(map__55300);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55300__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55300__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55300__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("mask",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.mask.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.mask.cljs$lang$applyTo = (function (seq55297){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55297));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (q "hello")
 * (q nil "hello")
 * 
 * These two are made equivalent at compile time
 * (q {:onClick f} "hello")
 * (q #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (q :#the-id.klass.other-klass "hello")
 * (q :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.q = (function com$fulcrologic$fulcro$dom$q(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57026 = arguments.length;
var i__5727__auto___57027 = (0);
while(true){
if((i__5727__auto___57027 < len__5726__auto___57026)){
args__5732__auto__.push((arguments[i__5727__auto___57027]));

var G__57028 = (i__5727__auto___57027 + (1));
i__5727__auto___57027 = G__57028;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.q.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.q.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55304 = conformed_args__53323__auto__;
var map__55304__$1 = cljs.core.__destructure_map(map__55304);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55304__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55304__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55304__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("q",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.q.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.q.cljs$lang$applyTo = (function (seq55302){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55302));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (bdi "hello")
 * (bdi nil "hello")
 * 
 * These two are made equivalent at compile time
 * (bdi {:onClick f} "hello")
 * (bdi #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (bdi :#the-id.klass.other-klass "hello")
 * (bdi :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.bdi = (function com$fulcrologic$fulcro$dom$bdi(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57035 = arguments.length;
var i__5727__auto___57036 = (0);
while(true){
if((i__5727__auto___57036 < len__5726__auto___57035)){
args__5732__auto__.push((arguments[i__5727__auto___57036]));

var G__57037 = (i__5727__auto___57036 + (1));
i__5727__auto___57036 = G__57037;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.bdi.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.bdi.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55308 = conformed_args__53323__auto__;
var map__55308__$1 = cljs.core.__destructure_map(map__55308);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55308__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55308__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55308__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("bdi",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.bdi.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.bdi.cljs$lang$applyTo = (function (seq55306){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55306));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (feDistantLight "hello")
 * (feDistantLight nil "hello")
 * 
 * These two are made equivalent at compile time
 * (feDistantLight {:onClick f} "hello")
 * (feDistantLight #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (feDistantLight :#the-id.klass.other-klass "hello")
 * (feDistantLight :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.feDistantLight = (function com$fulcrologic$fulcro$dom$feDistantLight(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57040 = arguments.length;
var i__5727__auto___57041 = (0);
while(true){
if((i__5727__auto___57041 < len__5726__auto___57040)){
args__5732__auto__.push((arguments[i__5727__auto___57041]));

var G__57043 = (i__5727__auto___57041 + (1));
i__5727__auto___57041 = G__57043;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.feDistantLight.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.feDistantLight.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55317 = conformed_args__53323__auto__;
var map__55317__$1 = cljs.core.__destructure_map(map__55317);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55317__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55317__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55317__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("feDistantLight",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.feDistantLight.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.feDistantLight.cljs$lang$applyTo = (function (seq55311){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55311));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (video "hello")
 * (video nil "hello")
 * 
 * These two are made equivalent at compile time
 * (video {:onClick f} "hello")
 * (video #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (video :#the-id.klass.other-klass "hello")
 * (video :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.video = (function com$fulcrologic$fulcro$dom$video(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57046 = arguments.length;
var i__5727__auto___57047 = (0);
while(true){
if((i__5727__auto___57047 < len__5726__auto___57046)){
args__5732__auto__.push((arguments[i__5727__auto___57047]));

var G__57049 = (i__5727__auto___57047 + (1));
i__5727__auto___57047 = G__57049;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.video.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.video.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55324 = conformed_args__53323__auto__;
var map__55324__$1 = cljs.core.__destructure_map(map__55324);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55324__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55324__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55324__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("video",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.video.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.video.cljs$lang$applyTo = (function (seq55318){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55318));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (address "hello")
 * (address nil "hello")
 * 
 * These two are made equivalent at compile time
 * (address {:onClick f} "hello")
 * (address #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (address :#the-id.klass.other-klass "hello")
 * (address :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.address = (function com$fulcrologic$fulcro$dom$address(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57053 = arguments.length;
var i__5727__auto___57054 = (0);
while(true){
if((i__5727__auto___57054 < len__5726__auto___57053)){
args__5732__auto__.push((arguments[i__5727__auto___57054]));

var G__57056 = (i__5727__auto___57054 + (1));
i__5727__auto___57054 = G__57056;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.address.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.address.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55330 = conformed_args__53323__auto__;
var map__55330__$1 = cljs.core.__destructure_map(map__55330);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55330__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55330__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55330__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("address",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.address.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.address.cljs$lang$applyTo = (function (seq55328){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55328));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (caption "hello")
 * (caption nil "hello")
 * 
 * These two are made equivalent at compile time
 * (caption {:onClick f} "hello")
 * (caption #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (caption :#the-id.klass.other-klass "hello")
 * (caption :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.caption = (function com$fulcrologic$fulcro$dom$caption(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57058 = arguments.length;
var i__5727__auto___57059 = (0);
while(true){
if((i__5727__auto___57059 < len__5726__auto___57058)){
args__5732__auto__.push((arguments[i__5727__auto___57059]));

var G__57060 = (i__5727__auto___57059 + (1));
i__5727__auto___57059 = G__57060;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.caption.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.caption.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55338 = conformed_args__53323__auto__;
var map__55338__$1 = cljs.core.__destructure_map(map__55338);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55338__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55338__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55338__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("caption",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.caption.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.caption.cljs$lang$applyTo = (function (seq55336){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55336));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (dd "hello")
 * (dd nil "hello")
 * 
 * These two are made equivalent at compile time
 * (dd {:onClick f} "hello")
 * (dd #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (dd :#the-id.klass.other-klass "hello")
 * (dd :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.dd = (function com$fulcrologic$fulcro$dom$dd(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57064 = arguments.length;
var i__5727__auto___57065 = (0);
while(true){
if((i__5727__auto___57065 < len__5726__auto___57064)){
args__5732__auto__.push((arguments[i__5727__auto___57065]));

var G__57067 = (i__5727__auto___57065 + (1));
i__5727__auto___57065 = G__57067;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.dd.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.dd.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55348 = conformed_args__53323__auto__;
var map__55348__$1 = cljs.core.__destructure_map(map__55348);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55348__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55348__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55348__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("dd",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.dd.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.dd.cljs$lang$applyTo = (function (seq55344){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55344));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (rp "hello")
 * (rp nil "hello")
 * 
 * These two are made equivalent at compile time
 * (rp {:onClick f} "hello")
 * (rp #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (rp :#the-id.klass.other-klass "hello")
 * (rp :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.rp = (function com$fulcrologic$fulcro$dom$rp(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57073 = arguments.length;
var i__5727__auto___57074 = (0);
while(true){
if((i__5727__auto___57074 < len__5726__auto___57073)){
args__5732__auto__.push((arguments[i__5727__auto___57074]));

var G__57075 = (i__5727__auto___57074 + (1));
i__5727__auto___57074 = G__57075;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.rp.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.rp.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55355 = conformed_args__53323__auto__;
var map__55355__$1 = cljs.core.__destructure_map(map__55355);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55355__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55355__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55355__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("rp",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.rp.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.rp.cljs$lang$applyTo = (function (seq55350){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55350));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (hr "hello")
 * (hr nil "hello")
 * 
 * These two are made equivalent at compile time
 * (hr {:onClick f} "hello")
 * (hr #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (hr :#the-id.klass.other-klass "hello")
 * (hr :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.hr = (function com$fulcrologic$fulcro$dom$hr(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57077 = arguments.length;
var i__5727__auto___57078 = (0);
while(true){
if((i__5727__auto___57078 < len__5726__auto___57077)){
args__5732__auto__.push((arguments[i__5727__auto___57078]));

var G__57080 = (i__5727__auto___57078 + (1));
i__5727__auto___57078 = G__57080;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.hr.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.hr.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55361 = conformed_args__53323__auto__;
var map__55361__$1 = cljs.core.__destructure_map(map__55361);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55361__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55361__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55361__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("hr",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.hr.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.hr.cljs$lang$applyTo = (function (seq55358){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55358));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (meta "hello")
 * (meta nil "hello")
 * 
 * These two are made equivalent at compile time
 * (meta {:onClick f} "hello")
 * (meta #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (meta :#the-id.klass.other-klass "hello")
 * (meta :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.meta = (function com$fulcrologic$fulcro$dom$meta(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57083 = arguments.length;
var i__5727__auto___57085 = (0);
while(true){
if((i__5727__auto___57085 < len__5726__auto___57083)){
args__5732__auto__.push((arguments[i__5727__auto___57085]));

var G__57086 = (i__5727__auto___57085 + (1));
i__5727__auto___57085 = G__57086;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.meta.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.meta.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55376 = conformed_args__53323__auto__;
var map__55376__$1 = cljs.core.__destructure_map(map__55376);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55376__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55376__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55376__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("meta",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.meta.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.meta.cljs$lang$applyTo = (function (seq55367){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55367));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (tbody "hello")
 * (tbody nil "hello")
 * 
 * These two are made equivalent at compile time
 * (tbody {:onClick f} "hello")
 * (tbody #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (tbody :#the-id.klass.other-klass "hello")
 * (tbody :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.tbody = (function com$fulcrologic$fulcro$dom$tbody(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57091 = arguments.length;
var i__5727__auto___57092 = (0);
while(true){
if((i__5727__auto___57092 < len__5726__auto___57091)){
args__5732__auto__.push((arguments[i__5727__auto___57092]));

var G__57093 = (i__5727__auto___57092 + (1));
i__5727__auto___57092 = G__57093;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.tbody.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.tbody.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55392 = conformed_args__53323__auto__;
var map__55392__$1 = cljs.core.__destructure_map(map__55392);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55392__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55392__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55392__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("tbody",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.tbody.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.tbody.cljs$lang$applyTo = (function (seq55384){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55384));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (desc "hello")
 * (desc nil "hello")
 * 
 * These two are made equivalent at compile time
 * (desc {:onClick f} "hello")
 * (desc #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (desc :#the-id.klass.other-klass "hello")
 * (desc :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.desc = (function com$fulcrologic$fulcro$dom$desc(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57096 = arguments.length;
var i__5727__auto___57097 = (0);
while(true){
if((i__5727__auto___57097 < len__5726__auto___57096)){
args__5732__auto__.push((arguments[i__5727__auto___57097]));

var G__57101 = (i__5727__auto___57097 + (1));
i__5727__auto___57097 = G__57101;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.desc.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.desc.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55405 = conformed_args__53323__auto__;
var map__55405__$1 = cljs.core.__destructure_map(map__55405);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55405__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55405__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55405__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("desc",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.desc.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.desc.cljs$lang$applyTo = (function (seq55397){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55397));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (table "hello")
 * (table nil "hello")
 * 
 * These two are made equivalent at compile time
 * (table {:onClick f} "hello")
 * (table #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (table :#the-id.klass.other-klass "hello")
 * (table :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.table = (function com$fulcrologic$fulcro$dom$table(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57104 = arguments.length;
var i__5727__auto___57105 = (0);
while(true){
if((i__5727__auto___57105 < len__5726__auto___57104)){
args__5732__auto__.push((arguments[i__5727__auto___57105]));

var G__57106 = (i__5727__auto___57105 + (1));
i__5727__auto___57105 = G__57106;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.table.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.table.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55412 = conformed_args__53323__auto__;
var map__55412__$1 = cljs.core.__destructure_map(map__55412);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55412__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55412__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55412__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("table",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.table.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.table.cljs$lang$applyTo = (function (seq55411){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55411));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (pre "hello")
 * (pre nil "hello")
 * 
 * These two are made equivalent at compile time
 * (pre {:onClick f} "hello")
 * (pre #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (pre :#the-id.klass.other-klass "hello")
 * (pre :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.pre = (function com$fulcrologic$fulcro$dom$pre(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57111 = arguments.length;
var i__5727__auto___57112 = (0);
while(true){
if((i__5727__auto___57112 < len__5726__auto___57111)){
args__5732__auto__.push((arguments[i__5727__auto___57112]));

var G__57114 = (i__5727__auto___57112 + (1));
i__5727__auto___57112 = G__57114;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.pre.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.pre.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55437 = conformed_args__53323__auto__;
var map__55437__$1 = cljs.core.__destructure_map(map__55437);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55437__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55437__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55437__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("pre",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.pre.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.pre.cljs$lang$applyTo = (function (seq55433){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55433));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (ul "hello")
 * (ul nil "hello")
 * 
 * These two are made equivalent at compile time
 * (ul {:onClick f} "hello")
 * (ul #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (ul :#the-id.klass.other-klass "hello")
 * (ul :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.ul = (function com$fulcrologic$fulcro$dom$ul(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57117 = arguments.length;
var i__5727__auto___57118 = (0);
while(true){
if((i__5727__auto___57118 < len__5726__auto___57117)){
args__5732__auto__.push((arguments[i__5727__auto___57118]));

var G__57119 = (i__5727__auto___57118 + (1));
i__5727__auto___57118 = G__57119;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.ul.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.ul.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55465 = conformed_args__53323__auto__;
var map__55465__$1 = cljs.core.__destructure_map(map__55465);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55465__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55465__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55465__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("ul",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.ul.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.ul.cljs$lang$applyTo = (function (seq55448){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55448));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (feConvolveMatrix "hello")
 * (feConvolveMatrix nil "hello")
 * 
 * These two are made equivalent at compile time
 * (feConvolveMatrix {:onClick f} "hello")
 * (feConvolveMatrix #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (feConvolveMatrix :#the-id.klass.other-klass "hello")
 * (feConvolveMatrix :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.feConvolveMatrix = (function com$fulcrologic$fulcro$dom$feConvolveMatrix(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57140 = arguments.length;
var i__5727__auto___57142 = (0);
while(true){
if((i__5727__auto___57142 < len__5726__auto___57140)){
args__5732__auto__.push((arguments[i__5727__auto___57142]));

var G__57148 = (i__5727__auto___57142 + (1));
i__5727__auto___57142 = G__57148;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.feConvolveMatrix.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.feConvolveMatrix.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55482 = conformed_args__53323__auto__;
var map__55482__$1 = cljs.core.__destructure_map(map__55482);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55482__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55482__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55482__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("feConvolveMatrix",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.feConvolveMatrix.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.feConvolveMatrix.cljs$lang$applyTo = (function (seq55474){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55474));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (sup "hello")
 * (sup nil "hello")
 * 
 * These two are made equivalent at compile time
 * (sup {:onClick f} "hello")
 * (sup #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (sup :#the-id.klass.other-klass "hello")
 * (sup :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.sup = (function com$fulcrologic$fulcro$dom$sup(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57179 = arguments.length;
var i__5727__auto___57181 = (0);
while(true){
if((i__5727__auto___57181 < len__5726__auto___57179)){
args__5732__auto__.push((arguments[i__5727__auto___57181]));

var G__57187 = (i__5727__auto___57181 + (1));
i__5727__auto___57181 = G__57187;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.sup.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.sup.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55502 = conformed_args__53323__auto__;
var map__55502__$1 = cljs.core.__destructure_map(map__55502);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55502__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55502__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55502__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("sup",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.sup.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.sup.cljs$lang$applyTo = (function (seq55490){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55490));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (dfn "hello")
 * (dfn nil "hello")
 * 
 * These two are made equivalent at compile time
 * (dfn {:onClick f} "hello")
 * (dfn #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (dfn :#the-id.klass.other-klass "hello")
 * (dfn :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.dfn = (function com$fulcrologic$fulcro$dom$dfn(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57205 = arguments.length;
var i__5727__auto___57210 = (0);
while(true){
if((i__5727__auto___57210 < len__5726__auto___57205)){
args__5732__auto__.push((arguments[i__5727__auto___57210]));

var G__57211 = (i__5727__auto___57210 + (1));
i__5727__auto___57210 = G__57211;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.dfn.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.dfn.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55513 = conformed_args__53323__auto__;
var map__55513__$1 = cljs.core.__destructure_map(map__55513);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55513__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55513__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55513__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("dfn",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.dfn.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.dfn.cljs$lang$applyTo = (function (seq55506){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55506));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (sub "hello")
 * (sub nil "hello")
 * 
 * These two are made equivalent at compile time
 * (sub {:onClick f} "hello")
 * (sub #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (sub :#the-id.klass.other-klass "hello")
 * (sub :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.sub = (function com$fulcrologic$fulcro$dom$sub(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57219 = arguments.length;
var i__5727__auto___57221 = (0);
while(true){
if((i__5727__auto___57221 < len__5726__auto___57219)){
args__5732__auto__.push((arguments[i__5727__auto___57221]));

var G__57222 = (i__5727__auto___57221 + (1));
i__5727__auto___57221 = G__57222;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.sub.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.sub.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55524 = conformed_args__53323__auto__;
var map__55524__$1 = cljs.core.__destructure_map(map__55524);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55524__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55524__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55524__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("sub",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.sub.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.sub.cljs$lang$applyTo = (function (seq55518){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55518));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (mark "hello")
 * (mark nil "hello")
 * 
 * These two are made equivalent at compile time
 * (mark {:onClick f} "hello")
 * (mark #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (mark :#the-id.klass.other-klass "hello")
 * (mark :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.mark = (function com$fulcrologic$fulcro$dom$mark(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57224 = arguments.length;
var i__5727__auto___57225 = (0);
while(true){
if((i__5727__auto___57225 < len__5726__auto___57224)){
args__5732__auto__.push((arguments[i__5727__auto___57225]));

var G__57226 = (i__5727__auto___57225 + (1));
i__5727__auto___57225 = G__57226;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.mark.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.mark.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55533 = conformed_args__53323__auto__;
var map__55533__$1 = cljs.core.__destructure_map(map__55533);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55533__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55533__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55533__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("mark",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.mark.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.mark.cljs$lang$applyTo = (function (seq55530){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55530));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (feDisplacementMap "hello")
 * (feDisplacementMap nil "hello")
 * 
 * These two are made equivalent at compile time
 * (feDisplacementMap {:onClick f} "hello")
 * (feDisplacementMap #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (feDisplacementMap :#the-id.klass.other-klass "hello")
 * (feDisplacementMap :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.feDisplacementMap = (function com$fulcrologic$fulcro$dom$feDisplacementMap(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57229 = arguments.length;
var i__5727__auto___57230 = (0);
while(true){
if((i__5727__auto___57230 < len__5726__auto___57229)){
args__5732__auto__.push((arguments[i__5727__auto___57230]));

var G__57231 = (i__5727__auto___57230 + (1));
i__5727__auto___57230 = G__57231;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.feDisplacementMap.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.feDisplacementMap.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55553 = conformed_args__53323__auto__;
var map__55553__$1 = cljs.core.__destructure_map(map__55553);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55553__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55553__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55553__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("feDisplacementMap",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.feDisplacementMap.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.feDisplacementMap.cljs$lang$applyTo = (function (seq55540){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55540));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (unknown "hello")
 * (unknown nil "hello")
 * 
 * These two are made equivalent at compile time
 * (unknown {:onClick f} "hello")
 * (unknown #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (unknown :#the-id.klass.other-klass "hello")
 * (unknown :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.unknown = (function com$fulcrologic$fulcro$dom$unknown(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57240 = arguments.length;
var i__5727__auto___57241 = (0);
while(true){
if((i__5727__auto___57241 < len__5726__auto___57240)){
args__5732__auto__.push((arguments[i__5727__auto___57241]));

var G__57242 = (i__5727__auto___57241 + (1));
i__5727__auto___57241 = G__57242;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.unknown.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.unknown.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55562 = conformed_args__53323__auto__;
var map__55562__$1 = cljs.core.__destructure_map(map__55562);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55562__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55562__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55562__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("unknown",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.unknown.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.unknown.cljs$lang$applyTo = (function (seq55554){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55554));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (script "hello")
 * (script nil "hello")
 * 
 * These two are made equivalent at compile time
 * (script {:onClick f} "hello")
 * (script #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (script :#the-id.klass.other-klass "hello")
 * (script :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.script = (function com$fulcrologic$fulcro$dom$script(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57244 = arguments.length;
var i__5727__auto___57245 = (0);
while(true){
if((i__5727__auto___57245 < len__5726__auto___57244)){
args__5732__auto__.push((arguments[i__5727__auto___57245]));

var G__57246 = (i__5727__auto___57245 + (1));
i__5727__auto___57245 = G__57246;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.script.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.script.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55576 = conformed_args__53323__auto__;
var map__55576__$1 = cljs.core.__destructure_map(map__55576);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55576__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55576__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55576__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("script",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.script.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.script.cljs$lang$applyTo = (function (seq55569){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55569));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (feTurbulence "hello")
 * (feTurbulence nil "hello")
 * 
 * These two are made equivalent at compile time
 * (feTurbulence {:onClick f} "hello")
 * (feTurbulence #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (feTurbulence :#the-id.klass.other-klass "hello")
 * (feTurbulence :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.feTurbulence = (function com$fulcrologic$fulcro$dom$feTurbulence(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57249 = arguments.length;
var i__5727__auto___57251 = (0);
while(true){
if((i__5727__auto___57251 < len__5726__auto___57249)){
args__5732__auto__.push((arguments[i__5727__auto___57251]));

var G__57252 = (i__5727__auto___57251 + (1));
i__5727__auto___57251 = G__57252;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.feTurbulence.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.feTurbulence.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55594 = conformed_args__53323__auto__;
var map__55594__$1 = cljs.core.__destructure_map(map__55594);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55594__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55594__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55594__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("feTurbulence",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.feTurbulence.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.feTurbulence.cljs$lang$applyTo = (function (seq55585){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55585));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (big "hello")
 * (big nil "hello")
 * 
 * These two are made equivalent at compile time
 * (big {:onClick f} "hello")
 * (big #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (big :#the-id.klass.other-klass "hello")
 * (big :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.big = (function com$fulcrologic$fulcro$dom$big(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57259 = arguments.length;
var i__5727__auto___57260 = (0);
while(true){
if((i__5727__auto___57260 < len__5726__auto___57259)){
args__5732__auto__.push((arguments[i__5727__auto___57260]));

var G__57261 = (i__5727__auto___57260 + (1));
i__5727__auto___57260 = G__57261;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.big.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.big.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55604 = conformed_args__53323__auto__;
var map__55604__$1 = cljs.core.__destructure_map(map__55604);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55604__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55604__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55604__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("big",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.big.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.big.cljs$lang$applyTo = (function (seq55602){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55602));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (button "hello")
 * (button nil "hello")
 * 
 * These two are made equivalent at compile time
 * (button {:onClick f} "hello")
 * (button #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (button :#the-id.klass.other-klass "hello")
 * (button :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.button = (function com$fulcrologic$fulcro$dom$button(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57266 = arguments.length;
var i__5727__auto___57267 = (0);
while(true){
if((i__5727__auto___57267 < len__5726__auto___57266)){
args__5732__auto__.push((arguments[i__5727__auto___57267]));

var G__57268 = (i__5727__auto___57267 + (1));
i__5727__auto___57267 = G__57268;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.button.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.button.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55610 = conformed_args__53323__auto__;
var map__55610__$1 = cljs.core.__destructure_map(map__55610);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55610__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55610__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55610__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("button",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.button.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.button.cljs$lang$applyTo = (function (seq55607){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55607));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (font-face-uri "hello")
 * (font-face-uri nil "hello")
 * 
 * These two are made equivalent at compile time
 * (font-face-uri {:onClick f} "hello")
 * (font-face-uri #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (font-face-uri :#the-id.klass.other-klass "hello")
 * (font-face-uri :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.font_face_uri = (function com$fulcrologic$fulcro$dom$font_face_uri(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57272 = arguments.length;
var i__5727__auto___57273 = (0);
while(true){
if((i__5727__auto___57273 < len__5726__auto___57272)){
args__5732__auto__.push((arguments[i__5727__auto___57273]));

var G__57274 = (i__5727__auto___57273 + (1));
i__5727__auto___57273 = G__57274;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.font_face_uri.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.font_face_uri.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55627 = conformed_args__53323__auto__;
var map__55627__$1 = cljs.core.__destructure_map(map__55627);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55627__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55627__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55627__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("font-face-uri",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.font_face_uri.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.font_face_uri.cljs$lang$applyTo = (function (seq55621){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55621));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (wbr "hello")
 * (wbr nil "hello")
 * 
 * These two are made equivalent at compile time
 * (wbr {:onClick f} "hello")
 * (wbr #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (wbr :#the-id.klass.other-klass "hello")
 * (wbr :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.wbr = (function com$fulcrologic$fulcro$dom$wbr(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57281 = arguments.length;
var i__5727__auto___57282 = (0);
while(true){
if((i__5727__auto___57282 < len__5726__auto___57281)){
args__5732__auto__.push((arguments[i__5727__auto___57282]));

var G__57285 = (i__5727__auto___57282 + (1));
i__5727__auto___57282 = G__57285;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.wbr.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.wbr.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55635 = conformed_args__53323__auto__;
var map__55635__$1 = cljs.core.__destructure_map(map__55635);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55635__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55635__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55635__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("wbr",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.wbr.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.wbr.cljs$lang$applyTo = (function (seq55631){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55631));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (symbol "hello")
 * (symbol nil "hello")
 * 
 * These two are made equivalent at compile time
 * (symbol {:onClick f} "hello")
 * (symbol #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (symbol :#the-id.klass.other-klass "hello")
 * (symbol :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.symbol = (function com$fulcrologic$fulcro$dom$symbol(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57286 = arguments.length;
var i__5727__auto___57287 = (0);
while(true){
if((i__5727__auto___57287 < len__5726__auto___57286)){
args__5732__auto__.push((arguments[i__5727__auto___57287]));

var G__57288 = (i__5727__auto___57287 + (1));
i__5727__auto___57287 = G__57288;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.symbol.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.symbol.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55647 = conformed_args__53323__auto__;
var map__55647__$1 = cljs.core.__destructure_map(map__55647);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55647__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55647__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55647__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("symbol",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.symbol.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.symbol.cljs$lang$applyTo = (function (seq55641){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55641));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (strong "hello")
 * (strong nil "hello")
 * 
 * These two are made equivalent at compile time
 * (strong {:onClick f} "hello")
 * (strong #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (strong :#the-id.klass.other-klass "hello")
 * (strong :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.strong = (function com$fulcrologic$fulcro$dom$strong(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57291 = arguments.length;
var i__5727__auto___57292 = (0);
while(true){
if((i__5727__auto___57292 < len__5726__auto___57291)){
args__5732__auto__.push((arguments[i__5727__auto___57292]));

var G__57293 = (i__5727__auto___57292 + (1));
i__5727__auto___57292 = G__57293;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.strong.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.strong.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55651 = conformed_args__53323__auto__;
var map__55651__$1 = cljs.core.__destructure_map(map__55651);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55651__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55651__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55651__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("strong",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.strong.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.strong.cljs$lang$applyTo = (function (seq55649){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55649));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (use "hello")
 * (use nil "hello")
 * 
 * These two are made equivalent at compile time
 * (use {:onClick f} "hello")
 * (use #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (use :#the-id.klass.other-klass "hello")
 * (use :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.use = (function com$fulcrologic$fulcro$dom$use(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57294 = arguments.length;
var i__5727__auto___57295 = (0);
while(true){
if((i__5727__auto___57295 < len__5726__auto___57294)){
args__5732__auto__.push((arguments[i__5727__auto___57295]));

var G__57297 = (i__5727__auto___57295 + (1));
i__5727__auto___57295 = G__57297;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.use.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.use.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55657 = conformed_args__53323__auto__;
var map__55657__$1 = cljs.core.__destructure_map(map__55657);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55657__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55657__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55657__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("use",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.use.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.use.cljs$lang$applyTo = (function (seq55652){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55652));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (solidcolor "hello")
 * (solidcolor nil "hello")
 * 
 * These two are made equivalent at compile time
 * (solidcolor {:onClick f} "hello")
 * (solidcolor #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (solidcolor :#the-id.klass.other-klass "hello")
 * (solidcolor :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.solidcolor = (function com$fulcrologic$fulcro$dom$solidcolor(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57302 = arguments.length;
var i__5727__auto___57303 = (0);
while(true){
if((i__5727__auto___57303 < len__5726__auto___57302)){
args__5732__auto__.push((arguments[i__5727__auto___57303]));

var G__57304 = (i__5727__auto___57303 + (1));
i__5727__auto___57303 = G__57304;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.solidcolor.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.solidcolor.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55663 = conformed_args__53323__auto__;
var map__55663__$1 = cljs.core.__destructure_map(map__55663);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55663__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55663__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55663__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("solidcolor",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.solidcolor.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.solidcolor.cljs$lang$applyTo = (function (seq55659){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55659));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (fePointLight "hello")
 * (fePointLight nil "hello")
 * 
 * These two are made equivalent at compile time
 * (fePointLight {:onClick f} "hello")
 * (fePointLight #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (fePointLight :#the-id.klass.other-klass "hello")
 * (fePointLight :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.fePointLight = (function com$fulcrologic$fulcro$dom$fePointLight(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57307 = arguments.length;
var i__5727__auto___57309 = (0);
while(true){
if((i__5727__auto___57309 < len__5726__auto___57307)){
args__5732__auto__.push((arguments[i__5727__auto___57309]));

var G__57313 = (i__5727__auto___57309 + (1));
i__5727__auto___57309 = G__57313;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.fePointLight.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.fePointLight.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55667 = conformed_args__53323__auto__;
var map__55667__$1 = cljs.core.__destructure_map(map__55667);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55667__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55667__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55667__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("fePointLight",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.fePointLight.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.fePointLight.cljs$lang$applyTo = (function (seq55665){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55665));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (li "hello")
 * (li nil "hello")
 * 
 * These two are made equivalent at compile time
 * (li {:onClick f} "hello")
 * (li #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (li :#the-id.klass.other-klass "hello")
 * (li :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.li = (function com$fulcrologic$fulcro$dom$li(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57317 = arguments.length;
var i__5727__auto___57318 = (0);
while(true){
if((i__5727__auto___57318 < len__5726__auto___57317)){
args__5732__auto__.push((arguments[i__5727__auto___57318]));

var G__57319 = (i__5727__auto___57318 + (1));
i__5727__auto___57318 = G__57319;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.li.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.li.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55674 = conformed_args__53323__auto__;
var map__55674__$1 = cljs.core.__destructure_map(map__55674);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55674__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55674__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55674__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("li",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.li.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.li.cljs$lang$applyTo = (function (seq55673){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55673));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (dt "hello")
 * (dt nil "hello")
 * 
 * These two are made equivalent at compile time
 * (dt {:onClick f} "hello")
 * (dt #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (dt :#the-id.klass.other-klass "hello")
 * (dt :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.dt = (function com$fulcrologic$fulcro$dom$dt(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57321 = arguments.length;
var i__5727__auto___57322 = (0);
while(true){
if((i__5727__auto___57322 < len__5726__auto___57321)){
args__5732__auto__.push((arguments[i__5727__auto___57322]));

var G__57323 = (i__5727__auto___57322 + (1));
i__5727__auto___57322 = G__57323;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.dt.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.dt.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55678 = conformed_args__53323__auto__;
var map__55678__$1 = cljs.core.__destructure_map(map__55678);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55678__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55678__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55678__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("dt",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.dt.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.dt.cljs$lang$applyTo = (function (seq55676){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55676));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (feFuncB "hello")
 * (feFuncB nil "hello")
 * 
 * These two are made equivalent at compile time
 * (feFuncB {:onClick f} "hello")
 * (feFuncB #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (feFuncB :#the-id.klass.other-klass "hello")
 * (feFuncB :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.feFuncB = (function com$fulcrologic$fulcro$dom$feFuncB(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57329 = arguments.length;
var i__5727__auto___57330 = (0);
while(true){
if((i__5727__auto___57330 < len__5726__auto___57329)){
args__5732__auto__.push((arguments[i__5727__auto___57330]));

var G__57336 = (i__5727__auto___57330 + (1));
i__5727__auto___57330 = G__57336;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.feFuncB.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.feFuncB.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55687 = conformed_args__53323__auto__;
var map__55687__$1 = cljs.core.__destructure_map(map__55687);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55687__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55687__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55687__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("feFuncB",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.feFuncB.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.feFuncB.cljs$lang$applyTo = (function (seq55681){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55681));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (marker "hello")
 * (marker nil "hello")
 * 
 * These two are made equivalent at compile time
 * (marker {:onClick f} "hello")
 * (marker #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (marker :#the-id.klass.other-klass "hello")
 * (marker :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.marker = (function com$fulcrologic$fulcro$dom$marker(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57346 = arguments.length;
var i__5727__auto___57347 = (0);
while(true){
if((i__5727__auto___57347 < len__5726__auto___57346)){
args__5732__auto__.push((arguments[i__5727__auto___57347]));

var G__57348 = (i__5727__auto___57347 + (1));
i__5727__auto___57347 = G__57348;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.marker.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.marker.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55692 = conformed_args__53323__auto__;
var map__55692__$1 = cljs.core.__destructure_map(map__55692);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55692__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55692__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55692__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("marker",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.marker.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.marker.cljs$lang$applyTo = (function (seq55688){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55688));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (feComponentTransfer "hello")
 * (feComponentTransfer nil "hello")
 * 
 * These two are made equivalent at compile time
 * (feComponentTransfer {:onClick f} "hello")
 * (feComponentTransfer #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (feComponentTransfer :#the-id.klass.other-klass "hello")
 * (feComponentTransfer :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.feComponentTransfer = (function com$fulcrologic$fulcro$dom$feComponentTransfer(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57350 = arguments.length;
var i__5727__auto___57351 = (0);
while(true){
if((i__5727__auto___57351 < len__5726__auto___57350)){
args__5732__auto__.push((arguments[i__5727__auto___57351]));

var G__57352 = (i__5727__auto___57351 + (1));
i__5727__auto___57351 = G__57352;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.feComponentTransfer.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.feComponentTransfer.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55698 = conformed_args__53323__auto__;
var map__55698__$1 = cljs.core.__destructure_map(map__55698);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55698__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55698__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55698__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("feComponentTransfer",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.feComponentTransfer.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.feComponentTransfer.cljs$lang$applyTo = (function (seq55695){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55695));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (td "hello")
 * (td nil "hello")
 * 
 * These two are made equivalent at compile time
 * (td {:onClick f} "hello")
 * (td #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (td :#the-id.klass.other-klass "hello")
 * (td :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.td = (function com$fulcrologic$fulcro$dom$td(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57356 = arguments.length;
var i__5727__auto___57357 = (0);
while(true){
if((i__5727__auto___57357 < len__5726__auto___57356)){
args__5732__auto__.push((arguments[i__5727__auto___57357]));

var G__57358 = (i__5727__auto___57357 + (1));
i__5727__auto___57357 = G__57358;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.td.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.td.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55704 = conformed_args__53323__auto__;
var map__55704__$1 = cljs.core.__destructure_map(map__55704);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55704__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55704__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55704__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("td",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.td.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.td.cljs$lang$applyTo = (function (seq55703){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55703));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (tr "hello")
 * (tr nil "hello")
 * 
 * These two are made equivalent at compile time
 * (tr {:onClick f} "hello")
 * (tr #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (tr :#the-id.klass.other-klass "hello")
 * (tr :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.tr = (function com$fulcrologic$fulcro$dom$tr(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57362 = arguments.length;
var i__5727__auto___57363 = (0);
while(true){
if((i__5727__auto___57363 < len__5726__auto___57362)){
args__5732__auto__.push((arguments[i__5727__auto___57363]));

var G__57364 = (i__5727__auto___57363 + (1));
i__5727__auto___57363 = G__57364;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.tr.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.tr.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55712 = conformed_args__53323__auto__;
var map__55712__$1 = cljs.core.__destructure_map(map__55712);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55712__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55712__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55712__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("tr",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.tr.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.tr.cljs$lang$applyTo = (function (seq55709){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55709));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (circle "hello")
 * (circle nil "hello")
 * 
 * These two are made equivalent at compile time
 * (circle {:onClick f} "hello")
 * (circle #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (circle :#the-id.klass.other-klass "hello")
 * (circle :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.circle = (function com$fulcrologic$fulcro$dom$circle(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57372 = arguments.length;
var i__5727__auto___57373 = (0);
while(true){
if((i__5727__auto___57373 < len__5726__auto___57372)){
args__5732__auto__.push((arguments[i__5727__auto___57373]));

var G__57374 = (i__5727__auto___57373 + (1));
i__5727__auto___57373 = G__57374;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.circle.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.circle.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55724 = conformed_args__53323__auto__;
var map__55724__$1 = cljs.core.__destructure_map(map__55724);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55724__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55724__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55724__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("circle",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.circle.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.circle.cljs$lang$applyTo = (function (seq55722){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55722));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (section "hello")
 * (section nil "hello")
 * 
 * These two are made equivalent at compile time
 * (section {:onClick f} "hello")
 * (section #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (section :#the-id.klass.other-klass "hello")
 * (section :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.section = (function com$fulcrologic$fulcro$dom$section(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57378 = arguments.length;
var i__5727__auto___57379 = (0);
while(true){
if((i__5727__auto___57379 < len__5726__auto___57378)){
args__5732__auto__.push((arguments[i__5727__auto___57379]));

var G__57380 = (i__5727__auto___57379 + (1));
i__5727__auto___57379 = G__57380;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.section.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.section.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55730 = conformed_args__53323__auto__;
var map__55730__$1 = cljs.core.__destructure_map(map__55730);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55730__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55730__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55730__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("section",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.section.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.section.cljs$lang$applyTo = (function (seq55729){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55729));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (feDropShadow "hello")
 * (feDropShadow nil "hello")
 * 
 * These two are made equivalent at compile time
 * (feDropShadow {:onClick f} "hello")
 * (feDropShadow #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (feDropShadow :#the-id.klass.other-klass "hello")
 * (feDropShadow :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.feDropShadow = (function com$fulcrologic$fulcro$dom$feDropShadow(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57384 = arguments.length;
var i__5727__auto___57385 = (0);
while(true){
if((i__5727__auto___57385 < len__5726__auto___57384)){
args__5732__auto__.push((arguments[i__5727__auto___57385]));

var G__57386 = (i__5727__auto___57385 + (1));
i__5727__auto___57385 = G__57386;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.feDropShadow.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.feDropShadow.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55737 = conformed_args__53323__auto__;
var map__55737__$1 = cljs.core.__destructure_map(map__55737);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55737__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55737__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55737__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("feDropShadow",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.feDropShadow.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.feDropShadow.cljs$lang$applyTo = (function (seq55733){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55733));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (th "hello")
 * (th nil "hello")
 * 
 * These two are made equivalent at compile time
 * (th {:onClick f} "hello")
 * (th #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (th :#the-id.klass.other-klass "hello")
 * (th :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.th = (function com$fulcrologic$fulcro$dom$th(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57389 = arguments.length;
var i__5727__auto___57390 = (0);
while(true){
if((i__5727__auto___57390 < len__5726__auto___57389)){
args__5732__auto__.push((arguments[i__5727__auto___57390]));

var G__57391 = (i__5727__auto___57390 + (1));
i__5727__auto___57390 = G__57391;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.th.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.th.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55744 = conformed_args__53323__auto__;
var map__55744__$1 = cljs.core.__destructure_map(map__55744);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55744__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55744__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55744__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("th",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.th.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.th.cljs$lang$applyTo = (function (seq55740){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55740));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (time "hello")
 * (time nil "hello")
 * 
 * These two are made equivalent at compile time
 * (time {:onClick f} "hello")
 * (time #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (time :#the-id.klass.other-klass "hello")
 * (time :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.time = (function com$fulcrologic$fulcro$dom$time(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57392 = arguments.length;
var i__5727__auto___57393 = (0);
while(true){
if((i__5727__auto___57393 < len__5726__auto___57392)){
args__5732__auto__.push((arguments[i__5727__auto___57393]));

var G__57394 = (i__5727__auto___57393 + (1));
i__5727__auto___57393 = G__57394;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.time.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.time.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55746 = conformed_args__53323__auto__;
var map__55746__$1 = cljs.core.__destructure_map(map__55746);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55746__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55746__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55746__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("time",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.time.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.time.cljs$lang$applyTo = (function (seq55745){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55745));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (optgroup "hello")
 * (optgroup nil "hello")
 * 
 * These two are made equivalent at compile time
 * (optgroup {:onClick f} "hello")
 * (optgroup #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (optgroup :#the-id.klass.other-klass "hello")
 * (optgroup :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.optgroup = (function com$fulcrologic$fulcro$dom$optgroup(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57397 = arguments.length;
var i__5727__auto___57398 = (0);
while(true){
if((i__5727__auto___57398 < len__5726__auto___57397)){
args__5732__auto__.push((arguments[i__5727__auto___57398]));

var G__57399 = (i__5727__auto___57398 + (1));
i__5727__auto___57398 = G__57399;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.optgroup.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.optgroup.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55751 = conformed_args__53323__auto__;
var map__55751__$1 = cljs.core.__destructure_map(map__55751);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55751__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55751__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55751__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("optgroup",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.optgroup.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.optgroup.cljs$lang$applyTo = (function (seq55749){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55749));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (iframe "hello")
 * (iframe nil "hello")
 * 
 * These two are made equivalent at compile time
 * (iframe {:onClick f} "hello")
 * (iframe #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (iframe :#the-id.klass.other-klass "hello")
 * (iframe :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.iframe = (function com$fulcrologic$fulcro$dom$iframe(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57400 = arguments.length;
var i__5727__auto___57401 = (0);
while(true){
if((i__5727__auto___57401 < len__5726__auto___57400)){
args__5732__auto__.push((arguments[i__5727__auto___57401]));

var G__57402 = (i__5727__auto___57401 + (1));
i__5727__auto___57401 = G__57402;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.iframe.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.iframe.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55763 = conformed_args__53323__auto__;
var map__55763__$1 = cljs.core.__destructure_map(map__55763);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55763__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55763__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55763__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("iframe",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.iframe.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.iframe.cljs$lang$applyTo = (function (seq55754){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55754));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (color-profile "hello")
 * (color-profile nil "hello")
 * 
 * These two are made equivalent at compile time
 * (color-profile {:onClick f} "hello")
 * (color-profile #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (color-profile :#the-id.klass.other-klass "hello")
 * (color-profile :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.color_profile = (function com$fulcrologic$fulcro$dom$color_profile(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57404 = arguments.length;
var i__5727__auto___57405 = (0);
while(true){
if((i__5727__auto___57405 < len__5726__auto___57404)){
args__5732__auto__.push((arguments[i__5727__auto___57405]));

var G__57406 = (i__5727__auto___57405 + (1));
i__5727__auto___57405 = G__57406;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.color_profile.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.color_profile.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55767 = conformed_args__53323__auto__;
var map__55767__$1 = cljs.core.__destructure_map(map__55767);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55767__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55767__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55767__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("color-profile",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.color_profile.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.color_profile.cljs$lang$applyTo = (function (seq55765){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55765));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (legend "hello")
 * (legend nil "hello")
 * 
 * These two are made equivalent at compile time
 * (legend {:onClick f} "hello")
 * (legend #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (legend :#the-id.klass.other-klass "hello")
 * (legend :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.legend = (function com$fulcrologic$fulcro$dom$legend(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57407 = arguments.length;
var i__5727__auto___57408 = (0);
while(true){
if((i__5727__auto___57408 < len__5726__auto___57407)){
args__5732__auto__.push((arguments[i__5727__auto___57408]));

var G__57409 = (i__5727__auto___57408 + (1));
i__5727__auto___57408 = G__57409;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.legend.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.legend.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55772 = conformed_args__53323__auto__;
var map__55772__$1 = cljs.core.__destructure_map(map__55772);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55772__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55772__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55772__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("legend",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.legend.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.legend.cljs$lang$applyTo = (function (seq55770){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55770));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (em "hello")
 * (em nil "hello")
 * 
 * These two are made equivalent at compile time
 * (em {:onClick f} "hello")
 * (em #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (em :#the-id.klass.other-klass "hello")
 * (em :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.em = (function com$fulcrologic$fulcro$dom$em(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57415 = arguments.length;
var i__5727__auto___57417 = (0);
while(true){
if((i__5727__auto___57417 < len__5726__auto___57415)){
args__5732__auto__.push((arguments[i__5727__auto___57417]));

var G__57418 = (i__5727__auto___57417 + (1));
i__5727__auto___57417 = G__57418;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.em.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.em.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55774 = conformed_args__53323__auto__;
var map__55774__$1 = cljs.core.__destructure_map(map__55774);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55774__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55774__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55774__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("em",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.em.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.em.cljs$lang$applyTo = (function (seq55773){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55773));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (kbd "hello")
 * (kbd nil "hello")
 * 
 * These two are made equivalent at compile time
 * (kbd {:onClick f} "hello")
 * (kbd #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (kbd :#the-id.klass.other-klass "hello")
 * (kbd :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.kbd = (function com$fulcrologic$fulcro$dom$kbd(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57421 = arguments.length;
var i__5727__auto___57422 = (0);
while(true){
if((i__5727__auto___57422 < len__5726__auto___57421)){
args__5732__auto__.push((arguments[i__5727__auto___57422]));

var G__57425 = (i__5727__auto___57422 + (1));
i__5727__auto___57422 = G__57425;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.kbd.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.kbd.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55778 = conformed_args__53323__auto__;
var map__55778__$1 = cljs.core.__destructure_map(map__55778);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55778__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55778__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55778__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("kbd",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.kbd.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.kbd.cljs$lang$applyTo = (function (seq55776){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55776));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (article "hello")
 * (article nil "hello")
 * 
 * These two are made equivalent at compile time
 * (article {:onClick f} "hello")
 * (article #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (article :#the-id.klass.other-klass "hello")
 * (article :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.article = (function com$fulcrologic$fulcro$dom$article(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57428 = arguments.length;
var i__5727__auto___57429 = (0);
while(true){
if((i__5727__auto___57429 < len__5726__auto___57428)){
args__5732__auto__.push((arguments[i__5727__auto___57429]));

var G__57430 = (i__5727__auto___57429 + (1));
i__5727__auto___57429 = G__57430;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.article.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.article.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55787 = conformed_args__53323__auto__;
var map__55787__$1 = cljs.core.__destructure_map(map__55787);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55787__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55787__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55787__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("article",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.article.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.article.cljs$lang$applyTo = (function (seq55782){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55782));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (animateColor "hello")
 * (animateColor nil "hello")
 * 
 * These two are made equivalent at compile time
 * (animateColor {:onClick f} "hello")
 * (animateColor #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (animateColor :#the-id.klass.other-klass "hello")
 * (animateColor :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.animateColor = (function com$fulcrologic$fulcro$dom$animateColor(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57435 = arguments.length;
var i__5727__auto___57436 = (0);
while(true){
if((i__5727__auto___57436 < len__5726__auto___57435)){
args__5732__auto__.push((arguments[i__5727__auto___57436]));

var G__57437 = (i__5727__auto___57436 + (1));
i__5727__auto___57436 = G__57437;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.animateColor.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.animateColor.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55800 = conformed_args__53323__auto__;
var map__55800__$1 = cljs.core.__destructure_map(map__55800);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55800__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55800__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55800__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("animateColor",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.animateColor.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.animateColor.cljs$lang$applyTo = (function (seq55797){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55797));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (clipPath "hello")
 * (clipPath nil "hello")
 * 
 * These two are made equivalent at compile time
 * (clipPath {:onClick f} "hello")
 * (clipPath #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (clipPath :#the-id.klass.other-klass "hello")
 * (clipPath :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.clipPath = (function com$fulcrologic$fulcro$dom$clipPath(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57441 = arguments.length;
var i__5727__auto___57445 = (0);
while(true){
if((i__5727__auto___57445 < len__5726__auto___57441)){
args__5732__auto__.push((arguments[i__5727__auto___57445]));

var G__57446 = (i__5727__auto___57445 + (1));
i__5727__auto___57445 = G__57446;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.clipPath.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.clipPath.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55814 = conformed_args__53323__auto__;
var map__55814__$1 = cljs.core.__destructure_map(map__55814);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55814__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55814__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55814__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("clipPath",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.clipPath.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.clipPath.cljs$lang$applyTo = (function (seq55806){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55806));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (abbr "hello")
 * (abbr nil "hello")
 * 
 * These two are made equivalent at compile time
 * (abbr {:onClick f} "hello")
 * (abbr #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (abbr :#the-id.klass.other-klass "hello")
 * (abbr :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.abbr = (function com$fulcrologic$fulcro$dom$abbr(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57448 = arguments.length;
var i__5727__auto___57449 = (0);
while(true){
if((i__5727__auto___57449 < len__5726__auto___57448)){
args__5732__auto__.push((arguments[i__5727__auto___57449]));

var G__57450 = (i__5727__auto___57449 + (1));
i__5727__auto___57449 = G__57450;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.abbr.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.abbr.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55825 = conformed_args__53323__auto__;
var map__55825__$1 = cljs.core.__destructure_map(map__55825);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55825__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55825__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55825__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("abbr",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.abbr.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.abbr.cljs$lang$applyTo = (function (seq55817){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55817));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (altGlyphDef "hello")
 * (altGlyphDef nil "hello")
 * 
 * These two are made equivalent at compile time
 * (altGlyphDef {:onClick f} "hello")
 * (altGlyphDef #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (altGlyphDef :#the-id.klass.other-klass "hello")
 * (altGlyphDef :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.altGlyphDef = (function com$fulcrologic$fulcro$dom$altGlyphDef(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57454 = arguments.length;
var i__5727__auto___57455 = (0);
while(true){
if((i__5727__auto___57455 < len__5726__auto___57454)){
args__5732__auto__.push((arguments[i__5727__auto___57455]));

var G__57456 = (i__5727__auto___57455 + (1));
i__5727__auto___57455 = G__57456;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.altGlyphDef.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.altGlyphDef.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55830 = conformed_args__53323__auto__;
var map__55830__$1 = cljs.core.__destructure_map(map__55830);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55830__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55830__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55830__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("altGlyphDef",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.altGlyphDef.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.altGlyphDef.cljs$lang$applyTo = (function (seq55829){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55829));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (meshrow "hello")
 * (meshrow nil "hello")
 * 
 * These two are made equivalent at compile time
 * (meshrow {:onClick f} "hello")
 * (meshrow #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (meshrow :#the-id.klass.other-klass "hello")
 * (meshrow :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.meshrow = (function com$fulcrologic$fulcro$dom$meshrow(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57458 = arguments.length;
var i__5727__auto___57459 = (0);
while(true){
if((i__5727__auto___57459 < len__5726__auto___57458)){
args__5732__auto__.push((arguments[i__5727__auto___57459]));

var G__57460 = (i__5727__auto___57459 + (1));
i__5727__auto___57459 = G__57460;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.meshrow.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.meshrow.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55839 = conformed_args__53323__auto__;
var map__55839__$1 = cljs.core.__destructure_map(map__55839);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55839__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55839__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55839__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("meshrow",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.meshrow.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.meshrow.cljs$lang$applyTo = (function (seq55835){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55835));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (cursor "hello")
 * (cursor nil "hello")
 * 
 * These two are made equivalent at compile time
 * (cursor {:onClick f} "hello")
 * (cursor #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (cursor :#the-id.klass.other-klass "hello")
 * (cursor :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.cursor = (function com$fulcrologic$fulcro$dom$cursor(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57462 = arguments.length;
var i__5727__auto___57463 = (0);
while(true){
if((i__5727__auto___57463 < len__5726__auto___57462)){
args__5732__auto__.push((arguments[i__5727__auto___57463]));

var G__57464 = (i__5727__auto___57463 + (1));
i__5727__auto___57463 = G__57464;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.cursor.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.cursor.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55848 = conformed_args__53323__auto__;
var map__55848__$1 = cljs.core.__destructure_map(map__55848);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55848__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55848__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55848__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("cursor",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.cursor.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.cursor.cljs$lang$applyTo = (function (seq55842){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55842));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (animate "hello")
 * (animate nil "hello")
 * 
 * These two are made equivalent at compile time
 * (animate {:onClick f} "hello")
 * (animate #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (animate :#the-id.klass.other-klass "hello")
 * (animate :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.animate = (function com$fulcrologic$fulcro$dom$animate(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57467 = arguments.length;
var i__5727__auto___57468 = (0);
while(true){
if((i__5727__auto___57468 < len__5726__auto___57467)){
args__5732__auto__.push((arguments[i__5727__auto___57468]));

var G__57470 = (i__5727__auto___57468 + (1));
i__5727__auto___57468 = G__57470;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.animate.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.animate.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55856 = conformed_args__53323__auto__;
var map__55856__$1 = cljs.core.__destructure_map(map__55856);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55856__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55856__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55856__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("animate",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.animate.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.animate.cljs$lang$applyTo = (function (seq55850){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55850));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (source "hello")
 * (source nil "hello")
 * 
 * These two are made equivalent at compile time
 * (source {:onClick f} "hello")
 * (source #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (source :#the-id.klass.other-klass "hello")
 * (source :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.source = (function com$fulcrologic$fulcro$dom$source(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57472 = arguments.length;
var i__5727__auto___57473 = (0);
while(true){
if((i__5727__auto___57473 < len__5726__auto___57472)){
args__5732__auto__.push((arguments[i__5727__auto___57473]));

var G__57474 = (i__5727__auto___57473 + (1));
i__5727__auto___57473 = G__57474;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.source.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.source.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55866 = conformed_args__53323__auto__;
var map__55866__$1 = cljs.core.__destructure_map(map__55866);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55866__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55866__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55866__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("source",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.source.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.source.cljs$lang$applyTo = (function (seq55862){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55862));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (output "hello")
 * (output nil "hello")
 * 
 * These two are made equivalent at compile time
 * (output {:onClick f} "hello")
 * (output #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (output :#the-id.klass.other-klass "hello")
 * (output :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.output = (function com$fulcrologic$fulcro$dom$output(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57475 = arguments.length;
var i__5727__auto___57477 = (0);
while(true){
if((i__5727__auto___57477 < len__5726__auto___57475)){
args__5732__auto__.push((arguments[i__5727__auto___57477]));

var G__57478 = (i__5727__auto___57477 + (1));
i__5727__auto___57477 = G__57478;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.output.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.output.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55874 = conformed_args__53323__auto__;
var map__55874__$1 = cljs.core.__destructure_map(map__55874);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55874__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55874__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55874__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("output",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.output.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.output.cljs$lang$applyTo = (function (seq55871){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55871));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (font-face "hello")
 * (font-face nil "hello")
 * 
 * These two are made equivalent at compile time
 * (font-face {:onClick f} "hello")
 * (font-face #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (font-face :#the-id.klass.other-klass "hello")
 * (font-face :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.font_face = (function com$fulcrologic$fulcro$dom$font_face(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57480 = arguments.length;
var i__5727__auto___57481 = (0);
while(true){
if((i__5727__auto___57481 < len__5726__auto___57480)){
args__5732__auto__.push((arguments[i__5727__auto___57481]));

var G__57482 = (i__5727__auto___57481 + (1));
i__5727__auto___57481 = G__57482;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.font_face.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.font_face.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55881 = conformed_args__53323__auto__;
var map__55881__$1 = cljs.core.__destructure_map(map__55881);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55881__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55881__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55881__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("font-face",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.font_face.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.font_face.cljs$lang$applyTo = (function (seq55878){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55878));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (feMergeNode "hello")
 * (feMergeNode nil "hello")
 * 
 * These two are made equivalent at compile time
 * (feMergeNode {:onClick f} "hello")
 * (feMergeNode #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (feMergeNode :#the-id.klass.other-klass "hello")
 * (feMergeNode :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.feMergeNode = (function com$fulcrologic$fulcro$dom$feMergeNode(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57483 = arguments.length;
var i__5727__auto___57484 = (0);
while(true){
if((i__5727__auto___57484 < len__5726__auto___57483)){
args__5732__auto__.push((arguments[i__5727__auto___57484]));

var G__57485 = (i__5727__auto___57484 + (1));
i__5727__auto___57484 = G__57485;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.feMergeNode.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.feMergeNode.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55887 = conformed_args__53323__auto__;
var map__55887__$1 = cljs.core.__destructure_map(map__55887);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55887__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55887__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55887__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("feMergeNode",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.feMergeNode.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.feMergeNode.cljs$lang$applyTo = (function (seq55886){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55886));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (feSpotLight "hello")
 * (feSpotLight nil "hello")
 * 
 * These two are made equivalent at compile time
 * (feSpotLight {:onClick f} "hello")
 * (feSpotLight #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (feSpotLight :#the-id.klass.other-klass "hello")
 * (feSpotLight :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.feSpotLight = (function com$fulcrologic$fulcro$dom$feSpotLight(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57488 = arguments.length;
var i__5727__auto___57489 = (0);
while(true){
if((i__5727__auto___57489 < len__5726__auto___57488)){
args__5732__auto__.push((arguments[i__5727__auto___57489]));

var G__57490 = (i__5727__auto___57489 + (1));
i__5727__auto___57489 = G__57490;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.feSpotLight.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.feSpotLight.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55894 = conformed_args__53323__auto__;
var map__55894__$1 = cljs.core.__destructure_map(map__55894);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55894__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55894__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55894__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("feSpotLight",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.feSpotLight.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.feSpotLight.cljs$lang$applyTo = (function (seq55890){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55890));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (header "hello")
 * (header nil "hello")
 * 
 * These two are made equivalent at compile time
 * (header {:onClick f} "hello")
 * (header #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (header :#the-id.klass.other-klass "hello")
 * (header :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.header = (function com$fulcrologic$fulcro$dom$header(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57491 = arguments.length;
var i__5727__auto___57492 = (0);
while(true){
if((i__5727__auto___57492 < len__5726__auto___57491)){
args__5732__auto__.push((arguments[i__5727__auto___57492]));

var G__57493 = (i__5727__auto___57492 + (1));
i__5727__auto___57492 = G__57493;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.header.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.header.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55899 = conformed_args__53323__auto__;
var map__55899__$1 = cljs.core.__destructure_map(map__55899);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55899__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55899__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55899__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("header",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.header.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.header.cljs$lang$applyTo = (function (seq55896){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55896));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (datalist "hello")
 * (datalist nil "hello")
 * 
 * These two are made equivalent at compile time
 * (datalist {:onClick f} "hello")
 * (datalist #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (datalist :#the-id.klass.other-klass "hello")
 * (datalist :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.datalist = (function com$fulcrologic$fulcro$dom$datalist(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57494 = arguments.length;
var i__5727__auto___57495 = (0);
while(true){
if((i__5727__auto___57495 < len__5726__auto___57494)){
args__5732__auto__.push((arguments[i__5727__auto___57495]));

var G__57496 = (i__5727__auto___57495 + (1));
i__5727__auto___57495 = G__57496;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.datalist.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.datalist.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55909 = conformed_args__53323__auto__;
var map__55909__$1 = cljs.core.__destructure_map(map__55909);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55909__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55909__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55909__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("datalist",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.datalist.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.datalist.cljs$lang$applyTo = (function (seq55907){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55907));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (tfoot "hello")
 * (tfoot nil "hello")
 * 
 * These two are made equivalent at compile time
 * (tfoot {:onClick f} "hello")
 * (tfoot #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (tfoot :#the-id.klass.other-klass "hello")
 * (tfoot :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.tfoot = (function com$fulcrologic$fulcro$dom$tfoot(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57498 = arguments.length;
var i__5727__auto___57499 = (0);
while(true){
if((i__5727__auto___57499 < len__5726__auto___57498)){
args__5732__auto__.push((arguments[i__5727__auto___57499]));

var G__57500 = (i__5727__auto___57499 + (1));
i__5727__auto___57499 = G__57500;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.tfoot.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.tfoot.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55916 = conformed_args__53323__auto__;
var map__55916__$1 = cljs.core.__destructure_map(map__55916);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55916__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55916__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55916__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("tfoot",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.tfoot.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.tfoot.cljs$lang$applyTo = (function (seq55913){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55913));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (s "hello")
 * (s nil "hello")
 * 
 * These two are made equivalent at compile time
 * (s {:onClick f} "hello")
 * (s #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (s :#the-id.klass.other-klass "hello")
 * (s :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.s = (function com$fulcrologic$fulcro$dom$s(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57504 = arguments.length;
var i__5727__auto___57505 = (0);
while(true){
if((i__5727__auto___57505 < len__5726__auto___57504)){
args__5732__auto__.push((arguments[i__5727__auto___57505]));

var G__57506 = (i__5727__auto___57505 + (1));
i__5727__auto___57505 = G__57506;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.s.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.s.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55923 = conformed_args__53323__auto__;
var map__55923__$1 = cljs.core.__destructure_map(map__55923);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55923__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55923__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55923__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("s",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.s.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.s.cljs$lang$applyTo = (function (seq55920){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55920));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (hatch "hello")
 * (hatch nil "hello")
 * 
 * These two are made equivalent at compile time
 * (hatch {:onClick f} "hello")
 * (hatch #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (hatch :#the-id.klass.other-klass "hello")
 * (hatch :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.hatch = (function com$fulcrologic$fulcro$dom$hatch(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57507 = arguments.length;
var i__5727__auto___57508 = (0);
while(true){
if((i__5727__auto___57508 < len__5726__auto___57507)){
args__5732__auto__.push((arguments[i__5727__auto___57508]));

var G__57509 = (i__5727__auto___57508 + (1));
i__5727__auto___57508 = G__57509;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.hatch.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.hatch.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55939 = conformed_args__53323__auto__;
var map__55939__$1 = cljs.core.__destructure_map(map__55939);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55939__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55939__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55939__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("hatch",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.hatch.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.hatch.cljs$lang$applyTo = (function (seq55930){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55930));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (ins "hello")
 * (ins nil "hello")
 * 
 * These two are made equivalent at compile time
 * (ins {:onClick f} "hello")
 * (ins #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (ins :#the-id.klass.other-klass "hello")
 * (ins :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.ins = (function com$fulcrologic$fulcro$dom$ins(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57511 = arguments.length;
var i__5727__auto___57512 = (0);
while(true){
if((i__5727__auto___57512 < len__5726__auto___57511)){
args__5732__auto__.push((arguments[i__5727__auto___57512]));

var G__57513 = (i__5727__auto___57512 + (1));
i__5727__auto___57512 = G__57513;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.ins.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.ins.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55948 = conformed_args__53323__auto__;
var map__55948__$1 = cljs.core.__destructure_map(map__55948);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55948__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55948__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55948__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("ins",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.ins.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.ins.cljs$lang$applyTo = (function (seq55941){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55941));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (footer "hello")
 * (footer nil "hello")
 * 
 * These two are made equivalent at compile time
 * (footer {:onClick f} "hello")
 * (footer #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (footer :#the-id.klass.other-klass "hello")
 * (footer :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.footer = (function com$fulcrologic$fulcro$dom$footer(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57514 = arguments.length;
var i__5727__auto___57515 = (0);
while(true){
if((i__5727__auto___57515 < len__5726__auto___57514)){
args__5732__auto__.push((arguments[i__5727__auto___57515]));

var G__57517 = (i__5727__auto___57515 + (1));
i__5727__auto___57515 = G__57517;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.footer.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.footer.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55961 = conformed_args__53323__auto__;
var map__55961__$1 = cljs.core.__destructure_map(map__55961);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55961__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55961__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55961__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("footer",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.footer.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.footer.cljs$lang$applyTo = (function (seq55953){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55953));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (mpath "hello")
 * (mpath nil "hello")
 * 
 * These two are made equivalent at compile time
 * (mpath {:onClick f} "hello")
 * (mpath #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (mpath :#the-id.klass.other-klass "hello")
 * (mpath :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.mpath = (function com$fulcrologic$fulcro$dom$mpath(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57518 = arguments.length;
var i__5727__auto___57520 = (0);
while(true){
if((i__5727__auto___57520 < len__5726__auto___57518)){
args__5732__auto__.push((arguments[i__5727__auto___57520]));

var G__57521 = (i__5727__auto___57520 + (1));
i__5727__auto___57520 = G__57521;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.mpath.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.mpath.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55966 = conformed_args__53323__auto__;
var map__55966__$1 = cljs.core.__destructure_map(map__55966);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55966__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55966__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55966__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("mpath",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.mpath.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.mpath.cljs$lang$applyTo = (function (seq55965){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55965));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (title "hello")
 * (title nil "hello")
 * 
 * These two are made equivalent at compile time
 * (title {:onClick f} "hello")
 * (title #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (title :#the-id.klass.other-klass "hello")
 * (title :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.title = (function com$fulcrologic$fulcro$dom$title(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57523 = arguments.length;
var i__5727__auto___57524 = (0);
while(true){
if((i__5727__auto___57524 < len__5726__auto___57523)){
args__5732__auto__.push((arguments[i__5727__auto___57524]));

var G__57525 = (i__5727__auto___57524 + (1));
i__5727__auto___57524 = G__57525;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.title.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.title.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55977 = conformed_args__53323__auto__;
var map__55977__$1 = cljs.core.__destructure_map(map__55977);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55977__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55977__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55977__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("title",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.title.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.title.cljs$lang$applyTo = (function (seq55970){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55970));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (h5 "hello")
 * (h5 nil "hello")
 * 
 * These two are made equivalent at compile time
 * (h5 {:onClick f} "hello")
 * (h5 #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (h5 :#the-id.klass.other-klass "hello")
 * (h5 :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.h5 = (function com$fulcrologic$fulcro$dom$h5(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57527 = arguments.length;
var i__5727__auto___57528 = (0);
while(true){
if((i__5727__auto___57528 < len__5726__auto___57527)){
args__5732__auto__.push((arguments[i__5727__auto___57528]));

var G__57529 = (i__5727__auto___57528 + (1));
i__5727__auto___57528 = G__57529;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.h5.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.h5.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55987 = conformed_args__53323__auto__;
var map__55987__$1 = cljs.core.__destructure_map(map__55987);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55987__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55987__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55987__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("h5",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.h5.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.h5.cljs$lang$applyTo = (function (seq55984){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55984));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (meshgradient "hello")
 * (meshgradient nil "hello")
 * 
 * These two are made equivalent at compile time
 * (meshgradient {:onClick f} "hello")
 * (meshgradient #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (meshgradient :#the-id.klass.other-klass "hello")
 * (meshgradient :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.meshgradient = (function com$fulcrologic$fulcro$dom$meshgradient(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57531 = arguments.length;
var i__5727__auto___57533 = (0);
while(true){
if((i__5727__auto___57533 < len__5726__auto___57531)){
args__5732__auto__.push((arguments[i__5727__auto___57533]));

var G__57534 = (i__5727__auto___57533 + (1));
i__5727__auto___57533 = G__57534;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.meshgradient.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.meshgradient.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55990 = conformed_args__53323__auto__;
var map__55990__$1 = cljs.core.__destructure_map(map__55990);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55990__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55990__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55990__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("meshgradient",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.meshgradient.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.meshgradient.cljs$lang$applyTo = (function (seq55988){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55988));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (canvas "hello")
 * (canvas nil "hello")
 * 
 * These two are made equivalent at compile time
 * (canvas {:onClick f} "hello")
 * (canvas #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (canvas :#the-id.klass.other-klass "hello")
 * (canvas :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.canvas = (function com$fulcrologic$fulcro$dom$canvas(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57537 = arguments.length;
var i__5727__auto___57538 = (0);
while(true){
if((i__5727__auto___57538 < len__5726__auto___57537)){
args__5732__auto__.push((arguments[i__5727__auto___57538]));

var G__57539 = (i__5727__auto___57538 + (1));
i__5727__auto___57538 = G__57539;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.canvas.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.canvas.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__55996 = conformed_args__53323__auto__;
var map__55996__$1 = cljs.core.__destructure_map(map__55996);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55996__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55996__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__55996__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("canvas",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.canvas.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.canvas.cljs$lang$applyTo = (function (seq55994){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq55994));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (param "hello")
 * (param nil "hello")
 * 
 * These two are made equivalent at compile time
 * (param {:onClick f} "hello")
 * (param #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (param :#the-id.klass.other-klass "hello")
 * (param :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.param = (function com$fulcrologic$fulcro$dom$param(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57540 = arguments.length;
var i__5727__auto___57541 = (0);
while(true){
if((i__5727__auto___57541 < len__5726__auto___57540)){
args__5732__auto__.push((arguments[i__5727__auto___57541]));

var G__57542 = (i__5727__auto___57541 + (1));
i__5727__auto___57541 = G__57542;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.param.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.param.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56010 = conformed_args__53323__auto__;
var map__56010__$1 = cljs.core.__destructure_map(map__56010);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56010__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56010__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56010__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("param",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.param.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.param.cljs$lang$applyTo = (function (seq56003){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56003));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (font "hello")
 * (font nil "hello")
 * 
 * These two are made equivalent at compile time
 * (font {:onClick f} "hello")
 * (font #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (font :#the-id.klass.other-klass "hello")
 * (font :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.font = (function com$fulcrologic$fulcro$dom$font(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57544 = arguments.length;
var i__5727__auto___57545 = (0);
while(true){
if((i__5727__auto___57545 < len__5726__auto___57544)){
args__5732__auto__.push((arguments[i__5727__auto___57545]));

var G__57546 = (i__5727__auto___57545 + (1));
i__5727__auto___57545 = G__57546;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.font.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.font.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56017 = conformed_args__53323__auto__;
var map__56017__$1 = cljs.core.__destructure_map(map__56017);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56017__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56017__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56017__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("font",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.font.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.font.cljs$lang$applyTo = (function (seq56016){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56016));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (div "hello")
 * (div nil "hello")
 * 
 * These two are made equivalent at compile time
 * (div {:onClick f} "hello")
 * (div #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (div :#the-id.klass.other-klass "hello")
 * (div :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.div = (function com$fulcrologic$fulcro$dom$div(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57549 = arguments.length;
var i__5727__auto___57550 = (0);
while(true){
if((i__5727__auto___57550 < len__5726__auto___57549)){
args__5732__auto__.push((arguments[i__5727__auto___57550]));

var G__57551 = (i__5727__auto___57550 + (1));
i__5727__auto___57550 = G__57551;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.div.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.div.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56030 = conformed_args__53323__auto__;
var map__56030__$1 = cljs.core.__destructure_map(map__56030);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56030__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56030__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56030__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("div",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.div.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.div.cljs$lang$applyTo = (function (seq56027){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56027));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (option "hello")
 * (option nil "hello")
 * 
 * These two are made equivalent at compile time
 * (option {:onClick f} "hello")
 * (option #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (option :#the-id.klass.other-klass "hello")
 * (option :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.option = (function com$fulcrologic$fulcro$dom$option(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57555 = arguments.length;
var i__5727__auto___57556 = (0);
while(true){
if((i__5727__auto___57556 < len__5726__auto___57555)){
args__5732__auto__.push((arguments[i__5727__auto___57556]));

var G__57557 = (i__5727__auto___57556 + (1));
i__5727__auto___57556 = G__57557;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.option.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.option.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56040 = conformed_args__53323__auto__;
var map__56040__$1 = cljs.core.__destructure_map(map__56040);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56040__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56040__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56040__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("option",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.option.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.option.cljs$lang$applyTo = (function (seq56039){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56039));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (feFlood "hello")
 * (feFlood nil "hello")
 * 
 * These two are made equivalent at compile time
 * (feFlood {:onClick f} "hello")
 * (feFlood #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (feFlood :#the-id.klass.other-klass "hello")
 * (feFlood :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.feFlood = (function com$fulcrologic$fulcro$dom$feFlood(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57558 = arguments.length;
var i__5727__auto___57559 = (0);
while(true){
if((i__5727__auto___57559 < len__5726__auto___57558)){
args__5732__auto__.push((arguments[i__5727__auto___57559]));

var G__57560 = (i__5727__auto___57559 + (1));
i__5727__auto___57559 = G__57560;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.feFlood.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.feFlood.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56043 = conformed_args__53323__auto__;
var map__56043__$1 = cljs.core.__destructure_map(map__56043);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56043__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56043__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56043__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("feFlood",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.feFlood.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.feFlood.cljs$lang$applyTo = (function (seq56042){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56042));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (summary "hello")
 * (summary nil "hello")
 * 
 * These two are made equivalent at compile time
 * (summary {:onClick f} "hello")
 * (summary #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (summary :#the-id.klass.other-klass "hello")
 * (summary :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.summary = (function com$fulcrologic$fulcro$dom$summary(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57563 = arguments.length;
var i__5727__auto___57564 = (0);
while(true){
if((i__5727__auto___57564 < len__5726__auto___57563)){
args__5732__auto__.push((arguments[i__5727__auto___57564]));

var G__57565 = (i__5727__auto___57564 + (1));
i__5727__auto___57564 = G__57565;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.summary.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.summary.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56050 = conformed_args__53323__auto__;
var map__56050__$1 = cljs.core.__destructure_map(map__56050);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56050__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56050__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56050__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("summary",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.summary.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.summary.cljs$lang$applyTo = (function (seq56045){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56045));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (feMorphology "hello")
 * (feMorphology nil "hello")
 * 
 * These two are made equivalent at compile time
 * (feMorphology {:onClick f} "hello")
 * (feMorphology #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (feMorphology :#the-id.klass.other-klass "hello")
 * (feMorphology :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.feMorphology = (function com$fulcrologic$fulcro$dom$feMorphology(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57567 = arguments.length;
var i__5727__auto___57568 = (0);
while(true){
if((i__5727__auto___57568 < len__5726__auto___57567)){
args__5732__auto__.push((arguments[i__5727__auto___57568]));

var G__57570 = (i__5727__auto___57568 + (1));
i__5727__auto___57568 = G__57570;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.feMorphology.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.feMorphology.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56056 = conformed_args__53323__auto__;
var map__56056__$1 = cljs.core.__destructure_map(map__56056);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56056__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56056__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56056__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("feMorphology",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.feMorphology.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.feMorphology.cljs$lang$applyTo = (function (seq56053){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56053));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (samp "hello")
 * (samp nil "hello")
 * 
 * These two are made equivalent at compile time
 * (samp {:onClick f} "hello")
 * (samp #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (samp :#the-id.klass.other-klass "hello")
 * (samp :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.samp = (function com$fulcrologic$fulcro$dom$samp(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57572 = arguments.length;
var i__5727__auto___57573 = (0);
while(true){
if((i__5727__auto___57573 < len__5726__auto___57572)){
args__5732__auto__.push((arguments[i__5727__auto___57573]));

var G__57574 = (i__5727__auto___57573 + (1));
i__5727__auto___57573 = G__57574;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.samp.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.samp.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56065 = conformed_args__53323__auto__;
var map__56065__$1 = cljs.core.__destructure_map(map__56065);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56065__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56065__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56065__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("samp",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.samp.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.samp.cljs$lang$applyTo = (function (seq56057){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56057));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (glyphRef "hello")
 * (glyphRef nil "hello")
 * 
 * These two are made equivalent at compile time
 * (glyphRef {:onClick f} "hello")
 * (glyphRef #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (glyphRef :#the-id.klass.other-klass "hello")
 * (glyphRef :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.glyphRef = (function com$fulcrologic$fulcro$dom$glyphRef(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57575 = arguments.length;
var i__5727__auto___57576 = (0);
while(true){
if((i__5727__auto___57576 < len__5726__auto___57575)){
args__5732__auto__.push((arguments[i__5727__auto___57576]));

var G__57577 = (i__5727__auto___57576 + (1));
i__5727__auto___57576 = G__57577;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.glyphRef.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.glyphRef.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56074 = conformed_args__53323__auto__;
var map__56074__$1 = cljs.core.__destructure_map(map__56074);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56074__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56074__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56074__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("glyphRef",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.glyphRef.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.glyphRef.cljs$lang$applyTo = (function (seq56070){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56070));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (small "hello")
 * (small nil "hello")
 * 
 * These two are made equivalent at compile time
 * (small {:onClick f} "hello")
 * (small #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (small :#the-id.klass.other-klass "hello")
 * (small :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.small = (function com$fulcrologic$fulcro$dom$small(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57579 = arguments.length;
var i__5727__auto___57580 = (0);
while(true){
if((i__5727__auto___57580 < len__5726__auto___57579)){
args__5732__auto__.push((arguments[i__5727__auto___57580]));

var G__57581 = (i__5727__auto___57580 + (1));
i__5727__auto___57580 = G__57581;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.small.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.small.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56082 = conformed_args__53323__auto__;
var map__56082__$1 = cljs.core.__destructure_map(map__56082);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56082__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56082__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56082__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("small",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.small.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.small.cljs$lang$applyTo = (function (seq56077){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56077));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (style "hello")
 * (style nil "hello")
 * 
 * These two are made equivalent at compile time
 * (style {:onClick f} "hello")
 * (style #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (style :#the-id.klass.other-klass "hello")
 * (style :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.style = (function com$fulcrologic$fulcro$dom$style(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57583 = arguments.length;
var i__5727__auto___57584 = (0);
while(true){
if((i__5727__auto___57584 < len__5726__auto___57583)){
args__5732__auto__.push((arguments[i__5727__auto___57584]));

var G__57585 = (i__5727__auto___57584 + (1));
i__5727__auto___57584 = G__57585;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.style.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.style.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56093 = conformed_args__53323__auto__;
var map__56093__$1 = cljs.core.__destructure_map(map__56093);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56093__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56093__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56093__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("style",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.style.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.style.cljs$lang$applyTo = (function (seq56087){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56087));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (textarea "hello")
 * (textarea nil "hello")
 * 
 * These two are made equivalent at compile time
 * (textarea {:onClick f} "hello")
 * (textarea #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (textarea :#the-id.klass.other-klass "hello")
 * (textarea :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.textarea = (function com$fulcrologic$fulcro$dom$textarea(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57586 = arguments.length;
var i__5727__auto___57587 = (0);
while(true){
if((i__5727__auto___57587 < len__5726__auto___57586)){
args__5732__auto__.push((arguments[i__5727__auto___57587]));

var G__57588 = (i__5727__auto___57587 + (1));
i__5727__auto___57587 = G__57588;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.textarea.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.textarea.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56103 = conformed_args__53323__auto__;
var map__56103__$1 = cljs.core.__destructure_map(map__56103);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56103__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56103__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56103__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("textarea",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.textarea.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.textarea.cljs$lang$applyTo = (function (seq56098){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56098));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (feGaussianBlur "hello")
 * (feGaussianBlur nil "hello")
 * 
 * These two are made equivalent at compile time
 * (feGaussianBlur {:onClick f} "hello")
 * (feGaussianBlur #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (feGaussianBlur :#the-id.klass.other-klass "hello")
 * (feGaussianBlur :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.feGaussianBlur = (function com$fulcrologic$fulcro$dom$feGaussianBlur(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57589 = arguments.length;
var i__5727__auto___57590 = (0);
while(true){
if((i__5727__auto___57590 < len__5726__auto___57589)){
args__5732__auto__.push((arguments[i__5727__auto___57590]));

var G__57591 = (i__5727__auto___57590 + (1));
i__5727__auto___57590 = G__57591;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.feGaussianBlur.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.feGaussianBlur.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56108 = conformed_args__53323__auto__;
var map__56108__$1 = cljs.core.__destructure_map(map__56108);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56108__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56108__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56108__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("feGaussianBlur",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.feGaussianBlur.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.feGaussianBlur.cljs$lang$applyTo = (function (seq56107){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56107));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (h4 "hello")
 * (h4 nil "hello")
 * 
 * These two are made equivalent at compile time
 * (h4 {:onClick f} "hello")
 * (h4 #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (h4 :#the-id.klass.other-klass "hello")
 * (h4 :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.h4 = (function com$fulcrologic$fulcro$dom$h4(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57592 = arguments.length;
var i__5727__auto___57593 = (0);
while(true){
if((i__5727__auto___57593 < len__5726__auto___57592)){
args__5732__auto__.push((arguments[i__5727__auto___57593]));

var G__57594 = (i__5727__auto___57593 + (1));
i__5727__auto___57593 = G__57594;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.h4.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.h4.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56113 = conformed_args__53323__auto__;
var map__56113__$1 = cljs.core.__destructure_map(map__56113);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56113__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56113__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56113__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("h4",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.h4.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.h4.cljs$lang$applyTo = (function (seq56109){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56109));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (head "hello")
 * (head nil "hello")
 * 
 * These two are made equivalent at compile time
 * (head {:onClick f} "hello")
 * (head #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (head :#the-id.klass.other-klass "hello")
 * (head :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.head = (function com$fulcrologic$fulcro$dom$head(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57595 = arguments.length;
var i__5727__auto___57596 = (0);
while(true){
if((i__5727__auto___57596 < len__5726__auto___57595)){
args__5732__auto__.push((arguments[i__5727__auto___57596]));

var G__57597 = (i__5727__auto___57596 + (1));
i__5727__auto___57596 = G__57597;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.head.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.head.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56123 = conformed_args__53323__auto__;
var map__56123__$1 = cljs.core.__destructure_map(map__56123);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56123__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56123__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56123__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("head",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.head.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.head.cljs$lang$applyTo = (function (seq56119){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56119));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (g "hello")
 * (g nil "hello")
 * 
 * These two are made equivalent at compile time
 * (g {:onClick f} "hello")
 * (g #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (g :#the-id.klass.other-klass "hello")
 * (g :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.g = (function com$fulcrologic$fulcro$dom$g(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57598 = arguments.length;
var i__5727__auto___57599 = (0);
while(true){
if((i__5727__auto___57599 < len__5726__auto___57598)){
args__5732__auto__.push((arguments[i__5727__auto___57599]));

var G__57600 = (i__5727__auto___57599 + (1));
i__5727__auto___57599 = G__57600;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.g.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.g.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56131 = conformed_args__53323__auto__;
var map__56131__$1 = cljs.core.__destructure_map(map__56131);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56131__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56131__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56131__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("g",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.g.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.g.cljs$lang$applyTo = (function (seq56127){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56127));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (missing-glyph "hello")
 * (missing-glyph nil "hello")
 * 
 * These two are made equivalent at compile time
 * (missing-glyph {:onClick f} "hello")
 * (missing-glyph #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (missing-glyph :#the-id.klass.other-klass "hello")
 * (missing-glyph :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.missing_glyph = (function com$fulcrologic$fulcro$dom$missing_glyph(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57601 = arguments.length;
var i__5727__auto___57602 = (0);
while(true){
if((i__5727__auto___57602 < len__5726__auto___57601)){
args__5732__auto__.push((arguments[i__5727__auto___57602]));

var G__57603 = (i__5727__auto___57602 + (1));
i__5727__auto___57602 = G__57603;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.missing_glyph.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.missing_glyph.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56135 = conformed_args__53323__auto__;
var map__56135__$1 = cljs.core.__destructure_map(map__56135);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56135__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56135__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56135__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("missing-glyph",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.missing_glyph.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.missing_glyph.cljs$lang$applyTo = (function (seq56132){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56132));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (stop "hello")
 * (stop nil "hello")
 * 
 * These two are made equivalent at compile time
 * (stop {:onClick f} "hello")
 * (stop #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (stop :#the-id.klass.other-klass "hello")
 * (stop :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.stop = (function com$fulcrologic$fulcro$dom$stop(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57604 = arguments.length;
var i__5727__auto___57605 = (0);
while(true){
if((i__5727__auto___57605 < len__5726__auto___57604)){
args__5732__auto__.push((arguments[i__5727__auto___57605]));

var G__57608 = (i__5727__auto___57605 + (1));
i__5727__auto___57605 = G__57608;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.stop.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.stop.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56140 = conformed_args__53323__auto__;
var map__56140__$1 = cljs.core.__destructure_map(map__56140);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56140__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56140__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56140__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("stop",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.stop.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.stop.cljs$lang$applyTo = (function (seq56136){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56136));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (feDiffuseLighting "hello")
 * (feDiffuseLighting nil "hello")
 * 
 * These two are made equivalent at compile time
 * (feDiffuseLighting {:onClick f} "hello")
 * (feDiffuseLighting #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (feDiffuseLighting :#the-id.klass.other-klass "hello")
 * (feDiffuseLighting :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.feDiffuseLighting = (function com$fulcrologic$fulcro$dom$feDiffuseLighting(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57611 = arguments.length;
var i__5727__auto___57612 = (0);
while(true){
if((i__5727__auto___57612 < len__5726__auto___57611)){
args__5732__auto__.push((arguments[i__5727__auto___57612]));

var G__57613 = (i__5727__auto___57612 + (1));
i__5727__auto___57612 = G__57613;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.feDiffuseLighting.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.feDiffuseLighting.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56144 = conformed_args__53323__auto__;
var map__56144__$1 = cljs.core.__destructure_map(map__56144);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56144__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56144__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56144__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("feDiffuseLighting",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.feDiffuseLighting.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.feDiffuseLighting.cljs$lang$applyTo = (function (seq56142){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56142));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (filter "hello")
 * (filter nil "hello")
 * 
 * These two are made equivalent at compile time
 * (filter {:onClick f} "hello")
 * (filter #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (filter :#the-id.klass.other-klass "hello")
 * (filter :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.filter = (function com$fulcrologic$fulcro$dom$filter(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57614 = arguments.length;
var i__5727__auto___57615 = (0);
while(true){
if((i__5727__auto___57615 < len__5726__auto___57614)){
args__5732__auto__.push((arguments[i__5727__auto___57615]));

var G__57616 = (i__5727__auto___57615 + (1));
i__5727__auto___57615 = G__57616;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.filter.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.filter.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56150 = conformed_args__53323__auto__;
var map__56150__$1 = cljs.core.__destructure_map(map__56150);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56150__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56150__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56150__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("filter",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.filter.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.filter.cljs$lang$applyTo = (function (seq56147){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56147));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (feComposite "hello")
 * (feComposite nil "hello")
 * 
 * These two are made equivalent at compile time
 * (feComposite {:onClick f} "hello")
 * (feComposite #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (feComposite :#the-id.klass.other-klass "hello")
 * (feComposite :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.feComposite = (function com$fulcrologic$fulcro$dom$feComposite(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57618 = arguments.length;
var i__5727__auto___57619 = (0);
while(true){
if((i__5727__auto___57619 < len__5726__auto___57618)){
args__5732__auto__.push((arguments[i__5727__auto___57619]));

var G__57620 = (i__5727__auto___57619 + (1));
i__5727__auto___57619 = G__57620;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.feComposite.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.feComposite.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56157 = conformed_args__53323__auto__;
var map__56157__$1 = cljs.core.__destructure_map(map__56157);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56157__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56157__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56157__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("feComposite",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.feComposite.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.feComposite.cljs$lang$applyTo = (function (seq56155){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56155));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (mesh "hello")
 * (mesh nil "hello")
 * 
 * These two are made equivalent at compile time
 * (mesh {:onClick f} "hello")
 * (mesh #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (mesh :#the-id.klass.other-klass "hello")
 * (mesh :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.mesh = (function com$fulcrologic$fulcro$dom$mesh(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57623 = arguments.length;
var i__5727__auto___57624 = (0);
while(true){
if((i__5727__auto___57624 < len__5726__auto___57623)){
args__5732__auto__.push((arguments[i__5727__auto___57624]));

var G__57626 = (i__5727__auto___57624 + (1));
i__5727__auto___57624 = G__57626;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.mesh.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.mesh.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56168 = conformed_args__53323__auto__;
var map__56168__$1 = cljs.core.__destructure_map(map__56168);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56168__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56168__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56168__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("mesh",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.mesh.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.mesh.cljs$lang$applyTo = (function (seq56162){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56162));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (var "hello")
 * (var nil "hello")
 * 
 * These two are made equivalent at compile time
 * (var {:onClick f} "hello")
 * (var #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (var :#the-id.klass.other-klass "hello")
 * (var :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.var$ = (function com$fulcrologic$fulcro$dom$var(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57627 = arguments.length;
var i__5727__auto___57628 = (0);
while(true){
if((i__5727__auto___57628 < len__5726__auto___57627)){
args__5732__auto__.push((arguments[i__5727__auto___57628]));

var G__57629 = (i__5727__auto___57628 + (1));
i__5727__auto___57628 = G__57629;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.var$.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.var$.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56173 = conformed_args__53323__auto__;
var map__56173__$1 = cljs.core.__destructure_map(map__56173);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56173__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56173__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56173__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("var",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.var$.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.var$.cljs$lang$applyTo = (function (seq56171){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56171));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (tspan "hello")
 * (tspan nil "hello")
 * 
 * These two are made equivalent at compile time
 * (tspan {:onClick f} "hello")
 * (tspan #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (tspan :#the-id.klass.other-klass "hello")
 * (tspan :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.tspan = (function com$fulcrologic$fulcro$dom$tspan(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57630 = arguments.length;
var i__5727__auto___57631 = (0);
while(true){
if((i__5727__auto___57631 < len__5726__auto___57630)){
args__5732__auto__.push((arguments[i__5727__auto___57631]));

var G__57632 = (i__5727__auto___57631 + (1));
i__5727__auto___57631 = G__57632;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.tspan.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.tspan.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56176 = conformed_args__53323__auto__;
var map__56176__$1 = cljs.core.__destructure_map(map__56176);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56176__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56176__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56176__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("tspan",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.tspan.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.tspan.cljs$lang$applyTo = (function (seq56175){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56175));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (ol "hello")
 * (ol nil "hello")
 * 
 * These two are made equivalent at compile time
 * (ol {:onClick f} "hello")
 * (ol #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (ol :#the-id.klass.other-klass "hello")
 * (ol :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.ol = (function com$fulcrologic$fulcro$dom$ol(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57635 = arguments.length;
var i__5727__auto___57636 = (0);
while(true){
if((i__5727__auto___57636 < len__5726__auto___57635)){
args__5732__auto__.push((arguments[i__5727__auto___57636]));

var G__57637 = (i__5727__auto___57636 + (1));
i__5727__auto___57636 = G__57637;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.ol.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.ol.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56178 = conformed_args__53323__auto__;
var map__56178__$1 = cljs.core.__destructure_map(map__56178);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56178__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56178__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56178__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("ol",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.ol.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.ol.cljs$lang$applyTo = (function (seq56177){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56177));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (details "hello")
 * (details nil "hello")
 * 
 * These two are made equivalent at compile time
 * (details {:onClick f} "hello")
 * (details #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (details :#the-id.klass.other-klass "hello")
 * (details :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.details = (function com$fulcrologic$fulcro$dom$details(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57638 = arguments.length;
var i__5727__auto___57639 = (0);
while(true){
if((i__5727__auto___57639 < len__5726__auto___57638)){
args__5732__auto__.push((arguments[i__5727__auto___57639]));

var G__57640 = (i__5727__auto___57639 + (1));
i__5727__auto___57639 = G__57640;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.details.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.details.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56180 = conformed_args__53323__auto__;
var map__56180__$1 = cljs.core.__destructure_map(map__56180);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56180__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56180__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56180__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("details",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.details.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.details.cljs$lang$applyTo = (function (seq56179){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56179));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (line "hello")
 * (line nil "hello")
 * 
 * These two are made equivalent at compile time
 * (line {:onClick f} "hello")
 * (line #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (line :#the-id.klass.other-klass "hello")
 * (line :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.line = (function com$fulcrologic$fulcro$dom$line(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57641 = arguments.length;
var i__5727__auto___57642 = (0);
while(true){
if((i__5727__auto___57642 < len__5726__auto___57641)){
args__5732__auto__.push((arguments[i__5727__auto___57642]));

var G__57643 = (i__5727__auto___57642 + (1));
i__5727__auto___57642 = G__57643;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.line.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.line.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56185 = conformed_args__53323__auto__;
var map__56185__$1 = cljs.core.__destructure_map(map__56185);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56185__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56185__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56185__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("line",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.line.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.line.cljs$lang$applyTo = (function (seq56182){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56182));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (col "hello")
 * (col nil "hello")
 * 
 * These two are made equivalent at compile time
 * (col {:onClick f} "hello")
 * (col #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (col :#the-id.klass.other-klass "hello")
 * (col :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.col = (function com$fulcrologic$fulcro$dom$col(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57645 = arguments.length;
var i__5727__auto___57646 = (0);
while(true){
if((i__5727__auto___57646 < len__5726__auto___57645)){
args__5732__auto__.push((arguments[i__5727__auto___57646]));

var G__57647 = (i__5727__auto___57646 + (1));
i__5727__auto___57646 = G__57647;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.col.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.col.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56193 = conformed_args__53323__auto__;
var map__56193__$1 = cljs.core.__destructure_map(map__56193);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56193__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56193__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56193__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("col",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.col.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.col.cljs$lang$applyTo = (function (seq56186){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56186));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (label "hello")
 * (label nil "hello")
 * 
 * These two are made equivalent at compile time
 * (label {:onClick f} "hello")
 * (label #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (label :#the-id.klass.other-klass "hello")
 * (label :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.label = (function com$fulcrologic$fulcro$dom$label(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57650 = arguments.length;
var i__5727__auto___57651 = (0);
while(true){
if((i__5727__auto___57651 < len__5726__auto___57650)){
args__5732__auto__.push((arguments[i__5727__auto___57651]));

var G__57652 = (i__5727__auto___57651 + (1));
i__5727__auto___57651 = G__57652;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.label.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.label.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56196 = conformed_args__53323__auto__;
var map__56196__$1 = cljs.core.__destructure_map(map__56196);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56196__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56196__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56196__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("label",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.label.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.label.cljs$lang$applyTo = (function (seq56195){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56195));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (picture "hello")
 * (picture nil "hello")
 * 
 * These two are made equivalent at compile time
 * (picture {:onClick f} "hello")
 * (picture #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (picture :#the-id.klass.other-klass "hello")
 * (picture :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.picture = (function com$fulcrologic$fulcro$dom$picture(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57655 = arguments.length;
var i__5727__auto___57656 = (0);
while(true){
if((i__5727__auto___57656 < len__5726__auto___57655)){
args__5732__auto__.push((arguments[i__5727__auto___57656]));

var G__57657 = (i__5727__auto___57656 + (1));
i__5727__auto___57656 = G__57657;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.picture.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.picture.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56213 = conformed_args__53323__auto__;
var map__56213__$1 = cljs.core.__destructure_map(map__56213);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56213__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56213__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56213__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("picture",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.picture.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.picture.cljs$lang$applyTo = (function (seq56201){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56201));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (rt "hello")
 * (rt nil "hello")
 * 
 * These two are made equivalent at compile time
 * (rt {:onClick f} "hello")
 * (rt #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (rt :#the-id.klass.other-klass "hello")
 * (rt :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.rt = (function com$fulcrologic$fulcro$dom$rt(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57661 = arguments.length;
var i__5727__auto___57662 = (0);
while(true){
if((i__5727__auto___57662 < len__5726__auto___57661)){
args__5732__auto__.push((arguments[i__5727__auto___57662]));

var G__57663 = (i__5727__auto___57662 + (1));
i__5727__auto___57662 = G__57663;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.rt.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.rt.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56216 = conformed_args__53323__auto__;
var map__56216__$1 = cljs.core.__destructure_map(map__56216);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56216__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56216__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56216__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("rt",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.rt.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.rt.cljs$lang$applyTo = (function (seq56214){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56214));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (h6 "hello")
 * (h6 nil "hello")
 * 
 * These two are made equivalent at compile time
 * (h6 {:onClick f} "hello")
 * (h6 #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (h6 :#the-id.klass.other-klass "hello")
 * (h6 :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.h6 = (function com$fulcrologic$fulcro$dom$h6(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57665 = arguments.length;
var i__5727__auto___57666 = (0);
while(true){
if((i__5727__auto___57666 < len__5726__auto___57665)){
args__5732__auto__.push((arguments[i__5727__auto___57666]));

var G__57669 = (i__5727__auto___57666 + (1));
i__5727__auto___57666 = G__57669;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.h6.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.h6.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56224 = conformed_args__53323__auto__;
var map__56224__$1 = cljs.core.__destructure_map(map__56224);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56224__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56224__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56224__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("h6",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.h6.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.h6.cljs$lang$applyTo = (function (seq56223){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56223));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (vkern "hello")
 * (vkern nil "hello")
 * 
 * These two are made equivalent at compile time
 * (vkern {:onClick f} "hello")
 * (vkern #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (vkern :#the-id.klass.other-klass "hello")
 * (vkern :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.vkern = (function com$fulcrologic$fulcro$dom$vkern(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57670 = arguments.length;
var i__5727__auto___57671 = (0);
while(true){
if((i__5727__auto___57671 < len__5726__auto___57670)){
args__5732__auto__.push((arguments[i__5727__auto___57671]));

var G__57672 = (i__5727__auto___57671 + (1));
i__5727__auto___57671 = G__57672;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.vkern.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.vkern.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56232 = conformed_args__53323__auto__;
var map__56232__$1 = cljs.core.__destructure_map(map__56232);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56232__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56232__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56232__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("vkern",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.vkern.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.vkern.cljs$lang$applyTo = (function (seq56231){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56231));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (link "hello")
 * (link nil "hello")
 * 
 * These two are made equivalent at compile time
 * (link {:onClick f} "hello")
 * (link #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (link :#the-id.klass.other-klass "hello")
 * (link :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.link = (function com$fulcrologic$fulcro$dom$link(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57674 = arguments.length;
var i__5727__auto___57675 = (0);
while(true){
if((i__5727__auto___57675 < len__5726__auto___57674)){
args__5732__auto__.push((arguments[i__5727__auto___57675]));

var G__57679 = (i__5727__auto___57675 + (1));
i__5727__auto___57675 = G__57679;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.link.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.link.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56241 = conformed_args__53323__auto__;
var map__56241__$1 = cljs.core.__destructure_map(map__56241);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56241__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56241__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56241__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("link",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.link.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.link.cljs$lang$applyTo = (function (seq56240){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56240));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (defs "hello")
 * (defs nil "hello")
 * 
 * These two are made equivalent at compile time
 * (defs {:onClick f} "hello")
 * (defs #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (defs :#the-id.klass.other-klass "hello")
 * (defs :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.defs = (function com$fulcrologic$fulcro$dom$defs(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57680 = arguments.length;
var i__5727__auto___57681 = (0);
while(true){
if((i__5727__auto___57681 < len__5726__auto___57680)){
args__5732__auto__.push((arguments[i__5727__auto___57681]));

var G__57682 = (i__5727__auto___57681 + (1));
i__5727__auto___57681 = G__57682;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.defs.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.defs.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56249 = conformed_args__53323__auto__;
var map__56249__$1 = cljs.core.__destructure_map(map__56249);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56249__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56249__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56249__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("defs",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.defs.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.defs.cljs$lang$applyTo = (function (seq56245){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56245));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (glyph "hello")
 * (glyph nil "hello")
 * 
 * These two are made equivalent at compile time
 * (glyph {:onClick f} "hello")
 * (glyph #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (glyph :#the-id.klass.other-klass "hello")
 * (glyph :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.glyph = (function com$fulcrologic$fulcro$dom$glyph(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57683 = arguments.length;
var i__5727__auto___57684 = (0);
while(true){
if((i__5727__auto___57684 < len__5726__auto___57683)){
args__5732__auto__.push((arguments[i__5727__auto___57684]));

var G__57685 = (i__5727__auto___57684 + (1));
i__5727__auto___57684 = G__57685;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.glyph.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.glyph.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56261 = conformed_args__53323__auto__;
var map__56261__$1 = cljs.core.__destructure_map(map__56261);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56261__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56261__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56261__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("glyph",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.glyph.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.glyph.cljs$lang$applyTo = (function (seq56253){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56253));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (colgroup "hello")
 * (colgroup nil "hello")
 * 
 * These two are made equivalent at compile time
 * (colgroup {:onClick f} "hello")
 * (colgroup #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (colgroup :#the-id.klass.other-klass "hello")
 * (colgroup :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.colgroup = (function com$fulcrologic$fulcro$dom$colgroup(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57686 = arguments.length;
var i__5727__auto___57688 = (0);
while(true){
if((i__5727__auto___57688 < len__5726__auto___57686)){
args__5732__auto__.push((arguments[i__5727__auto___57688]));

var G__57692 = (i__5727__auto___57688 + (1));
i__5727__auto___57688 = G__57692;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.colgroup.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.colgroup.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56267 = conformed_args__53323__auto__;
var map__56267__$1 = cljs.core.__destructure_map(map__56267);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56267__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56267__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56267__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("colgroup",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.colgroup.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.colgroup.cljs$lang$applyTo = (function (seq56262){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56262));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (meter "hello")
 * (meter nil "hello")
 * 
 * These two are made equivalent at compile time
 * (meter {:onClick f} "hello")
 * (meter #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (meter :#the-id.klass.other-klass "hello")
 * (meter :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.meter = (function com$fulcrologic$fulcro$dom$meter(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57694 = arguments.length;
var i__5727__auto___57695 = (0);
while(true){
if((i__5727__auto___57695 < len__5726__auto___57694)){
args__5732__auto__.push((arguments[i__5727__auto___57695]));

var G__57696 = (i__5727__auto___57695 + (1));
i__5727__auto___57695 = G__57696;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.meter.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.meter.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56270 = conformed_args__53323__auto__;
var map__56270__$1 = cljs.core.__destructure_map(map__56270);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56270__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56270__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56270__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("meter",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.meter.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.meter.cljs$lang$applyTo = (function (seq56268){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56268));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (bdo "hello")
 * (bdo nil "hello")
 * 
 * These two are made equivalent at compile time
 * (bdo {:onClick f} "hello")
 * (bdo #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (bdo :#the-id.klass.other-klass "hello")
 * (bdo :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.bdo = (function com$fulcrologic$fulcro$dom$bdo(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57701 = arguments.length;
var i__5727__auto___57702 = (0);
while(true){
if((i__5727__auto___57702 < len__5726__auto___57701)){
args__5732__auto__.push((arguments[i__5727__auto___57702]));

var G__57704 = (i__5727__auto___57702 + (1));
i__5727__auto___57702 = G__57704;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.bdo.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.bdo.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56276 = conformed_args__53323__auto__;
var map__56276__$1 = cljs.core.__destructure_map(map__56276);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56276__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56276__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56276__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("bdo",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.bdo.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.bdo.cljs$lang$applyTo = (function (seq56275){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56275));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (feImage "hello")
 * (feImage nil "hello")
 * 
 * These two are made equivalent at compile time
 * (feImage {:onClick f} "hello")
 * (feImage #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (feImage :#the-id.klass.other-klass "hello")
 * (feImage :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.feImage = (function com$fulcrologic$fulcro$dom$feImage(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57708 = arguments.length;
var i__5727__auto___57709 = (0);
while(true){
if((i__5727__auto___57709 < len__5726__auto___57708)){
args__5732__auto__.push((arguments[i__5727__auto___57709]));

var G__57710 = (i__5727__auto___57709 + (1));
i__5727__auto___57709 = G__57710;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.feImage.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.feImage.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56284 = conformed_args__53323__auto__;
var map__56284__$1 = cljs.core.__destructure_map(map__56284);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56284__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56284__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56284__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("feImage",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.feImage.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.feImage.cljs$lang$applyTo = (function (seq56282){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56282));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (b "hello")
 * (b nil "hello")
 * 
 * These two are made equivalent at compile time
 * (b {:onClick f} "hello")
 * (b #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (b :#the-id.klass.other-klass "hello")
 * (b :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.b = (function com$fulcrologic$fulcro$dom$b(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57713 = arguments.length;
var i__5727__auto___57714 = (0);
while(true){
if((i__5727__auto___57714 < len__5726__auto___57713)){
args__5732__auto__.push((arguments[i__5727__auto___57714]));

var G__57716 = (i__5727__auto___57714 + (1));
i__5727__auto___57714 = G__57716;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.b.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.b.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56291 = conformed_args__53323__auto__;
var map__56291__$1 = cljs.core.__destructure_map(map__56291);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56291__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56291__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56291__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("b",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.b.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.b.cljs$lang$applyTo = (function (seq56288){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56288));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (svg "hello")
 * (svg nil "hello")
 * 
 * These two are made equivalent at compile time
 * (svg {:onClick f} "hello")
 * (svg #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (svg :#the-id.klass.other-klass "hello")
 * (svg :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.svg = (function com$fulcrologic$fulcro$dom$svg(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57720 = arguments.length;
var i__5727__auto___57721 = (0);
while(true){
if((i__5727__auto___57721 < len__5726__auto___57720)){
args__5732__auto__.push((arguments[i__5727__auto___57721]));

var G__57722 = (i__5727__auto___57721 + (1));
i__5727__auto___57721 = G__57722;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.svg.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.svg.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56294 = conformed_args__53323__auto__;
var map__56294__$1 = cljs.core.__destructure_map(map__56294);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56294__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56294__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56294__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("svg",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.svg.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.svg.cljs$lang$applyTo = (function (seq56293){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56293));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (feTile "hello")
 * (feTile nil "hello")
 * 
 * These two are made equivalent at compile time
 * (feTile {:onClick f} "hello")
 * (feTile #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (feTile :#the-id.klass.other-klass "hello")
 * (feTile :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.feTile = (function com$fulcrologic$fulcro$dom$feTile(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57727 = arguments.length;
var i__5727__auto___57728 = (0);
while(true){
if((i__5727__auto___57728 < len__5726__auto___57727)){
args__5732__auto__.push((arguments[i__5727__auto___57728]));

var G__57729 = (i__5727__auto___57728 + (1));
i__5727__auto___57728 = G__57729;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.feTile.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.feTile.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56296 = conformed_args__53323__auto__;
var map__56296__$1 = cljs.core.__destructure_map(map__56296);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56296__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56296__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56296__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("feTile",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.feTile.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.feTile.cljs$lang$applyTo = (function (seq56295){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56295));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (ellipse "hello")
 * (ellipse nil "hello")
 * 
 * These two are made equivalent at compile time
 * (ellipse {:onClick f} "hello")
 * (ellipse #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (ellipse :#the-id.klass.other-klass "hello")
 * (ellipse :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.ellipse = (function com$fulcrologic$fulcro$dom$ellipse(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57731 = arguments.length;
var i__5727__auto___57732 = (0);
while(true){
if((i__5727__auto___57732 < len__5726__auto___57731)){
args__5732__auto__.push((arguments[i__5727__auto___57732]));

var G__57734 = (i__5727__auto___57732 + (1));
i__5727__auto___57732 = G__57734;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.ellipse.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.ellipse.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56310 = conformed_args__53323__auto__;
var map__56310__$1 = cljs.core.__destructure_map(map__56310);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56310__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56310__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56310__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("ellipse",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.ellipse.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.ellipse.cljs$lang$applyTo = (function (seq56304){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56304));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (code "hello")
 * (code nil "hello")
 * 
 * These two are made equivalent at compile time
 * (code {:onClick f} "hello")
 * (code #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (code :#the-id.klass.other-klass "hello")
 * (code :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.code = (function com$fulcrologic$fulcro$dom$code(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57743 = arguments.length;
var i__5727__auto___57744 = (0);
while(true){
if((i__5727__auto___57744 < len__5726__auto___57743)){
args__5732__auto__.push((arguments[i__5727__auto___57744]));

var G__57745 = (i__5727__auto___57744 + (1));
i__5727__auto___57744 = G__57745;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.code.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.code.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56370 = conformed_args__53323__auto__;
var map__56370__$1 = cljs.core.__destructure_map(map__56370);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56370__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56370__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56370__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("code",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.code.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.code.cljs$lang$applyTo = (function (seq56342){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56342));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (dialog "hello")
 * (dialog nil "hello")
 * 
 * These two are made equivalent at compile time
 * (dialog {:onClick f} "hello")
 * (dialog #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (dialog :#the-id.klass.other-klass "hello")
 * (dialog :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.dialog = (function com$fulcrologic$fulcro$dom$dialog(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57748 = arguments.length;
var i__5727__auto___57749 = (0);
while(true){
if((i__5727__auto___57749 < len__5726__auto___57748)){
args__5732__auto__.push((arguments[i__5727__auto___57749]));

var G__57750 = (i__5727__auto___57749 + (1));
i__5727__auto___57749 = G__57750;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.dialog.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.dialog.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56407 = conformed_args__53323__auto__;
var map__56407__$1 = cljs.core.__destructure_map(map__56407);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56407__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56407__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56407__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("dialog",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.dialog.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.dialog.cljs$lang$applyTo = (function (seq56377){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56377));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (linearGradient "hello")
 * (linearGradient nil "hello")
 * 
 * These two are made equivalent at compile time
 * (linearGradient {:onClick f} "hello")
 * (linearGradient #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (linearGradient :#the-id.klass.other-klass "hello")
 * (linearGradient :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.linearGradient = (function com$fulcrologic$fulcro$dom$linearGradient(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57751 = arguments.length;
var i__5727__auto___57752 = (0);
while(true){
if((i__5727__auto___57752 < len__5726__auto___57751)){
args__5732__auto__.push((arguments[i__5727__auto___57752]));

var G__57754 = (i__5727__auto___57752 + (1));
i__5727__auto___57752 = G__57754;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.linearGradient.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.linearGradient.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56443 = conformed_args__53323__auto__;
var map__56443__$1 = cljs.core.__destructure_map(map__56443);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56443__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56443__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56443__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("linearGradient",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.linearGradient.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.linearGradient.cljs$lang$applyTo = (function (seq56429){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56429));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (discard "hello")
 * (discard nil "hello")
 * 
 * These two are made equivalent at compile time
 * (discard {:onClick f} "hello")
 * (discard #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (discard :#the-id.klass.other-klass "hello")
 * (discard :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.discard = (function com$fulcrologic$fulcro$dom$discard(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57755 = arguments.length;
var i__5727__auto___57756 = (0);
while(true){
if((i__5727__auto___57756 < len__5726__auto___57755)){
args__5732__auto__.push((arguments[i__5727__auto___57756]));

var G__57757 = (i__5727__auto___57756 + (1));
i__5727__auto___57756 = G__57757;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.discard.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.discard.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56445 = conformed_args__53323__auto__;
var map__56445__$1 = cljs.core.__destructure_map(map__56445);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56445__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56445__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56445__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("discard",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.discard.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.discard.cljs$lang$applyTo = (function (seq56444){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56444));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (font-face-src "hello")
 * (font-face-src nil "hello")
 * 
 * These two are made equivalent at compile time
 * (font-face-src {:onClick f} "hello")
 * (font-face-src #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (font-face-src :#the-id.klass.other-klass "hello")
 * (font-face-src :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.font_face_src = (function com$fulcrologic$fulcro$dom$font_face_src(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57759 = arguments.length;
var i__5727__auto___57760 = (0);
while(true){
if((i__5727__auto___57760 < len__5726__auto___57759)){
args__5732__auto__.push((arguments[i__5727__auto___57760]));

var G__57761 = (i__5727__auto___57760 + (1));
i__5727__auto___57760 = G__57761;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.font_face_src.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.font_face_src.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56447 = conformed_args__53323__auto__;
var map__56447__$1 = cljs.core.__destructure_map(map__56447);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56447__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56447__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56447__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("font-face-src",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.font_face_src.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.font_face_src.cljs$lang$applyTo = (function (seq56446){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56446));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (noscript "hello")
 * (noscript nil "hello")
 * 
 * These two are made equivalent at compile time
 * (noscript {:onClick f} "hello")
 * (noscript #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (noscript :#the-id.klass.other-klass "hello")
 * (noscript :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.noscript = (function com$fulcrologic$fulcro$dom$noscript(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57762 = arguments.length;
var i__5727__auto___57763 = (0);
while(true){
if((i__5727__auto___57763 < len__5726__auto___57762)){
args__5732__auto__.push((arguments[i__5727__auto___57763]));

var G__57764 = (i__5727__auto___57763 + (1));
i__5727__auto___57763 = G__57764;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.noscript.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.noscript.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56449 = conformed_args__53323__auto__;
var map__56449__$1 = cljs.core.__destructure_map(map__56449);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56449__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56449__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56449__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("noscript",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.noscript.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.noscript.cljs$lang$applyTo = (function (seq56448){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56448));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (animateTransform "hello")
 * (animateTransform nil "hello")
 * 
 * These two are made equivalent at compile time
 * (animateTransform {:onClick f} "hello")
 * (animateTransform #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (animateTransform :#the-id.klass.other-klass "hello")
 * (animateTransform :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.animateTransform = (function com$fulcrologic$fulcro$dom$animateTransform(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57765 = arguments.length;
var i__5727__auto___57766 = (0);
while(true){
if((i__5727__auto___57766 < len__5726__auto___57765)){
args__5732__auto__.push((arguments[i__5727__auto___57766]));

var G__57767 = (i__5727__auto___57766 + (1));
i__5727__auto___57766 = G__57767;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.animateTransform.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.animateTransform.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56452 = conformed_args__53323__auto__;
var map__56452__$1 = cljs.core.__destructure_map(map__56452);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56452__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56452__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56452__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("animateTransform",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.animateTransform.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.animateTransform.cljs$lang$applyTo = (function (seq56450){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56450));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (feColorMatrix "hello")
 * (feColorMatrix nil "hello")
 * 
 * These two are made equivalent at compile time
 * (feColorMatrix {:onClick f} "hello")
 * (feColorMatrix #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (feColorMatrix :#the-id.klass.other-klass "hello")
 * (feColorMatrix :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.feColorMatrix = (function com$fulcrologic$fulcro$dom$feColorMatrix(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57769 = arguments.length;
var i__5727__auto___57770 = (0);
while(true){
if((i__5727__auto___57770 < len__5726__auto___57769)){
args__5732__auto__.push((arguments[i__5727__auto___57770]));

var G__57771 = (i__5727__auto___57770 + (1));
i__5727__auto___57770 = G__57771;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.feColorMatrix.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.feColorMatrix.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56454 = conformed_args__53323__auto__;
var map__56454__$1 = cljs.core.__destructure_map(map__56454);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56454__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56454__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56454__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("feColorMatrix",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.feColorMatrix.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.feColorMatrix.cljs$lang$applyTo = (function (seq56453){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56453));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (h2 "hello")
 * (h2 nil "hello")
 * 
 * These two are made equivalent at compile time
 * (h2 {:onClick f} "hello")
 * (h2 #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (h2 :#the-id.klass.other-klass "hello")
 * (h2 :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.h2 = (function com$fulcrologic$fulcro$dom$h2(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57773 = arguments.length;
var i__5727__auto___57774 = (0);
while(true){
if((i__5727__auto___57774 < len__5726__auto___57773)){
args__5732__auto__.push((arguments[i__5727__auto___57774]));

var G__57775 = (i__5727__auto___57774 + (1));
i__5727__auto___57774 = G__57775;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.h2.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.h2.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56460 = conformed_args__53323__auto__;
var map__56460__$1 = cljs.core.__destructure_map(map__56460);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56460__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56460__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56460__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("h2",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.h2.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.h2.cljs$lang$applyTo = (function (seq56457){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56457));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (area "hello")
 * (area nil "hello")
 * 
 * These two are made equivalent at compile time
 * (area {:onClick f} "hello")
 * (area #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (area :#the-id.klass.other-klass "hello")
 * (area :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.area = (function com$fulcrologic$fulcro$dom$area(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57778 = arguments.length;
var i__5727__auto___57779 = (0);
while(true){
if((i__5727__auto___57779 < len__5726__auto___57778)){
args__5732__auto__.push((arguments[i__5727__auto___57779]));

var G__57780 = (i__5727__auto___57779 + (1));
i__5727__auto___57779 = G__57780;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.area.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.area.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56466 = conformed_args__53323__auto__;
var map__56466__$1 = cljs.core.__destructure_map(map__56466);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56466__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56466__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56466__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("area",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.area.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.area.cljs$lang$applyTo = (function (seq56464){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56464));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (br "hello")
 * (br nil "hello")
 * 
 * These two are made equivalent at compile time
 * (br {:onClick f} "hello")
 * (br #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (br :#the-id.klass.other-klass "hello")
 * (br :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.br = (function com$fulcrologic$fulcro$dom$br(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57781 = arguments.length;
var i__5727__auto___57782 = (0);
while(true){
if((i__5727__auto___57782 < len__5726__auto___57781)){
args__5732__auto__.push((arguments[i__5727__auto___57782]));

var G__57783 = (i__5727__auto___57782 + (1));
i__5727__auto___57782 = G__57783;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.br.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.br.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56471 = conformed_args__53323__auto__;
var map__56471__$1 = cljs.core.__destructure_map(map__56471);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56471__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56471__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56471__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("br",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.br.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.br.cljs$lang$applyTo = (function (seq56469){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56469));
}));


/**
 * Returns a React DOM element. Can be invoked in several ways
 * 
 * These two are made equivalent at compile time
 * (image "hello")
 * (image nil "hello")
 * 
 * These two are made equivalent at compile time
 * (image {:onClick f} "hello")
 * (image #js {:onClick f} "hello")
 * 
 * There is also a shorthand for CSS id and class names
 * (image :#the-id.klass.other-klass "hello")
 * (image :#the-id.klass.other-klass {:onClick f} "hello")
 */
com.fulcrologic.fulcro.dom.image = (function com$fulcrologic$fulcro$dom$image(var_args){
var args__5732__auto__ = [];
var len__5726__auto___57784 = arguments.length;
var i__5727__auto___57785 = (0);
while(true){
if((i__5727__auto___57785 < len__5726__auto___57784)){
args__5732__auto__.push((arguments[i__5727__auto___57785]));

var G__57786 = (i__5727__auto___57785 + (1));
i__5727__auto___57785 = G__57786;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((0) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((0)),(0),null)):null);
return com.fulcrologic.fulcro.dom.image.cljs$core$IFn$_invoke$arity$variadic(argseq__5733__auto__);
});

(com.fulcrologic.fulcro.dom.image.cljs$core$IFn$_invoke$arity$variadic = (function (args){
var conformed_args__53323__auto__ = com.fulcrologic.fulcro.dom.parse_args(args);
var map__56481 = conformed_args__53323__auto__;
var map__56481__$1 = cljs.core.__destructure_map(map__56481);
var css__53326__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56481__$1,new cljs.core.Keyword(null,"css","css",1135045163));
var children__53325__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56481__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var attrs__53324__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__56481__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var children__53325__auto____$1 = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(cljs.core.second,children__53325__auto__);
var attrs_value__53327__auto__ = (function (){var or__5002__auto__ = cljs.core.second(attrs__53324__auto__);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return com.fulcrologic.fulcro.dom.macro_create_element.cljs$core$IFn$_invoke$arity$3("image",cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [attrs_value__53327__auto__], null),children__53325__auto____$1),css__53326__auto__);
}));

(com.fulcrologic.fulcro.dom.image.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(com.fulcrologic.fulcro.dom.image.cljs$lang$applyTo = (function (seq56476){
var self__5712__auto__ = this;
return self__5712__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq56476));
}));


//# sourceMappingURL=com.fulcrologic.fulcro.dom.js.map
