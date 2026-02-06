goog.provide('com.fulcrologic.guardrails.config');
com.fulcrologic.guardrails.config.mode = (function com$fulcrologic$guardrails$config$mode(config){
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(config,new cljs.core.Keyword(null,"mode","mode",654403691),new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
});
com.fulcrologic.guardrails.config.default_config = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"defn-macro","defn-macro",-1026559559),null,new cljs.core.Keyword(null,"expound","expound",485558675),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"show-valid-values?","show-valid-values?",-587258094),true,new cljs.core.Keyword(null,"print-specs?","print-specs?",146397677),true], null)], null);
var _STAR_config_cache_35875 = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("com.fulcrologic.guardrails.config","timestamp","com.fulcrologic.guardrails.config/timestamp",21000943),(0),new cljs.core.Keyword("com.fulcrologic.guardrails.config","value","com.fulcrologic.guardrails.config/value",-1205426595),null], null));
var warned_QMARK__35876 = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(false);
var read_config_file_35877 = (function (){
return null;
});
var reload_config_35878 = (function (){
var config = (function (){var cljs_compiler_config = (cljs.core.truth_(cljs.env._STAR_compiler_STAR_)?cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cljs.env._STAR_compiler_STAR_),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"options","options",99638489),new cljs.core.Keyword(null,"external-config","external-config",-471423941),new cljs.core.Keyword(null,"guardrails","guardrails",1765380016)], null)):null);
return null;

})();
return config;
});
com.fulcrologic.guardrails.config.get_env_config = (function com$fulcrologic$guardrails$config$get_env_config(var_args){
var G__35818 = arguments.length;
switch (G__35818) {
case 0:
return com.fulcrologic.guardrails.config.get_env_config.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return com.fulcrologic.guardrails.config.get_env_config.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.guardrails.config.get_env_config.cljs$core$IFn$_invoke$arity$0 = (function (){
return com.fulcrologic.guardrails.config.get_env_config.cljs$core$IFn$_invoke$arity$1(true);
}));

(com.fulcrologic.guardrails.config.get_env_config.cljs$core$IFn$_invoke$arity$1 = (function (cache_QMARK_){
var result = ((cljs.core.not(cache_QMARK_))?reload_config_35878():(function (){var now = cljs.core.long$(cljs.core.identity(Date.now()));
var since_last = (now - cljs.core.long$(new cljs.core.Keyword("com.fulcrologic.guardrails.config","timestamp","com.fulcrologic.guardrails.config/timestamp",21000943).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(_STAR_config_cache_35875))));
if((since_last < (2000))){
return new cljs.core.Keyword("com.fulcrologic.guardrails.config","value","com.fulcrologic.guardrails.config/value",-1205426595).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(_STAR_config_cache_35875));
} else {
return new cljs.core.Keyword("com.fulcrologic.guardrails.config","value","com.fulcrologic.guardrails.config/value",-1205426595).cljs$core$IFn$_invoke$arity$1(cljs.core.reset_BANG_(_STAR_config_cache_35875,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword("com.fulcrologic.guardrails.config","timestamp","com.fulcrologic.guardrails.config/timestamp",21000943),now,new cljs.core.Keyword("com.fulcrologic.guardrails.config","value","com.fulcrologic.guardrails.config/value",-1205426595),reload_config_35878()], null)));
}
})());
var cljs_compiler_config = (cljs.core.truth_(cljs.env._STAR_compiler_STAR_)?cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(cljs.env._STAR_compiler_STAR_),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"options","options",99638489),new cljs.core.Keyword(null,"external-config","external-config",-471423941),new cljs.core.Keyword(null,"guardrails","guardrails",1765380016)], null)):null);
var mode_config = null;
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([result,cljs_compiler_config,mode_config], 0));
}));

(com.fulcrologic.guardrails.config.get_env_config.cljs$lang$maxFixedArity = 1);

/**
 * Base config is defaults + env config.
 */
