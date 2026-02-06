goog.provide('com.fulcrologic.fulcro.raw.components');
goog.scope(function(){
  com.fulcrologic.fulcro.raw.components.goog$module$goog$object = goog.module.get('goog.object');
});
if((typeof com !== 'undefined') && (typeof com.fulcrologic !== 'undefined') && (typeof com.fulcrologic.fulcro !== 'undefined') && (typeof com.fulcrologic.fulcro.raw !== 'undefined') && (typeof com.fulcrologic.fulcro.raw.components !== 'undefined') && (typeof com.fulcrologic.fulcro.raw.components.component_registry !== 'undefined')){
} else {
com.fulcrologic.fulcro.raw.components.component_registry = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
}
/**
 * Returns a map from registry key (keyword) to the fulcro components that have registered. Registration is
 * automatic for many of the component generation facilities (macros) as long as they were assigned a registry
 * name.
 */
com.fulcrologic.fulcro.raw.components.registered_components = (function com$fulcrologic$fulcro$raw$components$registered_components(){
return cljs.core.deref(com.fulcrologic.fulcro.raw.components.component_registry);
});
/**
 * Returns true if `k` is a legal thing to with `registry-key->class`. The registry contains keywords, but that helper
 * function accepts (and converts) strings or symbols as well.
 */
com.fulcrologic.fulcro.raw.components.legal_registry_lookup_key_QMARK_ = (function com$fulcrologic$fulcro$raw$components$legal_registry_lookup_key_QMARK_(k){
return ((cljs.core.qualified_keyword_QMARK_(k)) || (((cljs.core.qualified_symbol_QMARK_(k)) || (((typeof k === 'string') && (clojure.string.includes_QMARK_(k,"/")))))));
});
com.fulcrologic.fulcro.raw.components._STAR_query_state_STAR_ = null;
/**
 * Like get-in, but for js objects, and in CLJC. In clj, it is just get-in. In cljs it is
 *   gobj/getValueByKeys.
 */
com.fulcrologic.fulcro.raw.components.isoget_in = (function com$fulcrologic$fulcro$raw$components$isoget_in(var_args){
var G__47684 = arguments.length;
switch (G__47684) {
case 2:
return com.fulcrologic.fulcro.raw.components.isoget_in.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return com.fulcrologic.fulcro.raw.components.isoget_in.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.raw.components.isoget_in.cljs$core$IFn$_invoke$arity$2 = (function (obj,kvs){
return com.fulcrologic.fulcro.raw.components.isoget_in.cljs$core$IFn$_invoke$arity$3(obj,kvs,null);
}));

(com.fulcrologic.fulcro.raw.components.isoget_in.cljs$core$IFn$_invoke$arity$3 = (function (obj,kvs,default$){
var ks = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (k){
var G__47685 = k;
if((G__47685 == null)){
return null;
} else {
return cljs.core.name(G__47685);
}
}),kvs);
var or__5002__auto__ = cljs.core.apply.cljs$core$IFn$_invoke$arity$3(com.fulcrologic.fulcro.raw.components.goog$module$goog$object.getValueByKeys,obj,ks);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return default$;
}
}));

(com.fulcrologic.fulcro.raw.components.isoget_in.cljs$lang$maxFixedArity = 3);

/**
 * Like get, but for js objects, and in CLJC. In clj, it is just `get`. In cljs it is
 *   `gobj/get`.
 */
com.fulcrologic.fulcro.raw.components.isoget = (function com$fulcrologic$fulcro$raw$components$isoget(var_args){
var G__47688 = arguments.length;
switch (G__47688) {
case 2:
return com.fulcrologic.fulcro.raw.components.isoget.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return com.fulcrologic.fulcro.raw.components.isoget.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.raw.components.isoget.cljs$core$IFn$_invoke$arity$2 = (function (obj,k){
return com.fulcrologic.fulcro.raw.components.isoget.cljs$core$IFn$_invoke$arity$3(obj,k,null);
}));

(com.fulcrologic.fulcro.raw.components.isoget.cljs$core$IFn$_invoke$arity$3 = (function (obj,k,default$){
var or__5002__auto__ = com.fulcrologic.fulcro.raw.components.goog$module$goog$object.get(obj,(function (){var G__47690 = k;
if((G__47690 == null)){
return null;
} else {
return cljs.core.name(G__47690);
}
})());
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return default$;
}
}));

(com.fulcrologic.fulcro.raw.components.isoget.cljs$lang$maxFixedArity = 3);

/**
 * Add a component to Fulcro's component registry.  This is used by defsc to ensure that all Fulcro classes
 *   that have been compiled (transitively required) will be accessible for lookup by fully-qualified symbol/keyword.
 *   Not meant for public use, unless you're creating your own component macro that doesn't directly leverage defsc.
 */
com.fulcrologic.fulcro.raw.components.register_component_BANG_ = (function com$fulcrologic$fulcro$raw$components$register_component_BANG_(k,component_class){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(com.fulcrologic.fulcro.raw.components.component_registry,cljs.core.assoc,k,component_class);

return component_class;
});
/**
 * Returns whichever of the given Fulcro props were most recently generated according to `denormalization-time`. This
 *   is part of props 'tunnelling', an optimization to get updated props to instances without going through the root.
 */
com.fulcrologic.fulcro.raw.components.newer_props = (function com$fulcrologic$fulcro$raw$components$newer_props(props_a,props_b){
if((props_a == null)){
return props_b;
} else {
if((props_b == null)){
return props_a;
} else {
if(((function (){var or__5002__auto__ = com.fulcrologic.fulcro.algorithms.denormalize.denormalization_time(props_a);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return (2);
}
})() > (function (){var or__5002__auto__ = com.fulcrologic.fulcro.algorithms.denormalize.denormalization_time(props_b);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return (1);
}
})())){
return props_a;
} else {
return props_b;

}
}
}
});
/**
 * Returns true if the argument is a component. A component is defined as a *mounted component*.
 * This function returns false for component classes, and also returns false for the output of a Fulcro component factory.
 */
com.fulcrologic.fulcro.raw.components.component_instance_QMARK_ = (function com$fulcrologic$fulcro$raw$components$component_instance_QMARK_(x){
if((!((x == null)))){
return com.fulcrologic.fulcro.raw.components.goog$module$goog$object.get(x,"fulcro$isComponent") === true;
} else {
return false;
}
});
/**
 * Attempt to coerce `x` to an app.  Legal inputs are a fulcro application, a mounted component,
 *   or an atom holding any of the above.
 */
com.fulcrologic.fulcro.raw.components.any__GT_app = (function com$fulcrologic$fulcro$raw$components$any__GT_app(x){
var fulcro_app_QMARK_ = (function com$fulcrologic$fulcro$raw$components$any__GT_app_$_fulcro_app_QMARK_(x__$1){
return ((cljs.core.map_QMARK_(x__$1)) && (cljs.core.contains_QMARK_(x__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.application","state-atom","com.fulcrologic.fulcro.application/state-atom",648128366))));
});
if(com.fulcrologic.fulcro.raw.components.component_instance_QMARK_(x)){
return com.fulcrologic.fulcro.raw.components.isoget_in.cljs$core$IFn$_invoke$arity$2(x,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"props","props",453281727),new cljs.core.Keyword(null,"fulcro$app","fulcro$app",-1270465306)], null));
} else {
if(cljs.core.truth_(fulcro_app_QMARK_(x))){
return x;
} else {
if((((!((x == null))))?(((((x.cljs$lang$protocol_mask$partition0$ & (32768))) || ((cljs.core.PROTOCOL_SENTINEL === x.cljs$core$IDeref$))))?true:(((!x.cljs$lang$protocol_mask$partition0$))?cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,x):false)):cljs.core.native_satisfies_QMARK_(cljs.core.IDeref,x))){
var G__47694 = cljs.core.deref(x);
return (com.fulcrologic.fulcro.raw.components.any__GT_app.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.raw.components.any__GT_app.cljs$core$IFn$_invoke$arity$1(G__47694) : com.fulcrologic.fulcro.raw.components.any__GT_app.call(null, G__47694));
} else {
return null;
}
}
}
});
/**
 * Return the global shared properties of the root. See :shared and
 * :shared-fn app options. NOTE: Shared props only update on root render and by explicit calls to
 * `app/update-shared!`.
 * 
 * This version does not rely on the dynamic var *shared*, which is only available from the react-based components ns.
 */
com.fulcrologic.fulcro.raw.components.shared = (function com$fulcrologic$fulcro$raw$components$shared(var_args){
var G__47696 = arguments.length;
switch (G__47696) {
case 1:
return com.fulcrologic.fulcro.raw.components.shared.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return com.fulcrologic.fulcro.raw.components.shared.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.raw.components.shared.cljs$core$IFn$_invoke$arity$1 = (function (comp_or_app){
return com.fulcrologic.fulcro.raw.components.shared.cljs$core$IFn$_invoke$arity$2(comp_or_app,cljs.core.PersistentVector.EMPTY);
}));

(com.fulcrologic.fulcro.raw.components.shared.cljs$core$IFn$_invoke$arity$2 = (function (comp_or_app,k_or_ks){
var shared = (function (){var G__47697 = com.fulcrologic.fulcro.raw.components.any__GT_app(comp_or_app);
var G__47697__$1 = (((G__47697 == null))?null:new cljs.core.Keyword("com.fulcrologic.fulcro.application","runtime-atom","com.fulcrologic.fulcro.application/runtime-atom",-1167397772).cljs$core$IFn$_invoke$arity$1(G__47697));
var G__47697__$2 = (((G__47697__$1 == null))?null:cljs.core.deref(G__47697__$1));
if((G__47697__$2 == null)){
return null;
} else {
return new cljs.core.Keyword("com.fulcrologic.fulcro.application","shared-props","com.fulcrologic.fulcro.application/shared-props",-554105157).cljs$core$IFn$_invoke$arity$1(G__47697__$2);
}
})();
var ks = (function (){var G__47698 = k_or_ks;
if((!(cljs.core.sequential_QMARK_(k_or_ks)))){
return (new cljs.core.PersistentVector(null,1,(5),cljs.core.PersistentVector.EMPTY_NODE,[G__47698],null));
} else {
return G__47698;
}
})();
var G__47699 = shared;
if((!(cljs.core.empty_QMARK_(ks)))){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(G__47699,ks);
} else {
return G__47699;
}
}));

(com.fulcrologic.fulcro.raw.components.shared.cljs$lang$maxFixedArity = 2);

/**
 * Returns true if the argument is a component instance.
 * 
 * DEPRECATED for terminology clarity. Use `component-instance?` instead.
 */
com.fulcrologic.fulcro.raw.components.component_QMARK_ = com.fulcrologic.fulcro.raw.components.component_instance_QMARK_;
/**
 * Returns true if the argument is a component class.
 */
com.fulcrologic.fulcro.raw.components.component_class_QMARK_ = (function com$fulcrologic$fulcro$raw$components$component_class_QMARK_(x){
return cljs.core.boolean$((function (){try{return com.fulcrologic.fulcro.raw.components.goog$module$goog$object.containsKey(x,"fulcro$class");
}catch (e47700){var _ = e47700;
return null;
}})());
});
/**
 * Returns a string version of the given react component's name. Works on component instances and classes.
 */
com.fulcrologic.fulcro.raw.components.component_name = (function com$fulcrologic$fulcro$raw$components$component_name(class$){
return com.fulcrologic.fulcro.raw.components.isoget.cljs$core$IFn$_invoke$arity$2(class$,new cljs.core.Keyword(null,"displayName","displayName",-809144601));
});
/**
 * Returns the registry key for the given component class.
 */
com.fulcrologic.fulcro.raw.components.class__GT_registry_key = (function com$fulcrologic$fulcro$raw$components$class__GT_registry_key(class$){
return com.fulcrologic.fulcro.raw.components.isoget.cljs$core$IFn$_invoke$arity$2(class$,new cljs.core.Keyword(null,"fulcro$registryKey","fulcro$registryKey",-155509270));
});
/**
 * Look up the given component in Fulcro's global component registry. Will only be able to find components that have
 *   been (transitively) required by your application.
 * 
 *   `classname` can be a fully-qualified keyword, string, symbol, or component class. In the latter
 *   case this function just acts as `identity`. This allows this function to act as a coercion
 *   that ensures you have a class.
 */
com.fulcrologic.fulcro.raw.components.registry_key__GT_class = (function com$fulcrologic$fulcro$raw$components$registry_key__GT_class(classname){
if(com.fulcrologic.fulcro.raw.components.component_class_QMARK_(classname)){
return classname;
} else {
if((classname instanceof cljs.core.Keyword)){
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(com.fulcrologic.fulcro.raw.components.component_registry),classname);
} else {
if((classname instanceof cljs.core.Symbol)){
var k = cljs.core.keyword.cljs$core$IFn$_invoke$arity$2(cljs.core.namespace(classname),cljs.core.name(classname));
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(com.fulcrologic.fulcro.raw.components.component_registry),k);
} else {
if(((typeof classname === 'string') && (clojure.string.includes_QMARK_(classname,"/")))){
var vec__47713 = clojure.string.split.cljs$core$IFn$_invoke$arity$2(classname,/\//);
var nspc = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47713,(0),null);
var nm = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47713,(1),null);
var k = cljs.core.keyword.cljs$core$IFn$_invoke$arity$2(nspc,nm);
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(com.fulcrologic.fulcro.raw.components.component_registry),k);
} else {
return null;

}
}
}
}
});
/**
 * Add computed properties to props. This will *replace* any pre-existing computed properties. Computed props are
 *   necessary when a parent component wishes to pass callbacks or other data to children that *have a query*. This
 *   is not necessary for "stateless" components, though it will work properly for both.
 * 
 *   Computed props are "remembered" so that a targeted update (which can only happen on a component with a query
 *   and ident) can use new props from the database without "losing" the computed props that were originally passed
 *   from the parent. If you pass things like callbacks through normal props, then targeted updates will seem to "lose
 *   track of" them.
 *   
 */
com.fulcrologic.fulcro.raw.components.computed = (function com$fulcrologic$fulcro$raw$components$computed(props,computed_map){
if((props == null)){
return null;
} else {
if(cljs.core.vector_QMARK_(props)){
var G__47718 = props;
if((!(cljs.core.empty_QMARK_(computed_map)))){
return cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$4(G__47718,cljs.core.assoc,new cljs.core.Keyword("fulcro.client.primitives","computed","fulcro.client.primitives/computed",201987962),computed_map);
} else {
return G__47718;
}
} else {
var G__47719 = props;
if((!(cljs.core.empty_QMARK_(computed_map)))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__47719,new cljs.core.Keyword("fulcro.client.primitives","computed","fulcro.client.primitives/computed",201987962),computed_map);
} else {
return G__47719;
}
}
}
});
/**
 * Return the computed properties on a component or its props. Note that it requires that the normal properties are not nil.
 */
com.fulcrologic.fulcro.raw.components.get_computed = (function com$fulcrologic$fulcro$raw$components$get_computed(var_args){
var G__47722 = arguments.length;
switch (G__47722) {
case 1:
return com.fulcrologic.fulcro.raw.components.get_computed.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return com.fulcrologic.fulcro.raw.components.get_computed.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.raw.components.get_computed.cljs$core$IFn$_invoke$arity$1 = (function (x){
return com.fulcrologic.fulcro.raw.components.get_computed.cljs$core$IFn$_invoke$arity$2(x,cljs.core.PersistentVector.EMPTY);
}));

(com.fulcrologic.fulcro.raw.components.get_computed.cljs$core$IFn$_invoke$arity$2 = (function (x,k_or_ks){
if((x == null)){
return null;
} else {
var props = (function (){var G__47724 = x;
if(com.fulcrologic.fulcro.raw.components.component_instance_QMARK_(x)){
return (com.fulcrologic.fulcro.raw.components.props.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.fulcro.raw.components.props.cljs$core$IFn$_invoke$arity$1(G__47724) : com.fulcrologic.fulcro.raw.components.props.call(null, G__47724));
} else {
return G__47724;
}
})();
var ks = cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("fulcro.client.primitives","computed","fulcro.client.primitives/computed",201987962)], null),(function (){var G__47725 = k_or_ks;
if((!(cljs.core.sequential_QMARK_(k_or_ks)))){
return (new cljs.core.PersistentVector(null,1,(5),cljs.core.PersistentVector.EMPTY_NODE,[G__47725],null));
} else {
return G__47725;
}
})());
if(cljs.core.vector_QMARK_(props)){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.meta(props),ks);
} else {
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(props,ks);
}
}
}));

