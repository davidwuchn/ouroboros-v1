goog.provide('com.fulcrologic.fulcro.dom.inputs');
goog.scope(function(){
  com.fulcrologic.fulcro.dom.inputs.goog$module$goog$object = goog.module.get('goog.object');
});
var module$node_modules$react$index=shadow.js.require("module$node_modules$react$index", {});
/**
 * Create a new type of input that can be derived from a string. `kw` is a fully-qualified keyword name for the new
 *   class (which will be used to register it in the component registry), and `model->string` and `string->model` are
 *   functions that can do the conversions (and MUST tolerate nil as input).
 *   `model->string` MUST return a string (empty if invalid), and `string->model` should return nil if the string doesn't
 *   yet convert to a valid model value.
 * 
 *   `string-filter` is an optional `(fn [string?] string?)` that can be used to rewrite incoming strings (i.e. filter
 *   things).
 *   
 */
com.fulcrologic.fulcro.dom.inputs.StringBufferedInput = (function com$fulcrologic$fulcro$dom$inputs$StringBufferedInput(kw,p__53033){
var map__53034 = p__53033;
var map__53034__$1 = cljs.core.__destructure_map(map__53034);
var model__GT_string = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53034__$1,new cljs.core.Keyword(null,"model->string","model->string",-2085451701));
var string__GT_model = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53034__$1,new cljs.core.Keyword(null,"string->model","string->model",-134531957));
var string_filter = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53034__$1,new cljs.core.Keyword(null,"string-filter","string-filter",781255569));
var cls = (function (props){
var this$ = this;
var props_53069__$1 = com.fulcrologic.fulcro.dom.inputs.goog$module$goog$object.get(props,"fulcro$value");
var map__53037_53070 = props_53069__$1;
var map__53037_53071__$1 = cljs.core.__destructure_map(map__53037_53070);
var value_53072 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53037_53071__$1,new cljs.core.Keyword(null,"value","value",305978217));
var initial_state_53073 = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"oldPropValue","oldPropValue",1507086672),value_53072,new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (evt){
var map__53041 = (com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1(this$) : com.fulcrologic.fulcro.components.props.call(null, this$));
var map__53041__$1 = cljs.core.__destructure_map(map__53041);
var value__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53041__$1,new cljs.core.Keyword(null,"value","value",305978217));
var onChange = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53041__$1,new cljs.core.Keyword(null,"onChange","onChange",-312891301));
var nsv = com.fulcrologic.fulcro.dom.events.target_value(evt);
var nv = (string__GT_model.cljs$core$IFn$_invoke$arity$1 ? string__GT_model.cljs$core$IFn$_invoke$arity$1(nsv) : string__GT_model.call(null, nsv));
com.fulcrologic.fulcro.components.set_state_BANG_.cljs$core$IFn$_invoke$arity$2(this$,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"stringValue","stringValue",1623733802),nsv,new cljs.core.Keyword(null,"oldPropValue","oldPropValue",1507086672),value__$1,new cljs.core.Keyword(null,"cacheValue","cacheValue",-351977007),nv,new cljs.core.Keyword(null,"cacheInvalid?","cacheInvalid?",-1438792109),false], null));

if(cljs.core.truth_((function (){var and__5000__auto__ = onChange;
if(cljs.core.truth_(and__5000__auto__)){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(value__$1,nv);
} else {
return and__5000__auto__;
}
})())){
return (onChange.cljs$core$IFn$_invoke$arity$1 ? onChange.cljs$core$IFn$_invoke$arity$1(nv) : onChange.call(null, nv));
} else {
return null;
}
}),new cljs.core.Keyword(null,"stringValue","stringValue",1623733802),(model__GT_string.cljs$core$IFn$_invoke$arity$1 ? model__GT_string.cljs$core$IFn$_invoke$arity$1(value_53072) : model__GT_string.call(null, value_53072)),new cljs.core.Keyword(null,"cacheInvalid?","cacheInvalid?",-1438792109),true], null);
(this$.state = (function (){var obj53046 = ({"fulcro$state":initial_state_53073});
return obj53046;
})());

