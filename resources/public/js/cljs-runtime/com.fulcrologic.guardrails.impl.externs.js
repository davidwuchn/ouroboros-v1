goog.provide('com.fulcrologic.guardrails.impl.externs');
if((typeof com !== 'undefined') && (typeof com.fulcrologic !== 'undefined') && (typeof com.fulcrologic.guardrails !== 'undefined') && (typeof com.fulcrologic.guardrails.impl !== 'undefined') && (typeof com.fulcrologic.guardrails.impl.externs !== 'undefined') && (typeof com.fulcrologic.guardrails.impl.externs.externs_registry !== 'undefined')){
} else {
com.fulcrologic.guardrails.impl.externs.externs_registry = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
}
if((typeof com !== 'undefined') && (typeof com.fulcrologic !== 'undefined') && (typeof com.fulcrologic.guardrails !== 'undefined') && (typeof com.fulcrologic.guardrails.impl !== 'undefined') && (typeof com.fulcrologic.guardrails.impl.externs !== 'undefined') && (typeof com.fulcrologic.guardrails.impl.externs.spec_registry !== 'undefined')){
} else {
com.fulcrologic.guardrails.impl.externs.spec_registry = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
}
if((typeof com !== 'undefined') && (typeof com.fulcrologic !== 'undefined') && (typeof com.fulcrologic.guardrails !== 'undefined') && (typeof com.fulcrologic.guardrails.impl !== 'undefined') && (typeof com.fulcrologic.guardrails.impl.externs !== 'undefined') && (typeof com.fulcrologic.guardrails.impl.externs.function_registry !== 'undefined')){
} else {
com.fulcrologic.guardrails.impl.externs.function_registry = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
}
if((typeof com !== 'undefined') && (typeof com.fulcrologic !== 'undefined') && (typeof com.fulcrologic.guardrails !== 'undefined') && (typeof com.fulcrologic.guardrails.impl !== 'undefined') && (typeof com.fulcrologic.guardrails.impl.externs !== 'undefined') && (typeof com.fulcrologic.guardrails.impl.externs.external_function_registry !== 'undefined')){
} else {
com.fulcrologic.guardrails.impl.externs.external_function_registry = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
}
com.fulcrologic.guardrails.impl.externs.register_externs_BANG_ = (function com$fulcrologic$guardrails$impl$externs$register_externs_BANG_(NS,fn_name,externs){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(com.fulcrologic.guardrails.impl.externs.externs_registry,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [NS,fn_name], null),externs);
});
com.fulcrologic.guardrails.impl.externs.register_specs_BANG_ = (function com$fulcrologic$guardrails$impl$externs$register_specs_BANG_(function$){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(com.fulcrologic.guardrails.impl.externs.spec_registry,cljs.core.merge,new cljs.core.Keyword("com.fulcrologic.guardrails.registry","spec-registry","com.fulcrologic.guardrails.registry/spec-registry",1477479211).cljs$core$IFn$_invoke$arity$1(function$));
});
com.fulcrologic.guardrails.impl.externs.clean_function = (function com$fulcrologic$guardrails$impl$externs$clean_function(function$){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core.update.cljs$core$IFn$_invoke$arity$3(function$,new cljs.core.Keyword("com.fulcrologic.guardrails.registry","arities","com.fulcrologic.guardrails.registry/arities",1446074922),cljs.core.partial.cljs$core$IFn$_invoke$arity$2(com.fulcrologic.guardrails.utils.map_vals,(function (p1__35586_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__35586_SHARP_,new cljs.core.Keyword("com.fulcrologic.guardrails.registry","body","com.fulcrologic.guardrails.registry/body",1170523854));
}))),new cljs.core.Keyword("com.fulcrologic.guardrails.registry","spec-registry","com.fulcrologic.guardrails.registry/spec-registry",1477479211));
});
com.fulcrologic.guardrails.impl.externs.register_function_BANG_ = (function com$fulcrologic$guardrails$impl$externs$register_function_BANG_(NS,fn_name,function$){
com.fulcrologic.guardrails.impl.externs.register_specs_BANG_(function$);

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(com.fulcrologic.guardrails.impl.externs.function_registry,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [NS,fn_name], null),com.fulcrologic.guardrails.impl.externs.clean_function(function$));
});
com.fulcrologic.guardrails.impl.externs.record_defn_BANG_ = (function com$fulcrologic$guardrails$impl$externs$record_defn_BANG_(NS,p__35627,externs){
var map__35631 = p__35627;
var map__35631__$1 = cljs.core.__destructure_map(map__35631);
var function$ = map__35631__$1;
var fn_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35631__$1,new cljs.core.Keyword("com.fulcrologic.guardrails.registry","fn-name","com.fulcrologic.guardrails.registry/fn-name",-1837692103));
com.fulcrologic.guardrails.impl.externs.register_externs_BANG_(NS,fn_name,externs);

return com.fulcrologic.guardrails.impl.externs.register_function_BANG_(NS,fn_name,function$);
});
com.fulcrologic.guardrails.impl.externs.register_external_function_BANG_ = (function com$fulcrologic$guardrails$impl$externs$register_external_function_BANG_(p__35638){
var map__35639 = p__35638;
var map__35639__$1 = cljs.core.__destructure_map(map__35639);
var external_function = map__35639__$1;
var var_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35639__$1,new cljs.core.Keyword("com.fulcrologic.guardrails.registry","var-name","com.fulcrologic.guardrails.registry/var-name",502701799));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(com.fulcrologic.guardrails.impl.externs.external_function_registry,cljs.core.assoc,var_name,com.fulcrologic.guardrails.impl.externs.clean_function(external_function));
});
com.fulcrologic.guardrails.impl.externs.record_fdef_BANG_ = (function com$fulcrologic$guardrails$impl$externs$record_fdef_BANG_(external_function){
com.fulcrologic.guardrails.impl.externs.register_specs_BANG_(external_function);

return com.fulcrologic.guardrails.impl.externs.register_external_function_BANG_(external_function);
});
/**
 * Returns the information known about the given qualified symbol (if it was declared with >defn in
 *   copilot mode, or has register a gspec on an external function) .
 */