(com.fulcrologic.fulcro.raw.components.get_computed.cljs$lang$maxFixedArity = 2);

/**
 * Return a component's props.
 */
com.fulcrologic.fulcro.raw.components.props = (function com$fulcrologic$fulcro$raw$components$props(component){
var props_from_parent = com.fulcrologic.fulcro.raw.components.isoget_in.cljs$core$IFn$_invoke$arity$2(component,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"props","props",453281727),new cljs.core.Keyword(null,"fulcro$value","fulcro$value",818270554)], null));
var computed_from_parent = com.fulcrologic.fulcro.raw.components.get_computed.cljs$core$IFn$_invoke$arity$1(props_from_parent);
var props_from_updates = com.fulcrologic.fulcro.raw.components.computed(com.fulcrologic.fulcro.raw.components.isoget_in.cljs$core$IFn$_invoke$arity$2(component,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"state","state",-1988618099),new cljs.core.Keyword(null,"fulcro$value","fulcro$value",818270554)], null)),computed_from_parent);
return com.fulcrologic.fulcro.raw.components.newer_props(props_from_parent,props_from_updates);
});
/**
 * Get the sequence of react children of the given component.
 */
com.fulcrologic.fulcro.raw.components.children = (function com$fulcrologic$fulcro$raw$components$children(component){
var cs = com.fulcrologic.fulcro.raw.components.goog$module$goog$object.getValueByKeys(component,"props","children");
if(((cljs.core.coll_QMARK_(cs)) || (cljs.core.array_QMARK_(cs)))){
return cs;
} else {
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cs], null);
}
});
/**
 * Returns the component type, regardless of whether the component has been
 * mounted
 */
com.fulcrologic.fulcro.raw.components.component_type = (function com$fulcrologic$fulcro$raw$components$component_type(x){
var or__5002__auto__ = com.fulcrologic.fulcro.raw.components.goog$module$goog$object.get(x,"type");
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.type(x);
}
});
/**
 * Returns the react type (component class) of the given React element (instance). Is identity if used on a class.
 */
com.fulcrologic.fulcro.raw.components.get_class = (function com$fulcrologic$fulcro$raw$components$get_class(instance){
return com.fulcrologic.fulcro.raw.components.component_type(instance);
});
/**
 * Returns the map of options that was specified (via `defsc`) for the component class.
 */
com.fulcrologic.fulcro.raw.components.component_options = (function com$fulcrologic$fulcro$raw$components$component_options(var_args){
var args__5732__auto__ = [];
var len__5726__auto___48209 = arguments.length;
var i__5727__auto___48210 = (0);
while(true){
if((i__5727__auto___48210 < len__5726__auto___48209)){
args__5732__auto__.push((arguments[i__5727__auto___48210]));

var G__48211 = (i__5727__auto___48210 + (1));
i__5727__auto___48210 = G__48211;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((1) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((1)),(0),null)):null);
return com.fulcrologic.fulcro.raw.components.component_options.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5733__auto__);
});

(com.fulcrologic.fulcro.raw.components.component_options.cljs$core$IFn$_invoke$arity$variadic = (function (instance_or_class,ks){
var c = com.fulcrologic.fulcro.raw.components.component_type(instance_or_class);
var options = (function (){var or__5002__auto__ = com.fulcrologic.fulcro.raw.components.isoget.cljs$core$IFn$_invoke$arity$2(instance_or_class,new cljs.core.Keyword(null,"fulcro$options","fulcro$options",-1332196811));
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return com.fulcrologic.fulcro.raw.components.isoget.cljs$core$IFn$_invoke$arity$2(c,new cljs.core.Keyword(null,"fulcro$options","fulcro$options",-1332196811));
}
})();
if(cljs.core.seq(options)){
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(options,cljs.core.vec(ks));
} else {
return options;
}
}));

(com.fulcrologic.fulcro.raw.components.component_options.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(com.fulcrologic.fulcro.raw.components.component_options.cljs$lang$applyTo = (function (seq47730){
var G__47731 = cljs.core.first(seq47730);
var seq47730__$1 = cljs.core.next(seq47730);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__47731,seq47730__$1);
}));

com.fulcrologic.fulcro.raw.components.has_feature_QMARK_ = (function com$fulcrologic$fulcro$raw$components$has_feature_QMARK_(component,option_key){
return cljs.core.contains_QMARK_(com.fulcrologic.fulcro.raw.components.component_options(component),option_key);
});
com.fulcrologic.fulcro.raw.components.has_initial_app_state_QMARK_ = (function com$fulcrologic$fulcro$raw$components$has_initial_app_state_QMARK_(component){
return com.fulcrologic.fulcro.raw.components.has_feature_QMARK_(component,new cljs.core.Keyword(null,"initial-state","initial-state",-2021616806));
});
com.fulcrologic.fulcro.raw.components.has_ident_QMARK_ = (function com$fulcrologic$fulcro$raw$components$has_ident_QMARK_(component){
return com.fulcrologic.fulcro.raw.components.has_feature_QMARK_(component,new cljs.core.Keyword(null,"ident","ident",-742346));
});
com.fulcrologic.fulcro.raw.components.has_query_QMARK_ = (function com$fulcrologic$fulcro$raw$components$has_query_QMARK_(component){
return com.fulcrologic.fulcro.raw.components.has_feature_QMARK_(component,new cljs.core.Keyword(null,"query","query",-1288509510));
});
com.fulcrologic.fulcro.raw.components.has_pre_merge_QMARK_ = (function com$fulcrologic$fulcro$raw$components$has_pre_merge_QMARK_(component){
return com.fulcrologic.fulcro.raw.components.has_feature_QMARK_(component,new cljs.core.Keyword(null,"pre-merge","pre-merge",-567117148));
});
com.fulcrologic.fulcro.raw.components.ident = (function com$fulcrologic$fulcro$raw$components$ident(this$,props){
if(com.fulcrologic.fulcro.raw.components.has_feature_QMARK_(this$,new cljs.core.Keyword(null,"ident","ident",-742346))){
var fexpr__47733 = com.fulcrologic.fulcro.raw.components.component_options.cljs$core$IFn$_invoke$arity$variadic(this$,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"ident","ident",-742346)], 0));
return (fexpr__47733.cljs$core$IFn$_invoke$arity$2 ? fexpr__47733.cljs$core$IFn$_invoke$arity$2(this$,props) : fexpr__47733.call(null, this$,props));
} else {
return null;
}
});
com.fulcrologic.fulcro.raw.components.query = (function com$fulcrologic$fulcro$raw$components$query(this$){
if(com.fulcrologic.fulcro.raw.components.has_feature_QMARK_(this$,new cljs.core.Keyword(null,"query","query",-1288509510))){
var fexpr__47738 = com.fulcrologic.fulcro.raw.components.component_options.cljs$core$IFn$_invoke$arity$variadic(this$,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"query","query",-1288509510)], 0));
return (fexpr__47738.cljs$core$IFn$_invoke$arity$1 ? fexpr__47738.cljs$core$IFn$_invoke$arity$1(this$) : fexpr__47738.call(null, this$));
} else {
return null;
}
});
com.fulcrologic.fulcro.raw.components.initial_state = (function com$fulcrologic$fulcro$raw$components$initial_state(clz,params){
if(com.fulcrologic.fulcro.raw.components.has_feature_QMARK_(clz,new cljs.core.Keyword(null,"initial-state","initial-state",-2021616806))){
var fexpr__47739 = com.fulcrologic.fulcro.raw.components.component_options.cljs$core$IFn$_invoke$arity$variadic(clz,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"initial-state","initial-state",-2021616806)], 0));
return (fexpr__47739.cljs$core$IFn$_invoke$arity$1 ? fexpr__47739.cljs$core$IFn$_invoke$arity$1(params) : fexpr__47739.call(null, params));
} else {
return null;
}
});
com.fulcrologic.fulcro.raw.components.pre_merge = (function com$fulcrologic$fulcro$raw$components$pre_merge(this$,data){
if(com.fulcrologic.fulcro.raw.components.has_feature_QMARK_(this$,new cljs.core.Keyword(null,"pre-merge","pre-merge",-567117148))){
var fexpr__47743 = com.fulcrologic.fulcro.raw.components.component_options.cljs$core$IFn$_invoke$arity$variadic(this$,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"pre-merge","pre-merge",-567117148)], 0));
return (fexpr__47743.cljs$core$IFn$_invoke$arity$1 ? fexpr__47743.cljs$core$IFn$_invoke$arity$1(data) : fexpr__47743.call(null, data));
} else {
return null;
}
});
/**
 * Make a given `render-fn` (a plain fn) act like a a Fulcro component with the given component options map. Registers the
 *   new component in the component-registry. Component options MUST contain :componentName as be a fully-qualified
 *   keyword to name the component in the registry.
 * 
 *   component-options *must* include a unique `:componentName` (keyword) that will be used for registering the given
 *   function as the faux class in the component registry.
 * 
 *   IMPORTANT: In CLJS this function adds extra things to the mutable js fn. In CLJ, components are just maps, and this
 *   side-effect cannot modify it. As such it returns the configured component so you can use it in CLJ.
 */
com.fulcrologic.fulcro.raw.components.configure_anonymous_component_BANG_ = (function com$fulcrologic$fulcro$raw$components$configure_anonymous_component_BANG_(render_fn,component_options){
var k = new cljs.core.Keyword(null,"componentName","componentName",-2103437555).cljs$core$IFn$_invoke$arity$1(component_options);
var faux_classname = (cljs.core.truth_(k)?clojure.string.join.cljs$core$IFn$_invoke$arity$2("/",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.namespace(k),cljs.core.name(k)], null)):"anonymous");
var result = com.fulcrologic.fulcro.raw.components.goog$module$goog$object.extend(render_fn,({"fulcro$options": component_options, "displayName": faux_classname, "fulcro$class": render_fn, "type": render_fn, "cljs$lang$type": true, "cljs$lang$ctorStr": faux_classname, "cljs$lang$ctorPrWriter": (function (_,writer,___$1){
return cljs.core._write(writer,faux_classname);
}), "fulcro$registryKey": new cljs.core.Keyword(null,"componentName","componentName",-2103437555).cljs$core$IFn$_invoke$arity$1(component_options)}));
if(cljs.core.truth_(k)){
com.fulcrologic.fulcro.raw.components.register_component_BANG_(k,render_fn);
} else {
}

return render_fn;
});
/**
 * Get the declared :initial-state value for a component.
 */
com.fulcrologic.fulcro.raw.components.get_initial_state = (function com$fulcrologic$fulcro$raw$components$get_initial_state(var_args){
var G__47748 = arguments.length;
switch (G__47748) {
case 1:
return com.fulcrologic.fulcro.raw.components.get_initial_state.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return com.fulcrologic.fulcro.raw.components.get_initial_state.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.raw.components.get_initial_state.cljs$core$IFn$_invoke$arity$1 = (function (class$){
var G__47751 = com.fulcrologic.fulcro.raw.components.initial_state(class$,cljs.core.PersistentArrayMap.EMPTY);
if((G__47751 == null)){
return null;
} else {
return cljs.core.with_meta(G__47751,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"computed","computed",-1482016762),true], null));
}
}));

(com.fulcrologic.fulcro.raw.components.get_initial_state.cljs$core$IFn$_invoke$arity$2 = (function (class$,params){
var G__47752 = com.fulcrologic.fulcro.raw.components.initial_state(class$,params);
if((G__47752 == null)){
return null;
} else {
return cljs.core.with_meta(G__47752,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"computed","computed",-1482016762),true], null));
}
}));

(com.fulcrologic.fulcro.raw.components.get_initial_state.cljs$lang$maxFixedArity = 2);

/**
 * Get the ident for a mounted component OR using a component class.
 * 
 *   That arity-2 will return the ident using the supplied props map.
 * 
 *   The single-arity version should only be used with a mounted component (e.g. `this` from `render`), and will derive the
 *   props that were sent to it most recently.
 */
com.fulcrologic.fulcro.raw.components.get_ident = (function com$fulcrologic$fulcro$raw$components$get_ident(var_args){
var G__47754 = arguments.length;
switch (G__47754) {
case 1:
return com.fulcrologic.fulcro.raw.components.get_ident.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return com.fulcrologic.fulcro.raw.components.get_ident.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.raw.components.get_ident.cljs$core$IFn$_invoke$arity$1 = (function (x){
if(com.fulcrologic.fulcro.raw.components.component_instance_QMARK_(x)){
} else {
throw (new Error("Assert failed: (component-instance? x)"));
}

var temp__5823__auto__ = com.fulcrologic.fulcro.raw.components.props(x);
if(cljs.core.truth_(temp__5823__auto__)){
var m = temp__5823__auto__;
return com.fulcrologic.fulcro.raw.components.ident(x,m);
} else {
if(cljs.core.truth_(goog.DEBUG)){
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"com.fulcrologic.fulcro.raw.components","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/raw/components.cljc",286,8,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, ["get-ident was invoked on ",com.fulcrologic.fulcro.raw.components.component_name(x)," with nil props (this could mean it wasn't yet mounted): ",x,"See https://book.fulcrologic.com/#warn-get-ident-with-nil-props"], null);
}),null)),null,(37),null,null,null);
} else {
return null;
}
}
}));

(com.fulcrologic.fulcro.raw.components.get_ident.cljs$core$IFn$_invoke$arity$2 = (function (class$,props){
if(cljs.core.truth_((function (){var and__5000__auto__ = goog.DEBUG;
if(cljs.core.truth_(and__5000__auto__)){
return (!(com.fulcrologic.fulcro.raw.components.has_ident_QMARK_(class$)));
} else {
return and__5000__auto__;
}
})())){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"com.fulcrologic.fulcro.raw.components","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/raw/components.cljc",289,6,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["get-ident called with something that does not implement ident: ",class$,"See https://book.fulcrologic.com/#warn-get-ident-invalid-class"], null);
}),null)),null,(38),null,null,null);
} else {
}

var temp__5823__auto__ = com.fulcrologic.fulcro.raw.components.ident(class$,props);
if(cljs.core.truth_(temp__5823__auto__)){
var id = temp__5823__auto__;
if(cljs.core.truth_((function (){var and__5000__auto__ = goog.DEBUG;
if(cljs.core.truth_(and__5000__auto__)){
return (!(edn_query_language.core.ident_QMARK_(id)));
} else {
return and__5000__auto__;
}
})())){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"com.fulcrologic.fulcro.raw.components","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/raw/components.cljc",293,10,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [com.fulcrologic.fulcro.raw.components.component_name(class$),"get-ident returned invalid ident:",id,"See https://book.fulcrologic.com/#warn-get-ident-invalid-ident"], null);
}),null)),null,(39),null,null,null);
} else {
}

if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("com.fulcrologic.fulcro.algorithms.merge","not-found","com.fulcrologic.fulcro.algorithms.merge/not-found",190673437),cljs.core.second(id))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.first(id),null], null);
} else {
return id;
}
} else {
return null;
}
}));

(com.fulcrologic.fulcro.raw.components.get_ident.cljs$lang$maxFixedArity = 2);

/**
 * Returns true if the given argument is a component factory.
 */
com.fulcrologic.fulcro.raw.components.is_factory_QMARK_ = (function com$fulcrologic$fulcro$raw$components$is_factory_QMARK_(class_or_factory){
return ((cljs.core.fn_QMARK_(class_or_factory)) && (cljs.core.contains_QMARK_(cljs.core.meta(class_or_factory),new cljs.core.Keyword(null,"qualifier","qualifier",125841738))));
});
/**
 * Returns a string ID for the query of the given class with qualifier.
 */