com.fulcrologic.guardrails.config.get_base_config_fn = (function com$fulcrologic$guardrails$config$get_base_config_fn(var_args){
var G__35830 = arguments.length;
switch (G__35830) {
case 0:
return com.fulcrologic.guardrails.config.get_base_config_fn.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return com.fulcrologic.guardrails.config.get_base_config_fn.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.guardrails.config.get_base_config_fn.cljs$core$IFn$_invoke$arity$0 = (function (){
return com.fulcrologic.guardrails.config.get_base_config_fn.cljs$core$IFn$_invoke$arity$1(true);
}));

(com.fulcrologic.guardrails.config.get_base_config_fn.cljs$core$IFn$_invoke$arity$1 = (function (cache_QMARK_){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([com.fulcrologic.guardrails.config.default_config,com.fulcrologic.guardrails.config.get_env_config.cljs$core$IFn$_invoke$arity$1(cache_QMARK_)], 0));
}));

(com.fulcrologic.guardrails.config.get_base_config_fn.cljs$lang$maxFixedArity = 1);

com.fulcrologic.guardrails.config.merge_config = (function com$fulcrologic$guardrails$config$merge_config(var_args){
var args__5732__auto__ = [];
var len__5726__auto___35893 = arguments.length;
var i__5727__auto___35894 = (0);
while(true){
if((i__5727__auto___35894 < len__5726__auto___35893)){
args__5732__auto__.push((arguments[i__5727__auto___35894]));

var G__35895 = (i__5727__auto___35894 + (1));
i__5727__auto___35894 = G__35895;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((1) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((1)),(0),null)):null);
return com.fulcrologic.guardrails.config.merge_config.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5733__auto__);
});

(com.fulcrologic.guardrails.config.merge_config.cljs$core$IFn$_invoke$arity$variadic = (function (env,meta_maps){
var config = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,cljs.core.apply.cljs$core$IFn$_invoke$arity$5(cljs.core.merge_with,(function (a,b){
if(cljs.core.every_QMARK_(cljs.core.map_QMARK_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [a,b], null))){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([a,b], 0));
} else {
return b;
}
}),com.fulcrologic.guardrails.config.get_base_config_fn.cljs$core$IFn$_invoke$arity$0(),com.fulcrologic.guardrails.utils.get_ns_meta(env),meta_maps));
return config;
}));

(com.fulcrologic.guardrails.config.merge_config.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(com.fulcrologic.guardrails.config.merge_config.cljs$lang$applyTo = (function (seq35832){
var G__35833 = cljs.core.first(seq35832);
var seq35832__$1 = cljs.core.next(seq35832);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__35833,seq35832__$1);
}));

com.fulcrologic.guardrails.config.default_exclusions = cljs.core.volatile_BANG_(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"com.fulcrologic.statecharts.algorithms.v20150901-impl","com.fulcrologic.statecharts.algorithms.v20150901-impl",-1308077875),true,new cljs.core.Keyword(null,"com.fulcrologic.statecharts.chart","com.fulcrologic.statecharts.chart",2036090093),true], null));
com.fulcrologic.guardrails.config.current_exclusions = cljs.core.volatile_BANG_(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"com.fulcrologic.statecharts.algorithms.v20150901-impl","com.fulcrologic.statecharts.algorithms.v20150901-impl",-1308077875),true,new cljs.core.Keyword(null,"com.fulcrologic.statecharts.chart","com.fulcrologic.statecharts.chart",2036090093),true], null));
/**
 * Reset the exclusions back to what they were when the system first loaded (what library authors auto-excluded)
 */
com.fulcrologic.guardrails.config.reset_exclusions_BANG_ = (function com$fulcrologic$guardrails$config$reset_exclusions_BANG_(){
return cljs.core.vreset_BANG_(com.fulcrologic.guardrails.config.current_exclusions,cljs.core.deref(com.fulcrologic.guardrails.config.default_exclusions));
});
/**
 * Clear all exclusions, so that checks are done for everything.
 * 
 * All namespaces, even those that library authors have auto-excluded, will
 * be checked. This can significantly slow your development REPL. The approximate overhead for the average
 * check is about 10-30 microseconds. That is very small but in loops and such can add up to significant
 * overhead (many functions take nanoseconds to run...so this can easily make your program run 100x slower.
 */
com.fulcrologic.guardrails.config.clear_exclusions_BANG_ = (function com$fulcrologic$guardrails$config$clear_exclusions_BANG_(){
return cljs.core.vreset_BANG_(com.fulcrologic.guardrails.config.current_exclusions,cljs.core.PersistentArrayMap.EMPTY);
});
/**
 * Exclude a namespace or defn from checking. Can be a keyword or symbol. Giving a namespace will turn off all
 * checks in that namespace. Giving a fn name will only affect that function.
 */
