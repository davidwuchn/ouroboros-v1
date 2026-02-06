goog.provide('com.fulcrologic.guardrails.utils');
com.fulcrologic.guardrails.utils.cljs_env_QMARK_ = (function com$fulcrologic$guardrails$utils$cljs_env_QMARK_(env){
return cljs.core.boolean$(new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(env));
});
com.fulcrologic.guardrails.utils.hint_backtrace = (function com$fulcrologic$guardrails$utils$hint_backtrace(backtrace){
return backtrace;
});
com.fulcrologic.guardrails.utils.get_ns_meta = (function com$fulcrologic$guardrails$utils$get_ns_meta(env){
if(com.fulcrologic.guardrails.utils.cljs_env_QMARK_(env)){
var or__5002__auto__ = cljs.core.meta(cljs.core._STAR_ns_STAR_);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var G__35166 = env;
var G__35166__$1 = (((G__35166 == null))?null:new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(G__35166));
if((G__35166__$1 == null)){
return null;
} else {
return new cljs.core.Keyword(null,"meta","meta",1499536964).cljs$core$IFn$_invoke$arity$1(G__35166__$1);
}
}
} else {
return cljs.core.meta(cljs.core._STAR_ns_STAR_);
}
});
com.fulcrologic.guardrails.utils.get_ns_name = (function com$fulcrologic$guardrails$utils$get_ns_name(env){
if(com.fulcrologic.guardrails.utils.cljs_env_QMARK_(env)){
var or__5002__auto__ = cljs.core._STAR_ns_STAR_.name;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var G__35167 = env;
var G__35167__$1 = (((G__35167 == null))?null:new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(G__35167));
if((G__35167__$1 == null)){
return null;
} else {
return new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(G__35167__$1);
}
}
} else {
return cljs.core._STAR_ns_STAR_.name;
}
});
com.fulcrologic.guardrails.utils.clj__GT_cljs = (function com$fulcrologic$guardrails$utils$clj__GT_cljs(var_args){
var G__35172 = arguments.length;
switch (G__35172) {
case 1:
return com.fulcrologic.guardrails.utils.clj__GT_cljs.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return com.fulcrologic.guardrails.utils.clj__GT_cljs.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.guardrails.utils.clj__GT_cljs.cljs$core$IFn$_invoke$arity$1 = (function (form){
return com.fulcrologic.guardrails.utils.clj__GT_cljs.cljs$core$IFn$_invoke$arity$2(form,true);
}));

(com.fulcrologic.guardrails.utils.clj__GT_cljs.cljs$core$IFn$_invoke$arity$2 = (function (form,strip_core_ns){
var ns_replacements = (function (){var G__35173 = new cljs.core.PersistentArrayMap(null, 5, ["clojure.core","cljs.core","clojure.test","cljs.test","clojure.spec.alpha","cljs.spec.alpha","clojure.spec.test.alpha","cljs.spec.test.alpha","clojure.spec.gen.alpha","cljs.spec.gen.alpha"], null);
if(cljs.core.truth_(strip_core_ns)){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([G__35173,new cljs.core.PersistentArrayMap(null, 2, ["clojure.core",null,"cljs.core",null], null)], 0));
} else {
return G__35173;
}
})();
var replace_namespace = (function (p1__35170_SHARP_){
if((!(cljs.core.qualified_symbol_QMARK_(p1__35170_SHARP_)))){
return p1__35170_SHARP_;
} else {
var nspace = cljs.core.namespace(p1__35170_SHARP_);
if(cljs.core.contains_QMARK_(ns_replacements,nspace)){
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.get.cljs$core$IFn$_invoke$arity$2(ns_replacements,nspace),cljs.core.name(p1__35170_SHARP_));
} else {
return p1__35170_SHARP_;
}
}
});
return clojure.walk.postwalk(replace_namespace,form);
}));

(com.fulcrologic.guardrails.utils.clj__GT_cljs.cljs$lang$maxFixedArity = 2);