com.fulcrologic.fulcro.raw.components.query_id = (function com$fulcrologic$fulcro$raw$components$query_id(class$,qualifier){
if((class$ == null)){
if(cljs.core.truth_(goog.DEBUG)){
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.raw.components","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/raw/components.cljc",308,7,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Query ID received no class (if you see this warning, it probably means metadata was lost on your query) See https://book.fulcrologic.com/#err-comp-query-id-no-class",cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("",cljs.core.PersistentArrayMap.EMPTY)], null);
}),null)),null,(40),null,null,null);
} else {
return null;
}
} else {
var temp__5825__auto__ = com.fulcrologic.fulcro.raw.components.component_name(class$);
if(cljs.core.truth_(temp__5825__auto__)){
var classname = temp__5825__auto__;
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(classname),(cljs.core.truth_(qualifier)?["$",cljs.core.str.cljs$core$IFn$_invoke$arity$1(qualifier)].join(''):null)].join('');
} else {
return null;
}
}
});
/**
 * Takes a state map that may contain normalized queries and a query ID. Returns the stored query or nil.
 */
com.fulcrologic.fulcro.raw.components.denormalize_query = (function com$fulcrologic$fulcro$raw$components$denormalize_query(state_map,ID){
var get_stored_query = (function (id){
var map__47771 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state_map,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.components","queries","com.fulcrologic.fulcro.components/queries",-1435852452),id], null));
var map__47771__$1 = cljs.core.__destructure_map(map__47771);
var query = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47771__$1,new cljs.core.Keyword(null,"query","query",-1288509510));
var component_key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47771__$1,new cljs.core.Keyword(null,"component-key","component-key",1189239034));
var component = com.fulcrologic.fulcro.raw.components.registry_key__GT_class(component_key);
if(cljs.core.truth_(component)){
} else {
cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state_map,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.components","queries","com.fulcrologic.fulcro.components/queries",-1435852452),id], null));
}

var G__47772 = query;
if((G__47772 == null)){
return null;
} else {
return cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$6(G__47772,cljs.core.assoc,new cljs.core.Keyword(null,"component","component",1555936782),component,new cljs.core.Keyword(null,"queryid","queryid",-271432056),id);
}
});
var temp__5825__auto__ = get_stored_query(ID);
if(cljs.core.truth_(temp__5825__auto__)){
var normalized_query = temp__5825__auto__;
return clojure.walk.prewalk((function (ele){
var temp__5823__auto__ = (function (){var and__5000__auto__ = typeof ele === 'string';
if(and__5000__auto__){
return get_stored_query(ele);
} else {
return and__5000__auto__;
}
})();
if(cljs.core.truth_(temp__5823__auto__)){
var q = temp__5823__auto__;
return q;
} else {
return ele;
}
}),normalized_query);
} else {
return null;
}
});
/**
 * Get the query id that is cached in the component's props.
 */
com.fulcrologic.fulcro.raw.components.get_query_id = (function com$fulcrologic$fulcro$raw$components$get_query_id(component){
return com.fulcrologic.fulcro.raw.components.isoget_in.cljs$core$IFn$_invoke$arity$2(component,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"props","props",453281727),"fulcro$queryid"], null));
});
com.fulcrologic.fulcro.raw.components.get_query_by_id = (function com$fulcrologic$fulcro$raw$components$get_query_by_id(state_map,class$,queryid){
var query = (function (){var or__5002__auto__ = com.fulcrologic.fulcro.raw.components.denormalize_query(state_map,queryid);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return com.fulcrologic.fulcro.raw.components.query(class$);
}
})();
return cljs.core.with_meta(query,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"component","component",1555936782),class$,new cljs.core.Keyword(null,"queryid","queryid",-271432056),queryid], null));
});
/**
 * Get the query for the given class or factory. If called without a state map, then you'll get the declared static
 *   query of the class. If a state map is supplied, then the dynamically set queries in that state will result in
 *   the current dynamically-set query according to that state.
 */
com.fulcrologic.fulcro.raw.components.get_query = (function com$fulcrologic$fulcro$raw$components$get_query(var_args){
var G__47776 = arguments.length;
switch (G__47776) {
case 1:
return com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$1 = (function (class_or_factory){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("anonymous",com.fulcrologic.fulcro.raw.components.component_name(class_or_factory))){
return com.fulcrologic.fulcro.raw.components.query(class_or_factory);
} else {
return com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$2(class_or_factory,com.fulcrologic.fulcro.raw.components._STAR_query_state_STAR_);
}
}));

(com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$2 = (function (class_or_factory,state_map){
if((class_or_factory == null)){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("nil passed to get-query",cljs.core.PersistentArrayMap.EMPTY);
} else {
}

var _STAR_query_state_STAR__orig_val__47777 = com.fulcrologic.fulcro.raw.components._STAR_query_state_STAR_;
var _STAR_query_state_STAR__temp_val__47778 = state_map;
(com.fulcrologic.fulcro.raw.components._STAR_query_state_STAR_ = _STAR_query_state_STAR__temp_val__47778);

try{var class$ = ((com.fulcrologic.fulcro.raw.components.is_factory_QMARK_(class_or_factory))?new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(class_or_factory)):((com.fulcrologic.fulcro.raw.components.component_instance_QMARK_(class_or_factory))?com.fulcrologic.fulcro.raw.components.component_type(class_or_factory):class_or_factory
));
var class$__$1 = (cljs.core.truth_(goog.DEBUG)?(function (){var or__5002__auto__ = com.fulcrologic.fulcro.raw.components.registry_key__GT_class(com.fulcrologic.fulcro.raw.components.class__GT_registry_key(class$));
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return class$;
}
})():class$);
var qualifier = ((com.fulcrologic.fulcro.raw.components.is_factory_QMARK_(class_or_factory))?new cljs.core.Keyword(null,"qualifier","qualifier",125841738).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(class_or_factory)):null);
var queryid = ((com.fulcrologic.fulcro.raw.components.component_instance_QMARK_(class_or_factory))?com.fulcrologic.fulcro.raw.components.get_query_id(class_or_factory):com.fulcrologic.fulcro.raw.components.query_id(class$__$1,qualifier));
if(cljs.core.truth_((function (){var and__5000__auto__ = class$__$1;
if(cljs.core.truth_(and__5000__auto__)){
return com.fulcrologic.fulcro.raw.components.has_query_QMARK_(class$__$1);
} else {
return and__5000__auto__;
}
})())){
return com.fulcrologic.fulcro.raw.components.get_query_by_id(state_map,class$__$1,queryid);
} else {
return null;
}
}finally {(com.fulcrologic.fulcro.raw.components._STAR_query_state_STAR_ = _STAR_query_state_STAR__orig_val__47777);
}}));

(com.fulcrologic.fulcro.raw.components.get_query.cljs$lang$maxFixedArity = 2);

/**
 * Dynamic var that affects the activation of transactions run via `transact!`. Defaults to false. When set to true
 * this option prevents a transaction from running until after the next render is complete. This typically should not be set
 * to true in scenarios where you are unsure if a render will occur, since that could make the transaction appear to
 * "hang".
 */
com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ = false;
/**
 * Submit a transaction for processing.
 * 
 *   The underlying transaction system is pluggable, but the *default* supported options are:
 * 
 *   - `:optimistic?` - boolean. Should the transaction be processed optimistically?
 *   - `:ref` - ident. The ident of the component used to submit this transaction. This is set automatically if you use a component to call this function.
 *   - `:component` - React element. Set automatically if you call this function using a component.
 *   - `:refresh` - Vector containing idents (of components) and keywords (of props). Things that have changed and should be re-rendered
 *  on screen. Only necessary when the underlying rendering algorithm won't auto-detect, such as when UI is derived from the
 *  state of other components or outside of the directly queried props. Interpretation depends on the renderer selected:
 *  The ident-optimized render treats these as "extras".
 *   - `:only-refresh` - Vector of idents/keywords.  If the underlying rendering configured algorithm supports it: The
 *  components using these are the *only* things that will be refreshed in the UI.
 *  This can be used to avoid the overhead of looking for stale data when you know exactly what
 *  you want to refresh on screen as an extra optimization. Idents are *not* checked against queries.
 *   - `:abort-id` - An ID (you make up) that makes it possible (if the plugins you're using support it) to cancel
 *  the network portion of the transaction (assuming it has not already completed).
 *   - `:compressible?` - boolean. Check compressible-transact! docs.
 *   - `:synchronous?` - boolean. When turned on the transaction will run immediately on the calling thread. If run against
 *   a component then the props will be immediately tunneled back to the calling component, allowing for React (raw) input
 *   event handlers to behave as described in standard React Forms docs (uses setState behind the scenes). Any remote operations
 *   will still be queued as normal. Calling `transact!!` is a shorthand for this option. WARNING: ONLY the given component will
 *   be refreshed in the UI. If you have dependent data elsewhere in the UI you must either use `transact!` or schedule
 *   your own global render using `app/schedule-render!`.
 *   - `:after-render?` - Wait until the next render completes before allowing this transaction to run. This can be used
 *   when calling `transact!` from *within* another mutation to ensure that the effects of the current mutation finish
 *   before this transaction takes control of the CPU. This option defaults to `false`, but `defmutation` causes it to
 *   be set to true for any transactions run within mutation action sections. You can affect the default for this value
 *   in a dynamic scope by binding `*after-render*` to true
 *   - `:parallel?` - Boolean. If true, the mutation(s) in the transaction will NOT go into a network queue, nor
 *  will it block later mutations or queries.
 * 
 *   You may add any additional keys to the option map (namespaced is ideal), and any value is legal in the options
 *   map, including functions. The options will appear in the `env` of all mutations run in the transaction as
 *   `:com.fulcrologic.fulcro.algorithms.tx-processing/options`. This is the preferred way of passing things like
 *   lambdas (if you wanted something like a callback) to mutations. Note that mutation symbols are perfectly legal
 *   as mutation *arguments*, so chaining mutations can already be done via the normal transaction mechanism, and
 *   callbacks, while sometimes necessary/useful, should be limited to usages where there is no other clean way
 *   to accomplish the goal.
 * 
 * 
 *   NOTE: This function calls the application's `tx!` function (which is configurable). Fulcro 2 'follow-on reads' are
 *   supported by the default version and are added to the `:refresh` entries. Your choice of rendering algorithm will
 *   influence their necessity.
 * 
 *   Returns the transaction ID of the submitted transaction.
 *   
 */
com.fulcrologic.fulcro.raw.components.transact_BANG_ = (function com$fulcrologic$fulcro$raw$components$transact_BANG_(var_args){
var G__47782 = arguments.length;
switch (G__47782) {
case 3:
return com.fulcrologic.fulcro.raw.components.transact_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 2:
return com.fulcrologic.fulcro.raw.components.transact_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.raw.components.transact_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (app_or_component,tx,options){
var temp__5825__auto__ = com.fulcrologic.fulcro.raw.components.any__GT_app(app_or_component);
if(cljs.core.truth_(temp__5825__auto__)){
var app = temp__5825__auto__;
var tx_BANG_ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(app,new cljs.core.Keyword(null,"tx!","tx!",-1308106263));
var options__$1 = (function (){var G__47787 = options;
var G__47787__$1 = (((((!(cljs.core.contains_QMARK_(options,new cljs.core.Keyword(null,"after-render?","after-render?",595994030))))) && (com.fulcrologic.fulcro.raw.components._STAR_after_render_STAR_ === true)))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__47787,new cljs.core.Keyword(null,"after-render?","after-render?",595994030),true):G__47787);
var G__47787__$2 = (((((new cljs.core.Keyword(null,"ref","ref",1289896967).cljs$core$IFn$_invoke$arity$1(options) == null)) && (com.fulcrologic.fulcro.raw.components.has_ident_QMARK_(app_or_component))))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__47787__$1,new cljs.core.Keyword(null,"ref","ref",1289896967),com.fulcrologic.fulcro.raw.components.get_ident.cljs$core$IFn$_invoke$arity$1(app_or_component)):G__47787__$1);
if((((new cljs.core.Keyword(null,"component","component",1555936782).cljs$core$IFn$_invoke$arity$1(options) == null)) && (com.fulcrologic.fulcro.raw.components.component_instance_QMARK_(app_or_component)))){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__47787__$2,new cljs.core.Keyword(null,"component","component",1555936782),app_or_component);
} else {
return G__47787__$2;
}
})();
return (tx_BANG_.cljs$core$IFn$_invoke$arity$3 ? tx_BANG_.cljs$core$IFn$_invoke$arity$3(app,tx,options__$1) : tx_BANG_.call(null, app,tx,options__$1));
} else {
return null;
}
}));

(com.fulcrologic.fulcro.raw.components.transact_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (app_or_comp,tx){
return com.fulcrologic.fulcro.raw.components.transact_BANG_.cljs$core$IFn$_invoke$arity$3(app_or_comp,tx,cljs.core.PersistentArrayMap.EMPTY);
}));

(com.fulcrologic.fulcro.raw.components.transact_BANG_.cljs$lang$maxFixedArity = 3);

/**
 * Shorthand for exactly `(transact! component tx (merge options {:synchronous? true}))`.
 * 
 *   Runs a synchronous transaction, which is an optimized mode where the optimistic behaviors of the mutations in the
 *   transaction run on the calling thread, and new props are immediately made available to the calling component via
 *   "props tunneling" (a behind-the-scenes mechanism using js/setState).
 * 
 *   This mode is meant to be used in form input event handlers, since React is designed to only work properly with
 *   raw DOM inputs via component-local state. This prevents things like the cursor jumping to the end of inputs
 *   unexpectedly.
 * 
 *   WARNING: Using an `app` instead of a component in synchronous transactions makes no sense. You must pass a component
 *   that has an ident.
 * 
 *   If you're using this, you can also set the compiler option:
 * 
 *   ```
 *   :compiler-options {:external-config {:fulcro     {:wrap-inputs? false}}}
 *   ```
 * 
 *   to turn off Fulcro DOM's generation of wrapped inputs (which try to solve this problem in a less-effective way).
 * 
 *   WARNING: Synchronous rendering does *not* refresh the full UI, only the component.
 *   
 */
com.fulcrologic.fulcro.raw.components.transact_BANG__BANG_ = (function com$fulcrologic$fulcro$raw$components$transact_BANG__BANG_(var_args){
var G__47791 = arguments.length;
switch (G__47791) {
case 2:
return com.fulcrologic.fulcro.raw.components.transact_BANG__BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return com.fulcrologic.fulcro.raw.components.transact_BANG__BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.raw.components.transact_BANG__BANG_.cljs$core$IFn$_invoke$arity$2 = (function (component,tx){
return com.fulcrologic.fulcro.raw.components.transact_BANG__BANG_.cljs$core$IFn$_invoke$arity$3(component,tx,cljs.core.PersistentArrayMap.EMPTY);
}));

(com.fulcrologic.fulcro.raw.components.transact_BANG__BANG_.cljs$core$IFn$_invoke$arity$3 = (function (component,tx,options){
return com.fulcrologic.fulcro.raw.components.transact_BANG_.cljs$core$IFn$_invoke$arity$3(component,tx,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([options,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"synchronous?","synchronous?",1705588391),true], null)], 0)));
}));

(com.fulcrologic.fulcro.raw.components.transact_BANG__BANG_.cljs$lang$maxFixedArity = 3);

/**
 * Part of internal implementation of dynamic queries.
 */
com.fulcrologic.fulcro.raw.components.link_element = (function com$fulcrologic$fulcro$raw$components$link_element(element){
return clojure.walk.prewalk((function com$fulcrologic$fulcro$raw$components$link_element_$_link_element_helper(ele){
var map__47797 = cljs.core.meta(ele);
var map__47797__$1 = cljs.core.__destructure_map(map__47797);
var queryid = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47797__$1,new cljs.core.Keyword(null,"queryid","queryid",-271432056));
if(cljs.core.truth_(queryid)){
return queryid;
} else {
return ele;
}
}),element);
});
/**
 * Part of internal implementation of dynamic queries.
 * 
 *   Determines if there are query elements in the `query` that need to be normalized. If so, it does so.
 * 
 *   Returns the new state map containing potentially-updated normalized queries.
 */