return null;
});
com.fulcrologic.fulcro.components.configure_component_BANG_(cls,kw,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"getDerivedStateFromProps","getDerivedStateFromProps",-991834739),(function (latest_props,state){
var map__53047 = latest_props;
var map__53047__$1 = cljs.core.__destructure_map(map__53047);
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53047__$1,new cljs.core.Keyword(null,"value","value",305978217));
var map__53048 = state;
var map__53048__$1 = cljs.core.__destructure_map(map__53048);
var oldPropValue = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53048__$1,new cljs.core.Keyword(null,"oldPropValue","oldPropValue",1507086672));
var cacheValue = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53048__$1,new cljs.core.Keyword(null,"cacheValue","cacheValue",-351977007));
var cacheInvalid_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53048__$1,new cljs.core.Keyword(null,"cacheInvalid?","cacheInvalid?",-1438792109));
var stringValue = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53048__$1,new cljs.core.Keyword(null,"stringValue","stringValue",1623733802));
var ignorePropValue_QMARK_ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(oldPropValue,value)) || (((cljs.core.not(cacheInvalid_QMARK_)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(value,cacheValue)))));
var cacheInvalid_QMARK___$1 = (function (){var or__5002__auto__ = cacheInvalid_QMARK_;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return ignorePropValue_QMARK_;
}
})();
var stringValue__$1 = (function (){var G__53049 = ((ignorePropValue_QMARK_)?stringValue:(model__GT_string.cljs$core$IFn$_invoke$arity$1 ? model__GT_string.cljs$core$IFn$_invoke$arity$1(value) : model__GT_string.call(null, value)));
if(cljs.core.truth_(string_filter)){
return (string_filter.cljs$core$IFn$_invoke$arity$1 ? string_filter.cljs$core$IFn$_invoke$arity$1(G__53049) : string_filter.call(null, G__53049));
} else {
return G__53049;
}
})();
var new_derived_state = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([state,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"stringValue","stringValue",1623733802),stringValue__$1,new cljs.core.Keyword(null,"oldPropValue","oldPropValue",1507086672),value,new cljs.core.Keyword(null,"cacheInvalid?","cacheInvalid?",-1438792109),cacheInvalid_QMARK___$1], null)], 0));
return ({"fulcro$state": new_derived_state});
}),new cljs.core.Keyword(null,"render","render",-1408033454),(function (this$){
var map__53051 = (com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.components.props.cljs$core$IFn$_invoke$arity$1(this$) : com.fulcrologic.fulcro.components.props.call(null, this$));
var map__53051__$1 = cljs.core.__destructure_map(map__53051);
var props = map__53051__$1;
var value = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53051__$1,new cljs.core.Keyword(null,"value","value",305978217));
var onBlur = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53051__$1,new cljs.core.Keyword(null,"onBlur","onBlur",229342509));
var map__53052 = com.fulcrologic.fulcro.components.get_state.cljs$core$IFn$_invoke$arity$1(this$);
var map__53052__$1 = cljs.core.__destructure_map(map__53052);
var stringValue = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53052__$1,new cljs.core.Keyword(null,"stringValue","stringValue",1623733802));
var on_change = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__53052__$1,new cljs.core.Keyword(null,"on-change","on-change",-732046149));
return module$node_modules$react$index.createElement("input",cljs.core.clj__GT_js(cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([props,(function (){var G__53055 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"value","value",305978217),stringValue,new cljs.core.Keyword(null,"onChange","onChange",-312891301),on_change], null);
if(cljs.core.truth_(onBlur)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__53055,new cljs.core.Keyword(null,"onBlur","onBlur",229342509),(function (evt){
var G__53056 = (function (){var G__53058 = com.fulcrologic.fulcro.dom.events.target_value(evt);
return (string__GT_model.cljs$core$IFn$_invoke$arity$1 ? string__GT_model.cljs$core$IFn$_invoke$arity$1(G__53058) : string__GT_model.call(null, G__53058));
})();
return (onBlur.cljs$core$IFn$_invoke$arity$1 ? onBlur.cljs$core$IFn$_invoke$arity$1(G__53056) : onBlur.call(null, G__53056));
}));
} else {
return G__53055;
}
})()], 0))));
})], null));