com.fulcrologic.guardrails.utils.get_file_position = (function com$fulcrologic$guardrails$utils$get_file_position(env){
if(com.fulcrologic.guardrails.utils.cljs_env_QMARK_(env)){
var map__35174 = env;
var map__35174__$1 = cljs.core.__destructure_map(map__35174);
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35174__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35174__$1,new cljs.core.Keyword(null,"column","column",2078222095));
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(line),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column)].join('');
} else {
return null;
}
});
com.fulcrologic.guardrails.utils.get_call_context = (function com$fulcrologic$guardrails$utils$get_call_context(var_args){
var G__35178 = arguments.length;
switch (G__35178) {
case 1:
return com.fulcrologic.guardrails.utils.get_call_context.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return com.fulcrologic.guardrails.utils.get_call_context.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.guardrails.utils.get_call_context.cljs$core$IFn$_invoke$arity$1 = (function (env){
return com.fulcrologic.guardrails.utils.get_call_context.cljs$core$IFn$_invoke$arity$2(env,null);
}));

(com.fulcrologic.guardrails.utils.get_call_context.cljs$core$IFn$_invoke$arity$2 = (function (env,label){
return [(cljs.core.truth_(label)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(label)," \u2013 "].join(''):null),cljs.core.str.cljs$core$IFn$_invoke$arity$1(com.fulcrologic.guardrails.utils.get_ns_name(env)),":",com.fulcrologic.guardrails.utils.get_file_position(env)].join('');
}));

(com.fulcrologic.guardrails.utils.get_call_context.cljs$lang$maxFixedArity = 2);

com.fulcrologic.guardrails.utils.gen_exception = (function com$fulcrologic$guardrails$utils$gen_exception(env,msg){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((new cljs.core.List(null,new cljs.core.Symbol(null,"throw","throw",595905694,null),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((new cljs.core.List(null,((com.fulcrologic.guardrails.utils.cljs_env_QMARK_(env))?new cljs.core.Symbol("js","Error.","js/Error.",750655924,null):new cljs.core.Symbol(null,"Exception.","Exception.",-981206655,null)),null,(1),null)),(new cljs.core.List(null,msg,null,(1),null))))),null,(1),null)))));
});
com.fulcrologic.guardrails.utils.devtools_config_override = (function com$fulcrologic$guardrails$utils$devtools_config_override(){
return cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic((new cljs.core.List(null,new cljs.core.Symbol("cljs.core","let","cljs.core/let",-308701135,null),null,(1),null)),(new cljs.core.List(null,cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic((new cljs.core.List(null,new cljs.core.Symbol(null,"current-config__35180__auto__","current-config__35180__auto__",-2107582203,null),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1((new cljs.core.List(null,new cljs.core.Symbol("devtools.prefs","get-prefs","devtools.prefs/get-prefs",1778468250,null),null,(1),null))))),null,(1),null)),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(new cljs.core.List(null,new cljs.core.Symbol(null,"overrides__35181__auto__","overrides__35181__auto__",-807138051,null),null,(1),null)),(new cljs.core.List(null,cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.array_map,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic((new cljs.core.List(null,new cljs.core.Keyword(null,"max-print-level","max-print-level",-462237413),null,(1),null)),(new cljs.core.List(null,(4),null,(1),null)),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(new cljs.core.List(null,new cljs.core.Keyword(null,"min-expandable-sequable-count-for-well-known-types","min-expandable-sequable-count-for-well-known-types",-1879576081),null,(1),null)),(new cljs.core.List(null,(2),null,(1),null))], 0))))),null,(1),null)),(new cljs.core.List(null,new cljs.core.Symbol(null,"left-adjust__35182__auto__","left-adjust__35182__auto__",281343683,null),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((new cljs.core.List(null,new cljs.core.Symbol("cljs.core","str","cljs.core/str",-1971828991,null),null,(1),null)),(new cljs.core.List(null,"margin-left: -17px;",null,(1),null))))),null,(1),null))], 0))))),null,(1),null)),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(new cljs.core.List(null,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic((new cljs.core.List(null,new cljs.core.Symbol("cljs.core","merge","cljs.core/merge",-822184067,null),null,(1),null)),(new cljs.core.List(null,new cljs.core.Symbol(null,"current-config__35180__auto__","current-config__35180__auto__",-2107582203,null),null,(1),null)),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(new cljs.core.List(null,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic((new cljs.core.List(null,new cljs.core.Symbol("cljs.core","into","cljs.core/into",1879938733,null),null,(1),null)),(new cljs.core.List(null,new cljs.core.Symbol(null,"overrides__35181__auto__","overrides__35181__auto__",-807138051,null),null,(1),null)),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(new cljs.core.List(null,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic((new cljs.core.List(null,new cljs.core.Symbol("cljs.core","for","cljs.core/for",-89947499,null),null,(1),null)),(new cljs.core.List(null,cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic((new cljs.core.List(null,new cljs.core.Symbol(null,"k__35183__auto__","k__35183__auto__",9519154,null),null,(1),null)),(new cljs.core.List(null,cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$1((new cljs.core.List(null,new cljs.core.Keyword(null,"header-style","header-style",-2122121341),null,(1),null)))))),null,(1),null)),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(new cljs.core.List(null,new cljs.core.Keyword(null,"let","let",-1282412701),null,(1),null)),(new cljs.core.List(null,cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((new cljs.core.List(null,new cljs.core.Symbol(null,"v__35184__auto__","v__35184__auto__",362825643,null),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic((new cljs.core.List(null,new cljs.core.Symbol("cljs.core","get","cljs.core/get",-296075407,null),null,(1),null)),(new cljs.core.List(null,new cljs.core.Symbol(null,"current-config__35180__auto__","current-config__35180__auto__",-2107582203,null),null,(1),null)),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(new cljs.core.List(null,new cljs.core.Symbol(null,"k__35183__auto__","k__35183__auto__",9519154,null),null,(1),null))], 0)))),null,(1),null)))))),null,(1),null))], 0))))),null,(1),null)),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(new cljs.core.List(null,cljs.core.vec(cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2((new cljs.core.List(null,new cljs.core.Symbol(null,"k__35183__auto__","k__35183__auto__",9519154,null),null,(1),null)),(new cljs.core.List(null,cljs.core.sequence.cljs$core$IFn$_invoke$arity$1(cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$variadic((new cljs.core.List(null,new cljs.core.Symbol("cljs.core","str","cljs.core/str",-1971828991,null),null,(1),null)),(new cljs.core.List(null,new cljs.core.Symbol(null,"v__35184__auto__","v__35184__auto__",362825643,null),null,(1),null)),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(new cljs.core.List(null,new cljs.core.Symbol(null,"left-adjust__35182__auto__","left-adjust__35182__auto__",281343683,null),null,(1),null))], 0)))),null,(1),null)))))),null,(1),null))], 0)))),null,(1),null))], 0)))),null,(1),null))], 0)))),null,(1),null))], 0))));
});
com.fulcrologic.guardrails.utils.map_vals = (function com$fulcrologic$guardrails$utils$map_vals(f,m){
if((m == null)){
return cljs.core.PersistentArrayMap.EMPTY;
} else {
return cljs.core.reduce_kv((function (m__$1,k,v){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m__$1,k,(f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(v) : f.call(null, v)));
}),m,m);
}
});
com.fulcrologic.guardrails.utils.map_keys = (function com$fulcrologic$guardrails$utils$map_keys(f,m){
if((m == null)){
return cljs.core.PersistentArrayMap.EMPTY;
} else {
return cljs.core.reduce_kv((function (m__$1,k,v){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(m__$1,(f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(k) : f.call(null, k)),v);
}),cljs.core.PersistentArrayMap.EMPTY,m);
}
});
var p_BANG__35564 = cljs.core.persistent_BANG_;
var t_35565 = cljs.core.transient$;
com.fulcrologic.guardrails.utils.filter_vals = (function com$fulcrologic$guardrails$utils$filter_vals(pred,m){
if((m == null)){
return cljs.core.PersistentArrayMap.EMPTY;
} else {
var G__35190 = cljs.core.reduce_kv((function (m__$1,k,v){
if(cljs.core.truth_((pred.cljs$core$IFn$_invoke$arity$1 ? pred.cljs$core$IFn$_invoke$arity$1(v) : pred.call(null, v)))){
return m__$1;
} else {
return cljs.core.dissoc_BANG_.cljs$core$IFn$_invoke$arity$2(m__$1,k);
}
}),(t_35565.cljs$core$IFn$_invoke$arity$1 ? t_35565.cljs$core$IFn$_invoke$arity$1(m) : t_35565.call(null, m)),m);
return (p_BANG__35564.cljs$core$IFn$_invoke$arity$1 ? p_BANG__35564.cljs$core$IFn$_invoke$arity$1(G__35190) : p_BANG__35564.call(null, G__35190));
}
});
com.fulcrologic.guardrails.utils.atom_QMARK_ = (function com$fulcrologic$guardrails$utils$atom_QMARK_(x){
return (x instanceof cljs.core.Atom);
});
/**
 * Get a string that represents the full stack trace
 */