com.fulcrologic.fulcro.raw.components.normalize_query_elements = (function com$fulcrologic$fulcro$raw$components$normalize_query_elements(state_map,query){
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function com$fulcrologic$fulcro$raw$components$normalize_query_elements_$_normalize_query_elements_reducer(state,ele){
try{var parameterized_QMARK_ = cljs.core.seq_QMARK_(ele);
var raw_element = ((parameterized_QMARK_)?cljs.core.first(ele):ele);
if(com.fulcrologic.fulcro.algorithms.do_not_use.union_QMARK_(raw_element)){
var union_alternates = cljs.core.first(cljs.core.vals(raw_element));
var union_meta = cljs.core.meta(union_alternates);
var normalized_union_alternates = cljs.core.with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2(com.fulcrologic.fulcro.raw.components.link_element,union_alternates)),union_meta);
var union_query_id = new cljs.core.Keyword(null,"queryid","queryid",-271432056).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(union_alternates));
var union_component_key = com.fulcrologic.fulcro.raw.components.class__GT_registry_key(new cljs.core.Keyword(null,"component","component",1555936782).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(union_alternates)));
if(cljs.core.truth_(union_query_id)){
} else {
throw (new Error(["Assert failed: ","Union query has an ID. Did you use extended get-query?","\n","union-query-id"].join('')));
}

return com.fulcrologic.fulcro.algorithms.do_not_use.deep_merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("com.fulcrologic.fulcro.components","queries","com.fulcrologic.fulcro.components/queries",-1435852452),cljs.core.PersistentArrayMap.createAsIfByAssoc([union_query_id,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"query","query",-1288509510),normalized_union_alternates,new cljs.core.Keyword(null,"component-key","component-key",1189239034),union_component_key,new cljs.core.Keyword(null,"id","id",-1388402092),union_query_id], null)])], null),cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function com$fulcrologic$fulcro$raw$components$normalize_query_elements_$_normalize_query_elements_reducer_$_normalize_union_reducer(s,p__47802){
var vec__47803 = p__47802;
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47803,(0),null);
var subquery = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__47803,(1),null);
return (com.fulcrologic.fulcro.raw.components.normalize_query.cljs$core$IFn$_invoke$arity$2 ? com.fulcrologic.fulcro.raw.components.normalize_query.cljs$core$IFn$_invoke$arity$2(s,subquery) : com.fulcrologic.fulcro.raw.components.normalize_query.call(null, s,subquery));
}),state,union_alternates)], 0));
} else {
if(((com.fulcrologic.fulcro.algorithms.do_not_use.join_QMARK_(raw_element)) && (com.fulcrologic.fulcro.algorithms.do_not_use.recursion_QMARK_(com.fulcrologic.fulcro.algorithms.do_not_use.join_value(raw_element))))){
return state;
} else {
if(com.fulcrologic.fulcro.algorithms.do_not_use.join_QMARK_(raw_element)){
var G__47806 = state;
var G__47807 = com.fulcrologic.fulcro.algorithms.do_not_use.join_value(raw_element);
return (com.fulcrologic.fulcro.raw.components.normalize_query.cljs$core$IFn$_invoke$arity$2 ? com.fulcrologic.fulcro.raw.components.normalize_query.cljs$core$IFn$_invoke$arity$2(G__47806,G__47807) : com.fulcrologic.fulcro.raw.components.normalize_query.call(null, G__47806,G__47807));
} else {
return state;

}
}
}
}catch (e47799){var e = e47799;
if(cljs.core.truth_(goog.DEBUG)){
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.raw.components","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/raw/components.cljc",502,13,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [e,"Query normalization failed. Perhaps you tried to set a query with a syntax error? See https://book.fulcrologic.com/#err-comp-q-norm-failed"], null);
}),null)),null,(41),null,null,null);
} else {
return null;
}
}}),state_map,query);
});
/**
 * Part of dyn query implementation. Find all of the elements (only at the top level) of the given query and replace them
 *   with their query ID.
 */
com.fulcrologic.fulcro.raw.components.link_query = (function com$fulcrologic$fulcro$raw$components$link_query(query){
var metadata = cljs.core.meta(query);
if(cljs.core.map_QMARK_(query)){
return cljs.core.with_meta(taoensso.encore.map_vals((function (ele){
var map__47808 = cljs.core.meta(ele);
var map__47808__$1 = cljs.core.__destructure_map(map__47808);
var queryid = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47808__$1,new cljs.core.Keyword(null,"queryid","queryid",-271432056));
return queryid;
}),query),metadata);
} else {
return cljs.core.with_meta(cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(com.fulcrologic.fulcro.raw.components.link_element,query),metadata);
}
});
/**
 * Return the component class that was used to generate a given query. e.g. `( = (query->component (get-query Component)) Component)`.
 */
com.fulcrologic.fulcro.raw.components.query__GT_component = (function com$fulcrologic$fulcro$raw$components$query__GT_component(query){
var G__47809 = query;
var G__47809__$1 = (((G__47809 == null))?null:cljs.core.meta(G__47809));
if((G__47809__$1 == null)){
return null;
} else {
return new cljs.core.Keyword(null,"component","component",1555936782).cljs$core$IFn$_invoke$arity$1(G__47809__$1);
}
});
/**
 * Given a state map and a query, returns a state map with the query normalized into the database. Query fragments
 *   that already appear in the state will not be added.  Part of dynamic query implementation.
 */
com.fulcrologic.fulcro.raw.components.normalize_query = (function com$fulcrologic$fulcro$raw$components$normalize_query(state_map,query){
var queryid = (function (){var G__47810 = query;
var G__47810__$1 = (((G__47810 == null))?null:cljs.core.meta(G__47810));
if((G__47810__$1 == null)){
return null;
} else {
return new cljs.core.Keyword(null,"queryid","queryid",-271432056).cljs$core$IFn$_invoke$arity$1(G__47810__$1);
}
})();
var component_key = com.fulcrologic.fulcro.raw.components.class__GT_registry_key((function (){var G__47811 = query;
var G__47811__$1 = (((G__47811 == null))?null:cljs.core.meta(G__47811));
if((G__47811__$1 == null)){
return null;
} else {
return new cljs.core.Keyword(null,"component","component",1555936782).cljs$core$IFn$_invoke$arity$1(G__47811__$1);
}
})());
var query_SINGLEQUOTE_ = cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$4(query,cljs.core.dissoc,new cljs.core.Keyword(null,"queryid","queryid",-271432056),new cljs.core.Keyword(null,"component","component",1555936782));
var new_state = com.fulcrologic.fulcro.raw.components.normalize_query_elements(state_map,query_SINGLEQUOTE_);
var new_state__$1 = (((new cljs.core.Keyword("com.fulcrologic.fulcro.components","queries","com.fulcrologic.fulcro.components/queries",-1435852452).cljs$core$IFn$_invoke$arity$1(new_state) == null))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(new_state,new cljs.core.Keyword("com.fulcrologic.fulcro.components","queries","com.fulcrologic.fulcro.components/queries",-1435852452),cljs.core.PersistentArrayMap.EMPTY):new_state);
var top_query = com.fulcrologic.fulcro.raw.components.link_query(query_SINGLEQUOTE_);
if(cljs.core.truth_((function (){var and__5000__auto__ = queryid;
if(cljs.core.truth_(and__5000__auto__)){
return component_key;
} else {
return and__5000__auto__;
}
})())){
return com.fulcrologic.fulcro.algorithms.do_not_use.deep_merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("com.fulcrologic.fulcro.components","queries","com.fulcrologic.fulcro.components/queries",-1435852452),cljs.core.PersistentArrayMap.createAsIfByAssoc([queryid,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"query","query",-1288509510),top_query,new cljs.core.Keyword(null,"id","id",-1388402092),queryid,new cljs.core.Keyword(null,"component-key","component-key",1189239034),component_key], null)])], null),new_state__$1], 0));
} else {
return new_state__$1;
}
});
/**
 * Put a query in app state.
 * 
 *   NOTE: Indexes must be rebuilt after setting a query, so this function should primarily be used to build
 *   up an initial app state.
 */
com.fulcrologic.fulcro.raw.components.set_query_STAR_ = (function com$fulcrologic$fulcro$raw$components$set_query_STAR_(state_map,class_or_factory,p__47814){
var map__47815 = p__47814;
var map__47815__$1 = cljs.core.__destructure_map(map__47815);
var args = map__47815__$1;
var query = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47815__$1,new cljs.core.Keyword(null,"query","query",-1288509510));
var queryid = (((class_or_factory == null))?null:(cljs.core.truth_((function (){var G__47816 = class_or_factory;
var G__47816__$1 = (((G__47816 == null))?null:cljs.core.meta(G__47816));
if((G__47816__$1 == null)){
return null;
} else {
return cljs.core.contains_QMARK_(G__47816__$1,new cljs.core.Keyword(null,"queryid","queryid",-271432056));
}
})())?(function (){var G__47818 = class_or_factory;
var G__47818__$1 = (((G__47818 == null))?null:cljs.core.meta(G__47818));
if((G__47818__$1 == null)){
return null;
} else {
return new cljs.core.Keyword(null,"queryid","queryid",-271432056).cljs$core$IFn$_invoke$arity$1(G__47818__$1);
}
})():com.fulcrologic.fulcro.raw.components.query_id(class_or_factory,null)
));
var component = (function (){var or__5002__auto__ = new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(class_or_factory));
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return class_or_factory;
}
})();
var setq_STAR_ = (function (state){
return com.fulcrologic.fulcro.raw.components.normalize_query(cljs.core.update.cljs$core$IFn$_invoke$arity$4(state,new cljs.core.Keyword("com.fulcrologic.fulcro.components","queries","com.fulcrologic.fulcro.components/queries",-1435852452),cljs.core.dissoc,queryid),cljs.core.vary_meta.cljs$core$IFn$_invoke$arity$6(query,cljs.core.assoc,new cljs.core.Keyword(null,"queryid","queryid",-271432056),queryid,new cljs.core.Keyword(null,"component","component",1555936782),component));
});
if(typeof queryid === 'string'){
var G__47821 = state_map;
if(cljs.core.contains_QMARK_(args,new cljs.core.Keyword(null,"query","query",-1288509510))){
return setq_STAR_(G__47821);
} else {
return G__47821;
}
} else {
if(cljs.core.truth_(goog.DEBUG)){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.raw.components","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/raw/components.cljc",563,11,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Set query failed. There was no query ID. Use a class or factory for the second argument. See https://book.fulcrologic.com/#err-comp-set-q-failed"], null);
}),null)),null,(42),null,null,null);
} else {
}

return state_map;
}
});
/**
 * Public API for setting a dynamic query on a component. This function alters the query and rebuilds internal indexes.
 * 
 *   * `x` : is anything that any->app accepts.
 *   * `class-or-factory` : A component class or factory for that class (if using query qualifiers)
 *   * `opts` : A map with `query` and optionally `params` (substitutions on queries)
 *   
 */
com.fulcrologic.fulcro.raw.components.set_query_BANG_ = (function com$fulcrologic$fulcro$raw$components$set_query_BANG_(x,class_or_factory,p__47822){
var map__47823 = p__47822;
var map__47823__$1 = cljs.core.__destructure_map(map__47823);
var opts = map__47823__$1;
var query = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47823__$1,new cljs.core.Keyword(null,"query","query",-1288509510));
var params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47823__$1,new cljs.core.Keyword(null,"params","params",710516235));
var app = com.fulcrologic.fulcro.raw.components.any__GT_app(x);
var state_atom = new cljs.core.Keyword("com.fulcrologic.fulcro.application","state-atom","com.fulcrologic.fulcro.application/state-atom",648128366).cljs$core$IFn$_invoke$arity$1(app);
var queryid = ((typeof class_or_factory === 'string')?class_or_factory:(cljs.core.truth_((function (){var G__47824 = class_or_factory;
var G__47824__$1 = (((G__47824 == null))?null:cljs.core.meta(G__47824));
if((G__47824__$1 == null)){
return null;
} else {
return cljs.core.contains_QMARK_(G__47824__$1,new cljs.core.Keyword(null,"queryid","queryid",-271432056));
}
})())?(function (){var G__47825 = class_or_factory;
var G__47825__$1 = (((G__47825 == null))?null:cljs.core.meta(G__47825));
if((G__47825__$1 == null)){
return null;
} else {
return new cljs.core.Keyword(null,"queryid","queryid",-271432056).cljs$core$IFn$_invoke$arity$1(G__47825__$1);
}
})():com.fulcrologic.fulcro.raw.components.query_id(class_or_factory,null)
));
if(cljs.core.truth_((function (){var and__5000__auto__ = typeof queryid === 'string';
if(and__5000__auto__){
var or__5002__auto__ = query;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return params;
}
} else {
return and__5000__auto__;
}
})())){
var index_root_BANG_ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(app,new cljs.core.Keyword(null,"index-root!","index-root!",-981026266));
var schedule_render_BANG_ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(app,new cljs.core.Keyword(null,"schedule-render!","schedule-render!",2095050350));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_atom,com.fulcrologic.fulcro.raw.components.set_query_STAR_,class_or_factory,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"queryid","queryid",-271432056),queryid,new cljs.core.Keyword(null,"query","query",-1288509510),query,new cljs.core.Keyword(null,"params","params",710516235),params], null));

if(cljs.core.truth_(index_root_BANG_)){
(index_root_BANG_.cljs$core$IFn$_invoke$arity$1 ? index_root_BANG_.cljs$core$IFn$_invoke$arity$1(app) : index_root_BANG_.call(null, app));
} else {
}

com.fulcrologic.fulcro.algorithms.do_not_use.dev_check_query(com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$2(class_or_factory,cljs.core.deref(state_atom)),com.fulcrologic.fulcro.raw.components.component_name);

if(cljs.core.truth_(schedule_render_BANG_)){
var G__47831 = app;
var G__47832 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"force-root?","force-root?",-1598741683),true], null);
return (schedule_render_BANG_.cljs$core$IFn$_invoke$arity$2 ? schedule_render_BANG_.cljs$core$IFn$_invoke$arity$2(G__47831,G__47832) : schedule_render_BANG_.call(null, G__47831,G__47832));
} else {
return null;
}
} else {
if(cljs.core.truth_(goog.DEBUG)){
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.raw.components","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/raw/components.cljc",588,9,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Unable to set query. Invalid arguments. See https://book.fulcrologic.com/#err-comp-unable-set-q"], null);
}),null)),null,(43),null,null,null);
} else {
return null;
}
}
});
var __set_query_BANG_ = (function com$fulcrologic$fulcro$raw$components$__set_query_BANG_(app,class_or_factory,p__47843){
var map__47844 = p__47843;
var map__47844__$1 = cljs.core.__destructure_map(map__47844);
var params = map__47844__$1;
var query = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47844__$1,new cljs.core.Keyword(null,"query","query",-1288509510));
var state_atom = new cljs.core.Keyword("com.fulcrologic.fulcro.application","state-atom","com.fulcrologic.fulcro.application/state-atom",648128366).cljs$core$IFn$_invoke$arity$1(app);
var queryid = ((typeof class_or_factory === 'string')?class_or_factory:(cljs.core.truth_((function (){var G__47845 = class_or_factory;
var G__47845__$1 = (((G__47845 == null))?null:cljs.core.meta(G__47845));
if((G__47845__$1 == null)){
return null;
} else {
return cljs.core.contains_QMARK_(G__47845__$1,new cljs.core.Keyword(null,"queryid","queryid",-271432056));
}
})())?(function (){var G__47846 = class_or_factory;
var G__47846__$1 = (((G__47846 == null))?null:cljs.core.meta(G__47846));
if((G__47846__$1 == null)){
return null;
} else {
return new cljs.core.Keyword(null,"queryid","queryid",-271432056).cljs$core$IFn$_invoke$arity$1(G__47846__$1);
}
})():com.fulcrologic.fulcro.raw.components.query_id(class_or_factory,null)
));
if(cljs.core.truth_((function (){var and__5000__auto__ = typeof queryid === 'string';
if(and__5000__auto__){
var or__5002__auto__ = query;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return params;
}
} else {
return and__5000__auto__;
}
})())){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_atom,com.fulcrologic.fulcro.raw.components.set_query_STAR_,class_or_factory,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"queryid","queryid",-271432056),queryid,new cljs.core.Keyword(null,"query","query",-1288509510),query,new cljs.core.Keyword(null,"params","params",710516235),params], null));
} else {
if(cljs.core.truth_(goog.DEBUG)){
return taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"error","error",-978969032),"com.fulcrologic.fulcro.raw.components","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/raw/components.cljc",599,17,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay((function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Unable to set query. Invalid arguments. See https://book.fulcrologic.com/#err-comp-unable-set-q"], null);
}),null)),null,(45),null,null,null);
} else {
return null;
}
}
});
/**
 * Refresh the current dynamic queries in app state to reflect any updates to the static queries of the components.
 * 
 *   This can be used at development time to update queries that have changed but that hot code reload does not
 *   reflect (because there is a current saved query in state). This is *not* always what you want, since a component
 *   may have a custom query whose prop-level elements are set to a particular thing on purpose.
 * 
 *   An component that has `:preserve-dynamic-query? true` in its component options will be ignored by
 *   this function.
 */