com.fulcrologic.guardrails.config.exclude_checks_BANG_ = (function com$fulcrologic$guardrails$config$exclude_checks_BANG_(ns_or_fn){
if((((ns_or_fn instanceof cljs.core.Keyword)) || ((ns_or_fn instanceof cljs.core.Symbol)))){
} else {
throw (new Error("Assert failed: (or (keyword? ns-or-fn) (symbol? ns-or-fn))"));
}

return com.fulcrologic.guardrails.config.current_exclusions.cljs$core$IVolatile$_vreset_BANG_$arity$2(null, cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(com.fulcrologic.guardrails.config.current_exclusions.cljs$core$IDeref$_deref$arity$1(null, ),cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(ns_or_fn),true));
});
/**
 * Allow a namespace or >defn for checking. Can be a keyword or symbol. Giving an entire namespace
 * will clear exclusions on all keys that use that ns. Giving a fn name will enable checking on that
 * function, BUT keep a ns exclusion (if present).
 */
com.fulcrologic.guardrails.config.allow_checks_BANG_ = (function com$fulcrologic$guardrails$config$allow_checks_BANG_(ns_or_fn){
if((((ns_or_fn instanceof cljs.core.Keyword)) || ((ns_or_fn instanceof cljs.core.Symbol)))){
} else {
throw (new Error("Assert failed: (or (keyword? ns-or-fn) (symbol? ns-or-fn))"));
}

var k = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(ns_or_fn);
var entry_ns = (function (k__$1){
if(cljs.core.qualified_keyword_QMARK_(k__$1)){
return cljs.core.namespace(k__$1);
} else {
return cljs.core.name(k__$1);
}
});
var kns = entry_ns(k);
if(cljs.core.qualified_keyword_QMARK_(k)){
return com.fulcrologic.guardrails.config.current_exclusions.cljs$core$IVolatile$_vreset_BANG_$arity$2(null, cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(com.fulcrologic.guardrails.config.current_exclusions.cljs$core$IDeref$_deref$arity$1(null, ),k,false));
} else {
return com.fulcrologic.guardrails.config.current_exclusions.cljs$core$IVolatile$_vreset_BANG_$arity$2(null, (function (m){
return cljs.core.reduce_kv((function (acc,ex,v){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(entry_ns(ex),kns)){
return acc;
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(acc,ex,v);
}
}),cljs.core.PersistentArrayMap.EMPTY,m);
})(com.fulcrologic.guardrails.config.current_exclusions.cljs$core$IDeref$_deref$arity$1(null, )));
}
});
/**
 * INTERNAL. Do not use.
 */
com.fulcrologic.guardrails.config._excluded_QMARK_ = (function com$fulcrologic$guardrails$config$_excluded_QMARK_(fqkw,nskw){
var ex = cljs.core.deref(com.fulcrologic.guardrails.config.current_exclusions);
var kval = cljs.core.get.cljs$core$IFn$_invoke$arity$2(ex,fqkw);
return ((kval === true) || ((((!(kval === false))) && (cljs.core.get.cljs$core$IFn$_invoke$arity$2(ex,nskw) === true))));
});
/**
 * Returns true if the fully-qualified-name matches something (namespace or fn) that is currently excluded from checks.
 */
com.fulcrologic.guardrails.config.excluded_QMARK_ = (function com$fulcrologic$guardrails$config$excluded_QMARK_(fully_qualified_name){
var k = cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(fully_qualified_name);
var q_QMARK_ = cljs.core.qualified_keyword_QMARK_(k);
var nspc = ((q_QMARK_)?cljs.core.namespace(k):cljs.core.name(k));
var fn_name = ((q_QMARK_)?cljs.core.name(k):null);
var coord = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [((q_QMARK_)?cljs.core.keyword.cljs$core$IFn$_invoke$arity$2(nspc,cljs.core.name(fn_name)):null),cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(nspc)], null);
return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(com.fulcrologic.guardrails.config._excluded_QMARK_,coord);
});

//# sourceMappingURL=com.fulcrologic.guardrails.config.js.map