com.fulcrologic.guardrails.utils.stacktrace = (function com$fulcrologic$guardrails$utils$stacktrace(var_args){
var G__35192 = arguments.length;
switch (G__35192) {
case 1:
return com.fulcrologic.guardrails.utils.stacktrace.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return com.fulcrologic.guardrails.utils.stacktrace.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.guardrails.utils.stacktrace.cljs$core$IFn$_invoke$arity$1 = (function (err){
return com.fulcrologic.guardrails.utils.stacktrace.cljs$core$IFn$_invoke$arity$2(err,null);
}));

(com.fulcrologic.guardrails.utils.stacktrace.cljs$core$IFn$_invoke$arity$2 = (function (err,opts){
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(err);
}));

(com.fulcrologic.guardrails.utils.stacktrace.cljs$lang$maxFixedArity = 2);

var ansi_color_regex_35574 = /\033\[[0-9;]*m/;
com.fulcrologic.guardrails.utils.strip_colors = (function com$fulcrologic$guardrails$utils$strip_colors(s){
return clojure.string.replace(s,ansi_color_regex_35574,"");
});
com.fulcrologic.guardrails.utils.elide_element_QMARK_ = (function com$fulcrologic$guardrails$utils$elide_element_QMARK_(e){
return false;
});
/**
 * Returns a vector of a Clojure-oriented stack trace of tr a Throwable/Exception. In CLJS this is just `(vector tr)`.
 */
com.fulcrologic.guardrails.utils.stack_trace = (function com$fulcrologic$guardrails$utils$stack_trace(var_args){
var G__35199 = arguments.length;
switch (G__35199) {
case 1:
return com.fulcrologic.guardrails.utils.stack_trace.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return com.fulcrologic.guardrails.utils.stack_trace.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.guardrails.utils.stack_trace.cljs$core$IFn$_invoke$arity$1 = (function (tr){
return com.fulcrologic.guardrails.utils.stack_trace.cljs$core$IFn$_invoke$arity$2(tr,false);
}));

(com.fulcrologic.guardrails.utils.stack_trace.cljs$core$IFn$_invoke$arity$2 = (function (tr,prune_QMARK_){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){try{return tr.stack;
}catch (e35200){var _ = e35200;
return tr;
}})()], null);
}));

(com.fulcrologic.guardrails.utils.stack_trace.cljs$lang$maxFixedArity = 2);

com.fulcrologic.guardrails.utils.report_info = (function com$fulcrologic$guardrails$utils$report_info(message){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([message], 0));
});
com.fulcrologic.guardrails.utils._last_failure_map = cljs.core.volatile_BANG_(cljs.core.PersistentArrayMap.EMPTY);
/**
 * Returns the stack trace of the most recent GR failure for the fully-qualified function name (string or symbol)
 * `fnsym`.  `prune?` (default true) indicates that it should remove frames that appear to be uninteresting noise.
 */