com.fulcrologic.fulcro.raw.components.refresh_dynamic_queries_BANG_ = (function com$fulcrologic$fulcro$raw$components$refresh_dynamic_queries_BANG_(var_args){
var G__47850 = arguments.length;
switch (G__47850) {
case 3:
return com.fulcrologic.fulcro.raw.components.refresh_dynamic_queries_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 1:
return com.fulcrologic.fulcro.raw.components.refresh_dynamic_queries_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.raw.components.refresh_dynamic_queries_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (app_ish,cls,force_QMARK_){
var app = com.fulcrologic.fulcro.raw.components.any__GT_app(app_ish);
var preserve_QMARK_ = (function (){var and__5000__auto__ = cljs.core.not(force_QMARK_);
if(and__5000__auto__){
return com.fulcrologic.fulcro.raw.components.component_options.cljs$core$IFn$_invoke$arity$variadic(cls,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"preserve-dynamic-query?","preserve-dynamic-query?",893339297)], 0));
} else {
return and__5000__auto__;
}
})();
if(cljs.core.truth_(preserve_QMARK_)){
return null;
} else {
return com.fulcrologic.fulcro.raw.components.set_query_BANG_(app,cls,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"query","query",-1288509510),com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$2(cls,cljs.core.PersistentArrayMap.EMPTY)], null));
}
}));

(com.fulcrologic.fulcro.raw.components.refresh_dynamic_queries_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (app_ish){
var map__47855 = com.fulcrologic.fulcro.raw.components.any__GT_app(app_ish);
var map__47855__$1 = cljs.core.__destructure_map(map__47855);
var app = map__47855__$1;
var state_atom = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47855__$1,new cljs.core.Keyword("com.fulcrologic.fulcro.application","state-atom","com.fulcrologic.fulcro.application/state-atom",648128366));
var state_map = cljs.core.deref(state_atom);
var queries = cljs.core.get.cljs$core$IFn$_invoke$arity$2(state_map,new cljs.core.Keyword("com.fulcrologic.fulcro.components","queries","com.fulcrologic.fulcro.components/queries",-1435852452));
var classnames = cljs.core.keys(queries);
var seq__47856_48298 = cljs.core.seq(classnames);
var chunk__47858_48299 = null;
var count__47859_48300 = (0);
var i__47860_48301 = (0);
while(true){
if((i__47860_48301 < count__47859_48300)){
var nm_48304 = chunk__47858_48299.cljs$core$IIndexed$_nth$arity$2(null, i__47860_48301);
var cls_48305 = com.fulcrologic.fulcro.raw.components.registry_key__GT_class(nm_48304);
var preserve_QMARK__48306 = com.fulcrologic.fulcro.raw.components.component_options.cljs$core$IFn$_invoke$arity$variadic(cls_48305,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"preserve-dynamic-query?","preserve-dynamic-query?",893339297)], 0));
if(cljs.core.truth_(preserve_QMARK__48306)){
} else {
__set_query_BANG_(app,cls_48305,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"query","query",-1288509510),com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$2(cls_48305,cljs.core.PersistentArrayMap.EMPTY)], null));
}


var G__48308 = seq__47856_48298;
var G__48309 = chunk__47858_48299;
var G__48310 = count__47859_48300;
var G__48311 = (i__47860_48301 + (1));
seq__47856_48298 = G__48308;
chunk__47858_48299 = G__48309;
count__47859_48300 = G__48310;
i__47860_48301 = G__48311;
continue;
} else {
var temp__5825__auto___48313 = cljs.core.seq(seq__47856_48298);
if(temp__5825__auto___48313){
var seq__47856_48315__$1 = temp__5825__auto___48313;
if(cljs.core.chunked_seq_QMARK_(seq__47856_48315__$1)){
var c__5525__auto___48316 = cljs.core.chunk_first(seq__47856_48315__$1);
var G__48317 = cljs.core.chunk_rest(seq__47856_48315__$1);
var G__48318 = c__5525__auto___48316;
var G__48319 = cljs.core.count(c__5525__auto___48316);
var G__48320 = (0);
seq__47856_48298 = G__48317;
chunk__47858_48299 = G__48318;
count__47859_48300 = G__48319;
i__47860_48301 = G__48320;
continue;
} else {
var nm_48323 = cljs.core.first(seq__47856_48315__$1);
var cls_48324 = com.fulcrologic.fulcro.raw.components.registry_key__GT_class(nm_48323);
var preserve_QMARK__48325 = com.fulcrologic.fulcro.raw.components.component_options.cljs$core$IFn$_invoke$arity$variadic(cls_48324,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"preserve-dynamic-query?","preserve-dynamic-query?",893339297)], 0));
if(cljs.core.truth_(preserve_QMARK__48325)){
} else {
__set_query_BANG_(app,cls_48324,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"query","query",-1288509510),com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$2(cls_48324,cljs.core.PersistentArrayMap.EMPTY)], null));
}


var G__48326 = cljs.core.next(seq__47856_48315__$1);
var G__48327 = null;
var G__48328 = (0);
var G__48329 = (0);
seq__47856_48298 = G__48326;
chunk__47858_48299 = G__48327;
count__47859_48300 = G__48328;
i__47860_48301 = G__48329;
continue;
}
} else {
}
}
break;
}

var index_root_BANG_ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(app,new cljs.core.Keyword(null,"index-root!","index-root!",-981026266));
var schedule_render_BANG_ = com.fulcrologic.fulcro.algorithms.lookup.app_algorithm(app,new cljs.core.Keyword(null,"schedule-render!","schedule-render!",2095050350));
if(cljs.core.truth_(index_root_BANG_)){
(index_root_BANG_.cljs$core$IFn$_invoke$arity$1 ? index_root_BANG_.cljs$core$IFn$_invoke$arity$1(app) : index_root_BANG_.call(null, app));
} else {
}

if(cljs.core.truth_(schedule_render_BANG_)){
var G__47865 = app;
var G__47866 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"force-root?","force-root?",-1598741683),true], null);
return (schedule_render_BANG_.cljs$core$IFn$_invoke$arity$2 ? schedule_render_BANG_.cljs$core$IFn$_invoke$arity$2(G__47865,G__47866) : schedule_render_BANG_.call(null, G__47865,G__47866));
} else {
return null;
}
}));

(com.fulcrologic.fulcro.raw.components.refresh_dynamic_queries_BANG_.cljs$lang$maxFixedArity = 3);

/**
 * Identical to `transact!` with `:compressible? true` option. This means that if more than one
 *   adjacent history transition edge is compressible, only the more recent of the sequence of them is kept. This
 *   is useful for things like form input fields, where storing every keystoke in history is undesirable. This
 *   also compress the transactions in Fulcro Inspect.
 * 
 *   NOTE: history events that trigger remote interactions are not compressible, since they may be needed for
 *   automatic network error recovery handling.
 */
com.fulcrologic.fulcro.raw.components.compressible_transact_BANG_ = (function com$fulcrologic$fulcro$raw$components$compressible_transact_BANG_(var_args){
var G__47870 = arguments.length;
switch (G__47870) {
case 2:
return com.fulcrologic.fulcro.raw.components.compressible_transact_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return com.fulcrologic.fulcro.raw.components.compressible_transact_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.raw.components.compressible_transact_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (app_ish,tx){
return com.fulcrologic.fulcro.raw.components.transact_BANG_.cljs$core$IFn$_invoke$arity$3(app_ish,tx,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"compressible?","compressible?",153543246),true], null));
}));

(com.fulcrologic.fulcro.raw.components.compressible_transact_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (app_ish,ref,tx){
return com.fulcrologic.fulcro.raw.components.transact_BANG_.cljs$core$IFn$_invoke$arity$3(app_ish,tx,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"compressible?","compressible?",153543246),true,new cljs.core.Keyword(null,"ref","ref",1289896967),ref], null));
}));

(com.fulcrologic.fulcro.raw.components.compressible_transact_BANG_.cljs$lang$maxFixedArity = 3);

/**
 * Get any custom external configuration that was added to the app at creation-time.
 */
com.fulcrologic.fulcro.raw.components.external_config = (function com$fulcrologic$fulcro$raw$components$external_config(app_ish,k){
var G__47879 = app_ish;
var G__47879__$1 = (((G__47879 == null))?null:com.fulcrologic.fulcro.raw.components.any__GT_app(G__47879));
if((G__47879__$1 == null)){
return null;
} else {
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(G__47879__$1,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.fulcro.application","config","com.fulcrologic.fulcro.application/config",-1907926684),new cljs.core.Keyword(null,"external-config","external-config",-471423941),k], null));
}
});
/**
 * Walks the complete list of components in the component registry and looks for problems. Used during dev mode to
 * detect common problems that can cause runtime misbehavior.
 */
com.fulcrologic.fulcro.raw.components.check_component_registry_BANG_ = (function com$fulcrologic$fulcro$raw$components$check_component_registry_BANG_(){
if(cljs.core.truth_(goog.DEBUG)){
var components = cljs.core.vals(cljs.core.deref(com.fulcrologic.fulcro.raw.components.component_registry));
var seq__47886 = cljs.core.seq(components);
var chunk__47889 = null;
var count__47890 = (0);
var i__47891 = (0);
while(true){
if((i__47891 < count__47890)){
var c = chunk__47889.cljs$core$IIndexed$_nth$arity$2(null, i__47891);
var map__47968 = com.fulcrologic.fulcro.raw.components.component_options(c);
var map__47968__$1 = cljs.core.__destructure_map(map__47968);
var warnings_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47968__$1,new cljs.core.Keyword("fulcro","warnings?","fulcro/warnings?",1905945094));
if((!(warnings_QMARK_ === false))){
var ident_48333 = (function (){var and__5000__auto__ = com.fulcrologic.fulcro.raw.components.has_ident_QMARK_(c);
if(and__5000__auto__){
return com.fulcrologic.fulcro.raw.components.get_ident.cljs$core$IFn$_invoke$arity$2(c,cljs.core.PersistentArrayMap.EMPTY);
} else {
return and__5000__auto__;
}
})();
var query_48334 = com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$1(c);
var constant_ident_QMARK__48335 = (function (){var and__5000__auto__ = cljs.core.vector_QMARK_(ident_48333);
if(and__5000__auto__){
return cljs.core.second(ident_48333);
} else {
return and__5000__auto__;
}
})();
if(cljs.core.truth_((function (){var and__5000__auto__ = constant_ident_QMARK__48335;
if(cljs.core.truth_(and__5000__auto__)){
return (((!(com.fulcrologic.fulcro.raw.components.has_initial_app_state_QMARK_(c)))) && (cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2("com.fulcrologic.fulcro.algorithms.form-state/FormConfig",com.fulcrologic.fulcro.raw.components.component_name(c))));
} else {
return and__5000__auto__;
}
})())){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"com.fulcrologic.fulcro.raw.components","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/raw/components.cljc",663,13,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (seq__47886,chunk__47889,count__47890,i__47891,ident_48333,query_48334,constant_ident_QMARK__48335,map__47968,map__47968__$1,warnings_QMARK_,c,components){
return (function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Component",com.fulcrologic.fulcro.raw.components.component_name(c),"has a constant ident (id in the ident is not nil for empty props),","but it has no initial state. This could cause this component's props to","appear as nil unless you have a mutation or load that connects it to the graph after application startup. See https://book.fulcrologic.com/#warn-constant-ident-no-initial-state"], null);
});})(seq__47886,chunk__47889,count__47890,i__47891,ident_48333,query_48334,constant_ident_QMARK__48335,map__47968,map__47968__$1,warnings_QMARK_,c,components))
,null)),null,(56),null,null,null);
} else {
}

var temp__5825__auto___48336 = (function (){var and__5000__auto__ = com.fulcrologic.fulcro.raw.components.has_initial_app_state_QMARK_(c);
if(and__5000__auto__){
return com.fulcrologic.fulcro.raw.components.get_initial_state.cljs$core$IFn$_invoke$arity$2(c,cljs.core.PersistentArrayMap.EMPTY);
} else {
return and__5000__auto__;
}
})();
if(cljs.core.truth_(temp__5825__auto___48336)){
var initial_state_48337 = temp__5825__auto___48336;
if(cljs.core.map_QMARK_(initial_state_48337)){
var initial_keys_48338 = cljs.core.set(cljs.core.keys(initial_state_48337));
var join_map_48339 = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.filter.cljs$core$IFn$_invoke$arity$1(((function (seq__47886,chunk__47889,count__47890,i__47891,initial_keys_48338,initial_state_48337,temp__5825__auto___48336,ident_48333,query_48334,constant_ident_QMARK__48335,map__47968,map__47968__$1,warnings_QMARK_,c,components){
return (function (p1__47881_SHARP_){
var and__5000__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"join","join",-758861890),new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(p1__47881_SHARP_));
if(and__5000__auto__){
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(p1__47881_SHARP_));
} else {
return and__5000__auto__;
}
});})(seq__47886,chunk__47889,count__47890,i__47891,initial_keys_48338,initial_state_48337,temp__5825__auto___48336,ident_48333,query_48334,constant_ident_QMARK__48335,map__47968,map__47968__$1,warnings_QMARK_,c,components))
),cljs.core.map.cljs$core$IFn$_invoke$arity$1(((function (seq__47886,chunk__47889,count__47890,i__47891,initial_keys_48338,initial_state_48337,temp__5825__auto___48336,ident_48333,query_48334,constant_ident_QMARK__48335,map__47968,map__47968__$1,warnings_QMARK_,c,components){
return (function (p__47972){
var map__47973 = p__47972;
var map__47973__$1 = cljs.core.__destructure_map(map__47973);
var key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47973__$1,new cljs.core.Keyword(null,"key","key",-1516042587));
var component = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__47973__$1,new cljs.core.Keyword(null,"component","component",1555936782));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key,component], null);
});})(seq__47886,chunk__47889,count__47890,i__47891,initial_keys_48338,initial_state_48337,temp__5825__auto___48336,ident_48333,query_48334,constant_ident_QMARK__48335,map__47968,map__47968__$1,warnings_QMARK_,c,components))
)),(function (){var G__47974 = query_48334;
var G__47974__$1 = (((G__47974 == null))?null:edn_query_language.core.query__GT_ast(G__47974));
if((G__47974__$1 == null)){
return null;
} else {
return new cljs.core.Keyword(null,"children","children",-940561982).cljs$core$IFn$_invoke$arity$1(G__47974__$1);
}
})());
var join_keys_48340 = cljs.core.set(cljs.core.keys(join_map_48339));
var temp__5825__auto___48343__$1 = cljs.core.seq(clojure.set.difference.cljs$core$IFn$_invoke$arity$2(join_keys_48340,initial_keys_48338));
if(temp__5825__auto___48343__$1){
var missing_initial_keys_48344 = temp__5825__auto___48343__$1;
var seq__47976_48345 = cljs.core.seq(missing_initial_keys_48344);
var chunk__47978_48346 = null;
var count__47979_48347 = (0);
var i__47980_48348 = (0);
while(true){
if((i__47980_48348 < count__47979_48347)){
var k_48349 = chunk__47978_48346.cljs$core$IIndexed$_nth$arity$2(null, i__47980_48348);
var target_48350 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(join_map_48339,k_48349);
if(((com.fulcrologic.fulcro.raw.components.has_initial_app_state_QMARK_(target_48350)) && (cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(com.fulcrologic.fulcro.raw.components.component_name(target_48350),"com.fulcrologic.fulcro.algorithms.form-state/FormConfig")))){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"com.fulcrologic.fulcro.raw.components","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/raw/components.cljc",680,23,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (seq__47976_48345,chunk__47978_48346,count__47979_48347,i__47980_48348,seq__47886,chunk__47889,count__47890,i__47891,target_48350,k_48349,missing_initial_keys_48344,temp__5825__auto___48343__$1,initial_keys_48338,join_map_48339,join_keys_48340,initial_state_48337,temp__5825__auto___48336,ident_48333,query_48334,constant_ident_QMARK__48335,map__47968,map__47968__$1,warnings_QMARK_,c,components){
return (function (){
return new cljs.core.PersistentVector(null, 12, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Component",com.fulcrologic.fulcro.raw.components.component_name(c),"does not INCLUDE initial state for",com.fulcrologic.fulcro.raw.components.component_name(target_48350),"at join key",k_48349,"; however, ",com.fulcrologic.fulcro.raw.components.component_name(target_48350),"HAS initial state. This probably means your initial state graph is incomplete","and props on",com.fulcrologic.fulcro.raw.components.component_name(target_48350),"will be nil. See https://book.fulcrologic.com/#warn-initial-state-incomplete"], null);
});})(seq__47976_48345,chunk__47978_48346,count__47979_48347,i__47980_48348,seq__47886,chunk__47889,count__47890,i__47891,target_48350,k_48349,missing_initial_keys_48344,temp__5825__auto___48343__$1,initial_keys_48338,join_map_48339,join_keys_48340,initial_state_48337,temp__5825__auto___48336,ident_48333,query_48334,constant_ident_QMARK__48335,map__47968,map__47968__$1,warnings_QMARK_,c,components))
,null)),null,(59),null,null,null);
} else {
}