com.fulcrologic.guardrails.impl.externs.function_info = (function com$fulcrologic$guardrails$impl$externs$function_info(qualified_symbol){
var spc = cljs.core.namespace(qualified_symbol);
var simple_name = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.name(qualified_symbol));
var or__5002__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(com.fulcrologic.guardrails.impl.externs.external_function_registry),qualified_symbol);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(com.fulcrologic.guardrails.impl.externs.function_registry),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [spc,simple_name], null));
}
});
/**
 * Returns true if the given fully-qualified symbol was declared with >defn and the arity (which is a number
 * or :n) is marked as pure.
 */
com.fulcrologic.guardrails.impl.externs.pure_QMARK_ = (function com$fulcrologic$guardrails$impl$externs$pure_QMARK_(qualified_symbol,arity){
return cljs.core.boolean$((function (){var info = com.fulcrologic.guardrails.impl.externs.function_info(qualified_symbol);
var has_arity_QMARK_ = cljs.core.boolean$(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(info,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.guardrails.registry","arities","com.fulcrologic.guardrails.registry/arities",1446074922),arity], null)));
var map__35653 = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(info,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("com.fulcrologic.guardrails.registry","arities","com.fulcrologic.guardrails.registry/arities",1446074922),((has_arity_QMARK_)?arity:new cljs.core.Keyword(null,"n","n",562130025)),new cljs.core.Keyword("com.fulcrologic.guardrails.registry","gspec","com.fulcrologic.guardrails.registry/gspec",207045467),new cljs.core.Keyword("com.fulcrologic.guardrails.registry","metadata","com.fulcrologic.guardrails.registry/metadata",-1389979282)], null));
var map__35653__$1 = cljs.core.__destructure_map(map__35653);
var pure = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35653__$1,new cljs.core.Keyword(null,"pure","pure",1433370394));
var pure_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35653__$1,new cljs.core.Keyword(null,"pure?","pure?",350862691));
var or__5002__auto__ = pure;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return pure_QMARK_;
}
})());
});
/**
 * Returns the function spec system that was used in the type signature of the given symbol, or nil if that
 * function isn't registered with guardrails.
 */