(com.fulcrologic.fulcro.components.register_component_BANG_.cljs$core$IFn$_invoke$arity$2 ? com.fulcrologic.fulcro.components.register_component_BANG_.cljs$core$IFn$_invoke$arity$2(kw,cls) : com.fulcrologic.fulcro.components.register_component_BANG_.call(null, kw,cls));

return cls;
});
/**
 * Returns `s` with all non-digits stripped.
 */
com.fulcrologic.fulcro.dom.inputs.symbol_chars = (function com$fulcrologic$fulcro$dom$inputs$symbol_chars(s){
return clojure.string.replace(s,/[\s\t:]/,"");
});
/**
 * A keyword input. Used just like a DOM input, but requires you supply nil or a keyword for `:value`, and
 * will send a keyword to `onChange` and `onBlur`. Any other attributes in props are passed directly to the
 * underlying `dom/input`.
 */
com.fulcrologic.fulcro.dom.inputs.ui_keyword_input = com.fulcrologic.fulcro.components.factory.cljs$core$IFn$_invoke$arity$1(com.fulcrologic.fulcro.dom.inputs.StringBufferedInput(new cljs.core.Keyword("com.fulcrologic.fulcro.dom.inputs","KeywordInput","com.fulcrologic.fulcro.dom.inputs/KeywordInput",1544417213),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"model->string","model->string",-2085451701),(function (p1__53059_SHARP_){
return cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var G__53062 = p1__53059_SHARP_;
if((G__53062 == null)){
return null;
} else {
return cljs.core.name(G__53062);
}
})());
}),new cljs.core.Keyword(null,"string-filter","string-filter",781255569),com.fulcrologic.fulcro.dom.inputs.symbol_chars,new cljs.core.Keyword(null,"string->model","string->model",-134531957),(function (p1__53060_SHARP_){
if(cljs.core.seq(p1__53060_SHARP_)){
var G__53065 = p1__53060_SHARP_;
if((G__53065 == null)){
return null;
} else {
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(G__53065);
}
} else {
return null;
}
})], null)));
/**
 * Convert a string `s`
 */
com.fulcrologic.fulcro.dom.inputs.to_int = (function com$fulcrologic$fulcro$dom$inputs$to_int(s){
var n = parseInt(s);
if(cljs.core.truth_(isNaN(n))){
return null;
} else {
return n;
}
});
var digits_53079 = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(cljs.core.str),cljs.core.range.cljs$core$IFn$_invoke$arity$1((10)));
/**
 * Returns `s` with all non-digits stripped.
 */
com.fulcrologic.fulcro.dom.inputs.just_digits = (function com$fulcrologic$fulcro$dom$inputs$just_digits(s){
return clojure.string.join.cljs$core$IFn$_invoke$arity$1(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(digits_53079,cljs.core.seq(s)));
});
/**
 * An integer input. Can be used like `dom/input` but onChange and onBlur handlers will be passed an int instead of
 *   a raw react event, and you should supply an int for `:value` instead of a string.  You may set the `:type` to text
 *   or number depending on how you want the control to display, even though the model value is always an int or nil.
 *   All other attributes passed in props are passed through to the contained `dom/input`.
 */
com.fulcrologic.fulcro.dom.inputs.ui_int_input = com.fulcrologic.fulcro.components.factory.cljs$core$IFn$_invoke$arity$1(com.fulcrologic.fulcro.dom.inputs.StringBufferedInput(new cljs.core.Keyword("com.fulcrologic.fulcro.dom.inputs","IntInput","com.fulcrologic.fulcro.dom.inputs/IntInput",-2005429371),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"model->string","model->string",-2085451701),cljs.core.str,new cljs.core.Keyword(null,"string->model","string->model",-134531957),com.fulcrologic.fulcro.dom.inputs.to_int,new cljs.core.Keyword(null,"string-filter","string-filter",781255569),com.fulcrologic.fulcro.dom.inputs.just_digits], null)));

//# sourceMappingURL=com.fulcrologic.fulcro.dom.inputs.js.map