var G__48353 = seq__47976_48345;
var G__48354 = chunk__47978_48346;
var G__48355 = count__47979_48347;
var G__48356 = (i__47980_48348 + (1));
seq__47976_48345 = G__48353;
chunk__47978_48346 = G__48354;
count__47979_48347 = G__48355;
i__47980_48348 = G__48356;
continue;
} else {
var temp__5825__auto___48357__$2 = cljs.core.seq(seq__47976_48345);
if(temp__5825__auto___48357__$2){
var seq__47976_48358__$1 = temp__5825__auto___48357__$2;
if(cljs.core.chunked_seq_QMARK_(seq__47976_48358__$1)){
var c__5525__auto___48359 = cljs.core.chunk_first(seq__47976_48358__$1);
var G__48360 = cljs.core.chunk_rest(seq__47976_48358__$1);
var G__48361 = c__5525__auto___48359;
var G__48362 = cljs.core.count(c__5525__auto___48359);
var G__48363 = (0);
seq__47976_48345 = G__48360;
chunk__47978_48346 = G__48361;
count__47979_48347 = G__48362;
i__47980_48348 = G__48363;
continue;
} else {
var k_48364 = cljs.core.first(seq__47976_48358__$1);
var target_48365 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(join_map_48339,k_48364);
if(((com.fulcrologic.fulcro.raw.components.has_initial_app_state_QMARK_(target_48365)) && (cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(com.fulcrologic.fulcro.raw.components.component_name(target_48365),"com.fulcrologic.fulcro.algorithms.form-state/FormConfig")))){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"com.fulcrologic.fulcro.raw.components","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/raw/components.cljc",680,23,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (seq__47976_48345,chunk__47978_48346,count__47979_48347,i__47980_48348,seq__47886,chunk__47889,count__47890,i__47891,target_48365,k_48364,seq__47976_48358__$1,temp__5825__auto___48357__$2,missing_initial_keys_48344,temp__5825__auto___48343__$1,initial_keys_48338,join_map_48339,join_keys_48340,initial_state_48337,temp__5825__auto___48336,ident_48333,query_48334,constant_ident_QMARK__48335,map__47968,map__47968__$1,warnings_QMARK_,c,components){
return (function (){
return new cljs.core.PersistentVector(null, 12, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Component",com.fulcrologic.fulcro.raw.components.component_name(c),"does not INCLUDE initial state for",com.fulcrologic.fulcro.raw.components.component_name(target_48365),"at join key",k_48364,"; however, ",com.fulcrologic.fulcro.raw.components.component_name(target_48365),"HAS initial state. This probably means your initial state graph is incomplete","and props on",com.fulcrologic.fulcro.raw.components.component_name(target_48365),"will be nil. See https://book.fulcrologic.com/#warn-initial-state-incomplete"], null);
});})(seq__47976_48345,chunk__47978_48346,count__47979_48347,i__47980_48348,seq__47886,chunk__47889,count__47890,i__47891,target_48365,k_48364,seq__47976_48358__$1,temp__5825__auto___48357__$2,missing_initial_keys_48344,temp__5825__auto___48343__$1,initial_keys_48338,join_map_48339,join_keys_48340,initial_state_48337,temp__5825__auto___48336,ident_48333,query_48334,constant_ident_QMARK__48335,map__47968,map__47968__$1,warnings_QMARK_,c,components))
,null)),null,(60),null,null,null);
} else {
}


var G__48366 = cljs.core.next(seq__47976_48358__$1);
var G__48367 = null;
var G__48368 = (0);
var G__48369 = (0);
seq__47976_48345 = G__48366;
chunk__47978_48346 = G__48367;
count__47979_48347 = G__48368;
i__47980_48348 = G__48369;
continue;
}
} else {
}
}
break;
}
} else {
}
} else {
}
} else {
}


var G__48370 = seq__47886;
var G__48371 = chunk__47889;
var G__48372 = count__47890;
var G__48373 = (i__47891 + (1));
seq__47886 = G__48370;
chunk__47889 = G__48371;
count__47890 = G__48372;
i__47891 = G__48373;
continue;
} else {
var G__48374 = seq__47886;
var G__48375 = chunk__47889;
var G__48376 = count__47890;
var G__48377 = (i__47891 + (1));
seq__47886 = G__48374;
chunk__47889 = G__48375;
count__47890 = G__48376;
i__47891 = G__48377;
continue;
}
} else {
var temp__5825__auto__ = cljs.core.seq(seq__47886);
if(temp__5825__auto__){
var seq__47886__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__47886__$1)){
var c__5525__auto__ = cljs.core.chunk_first(seq__47886__$1);
var G__48378 = cljs.core.chunk_rest(seq__47886__$1);
var G__48379 = c__5525__auto__;
var G__48380 = cljs.core.count(c__5525__auto__);
var G__48381 = (0);
seq__47886 = G__48378;
chunk__47889 = G__48379;
count__47890 = G__48380;
i__47891 = G__48381;
continue;
} else {
var c = cljs.core.first(seq__47886__$1);
var map__48003 = com.fulcrologic.fulcro.raw.components.component_options(c);
var map__48003__$1 = cljs.core.__destructure_map(map__48003);
var warnings_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48003__$1,new cljs.core.Keyword("fulcro","warnings?","fulcro/warnings?",1905945094));
if((!(warnings_QMARK_ === false))){
var ident_48382 = (function (){var and__5000__auto__ = com.fulcrologic.fulcro.raw.components.has_ident_QMARK_(c);
if(and__5000__auto__){
return com.fulcrologic.fulcro.raw.components.get_ident.cljs$core$IFn$_invoke$arity$2(c,cljs.core.PersistentArrayMap.EMPTY);
} else {
return and__5000__auto__;
}
})();
var query_48383 = com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$1(c);
var constant_ident_QMARK__48384 = (function (){var and__5000__auto__ = cljs.core.vector_QMARK_(ident_48382);
if(and__5000__auto__){
return cljs.core.second(ident_48382);
} else {
return and__5000__auto__;
}
})();
if(cljs.core.truth_((function (){var and__5000__auto__ = constant_ident_QMARK__48384;
if(cljs.core.truth_(and__5000__auto__)){
return (((!(com.fulcrologic.fulcro.raw.components.has_initial_app_state_QMARK_(c)))) && (cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2("com.fulcrologic.fulcro.algorithms.form-state/FormConfig",com.fulcrologic.fulcro.raw.components.component_name(c))));
} else {
return and__5000__auto__;
}
})())){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"com.fulcrologic.fulcro.raw.components","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/raw/components.cljc",663,13,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (seq__47886,chunk__47889,count__47890,i__47891,ident_48382,query_48383,constant_ident_QMARK__48384,map__48003,map__48003__$1,warnings_QMARK_,c,seq__47886__$1,temp__5825__auto__,components){
return (function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Component",com.fulcrologic.fulcro.raw.components.component_name(c),"has a constant ident (id in the ident is not nil for empty props),","but it has no initial state. This could cause this component's props to","appear as nil unless you have a mutation or load that connects it to the graph after application startup. See https://book.fulcrologic.com/#warn-constant-ident-no-initial-state"], null);
});})(seq__47886,chunk__47889,count__47890,i__47891,ident_48382,query_48383,constant_ident_QMARK__48384,map__48003,map__48003__$1,warnings_QMARK_,c,seq__47886__$1,temp__5825__auto__,components))
,null)),null,(61),null,null,null);
} else {
}

var temp__5825__auto___48387__$1 = (function (){var and__5000__auto__ = com.fulcrologic.fulcro.raw.components.has_initial_app_state_QMARK_(c);
if(and__5000__auto__){
return com.fulcrologic.fulcro.raw.components.get_initial_state.cljs$core$IFn$_invoke$arity$2(c,cljs.core.PersistentArrayMap.EMPTY);
} else {
return and__5000__auto__;
}
})();
if(cljs.core.truth_(temp__5825__auto___48387__$1)){
var initial_state_48389 = temp__5825__auto___48387__$1;
if(cljs.core.map_QMARK_(initial_state_48389)){
var initial_keys_48390 = cljs.core.set(cljs.core.keys(initial_state_48389));
var join_map_48391 = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentArrayMap.EMPTY,cljs.core.comp.cljs$core$IFn$_invoke$arity$2(cljs.core.filter.cljs$core$IFn$_invoke$arity$1(((function (seq__47886,chunk__47889,count__47890,i__47891,initial_keys_48390,initial_state_48389,temp__5825__auto___48387__$1,ident_48382,query_48383,constant_ident_QMARK__48384,map__48003,map__48003__$1,warnings_QMARK_,c,seq__47886__$1,temp__5825__auto__,components){
return (function (p1__47881_SHARP_){
var and__5000__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"join","join",-758861890),new cljs.core.Keyword(null,"type","type",1174270348).cljs$core$IFn$_invoke$arity$1(p1__47881_SHARP_));
if(and__5000__auto__){
return cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(p1__47881_SHARP_));
} else {
return and__5000__auto__;
}
});})(seq__47886,chunk__47889,count__47890,i__47891,initial_keys_48390,initial_state_48389,temp__5825__auto___48387__$1,ident_48382,query_48383,constant_ident_QMARK__48384,map__48003,map__48003__$1,warnings_QMARK_,c,seq__47886__$1,temp__5825__auto__,components))
),cljs.core.map.cljs$core$IFn$_invoke$arity$1(((function (seq__47886,chunk__47889,count__47890,i__47891,initial_keys_48390,initial_state_48389,temp__5825__auto___48387__$1,ident_48382,query_48383,constant_ident_QMARK__48384,map__48003,map__48003__$1,warnings_QMARK_,c,seq__47886__$1,temp__5825__auto__,components){
return (function (p__48013){
var map__48014 = p__48013;
var map__48014__$1 = cljs.core.__destructure_map(map__48014);
var key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48014__$1,new cljs.core.Keyword(null,"key","key",-1516042587));
var component = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48014__$1,new cljs.core.Keyword(null,"component","component",1555936782));
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [key,component], null);
});})(seq__47886,chunk__47889,count__47890,i__47891,initial_keys_48390,initial_state_48389,temp__5825__auto___48387__$1,ident_48382,query_48383,constant_ident_QMARK__48384,map__48003,map__48003__$1,warnings_QMARK_,c,seq__47886__$1,temp__5825__auto__,components))
)),(function (){var G__48016 = query_48383;
var G__48016__$1 = (((G__48016 == null))?null:edn_query_language.core.query__GT_ast(G__48016));
if((G__48016__$1 == null)){
return null;
} else {
return new cljs.core.Keyword(null,"children","children",-940561982).cljs$core$IFn$_invoke$arity$1(G__48016__$1);
}
})());
var join_keys_48392 = cljs.core.set(cljs.core.keys(join_map_48391));
var temp__5825__auto___48394__$2 = cljs.core.seq(clojure.set.difference.cljs$core$IFn$_invoke$arity$2(join_keys_48392,initial_keys_48390));
if(temp__5825__auto___48394__$2){
var missing_initial_keys_48395 = temp__5825__auto___48394__$2;
var seq__48017_48396 = cljs.core.seq(missing_initial_keys_48395);
var chunk__48019_48397 = null;
var count__48020_48398 = (0);
var i__48021_48399 = (0);
while(true){
if((i__48021_48399 < count__48020_48398)){
var k_48400 = chunk__48019_48397.cljs$core$IIndexed$_nth$arity$2(null, i__48021_48399);
var target_48401 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(join_map_48391,k_48400);
if(((com.fulcrologic.fulcro.raw.components.has_initial_app_state_QMARK_(target_48401)) && (cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(com.fulcrologic.fulcro.raw.components.component_name(target_48401),"com.fulcrologic.fulcro.algorithms.form-state/FormConfig")))){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"com.fulcrologic.fulcro.raw.components","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/raw/components.cljc",680,23,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (seq__48017_48396,chunk__48019_48397,count__48020_48398,i__48021_48399,seq__47886,chunk__47889,count__47890,i__47891,target_48401,k_48400,missing_initial_keys_48395,temp__5825__auto___48394__$2,initial_keys_48390,join_map_48391,join_keys_48392,initial_state_48389,temp__5825__auto___48387__$1,ident_48382,query_48383,constant_ident_QMARK__48384,map__48003,map__48003__$1,warnings_QMARK_,c,seq__47886__$1,temp__5825__auto__,components){
return (function (){
return new cljs.core.PersistentVector(null, 12, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Component",com.fulcrologic.fulcro.raw.components.component_name(c),"does not INCLUDE initial state for",com.fulcrologic.fulcro.raw.components.component_name(target_48401),"at join key",k_48400,"; however, ",com.fulcrologic.fulcro.raw.components.component_name(target_48401),"HAS initial state. This probably means your initial state graph is incomplete","and props on",com.fulcrologic.fulcro.raw.components.component_name(target_48401),"will be nil. See https://book.fulcrologic.com/#warn-initial-state-incomplete"], null);
});})(seq__48017_48396,chunk__48019_48397,count__48020_48398,i__48021_48399,seq__47886,chunk__47889,count__47890,i__47891,target_48401,k_48400,missing_initial_keys_48395,temp__5825__auto___48394__$2,initial_keys_48390,join_map_48391,join_keys_48392,initial_state_48389,temp__5825__auto___48387__$1,ident_48382,query_48383,constant_ident_QMARK__48384,map__48003,map__48003__$1,warnings_QMARK_,c,seq__47886__$1,temp__5825__auto__,components))
,null)),null,(64),null,null,null);
} else {
}