com.fulcrologic.guardrails.impl.externs.spec_system = (function com$fulcrologic$guardrails$impl$externs$spec_system(qualified_symbol){
var map__35657 = com.fulcrologic.guardrails.impl.externs.function_info(qualified_symbol);
var map__35657__$1 = cljs.core.__destructure_map(map__35657);
var info = map__35657__$1;
var spec_system = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35657__$1,new cljs.core.Keyword("com.fulcrologic.guardrails.registry","spec-system","com.fulcrologic.guardrails.registry/spec-system",-484591590));
if(cljs.core.truth_(info)){
var or__5002__auto__ = spec_system;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return new cljs.core.Keyword("org.clojure","spec1","org.clojure/spec1",-2090493001);
}
} else {
return null;
}
});
/**
 * Returns the externs map for the given qualified function symbol, or nil if not found.
 */
com.fulcrologic.guardrails.impl.externs.get_externs = (function com$fulcrologic$guardrails$impl$externs$get_externs(fn_sym){
var ns_str = cljs.core.namespace(fn_sym);
var name_sym = cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(cljs.core.name(fn_sym));
return cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(com.fulcrologic.guardrails.impl.externs.externs_registry),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [ns_str,name_sym], null));
});
/**
 * Returns true if the symbol's namespace starts with one of the scope prefixes.
 */
com.fulcrologic.guardrails.impl.externs.in_scope_QMARK_ = (function com$fulcrologic$guardrails$impl$externs$in_scope_QMARK_(sym,scope_ns_prefixes){
var temp__5825__auto__ = cljs.core.namespace(sym);
if(cljs.core.truth_(temp__5825__auto__)){
var ns = temp__5825__auto__;
return cljs.core.some((function (p1__35715_SHARP_){
return clojure.string.starts_with_QMARK_(ns,p1__35715_SHARP_);
}),scope_ns_prefixes);
} else {
return null;
}
});
/**
 * Returns set of qualified symbols that fn-sym directly calls within scope.
 * Only includes functions that are in the function-registry (guardrailed functions)
 * AND whose namespace matches one of the scope-ns-prefixes.
 * Excludes the function itself (self-references from >defn processing).
 * 
 * fn-sym - Fully qualified symbol of the function
 * scope-ns-prefixes - Set of namespace prefix strings to include (e.g. #{"myapp"})
 */
com.fulcrologic.guardrails.impl.externs.direct_calls = (function com$fulcrologic$guardrails$impl$externs$direct_calls(fn_sym,scope_ns_prefixes){
var temp__5825__auto__ = com.fulcrologic.guardrails.impl.externs.get_externs(fn_sym);
if(cljs.core.truth_(temp__5825__auto__)){
var externs = temp__5825__auto__;
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p1__35739_SHARP_){
return cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(p1__35739_SHARP_,fn_sym);
}),cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p1__35738_SHARP_){
return com.fulcrologic.guardrails.impl.externs.in_scope_QMARK_(p1__35738_SHARP_,scope_ns_prefixes);
}),cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (quoted_sym){
if(((cljs.core.seq_QMARK_(quoted_sym)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first(quoted_sym))))){
return cljs.core.second(quoted_sym);
} else {
return quoted_sym;
}
}),cljs.core.map.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("com.fulcrologic.guardrails.registry","extern-name","com.fulcrologic.guardrails.registry/extern-name",-1093197521),cljs.core.remove.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword("com.fulcrologic.guardrails.registry","macro?","com.fulcrologic.guardrails.registry/macro?",1891123845),cljs.core.vals(externs)))))));
} else {
return null;
}
});
/**
 * Returns all function symbols defined with guardrails in namespaces matching scope prefixes.
 */