com.fulcrologic.guardrails.utils.last_failure = (function com$fulcrologic$guardrails$utils$last_failure(var_args){
var G__35202 = arguments.length;
switch (G__35202) {
case 1:
return com.fulcrologic.guardrails.utils.last_failure.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return com.fulcrologic.guardrails.utils.last_failure.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.guardrails.utils.last_failure.cljs$core$IFn$_invoke$arity$1 = (function (fnsym){
return com.fulcrologic.guardrails.utils.last_failure.cljs$core$IFn$_invoke$arity$2(fnsym,true);
}));

(com.fulcrologic.guardrails.utils.last_failure.cljs$core$IFn$_invoke$arity$2 = (function (fnsym,prune_QMARK_){
var G__35203 = cljs.core.deref(com.fulcrologic.guardrails.utils._last_failure_map);
var G__35203__$1 = (((G__35203 == null))?null:cljs.core.get.cljs$core$IFn$_invoke$arity$2(G__35203,cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(fnsym)));
if((G__35203__$1 == null)){
return null;
} else {
return com.fulcrologic.guardrails.utils.stack_trace.cljs$core$IFn$_invoke$arity$2(G__35203__$1,prune_QMARK_);
}
}));

(com.fulcrologic.guardrails.utils.last_failure.cljs$lang$maxFixedArity = 2);

com.fulcrologic.guardrails.utils.record_failure = (function com$fulcrologic$guardrails$utils$record_failure(str_or_sym,e){
return com.fulcrologic.guardrails.utils._last_failure_map.cljs$core$IVolatile$_vreset_BANG_$arity$2(null, cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(com.fulcrologic.guardrails.utils._last_failure_map.cljs$core$IDeref$_deref$arity$1(null, ),cljs.core.symbol.cljs$core$IFn$_invoke$arity$1(str_or_sym),e));
});
com.fulcrologic.guardrails.utils.backtrace_str = (function com$fulcrologic$guardrails$utils$backtrace_str(){
return clojure.string.join.cljs$core$IFn$_invoke$arity$2("\n",(function (){var iter__5480__auto__ = (function com$fulcrologic$guardrails$utils$backtrace_str_$_iter__35210(s__35211){
return (new cljs.core.LazySeq(null,(function (){
var s__35211__$1 = s__35211;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__35211__$1);
if(temp__5825__auto__){
var s__35211__$2 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(s__35211__$2)){
var c__5478__auto__ = cljs.core.chunk_first(s__35211__$2);
var size__5479__auto__ = cljs.core.count(c__5478__auto__);
var b__35213 = cljs.core.chunk_buffer(size__5479__auto__);
if((function (){var i__35212 = (0);
while(true){
if((i__35212 < size__5479__auto__)){
var map__35215 = cljs.core._nth(c__5478__auto__,i__35212);
var map__35215__$1 = cljs.core.__destructure_map(map__35215);
var f = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35215__$1,new cljs.core.Keyword(null,"f","f",-1597136552));
var args = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35215__$1,new cljs.core.Keyword(null,"args","args",1315556576));
var call = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.list,cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [f], null),args));
cljs.core.chunk_append(b__35213,["    ",cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){try{return cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([call], 0));
}catch (e35218){var _ = e35218;
return null;
}})())].join(''));

var G__35583 = (i__35212 + (1));
i__35212 = G__35583;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__35213),com$fulcrologic$guardrails$utils$backtrace_str_$_iter__35210(cljs.core.chunk_rest(s__35211__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__35213),null);
}
} else {
var map__35225 = cljs.core.first(s__35211__$2);
var map__35225__$1 = cljs.core.__destructure_map(map__35225);
var f = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35225__$1,new cljs.core.Keyword(null,"f","f",-1597136552));
var args = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35225__$1,new cljs.core.Keyword(null,"args","args",1315556576));
var call = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.list,cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [f], null),args));
return cljs.core.cons(["    ",cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){try{return cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([call], 0));
}catch (e35229){var _ = e35229;
return null;
}})())].join(''),com$fulcrologic$guardrails$utils$backtrace_str_$_iter__35210(cljs.core.rest(s__35211__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5480__auto__((com.fulcrologic.guardrails.utils.current_backtrace.cljs$core$IFn$_invoke$arity$0 ? com.fulcrologic.guardrails.utils.current_backtrace.cljs$core$IFn$_invoke$arity$0() : com.fulcrologic.guardrails.utils.current_backtrace.call(null, )));
})());
});
com.fulcrologic.guardrails.utils.problem_description = (function com$fulcrologic$guardrails$utils$problem_description(message,callsite_ex,p__35235){
var map__35237 = p__35235;
var map__35237__$1 = cljs.core.__destructure_map(map__35237);
var options = map__35237__$1;
var stack_trace_option = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35237__$1,new cljs.core.Keyword("guardrails","stack-trace","guardrails/stack-trace",-1305727300));
var fqnm = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35237__$1,new cljs.core.Keyword("guardrails","fqnm","guardrails/fqnm",1331545691));
var trace_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35237__$1,new cljs.core.Keyword("guardrails","trace?","guardrails/trace?",1040463371));
var G__35243 = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(message),"\n"].join('');
if(cljs.core.truth_(callsite_ex)){
var G__35245 = G__35243;
var G__35245__$1 = (cljs.core.truth_(trace_QMARK_)?[G__35245,"  GR functions on stack. (",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Symbol("com.fulcrologic.guardrails.utils","last-failure","com.fulcrologic.guardrails.utils/last-failure",-1892285684,null))," '",cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__5002__auto__ = fqnm;
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
return "fn-sym";
}
})()),") for full stack:\n",com.fulcrologic.guardrails.utils.backtrace_str(),"\n"].join(''):G__35245);
return [G__35245__$1,cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var G__35265 = stack_trace_option;
var G__35265__$1 = (((G__35265 instanceof cljs.core.Keyword))?G__35265.fqn:null);
switch (G__35265__$1) {
case "none":
return null;

break;
case "prune":
return ["\nPruned Stack Trace (see `gr.utils/last-failure-stacktrace` for full trace)\n\n",clojure.string.join.cljs$core$IFn$_invoke$arity$2(" called by ",cljs.core.map.cljs$core$IFn$_invoke$arity$2(cljs.core.pr_str,com.fulcrologic.guardrails.utils.stack_trace.cljs$core$IFn$_invoke$arity$2(callsite_ex,true))),"\n"].join('');

break;
default:
return clojure.string.join.cljs$core$IFn$_invoke$arity$2("\n",com.fulcrologic.guardrails.utils.stack_trace.cljs$core$IFn$_invoke$arity$2(callsite_ex,false));

}
})()),"\n"].join('');

} else {
return G__35243;
}
});
com.fulcrologic.guardrails.utils.report_problem = (function com$fulcrologic$guardrails$utils$report_problem(var_args){
var G__35282 = arguments.length;
switch (G__35282) {
case 1:
return com.fulcrologic.guardrails.utils.report_problem.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 3:
return com.fulcrologic.guardrails.utils.report_problem.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.guardrails.utils.report_problem.cljs$core$IFn$_invoke$arity$1 = (function (message){
return com.fulcrologic.guardrails.utils.report_problem.cljs$core$IFn$_invoke$arity$3(message,null,cljs.core.PersistentArrayMap.EMPTY);
}));

(com.fulcrologic.guardrails.utils.report_problem.cljs$core$IFn$_invoke$arity$3 = (function (message,callsite_ex,p__35288){
var map__35290 = p__35288;
var map__35290__$1 = cljs.core.__destructure_map(map__35290);
var options = map__35290__$1;
var stack_trace_option = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35290__$1,new cljs.core.Keyword("guardrails","stack-trace","guardrails/stack-trace",-1305727300));
var fqnm = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35290__$1,new cljs.core.Keyword("guardrails","fqnm","guardrails/fqnm",1331545691));
var trace_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__35290__$1,new cljs.core.Keyword("guardrails","trace?","guardrails/trace?",1040463371));
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([com.fulcrologic.guardrails.utils.problem_description(message,callsite_ex,options)], 0));
}));