var G__48411 = seq__48017_48396;
var G__48412 = chunk__48019_48397;
var G__48413 = count__48020_48398;
var G__48414 = (i__48021_48399 + (1));
seq__48017_48396 = G__48411;
chunk__48019_48397 = G__48412;
count__48020_48398 = G__48413;
i__48021_48399 = G__48414;
continue;
} else {
var temp__5825__auto___48415__$3 = cljs.core.seq(seq__48017_48396);
if(temp__5825__auto___48415__$3){
var seq__48017_48416__$1 = temp__5825__auto___48415__$3;
if(cljs.core.chunked_seq_QMARK_(seq__48017_48416__$1)){
var c__5525__auto___48417 = cljs.core.chunk_first(seq__48017_48416__$1);
var G__48418 = cljs.core.chunk_rest(seq__48017_48416__$1);
var G__48419 = c__5525__auto___48417;
var G__48420 = cljs.core.count(c__5525__auto___48417);
var G__48421 = (0);
seq__48017_48396 = G__48418;
chunk__48019_48397 = G__48419;
count__48020_48398 = G__48420;
i__48021_48399 = G__48421;
continue;
} else {
var k_48423 = cljs.core.first(seq__48017_48416__$1);
var target_48424 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(join_map_48391,k_48423);
if(((com.fulcrologic.fulcro.raw.components.has_initial_app_state_QMARK_(target_48424)) && (cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(com.fulcrologic.fulcro.raw.components.component_name(target_48424),"com.fulcrologic.fulcro.algorithms.form-state/FormConfig")))){
taoensso.timbre._log_BANG_.cljs$core$IFn$_invoke$arity$14(taoensso.timbre._STAR_config_STAR_,new cljs.core.Keyword(null,"warn","warn",-436710552),"com.fulcrologic.fulcro.raw.components","jar:file:/Users/davidwu/.m2/repository/com/fulcrologic/fulcro/3.7.10/fulcro-3.7.10.jar!/com/fulcrologic/fulcro/raw/components.cljc",680,23,new cljs.core.Keyword(null,"p","p",151049309),new cljs.core.Keyword(null,"auto","auto",-566279492),(new cljs.core.Delay(((function (seq__48017_48396,chunk__48019_48397,count__48020_48398,i__48021_48399,seq__47886,chunk__47889,count__47890,i__47891,target_48424,k_48423,seq__48017_48416__$1,temp__5825__auto___48415__$3,missing_initial_keys_48395,temp__5825__auto___48394__$2,initial_keys_48390,join_map_48391,join_keys_48392,initial_state_48389,temp__5825__auto___48387__$1,ident_48382,query_48383,constant_ident_QMARK__48384,map__48003,map__48003__$1,warnings_QMARK_,c,seq__47886__$1,temp__5825__auto__,components){
return (function (){
return new cljs.core.PersistentVector(null, 12, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Component",com.fulcrologic.fulcro.raw.components.component_name(c),"does not INCLUDE initial state for",com.fulcrologic.fulcro.raw.components.component_name(target_48424),"at join key",k_48423,"; however, ",com.fulcrologic.fulcro.raw.components.component_name(target_48424),"HAS initial state. This probably means your initial state graph is incomplete","and props on",com.fulcrologic.fulcro.raw.components.component_name(target_48424),"will be nil. See https://book.fulcrologic.com/#warn-initial-state-incomplete"], null);
});})(seq__48017_48396,chunk__48019_48397,count__48020_48398,i__48021_48399,seq__47886,chunk__47889,count__47890,i__47891,target_48424,k_48423,seq__48017_48416__$1,temp__5825__auto___48415__$3,missing_initial_keys_48395,temp__5825__auto___48394__$2,initial_keys_48390,join_map_48391,join_keys_48392,initial_state_48389,temp__5825__auto___48387__$1,ident_48382,query_48383,constant_ident_QMARK__48384,map__48003,map__48003__$1,warnings_QMARK_,c,seq__47886__$1,temp__5825__auto__,components))
,null)),null,(65),null,null,null);
} else {
}


var G__48429 = cljs.core.next(seq__48017_48416__$1);
var G__48430 = null;
var G__48431 = (0);
var G__48432 = (0);
seq__48017_48396 = G__48429;
chunk__48019_48397 = G__48430;
count__48020_48398 = G__48431;
i__48021_48399 = G__48432;
continue;
}
} else {
}
}
break;
}
} else {
}
} else {
}
} else {
}


var G__48433 = cljs.core.next(seq__47886__$1);
var G__48434 = null;
var G__48435 = (0);
var G__48436 = (0);
seq__47886 = G__48433;
chunk__47889 = G__48434;
count__47890 = G__48435;
i__47891 = G__48436;
continue;
} else {
var G__48437 = cljs.core.next(seq__47886__$1);
var G__48438 = null;
var G__48439 = (0);
var G__48440 = (0);
seq__47886 = G__48437;
chunk__47889 = G__48438;
count__47890 = G__48439;
i__47891 = G__48440;
continue;
}
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
});
/**
 * Returns the keyword of the most likely ID attribute in the given props (the first one with the `name` "id").
 *   Returns nil if there isn't one. This is useful when trying to derive an ident from a sample tree of data, for example.
 */
com.fulcrologic.fulcro.raw.components.id_key = (function com$fulcrologic$fulcro$raw$components$id_key(props){
return cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__48035_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("id",cljs.core.name(p1__48035_SHARP_));
}),cljs.core.keys(props)));
});
/**
 * Returns the first child from a list of EQL AST nodes that looks like an entity ID key.
 */
com.fulcrologic.fulcro.raw.components.ast_id_key = (function com$fulcrologic$fulcro$raw$components$ast_id_key(children){
return new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p__48040){
var map__48047 = p__48040;
var map__48047__$1 = cljs.core.__destructure_map(map__48047);
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48047__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48047__$1,new cljs.core.Keyword(null,"key","key",-1516042587));
return (((key instanceof cljs.core.Keyword)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"prop","prop",-515168332),type)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("id",cljs.core.name(key))))));
}),children)));
});
com.fulcrologic.fulcro.raw.components.normalize_STAR_ = (function com$fulcrologic$fulcro$raw$components$normalize_STAR_(p__48052,p__48053){
var map__48054 = p__48052;
var map__48054__$1 = cljs.core.__destructure_map(map__48054);
var original_node = map__48054__$1;
var children = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48054__$1,new cljs.core.Keyword(null,"children","children",-940561982));
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48054__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var map__48055 = p__48053;
var map__48055__$1 = cljs.core.__destructure_map(map__48055);
var top_component_options = map__48055__$1;
var componentName = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48055__$1,new cljs.core.Keyword(null,"componentName","componentName",-2103437555));
var ident = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48055__$1,new cljs.core.Keyword(null,"ident","ident",-742346));
var qatom = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var component = (function() { 
var G__48455__delegate = function (args){
return null;
};
var G__48455 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__48456__i = 0, G__48456__a = new Array(arguments.length -  0);
while (G__48456__i < G__48456__a.length) {G__48456__a[G__48456__i] = arguments[G__48456__i + 0]; ++G__48456__i;}
  args = new cljs.core.IndexedSeq(G__48456__a,0,null);
} 
return G__48455__delegate.call(this,args);};
G__48455.cljs$lang$maxFixedArity = 0;
G__48455.cljs$lang$applyTo = (function (arglist__48457){
var args = cljs.core.seq(arglist__48457);
return G__48455__delegate(args);
});
G__48455.cljs$core$IFn$_invoke$arity$variadic = G__48455__delegate;
return G__48455;
})()
;
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"union","union",2142937499),type)){
var component_map = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__48058){
var map__48059 = p__48058;
var map__48059__$1 = cljs.core.__destructure_map(map__48059);
var c = map__48059__$1;
var union_key = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48059__$1,new cljs.core.Keyword(null,"union-key","union-key",1529707234));
var component__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48059__$1,new cljs.core.Keyword(null,"component","component",1555936782));
var component__$2 = (function (){var or__5002__auto__ = component__$1;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return new cljs.core.Keyword(null,"component","component",1555936782).cljs$core$IFn$_invoke$arity$1((function (){var G__48060 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(c,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"root","root",-448657453));
var G__48061 = cljs.core.PersistentArrayMap.EMPTY;
return (com.fulcrologic.fulcro.raw.components.normalize_STAR_.cljs$core$IFn$_invoke$arity$2 ? com.fulcrologic.fulcro.raw.components.normalize_STAR_.cljs$core$IFn$_invoke$arity$2(G__48060,G__48061) : com.fulcrologic.fulcro.raw.components.normalize_STAR_.call(null, G__48060,G__48061));
})());
}
})();
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [union_key,component__$2], null);
}),children));
var union_keys = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentHashSet.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"union-key","union-key",1529707234)),children);
var component__$1 = com.fulcrologic.fulcro.raw.components.configure_anonymous_component_BANG_(component,(function (){var G__48062 = cljs.core.with_meta(cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"initial-state","initial-state",-2021616806),(function() { 
var G__48466__delegate = function (args){
return cljs.core.PersistentArrayMap.EMPTY;
};
var G__48466 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__48474__i = 0, G__48474__a = new Array(arguments.length -  0);
while (G__48474__i < G__48474__a.length) {G__48474__a[G__48474__i] = arguments[G__48474__i + 0]; ++G__48474__i;}
  args = new cljs.core.IndexedSeq(G__48474__a,0,null);
} 
return G__48466__delegate.call(this,args);};
G__48466.cljs$lang$maxFixedArity = 0;
G__48466.cljs$lang$applyTo = (function (arglist__48475){
var args = cljs.core.seq(arglist__48475);
return G__48466__delegate(args);
});
G__48466.cljs$core$IFn$_invoke$arity$variadic = G__48466__delegate;
return G__48466;
})()
,new cljs.core.Keyword("fulcro","warnings?","fulcro/warnings?",1905945094),false], null),top_component_options,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"query","query",-1288509510),(function() { 
var G__48476__delegate = function (args){
return taoensso.encore.map_vals(com.fulcrologic.fulcro.raw.components.get_query,component_map);
};
var G__48476 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__48477__i = 0, G__48477__a = new Array(arguments.length -  0);
while (G__48477__i < G__48477__a.length) {G__48477__a[G__48477__i] = arguments[G__48477__i + 0]; ++G__48477__i;}
  args = new cljs.core.IndexedSeq(G__48477__a,0,null);
} 
return G__48476__delegate.call(this,args);};
G__48476.cljs$lang$maxFixedArity = 0;
G__48476.cljs$lang$applyTo = (function (arglist__48478){
var args = cljs.core.seq(arglist__48478);
return G__48476__delegate(args);
});
G__48476.cljs$core$IFn$_invoke$arity$variadic = G__48476__delegate;
return G__48476;
})()
,"props",new cljs.core.PersistentArrayMap(null, 1, ["fulcro$queryid",new cljs.core.Keyword(null,"anonymous","anonymous",447897231)], null)], null)], 0)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"query-id","query-id",1474128842),new cljs.core.Keyword(null,"anonymous","anonymous",447897231)], null));
var G__48062__$1 = ((cljs.core.not(ident))?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__48062,new cljs.core.Keyword(null,"ident","ident",-742346),(function (this$,props){
var temp__5825__auto__ = (union_keys.cljs$core$IFn$_invoke$arity$1 ? union_keys.cljs$core$IFn$_invoke$arity$1(props) : union_keys.call(null, props));
if(cljs.core.truth_(temp__5825__auto__)){
var k = temp__5825__auto__;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,cljs.core.get.cljs$core$IFn$_invoke$arity$2(props,k)], null);
} else {
return null;
}
})):G__48062);
if(cljs.core.truth_(componentName)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__48062__$1,new cljs.core.Keyword(null,"componentName","componentName",-2103437555),componentName);
} else {
return G__48062__$1;
}
})());
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(original_node,new cljs.core.Keyword(null,"component","component",1555936782),component__$1);
} else {
var real_id_key = com.fulcrologic.fulcro.raw.components.ast_id_key(children);
var new_children = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (p__48072){
var map__48074 = p__48072;
var map__48074__$1 = cljs.core.__destructure_map(map__48074);
var node = map__48074__$1;
var type__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48074__$1,new cljs.core.Keyword(null,"type","type",1174270348));
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(type__$1,new cljs.core.Keyword(null,"join","join",-758861890))) && (cljs.core.not(new cljs.core.Keyword(null,"component","component",1555936782).cljs$core$IFn$_invoke$arity$1(node))))){
var G__48075 = node;
var G__48076 = cljs.core.PersistentArrayMap.EMPTY;
return (com.fulcrologic.fulcro.raw.components.normalize_STAR_.cljs$core$IFn$_invoke$arity$2 ? com.fulcrologic.fulcro.raw.components.normalize_STAR_.cljs$core$IFn$_invoke$arity$2(G__48075,G__48076) : com.fulcrologic.fulcro.raw.components.normalize_STAR_.call(null, G__48075,G__48076));
} else {
return node;
}
}),children);
var component__$1 = com.fulcrologic.fulcro.raw.components.configure_anonymous_component_BANG_(component,(function (){var G__48079 = cljs.core.with_meta(cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"initial-state","initial-state",-2021616806),(function() { 
var G__48502__delegate = function (args){
return cljs.core.PersistentArrayMap.EMPTY;
};
var G__48502 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__48503__i = 0, G__48503__a = new Array(arguments.length -  0);
while (G__48503__i < G__48503__a.length) {G__48503__a[G__48503__i] = arguments[G__48503__i + 0]; ++G__48503__i;}
  args = new cljs.core.IndexedSeq(G__48503__a,0,null);
} 
return G__48502__delegate.call(this,args);};
G__48502.cljs$lang$maxFixedArity = 0;
G__48502.cljs$lang$applyTo = (function (arglist__48504){
var args = cljs.core.seq(arglist__48504);
return G__48502__delegate(args);
});
G__48502.cljs$core$IFn$_invoke$arity$variadic = G__48502__delegate;
return G__48502;
})()
,new cljs.core.Keyword("fulcro","warnings?","fulcro/warnings?",1905945094),false], null),top_component_options,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"query","query",-1288509510),(function() { 
var G__48505__delegate = function (args){
return cljs.core.deref(qatom);
};
var G__48505 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__48506__i = 0, G__48506__a = new Array(arguments.length -  0);
while (G__48506__i < G__48506__a.length) {G__48506__a[G__48506__i] = arguments[G__48506__i + 0]; ++G__48506__i;}
  args = new cljs.core.IndexedSeq(G__48506__a,0,null);
} 
return G__48505__delegate.call(this,args);};
G__48505.cljs$lang$maxFixedArity = 0;
G__48505.cljs$lang$applyTo = (function (arglist__48507){
var args = cljs.core.seq(arglist__48507);
return G__48505__delegate(args);
});
G__48505.cljs$core$IFn$_invoke$arity$variadic = G__48505__delegate;
return G__48505;
})()
,"props",new cljs.core.PersistentArrayMap(null, 1, ["fulcro$queryid",new cljs.core.Keyword(null,"anonymous","anonymous",447897231)], null)], null)], 0)),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"query-id","query-id",1474128842),new cljs.core.Keyword(null,"anonymous","anonymous",447897231)], null));
var G__48079__$1 = (cljs.core.truth_(componentName)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__48079,new cljs.core.Keyword(null,"componentName","componentName",-2103437555),componentName):G__48079);
if(cljs.core.truth_((function (){var and__5000__auto__ = real_id_key;
if(cljs.core.truth_(and__5000__auto__)){
return (!(cljs.core.contains_QMARK_(top_component_options,new cljs.core.Keyword(null,"ident","ident",-742346))));
} else {
return and__5000__auto__;
}
})())){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__48079__$1,new cljs.core.Keyword(null,"ident","ident",-742346),(function (_,props){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [real_id_key,cljs.core.get.cljs$core$IFn$_invoke$arity$2(props,real_id_key)], null);
}));
} else {
return G__48079__$1;
}
})());
var updated_node = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(original_node,new cljs.core.Keyword(null,"children","children",-940561982),new_children,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"component","component",1555936782),component__$1], 0));
var query = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(type,new cljs.core.Keyword(null,"join","join",-758861890)))?edn_query_language.core.ast__GT_query(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(updated_node,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"root","root",-448657453))):edn_query_language.core.ast__GT_query(updated_node));
var _ = cljs.core.reset_BANG_(qatom,query);
return updated_node;
}
});
/**
 * Create an anonymous normalizing query component. By default the normalization will be auto-detected based on there being a prop at each
 * entity level that has (any) namespace, and a name of `id`. For example:
 * 
 * ```
 * [:list/id :list/name {:list/items [:item/id :item/complete? :item/label]}]
 * ```
 * 
 * will create a normalizing query that expects the top-level values to be normalized by `:list/id` and the nested
 * items to be normalized by `:item/id`. If there is more than one ID in your props, make sure the *first* one is
 * the one to use for normalization.
 * 
 * The `top-component-options` becomes the options map of the component.
 * 
 * You can include :componentName to push the resulting anonymous component definition into the component registry, which
 * is needed by some parts of Fulcro, like UISM.
 * 
 * NOTE: `nc` is recursive, and *does* compose if you want to name the components at various levels. It can be used with queries from
 * other defsc components:
 * 
 * ```
 * (def query (nc [:user/id
 *                 :user/name
 *                 ;; Generate an anonymous component that is available in the registry under ::Session
 *                 {:user/session-details (nc [:session/id :session/last-login] {:componentName ::Session})}
 *                 ;; Use a defsc query as the source
 *                 {:user/settings (comp/get-query Settings)}
 *                 ;; Autogenerates an anonymous address query component that has no name
 *                 {:user/address [:address/id :address/street]}]))
 * ```
 * 
 */