com.fulcrologic.guardrails.impl.externs.all_in_scope_functions = (function com$fulcrologic$guardrails$impl$externs$all_in_scope_functions(scope_ns_prefixes){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentHashSet.EMPTY,cljs.core.mapcat.cljs$core$IFn$_invoke$arity$variadic((function (p__35749){
var vec__35750 = p__35749;
var ns_str = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35750,(0),null);
var fns = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35750,(1),null);
if(cljs.core.truth_(cljs.core.some((function (p1__35748_SHARP_){
return clojure.string.starts_with_QMARK_(ns_str,p1__35748_SHARP_);
}),scope_ns_prefixes))){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__35753){
var vec__35754 = p__35753;
var fn_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35754,(0),null);
var _ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35754,(1),null);
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(ns_str,cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_name));
}),fns);
} else {
return null;
}
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.deref(com.fulcrologic.guardrails.impl.externs.function_registry)], 0)));
});
/**
 * Returns all functions transitively called by fn-sym within scope.
 * Includes fn-sym itself. Only includes guardrailed functions in scope.
 * 
 * fn-sym - Fully qualified symbol of the function
 * scope-ns-prefixes - Set of namespace prefix strings to include
 */
com.fulcrologic.guardrails.impl.externs.transitive_calls = (function com$fulcrologic$guardrails$impl$externs$transitive_calls(fn_sym,scope_ns_prefixes){
var to_visit = cljs.core.PersistentHashSet.createAsIfByAssoc([fn_sym]);
var visited = cljs.core.PersistentHashSet.EMPTY;
while(true){
if(cljs.core.empty_QMARK_(to_visit)){
return visited;
} else {
var current = cljs.core.first(to_visit);
var calls = (function (){var or__5002__auto__ = com.fulcrologic.guardrails.impl.externs.direct_calls(current,scope_ns_prefixes);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return cljs.core.PersistentHashSet.EMPTY;
}
})();
var G__35795 = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.disj.cljs$core$IFn$_invoke$arity$2(to_visit,current),cljs.core.remove.cljs$core$IFn$_invoke$arity$2(visited,calls));
var G__35796 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(visited,current);
to_visit = G__35795;
visited = G__35796;
continue;
}
break;
}
});
/**
 * Returns a map of {fn-sym -> #{called-fn-syms}} for all guardrailed functions
 * in the given namespace scope.
 * 
 * scope-ns-prefixes - Set of namespace prefix strings to include
 */
com.fulcrologic.guardrails.impl.externs.call_graph = (function com$fulcrologic$guardrails$impl$externs$call_graph(scope_ns_prefixes){
var all_fns = com.fulcrologic.guardrails.impl.externs.all_in_scope_functions(scope_ns_prefixes);
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__5480__auto__ = (function com$fulcrologic$guardrails$impl$externs$call_graph_$_iter__35768(s__35769){
return (new cljs.core.LazySeq(null,(function (){
var s__35769__$1 = s__35769;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__35769__$1);
if(temp__5825__auto__){
var s__35769__$2 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(s__35769__$2)){
var c__5478__auto__ = cljs.core.chunk_first(s__35769__$2);
var size__5479__auto__ = cljs.core.count(c__5478__auto__);
var b__35771 = cljs.core.chunk_buffer(size__5479__auto__);
if((function (){var i__35770 = (0);
while(true){
if((i__35770 < size__5479__auto__)){
var fn_sym = cljs.core._nth(c__5478__auto__,i__35770);
cljs.core.chunk_append(b__35771,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [fn_sym,com.fulcrologic.guardrails.impl.externs.direct_calls(fn_sym,scope_ns_prefixes)], null));

var G__35801 = (i__35770 + (1));
i__35770 = G__35801;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__35771),com$fulcrologic$guardrails$impl$externs$call_graph_$_iter__35768(cljs.core.chunk_rest(s__35769__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__35771),null);
}
} else {
var fn_sym = cljs.core.first(s__35769__$2);
return cljs.core.cons(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [fn_sym,com.fulcrologic.guardrails.impl.externs.direct_calls(fn_sym,scope_ns_prefixes)], null),com$fulcrologic$guardrails$impl$externs$call_graph_$_iter__35768(cljs.core.rest(s__35769__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5480__auto__(all_fns);
})());
});

//# sourceMappingURL=com.fulcrologic.guardrails.impl.externs.js.map