(com.fulcrologic.guardrails.utils.report_problem.cljs$lang$maxFixedArity = 3);

com.fulcrologic.guardrails.utils.report_exception = (function com$fulcrologic$guardrails$utils$report_exception(e,message,fqnm){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([[cljs.core.str.cljs$core$IFn$_invoke$arity$1(message),cljs.core.str.cljs$core$IFn$_invoke$arity$1(fqnm),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.ex_message(e))].join('')], 0));
});
com.fulcrologic.guardrails.utils._STAR_backtrace_STAR_ = null;
com.fulcrologic.guardrails.utils.backtrace_entry = (function com$fulcrologic$guardrails$utils$backtrace_entry(var_args){
var G__35301 = arguments.length;
switch (G__35301) {
case 0:
return com.fulcrologic.guardrails.utils.backtrace_entry.cljs$core$IFn$_invoke$arity$0();

break;
case 3:
return com.fulcrologic.guardrails.utils.backtrace_entry.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.guardrails.utils.backtrace_entry.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.PersistentVector.EMPTY;
}));

(com.fulcrologic.guardrails.utils.backtrace_entry.cljs$core$IFn$_invoke$arity$3 = (function (nspc,nm,args){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [nspc,nm,args], null);
}));

(com.fulcrologic.guardrails.utils.backtrace_entry.cljs$lang$maxFixedArity = 3);