com.fulcrologic.fulcro.raw.components.nc = (function com$fulcrologic$fulcro$raw$components$nc(var_args){
var G__48084 = arguments.length;
switch (G__48084) {
case 1:
return com.fulcrologic.fulcro.raw.components.nc.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return com.fulcrologic.fulcro.raw.components.nc.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.raw.components.nc.cljs$core$IFn$_invoke$arity$1 = (function (query){
return com.fulcrologic.fulcro.raw.components.nc.cljs$core$IFn$_invoke$arity$2(query,cljs.core.PersistentArrayMap.EMPTY);
}));

(com.fulcrologic.fulcro.raw.components.nc.cljs$core$IFn$_invoke$arity$2 = (function (query,p__48095){
var map__48096 = p__48095;
var map__48096__$1 = cljs.core.__destructure_map(map__48096);
var top_component_options = map__48096__$1;
var componentName = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48096__$1,new cljs.core.Keyword(null,"componentName","componentName",-2103437555));
if(cljs.core.map_QMARK_(query)){
var ast = cljs.core.first(new cljs.core.Keyword(null,"children","children",-940561982).cljs$core$IFn$_invoke$arity$1(cljs.core.first(new cljs.core.Keyword(null,"children","children",-940561982).cljs$core$IFn$_invoke$arity$1(edn_query_language.core.query__GT_ast(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"placeholder","placeholder",-104873083),query], null)], null))))));
return new cljs.core.Keyword(null,"component","component",1555936782).cljs$core$IFn$_invoke$arity$1(com.fulcrologic.fulcro.raw.components.normalize_STAR_(ast,top_component_options));
} else {
var ast = edn_query_language.core.query__GT_ast(query);
return new cljs.core.Keyword(null,"component","component",1555936782).cljs$core$IFn$_invoke$arity$1(com.fulcrologic.fulcro.raw.components.normalize_STAR_(ast,top_component_options));
}
}));

(com.fulcrologic.fulcro.raw.components.nc.cljs$lang$maxFixedArity = 2);

/**
 * Creates a normalizing component from an entity tree. Every sub-element of the tree provided will generate an anonymous
 * normalizing component if that element has an ID field. For to-many relations only the first item is used for query/ident
 * generation.
 * 
 * The returned anonymous component will have initial state that matches the provided entity data tree.
 * 
 * This means you can use a sample tree to generate both the initial state for a subtree of your app and the components
 * necessary to do I/O on that tree.
 * 
 * This kind of component will *not* be registered in the component registry unless you pass a :componentName
 * via the top-level-options. A registry entry is necessary for things that
 * require the registry, such as dynamic queries and UI state machines).
 * 
 */
com.fulcrologic.fulcro.raw.components.entity__GT_component = (function com$fulcrologic$fulcro$raw$components$entity__GT_component(var_args){
var G__48110 = arguments.length;
switch (G__48110) {
case 1:
return com.fulcrologic.fulcro.raw.components.entity__GT_component.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return com.fulcrologic.fulcro.raw.components.entity__GT_component.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.raw.components.entity__GT_component.cljs$core$IFn$_invoke$arity$1 = (function (entity_data_tree){
return com.fulcrologic.fulcro.raw.components.entity__GT_component.cljs$core$IFn$_invoke$arity$2(entity_data_tree,cljs.core.PersistentArrayMap.EMPTY);
}));

(com.fulcrologic.fulcro.raw.components.entity__GT_component.cljs$core$IFn$_invoke$arity$2 = (function (entity_data_tree,top_level_options){
var map__48113 = cljs.core.reduce_kv((function (result,k,v){
if(((cljs.core.vector_QMARK_(v)) && (cljs.core.every_QMARK_(cljs.core.map_QMARK_,v)))){
var c = com.fulcrologic.fulcro.raw.components.entity__GT_component.cljs$core$IFn$_invoke$arity$1(cljs.core.first(v));
return cljs.core.update.cljs$core$IFn$_invoke$arity$5(cljs.core.update.cljs$core$IFn$_invoke$arity$5(result,new cljs.core.Keyword(null,"initial-state","initial-state",-2021616806),cljs.core.assoc,k,v),new cljs.core.Keyword(null,"joins","joins",1033962699),cljs.core.assoc,k,com.fulcrologic.fulcro.raw.components.query(c));
} else {
if(cljs.core.map_QMARK_(v)){
var c = com.fulcrologic.fulcro.raw.components.entity__GT_component.cljs$core$IFn$_invoke$arity$1(v);
return cljs.core.update.cljs$core$IFn$_invoke$arity$5(cljs.core.update.cljs$core$IFn$_invoke$arity$5(result,new cljs.core.Keyword(null,"initial-state","initial-state",-2021616806),cljs.core.assoc,k,v),new cljs.core.Keyword(null,"joins","joins",1033962699),cljs.core.assoc,k,com.fulcrologic.fulcro.raw.components.query(c));
} else {
return cljs.core.update.cljs$core$IFn$_invoke$arity$4(cljs.core.update.cljs$core$IFn$_invoke$arity$5(result,new cljs.core.Keyword(null,"initial-state","initial-state",-2021616806),cljs.core.assoc,k,v),new cljs.core.Keyword(null,"attrs","attrs",-2090668713),cljs.core.conj,k);

}
}
}),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"attrs","attrs",-2090668713),cljs.core.PersistentHashSet.EMPTY,new cljs.core.Keyword(null,"initial-state","initial-state",-2021616806),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"joins","joins",1033962699),cljs.core.PersistentArrayMap.EMPTY], null),entity_data_tree);
var map__48113__$1 = cljs.core.__destructure_map(map__48113);
var joins = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48113__$1,new cljs.core.Keyword(null,"joins","joins",1033962699));
var initial_state = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48113__$1,new cljs.core.Keyword(null,"initial-state","initial-state",-2021616806));
var attrs = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48113__$1,new cljs.core.Keyword(null,"attrs","attrs",-2090668713));
var query = cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.vec(attrs),cljs.core.map.cljs$core$IFn$_invoke$arity$1((function com$fulcrologic$fulcro$raw$components$build_subquery_STAR_(p__48115){
var vec__48116 = p__48115;
var join_key = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48116,(0),null);
var subquery = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48116,(1),null);
return cljs.core.PersistentArrayMap.createAsIfByAssoc([join_key,subquery]);
})),joins);
return com.fulcrologic.fulcro.raw.components.nc.cljs$core$IFn$_invoke$arity$2(query,cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"initial-state","initial-state",-2021616806),(function() { 
var G__48584__delegate = function (args){
return initial_state;
};
var G__48584 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__48586__i = 0, G__48586__a = new Array(arguments.length -  0);
while (G__48586__i < G__48586__a.length) {G__48586__a[G__48586__i] = arguments[G__48586__i + 0]; ++G__48586__i;}
  args = new cljs.core.IndexedSeq(G__48586__a,0,null);
} 
return G__48584__delegate.call(this,args);};
G__48584.cljs$lang$maxFixedArity = 0;
G__48584.cljs$lang$applyTo = (function (arglist__48587){
var args = cljs.core.seq(arglist__48587);
return G__48584__delegate(args);
});
G__48584.cljs$core$IFn$_invoke$arity$variadic = G__48584__delegate;
return G__48584;
})()
], null),top_level_options], 0)));
}));

(com.fulcrologic.fulcro.raw.components.entity__GT_component.cljs$lang$maxFixedArity = 2);

var get_subquery_component_STAR_ = (function com$fulcrologic$fulcro$raw$components$get_subquery_component_STAR_(c,ast_nodes,query_path){
while(true){
if(cljs.core.empty_QMARK_(ast_nodes)){
return c;
} else {
var k = cljs.core.first(query_path);
var ks = cljs.core.rest(query_path);
var map__48130 = cljs.core.first(cljs.core.filter.cljs$core$IFn$_invoke$arity$2(((function (c,ast_nodes,query_path,k,ks){
return (function (p1__48120_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(k,new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(p1__48120_SHARP_));
});})(c,ast_nodes,query_path,k,ks))
,ast_nodes));
var map__48130__$1 = cljs.core.__destructure_map(map__48130);
var node = map__48130__$1;
var component = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48130__$1,new cljs.core.Keyword(null,"component","component",1555936782));
var children = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__48130__$1,new cljs.core.Keyword(null,"children","children",-940561982));
if(cljs.core.seq(ks)){
var G__48604 = component;
var G__48605 = children;
var G__48606 = ks;
c = G__48604;
ast_nodes = G__48605;
query_path = G__48606;
continue;
} else {
return component;
}
}
break;
}
});
/**
 * Obtains the normalizing component that is associated with the given query path on the given component.
 * 
 *  For example `(get-subquery-component Person [:person/addresses])` would return the component for
 *  the `:person/addresses` join. If state-map is supplied then dynamic query support is possible; otherwise it
 *  will be the original static query.
 */
com.fulcrologic.fulcro.raw.components.get_subquery_component = (function com$fulcrologic$fulcro$raw$components$get_subquery_component(var_args){
var G__48133 = arguments.length;
switch (G__48133) {
case 2:
return com.fulcrologic.fulcro.raw.components.get_subquery_component.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return com.fulcrologic.fulcro.raw.components.get_subquery_component.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.raw.components.get_subquery_component.cljs$core$IFn$_invoke$arity$2 = (function (component,query_path){
return com.fulcrologic.fulcro.raw.components.get_subquery_component.cljs$core$IFn$_invoke$arity$3(component,query_path,cljs.core.PersistentArrayMap.EMPTY);
}));

(com.fulcrologic.fulcro.raw.components.get_subquery_component.cljs$core$IFn$_invoke$arity$3 = (function (component,query_path,state_map){
var query = com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$2(component,state_map);
var ast_nodes = new cljs.core.Keyword(null,"children","children",-940561982).cljs$core$IFn$_invoke$arity$1(edn_query_language.core.query__GT_ast(query));
return get_subquery_component_STAR_(component,ast_nodes,query_path);
}));

(com.fulcrologic.fulcro.raw.components.get_subquery_component.cljs$lang$maxFixedArity = 3);

/**
 * Uses `fdn/traced-db->tree` to get the props of the component at `ident`, and leverages those optimizations to return
 * `prior-props` if they are not stale.
 * 
 * A subsequent call (e.g. on next render frame) of this function with the prior return value (as `prior-props`)
 * thus gives you an efficient non-react replacement for `shouldComponentUpdate`, etc.
 * 
 */
com.fulcrologic.fulcro.raw.components.get_traced_props = (function com$fulcrologic$fulcro$raw$components$get_traced_props(state_map,component,ident,prior_props){
var query = com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$2(component,state_map);
if(cljs.core.truth_(com.fulcrologic.fulcro.algorithms.denormalize.possibly_stale_QMARK_(state_map,prior_props))){
return com.fulcrologic.fulcro.algorithms.denormalize.traced_db__GT_tree(state_map,ident,query);
} else {
return prior_props;
}
});
/**
 * Returns true if there is already data at a component's `ident`
 */
com.fulcrologic.fulcro.raw.components.has_active_state_QMARK_ = (function com$fulcrologic$fulcro$raw$components$has_active_state_QMARK_(state_map,ident){
var current_value = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state_map,ident);
return ((cljs.core.map_QMARK_(current_value)) && (cljs.core.seq(current_value)));
});
/**
 * Returns true if the given component class or instance has a query that represents a union query.
 */
com.fulcrologic.fulcro.raw.components.union_component_QMARK_ = (function com$fulcrologic$fulcro$raw$components$union_component_QMARK_(var_args){
var G__48143 = arguments.length;
switch (G__48143) {
case 1:
return com.fulcrologic.fulcro.raw.components.union_component_QMARK_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return com.fulcrologic.fulcro.raw.components.union_component_QMARK_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.raw.components.union_component_QMARK_.cljs$core$IFn$_invoke$arity$1 = (function (c){
return com.fulcrologic.fulcro.raw.components.union_component_QMARK_.cljs$core$IFn$_invoke$arity$2(c,com.fulcrologic.fulcro.raw.components._STAR_query_state_STAR_);
}));

(com.fulcrologic.fulcro.raw.components.union_component_QMARK_.cljs$core$IFn$_invoke$arity$2 = (function (c,state_map){
return cljs.core.map_QMARK_(com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$2(c,state_map));
}));

(com.fulcrologic.fulcro.raw.components.union_component_QMARK_.cljs$lang$maxFixedArity = 2);

/**
 * Gets the component class that should be used for the specific entity (props) supplied.
 */
com.fulcrologic.fulcro.raw.components.union_child_for_props = (function com$fulcrologic$fulcro$raw$components$union_child_for_props(var_args){
var G__48147 = arguments.length;
switch (G__48147) {
case 1:
return com.fulcrologic.fulcro.raw.components.union_child_for_props.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return com.fulcrologic.fulcro.raw.components.union_child_for_props.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return com.fulcrologic.fulcro.raw.components.union_child_for_props.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.fulcro.raw.components.union_child_for_props.cljs$core$IFn$_invoke$arity$1 = (function (instance){
return com.fulcrologic.fulcro.raw.components.union_child_for_props.cljs$core$IFn$_invoke$arity$3(instance,com.fulcrologic.fulcro.raw.components.props(instance),com.fulcrologic.fulcro.raw.components._STAR_query_state_STAR_);
}));

(com.fulcrologic.fulcro.raw.components.union_child_for_props.cljs$core$IFn$_invoke$arity$2 = (function (cls_or_instance,props){
return com.fulcrologic.fulcro.raw.components.union_child_for_props.cljs$core$IFn$_invoke$arity$3(cls_or_instance,props,com.fulcrologic.fulcro.raw.components._STAR_query_state_STAR_);
}));

(com.fulcrologic.fulcro.raw.components.union_child_for_props.cljs$core$IFn$_invoke$arity$3 = (function (cls_or_instance,props,state_map){
var vec__48149 = com.fulcrologic.fulcro.raw.components.get_ident.cljs$core$IFn$_invoke$arity$2(cls_or_instance,props);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48149,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__48149,(1),null);
return new cljs.core.Keyword(null,"component","component",1555936782).cljs$core$IFn$_invoke$arity$1(cljs.core.meta(cljs.core.get.cljs$core$IFn$_invoke$arity$2(com.fulcrologic.fulcro.raw.components.get_query.cljs$core$IFn$_invoke$arity$2(cls_or_instance,state_map),k)));
}));

(com.fulcrologic.fulcro.raw.components.union_child_for_props.cljs$lang$maxFixedArity = 3);


//# sourceMappingURL=com.fulcrologic.fulcro.raw.components.js.map