com.fulcrologic.guardrails.utils.empty_entry = com.fulcrologic.guardrails.utils.backtrace_entry.cljs$core$IFn$_invoke$arity$0();
com.fulcrologic.guardrails.utils.new_backtrace = (function com$fulcrologic$guardrails$utils$new_backtrace(var_args){
var G__35308 = arguments.length;
switch (G__35308) {
case 0:
return com.fulcrologic.guardrails.utils.new_backtrace.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return com.fulcrologic.guardrails.utils.new_backtrace.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.guardrails.utils.new_backtrace.cljs$core$IFn$_invoke$arity$0 = (function (){
return com.fulcrologic.guardrails.utils.new_backtrace.cljs$core$IFn$_invoke$arity$1((5));
}));

(com.fulcrologic.guardrails.utils.new_backtrace.cljs$core$IFn$_invoke$arity$1 = (function (sz){
var bt = cljs.core.object_array.cljs$core$IFn$_invoke$arity$1((cljs.core.long$(sz) + (1)));
(bt[(0)] = (0));

var seq__35321_35596 = cljs.core.seq(cljs.core.range.cljs$core$IFn$_invoke$arity$2((1),(cljs.core.long$(sz) + (1))));
var chunk__35322_35597 = null;
var count__35323_35598 = (0);
var i__35324_35599 = (0);
while(true){
if((i__35324_35599 < count__35323_35598)){
var n_35600 = chunk__35322_35597.cljs$core$IIndexed$_nth$arity$2(null, i__35324_35599);
(bt[n_35600] = com.fulcrologic.guardrails.utils.empty_entry);


var G__35606 = seq__35321_35596;
var G__35607 = chunk__35322_35597;
var G__35608 = count__35323_35598;
var G__35609 = (i__35324_35599 + (1));
seq__35321_35596 = G__35606;
chunk__35322_35597 = G__35607;
count__35323_35598 = G__35608;
i__35324_35599 = G__35609;
continue;
} else {
var temp__5825__auto___35610 = cljs.core.seq(seq__35321_35596);
if(temp__5825__auto___35610){
var seq__35321_35611__$1 = temp__5825__auto___35610;
if(cljs.core.chunked_seq_QMARK_(seq__35321_35611__$1)){
var c__5525__auto___35612 = cljs.core.chunk_first(seq__35321_35611__$1);
var G__35614 = cljs.core.chunk_rest(seq__35321_35611__$1);
var G__35615 = c__5525__auto___35612;
var G__35616 = cljs.core.count(c__5525__auto___35612);
var G__35617 = (0);
seq__35321_35596 = G__35614;
chunk__35322_35597 = G__35615;
count__35323_35598 = G__35616;
i__35324_35599 = G__35617;
continue;
} else {
var n_35618 = cljs.core.first(seq__35321_35611__$1);
(bt[n_35618] = com.fulcrologic.guardrails.utils.empty_entry);


var G__35620 = cljs.core.next(seq__35321_35611__$1);
var G__35621 = null;
var G__35622 = (0);
var G__35623 = (0);
seq__35321_35596 = G__35620;
chunk__35322_35597 = G__35621;
count__35323_35598 = G__35622;
i__35324_35599 = G__35623;
continue;
}
} else {
}
}
break;
}

return bt;
}));

(com.fulcrologic.guardrails.utils.new_backtrace.cljs$lang$maxFixedArity = 1);

com.fulcrologic.guardrails.utils.backtrace_enter = (function com$fulcrologic$guardrails$utils$backtrace_enter(var_args){
var args__5732__auto__ = [];
var len__5726__auto___35624 = arguments.length;
var i__5727__auto___35625 = (0);
while(true){
if((i__5727__auto___35625 < len__5726__auto___35624)){
args__5732__auto__.push((arguments[i__5727__auto___35625]));

var G__35626 = (i__5727__auto___35625 + (1));
i__5727__auto___35625 = G__35626;
continue;
} else {
}
break;
}

var argseq__5733__auto__ = ((((2) < args__5732__auto__.length))?(new cljs.core.IndexedSeq(args__5732__auto__.slice((2)),(0),null)):null);
return com.fulcrologic.guardrails.utils.backtrace_enter.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5733__auto__);
});

(com.fulcrologic.guardrails.utils.backtrace_enter.cljs$core$IFn$_invoke$arity$variadic = (function (nspc,nm,args){
if(cljs.core.truth_(com.fulcrologic.guardrails.utils._STAR_backtrace_STAR_)){
var backtrace = com.fulcrologic.guardrails.utils.hint_backtrace(com.fulcrologic.guardrails.utils._STAR_backtrace_STAR_);
var next_entry = cljs.core.long$((backtrace[(0)]));
var new_entry = com.fulcrologic.guardrails.utils.backtrace_entry.cljs$core$IFn$_invoke$arity$3(nspc,nm,args);
var sz = (cljs.core.count(backtrace) - (1));
(backtrace[((1) + next_entry)] = new_entry);

return (backtrace[(0)] = cljs.core.mod((next_entry + (1)),sz));
} else {
return null;
}
}));

(com.fulcrologic.guardrails.utils.backtrace_enter.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(com.fulcrologic.guardrails.utils.backtrace_enter.cljs$lang$applyTo = (function (seq35344){
var G__35345 = cljs.core.first(seq35344);
var seq35344__$1 = cljs.core.next(seq35344);
var G__35346 = cljs.core.first(seq35344__$1);
var seq35344__$2 = cljs.core.next(seq35344__$1);
var self__5711__auto__ = this;
return self__5711__auto__.cljs$core$IFn$_invoke$arity$variadic(G__35345,G__35346,seq35344__$2);
}));

com.fulcrologic.guardrails.utils.backtrace_exit = (function com$fulcrologic$guardrails$utils$backtrace_exit(){
if(cljs.core.truth_(com.fulcrologic.guardrails.utils._STAR_backtrace_STAR_)){
var backtrace = com.fulcrologic.guardrails.utils.hint_backtrace(com.fulcrologic.guardrails.utils._STAR_backtrace_STAR_);
var next_entry = cljs.core.long$((backtrace[(0)]));
var sz = (cljs.core.count(backtrace) - (1));
var prior_entry = cljs.core.long$(cljs.core.mod((next_entry - (1)),sz));
(backtrace[((1) + prior_entry)] = com.fulcrologic.guardrails.utils.empty_entry);

return (backtrace[(0)] = prior_entry);
} else {
return null;
}
});
/**
 * Returns the function called in the given backtrace entry, or nil if the entry is nil/empty
 */
com.fulcrologic.guardrails.utils.backtrace_entry_function = (function com$fulcrologic$guardrails$utils$backtrace_entry_function(backtrace_entry){
if((((backtrace_entry == null)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(backtrace_entry,com.fulcrologic.guardrails.utils.empty_entry)))){
return null;
} else {
return cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.name(cljs.core.get.cljs$core$IFn$_invoke$arity$3(backtrace_entry,(0),"")),cljs.core.name(cljs.core.get.cljs$core$IFn$_invoke$arity$3(backtrace_entry,(1),"")));
}
});
/**
 * Returns the arguments passed to the call in the backtrace entry, or nil if empty
 */
com.fulcrologic.guardrails.utils.backtrace_entry_args = (function com$fulcrologic$guardrails$utils$backtrace_entry_args(backtrace_entry){
if((((backtrace_entry == null)) || (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(backtrace_entry,com.fulcrologic.guardrails.utils.empty_entry)))){
return null;
} else {
return cljs.core.vec(cljs.core.get.cljs$core$IFn$_invoke$arity$2(backtrace_entry,(2)));
}
});
/**
 * Returns a vector of maps for the current backtrace.
 */
com.fulcrologic.guardrails.utils.current_backtrace = (function com$fulcrologic$guardrails$utils$current_backtrace(){
if(cljs.core.truth_(com.fulcrologic.guardrails.utils._STAR_backtrace_STAR_)){
var backtrace = com.fulcrologic.guardrails.utils.hint_backtrace(com.fulcrologic.guardrails.utils._STAR_backtrace_STAR_);
var start = cljs.core.long$((backtrace[(0)]));
var sz = cljs.core.long$((cljs.core.count(backtrace) - (1)));
return cljs.core.vec((function (){var iter__5480__auto__ = (function com$fulcrologic$guardrails$utils$current_backtrace_$_iter__35409(s__35410){
return (new cljs.core.LazySeq(null,(function (){
var s__35410__$1 = s__35410;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__35410__$1);
if(temp__5825__auto__){
var s__35410__$2 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(s__35410__$2)){
var c__5478__auto__ = cljs.core.chunk_first(s__35410__$2);
var size__5479__auto__ = cljs.core.count(c__5478__auto__);
var b__35412 = cljs.core.chunk_buffer(size__5479__auto__);
if((function (){var i__35411 = (0);
while(true){
if((i__35411 < size__5479__auto__)){
var n = cljs.core._nth(c__5478__auto__,i__35411);
var pos = (cljs.core.long$(cljs.core.mod((start - cljs.core.long$(n)),sz)) + (1));
var entry = (backtrace[pos]);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(entry,com.fulcrologic.guardrails.utils.empty_entry)){
cljs.core.chunk_append(b__35412,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"f","f",-1597136552),com.fulcrologic.guardrails.utils.backtrace_entry_function(entry),new cljs.core.Keyword(null,"args","args",1315556576),com.fulcrologic.guardrails.utils.backtrace_entry_args(entry)], null));

var G__35642 = (i__35411 + (1));
i__35411 = G__35642;
continue;
} else {
var G__35643 = (i__35411 + (1));
i__35411 = G__35643;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__35412),com$fulcrologic$guardrails$utils$current_backtrace_$_iter__35409(cljs.core.chunk_rest(s__35410__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__35412),null);
}
} else {
var n = cljs.core.first(s__35410__$2);
var pos = (cljs.core.long$(cljs.core.mod((start - cljs.core.long$(n)),sz)) + (1));
var entry = (backtrace[pos]);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(entry,com.fulcrologic.guardrails.utils.empty_entry)){
return cljs.core.cons(new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"f","f",-1597136552),com.fulcrologic.guardrails.utils.backtrace_entry_function(entry),new cljs.core.Keyword(null,"args","args",1315556576),com.fulcrologic.guardrails.utils.backtrace_entry_args(entry)], null),com$fulcrologic$guardrails$utils$current_backtrace_$_iter__35409(cljs.core.rest(s__35410__$2)));
} else {
var G__35644 = cljs.core.rest(s__35410__$2);
s__35410__$1 = G__35644;
continue;
}
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5480__auto__(cljs.core.range.cljs$core$IFn$_invoke$arity$2((1),(sz + (1))));
})());
} else {
return null;
}
});

//# sourceMappingURL=com.fulcrologic.guardrails.utils.js.map
