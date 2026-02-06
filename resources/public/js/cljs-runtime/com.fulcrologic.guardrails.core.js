goog.provide('com.fulcrologic.guardrails.core');
goog.scope(function(){
  com.fulcrologic.guardrails.core.goog$module$goog$object = goog.module.get('goog.object');
});
com.fulcrologic.guardrails.core._EQ__GT_ = new cljs.core.Keyword(null,"ret","ret",-468222814);
com.fulcrologic.guardrails.core._BAR_ = new cljs.core.Keyword(null,"st","st",1455255828);
com.fulcrologic.guardrails.core._LT__ = new cljs.core.Keyword(null,"gen","gen",142575302);
if((typeof com !== 'undefined') && (typeof com.fulcrologic !== 'undefined') && (typeof com.fulcrologic.guardrails !== 'undefined') && (typeof com.fulcrologic.guardrails.core !== 'undefined') && (typeof com.fulcrologic.guardrails.core._BANG_global_context !== 'undefined')){
} else {
com.fulcrologic.guardrails.core._BANG_global_context = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.List.EMPTY);
}
/**
 * Push a global context, accessible from all threads, onto a stack. Used to add
 *   information to what guardrails will report when a function failed a check.
 */
com.fulcrologic.guardrails.core.enter_global_context_BANG_ = (function com$fulcrologic$guardrails$core$enter_global_context_BANG_(ctx){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(com.fulcrologic.guardrails.core._BANG_global_context,cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core.cons,ctx));
});
/**
 * Pops a global context (see `enter-global-context!`). Should be passed the
 *   same context that was pushed, although is not enforced, as it's only to be
 *   easily compatible with fulcro-spec's hooks API.
 */
com.fulcrologic.guardrails.core.leave_global_context_BANG_ = (function com$fulcrologic$guardrails$core$leave_global_context_BANG_(ctx){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(com.fulcrologic.guardrails.core._BANG_global_context,cljs.core.rest);
});
com.fulcrologic.guardrails.core.get_global_context = (function com$fulcrologic$guardrails$core$get_global_context(){
return cljs.core.first(cljs.core.deref(com.fulcrologic.guardrails.core._BANG_global_context));
});
com.fulcrologic.guardrails.core.output_fn = (function com$fulcrologic$guardrails$core$output_fn(data){
var map__45265 = data;
var map__45265__$1 = cljs.core.__destructure_map(map__45265);
var level = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45265__$1,new cljs.core.Keyword(null,"level","level",1290497552));
var _QMARK_err = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45265__$1,new cljs.core.Keyword(null,"?err","?err",549653299));
var msg_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45265__$1,new cljs.core.Keyword(null,"msg_","msg_",-1925147000));
var _QMARK_ns_str = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45265__$1,new cljs.core.Keyword(null,"?ns-str","?ns-str",2012733966));
var _QMARK_file = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45265__$1,new cljs.core.Keyword(null,"?file","?file",1533429675));
var hostname_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45265__$1,new cljs.core.Keyword(null,"hostname_","hostname_",-2091647379));
var timestamp_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45265__$1,new cljs.core.Keyword(null,"timestamp_","timestamp_",-954533417));
var _QMARK_line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45265__$1,new cljs.core.Keyword(null,"?line","?line",-631853385));
return [clojure.string.upper_case(cljs.core.name(level))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.force(msg_)),(function (){var temp__5825__auto__ = _QMARK_err;
if(cljs.core.truth_(temp__5825__auto__)){
var err = temp__5825__auto__;
return ["\n",cljs.core.str.cljs$core$IFn$_invoke$arity$1(com.fulcrologic.guardrails.utils.stacktrace.cljs$core$IFn$_invoke$arity$1(err))].join('');
} else {
return null;
}
})()].join('');
});
com.fulcrologic.guardrails.core.now_ms = (function com$fulcrologic$guardrails$core$now_ms(){
return cljs.core.inst_ms((new Date()));
});
com.fulcrologic.guardrails.core.tap = (((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.tap_GT_ !== 'undefined'))?(new cljs.core.Var((function (){
return cljs.core.tap_GT_;
}),cljs.core.with_meta(new cljs.core.Symbol("cljs.core","tap>","cljs.core/tap>",895722640,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("cljs.analyzer","no-resolve","cljs.analyzer/no-resolve",-1872351017),true], null)),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[new cljs.core.Symbol(null,"cljs.core","cljs.core",770546058,null),new cljs.core.Symbol(null,"tap>","tap>",1822490677,null),"cljs/core.cljs",20,1,12050,12050,new cljs.core.Symbol(null,"boolean","boolean",-278886877,null),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",-555367584,null)], null)),"Sends x to any taps. Returns the result of *exec-tap-fn*, a Boolean value.",((cljs.core.tap_GT_)?cljs.core.tap_GT_.cljs$lang$test:null)]))):null);
com.fulcrologic.guardrails.core.humanize_spec = (function com$fulcrologic$guardrails$core$humanize_spec(explain_data,p__45266){
var map__45267 = p__45266;
var map__45267__$1 = cljs.core.__destructure_map(map__45267);
var expound_options = map__45267__$1;
var compact_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45267__$1,new cljs.core.Keyword("guardrails","compact?","guardrails/compact?",-1855665962));
var args_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45267__$1,new cljs.core.Keyword("guardrails","args?","guardrails/args?",-768537344));
var fqnm = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45267__$1,new cljs.core.Keyword("guardrails","fqnm","guardrails/fqnm",1331545691));
if(cljs.core.truth_(compact_QMARK_)){
var lines = cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.truth_(args_QMARK_)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(fqnm),"'s arguments:"].join(''):[cljs.core.str.cljs$core$IFn$_invoke$arity$1(fqnm),"'s return:"].join(''))], null),cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (l){
var or__5002__auto__ = clojure.string.includes_QMARK_(l,"------");
if(or__5002__auto__){
return or__5002__auto__;
} else {
var or__5002__auto____$1 = cljs.core.re_matches(/^Detected \d.*$/,l);
if(cljs.core.truth_(or__5002__auto____$1)){
return or__5002__auto____$1;
} else {
return cljs.core.re_matches(/^\s*$/,l);
}
}
}),clojure.string.split_lines((function (){var sb__5647__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__45269_45394 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__45270_45395 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__45271_45396 = true;
var _STAR_print_fn_STAR__temp_val__45272_45397 = (function (x__5648__auto__){
return sb__5647__auto__.append(x__5648__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__45271_45396);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__45272_45397);

try{expound.alpha.custom_printer(expound_options)(explain_data);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__45270_45395);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__45269_45394);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__5647__auto__);
})())));
return ["  ",clojure.string.join.cljs$core$IFn$_invoke$arity$2("\n  ",lines)].join('');
} else {
var sb__5647__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__45274_45400 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__45275_45401 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__45276_45402 = true;
var _STAR_print_fn_STAR__temp_val__45277_45403 = (function (x__5648__auto__){
return sb__5647__auto__.append(x__5648__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__45276_45402);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__45277_45403);

try{expound.alpha.custom_printer(expound_options)(explain_data);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__45275_45401);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__45274_45400);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__5647__auto__);
}
});
com.fulcrologic.guardrails.core.run_check = (function com$fulcrologic$guardrails$core$run_check(p__45281,spec,value){
var map__45282 = p__45281;
var map__45282__$1 = cljs.core.__destructure_map(map__45282);
var options = map__45282__$1;
var use_stderr_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45282__$1,new cljs.core.Keyword("guardrails","use-stderr?","guardrails/use-stderr?",1215531137));
var explain_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45282__$1,new cljs.core.Keyword("guardrails","explain-fn","guardrails/explain-fn",334384282));
var fqnm = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45282__$1,new cljs.core.Keyword("guardrails","fqnm","guardrails/fqnm",1331545691));
var throw_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45282__$1,new cljs.core.Keyword(null,"throw?","throw?",-2036749118));
var humanize_opts = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45282__$1,new cljs.core.Keyword(null,"humanize-opts","humanize-opts",246669923));
var args_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45282__$1,new cljs.core.Keyword(null,"args?","args?",-1963723548));
var malli_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45282__$1,new cljs.core.Keyword("guardrails","malli?","guardrails/malli?",322930348));
var fn_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45282__$1,new cljs.core.Keyword(null,"fn-name","fn-name",-766594004));
var humanize_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45282__$1,new cljs.core.Keyword("guardrails","humanize-fn","guardrails/humanize-fn",-2095842294));
var vararg_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45282__$1,new cljs.core.Keyword(null,"vararg?","vararg?",1908105777));
var compact_QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45282__$1,new cljs.core.Keyword("guardrails","compact?","guardrails/compact?",-1855665962));
var tap_GT__QMARK_ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45282__$1,new cljs.core.Keyword(null,"tap>?","tap>?",212454486));
var validate_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__45282__$1,new cljs.core.Keyword("guardrails","validate-fn","guardrails/validate-fn",2096758972));
var start_45411 = com.fulcrologic.guardrails.core.now_ms();
var vargs_QMARK__45412 = (function (){var and__5000__auto__ = args_QMARK_;
if(cljs.core.truth_(and__5000__auto__)){
return vararg_QMARK_;
} else {
return and__5000__auto__;
}
})();
var varg_45413 = (cljs.core.truth_(vargs_QMARK__45412)?cljs.core.last(cljs.core.seq(value)):null);
var specable_args_45414 = (cljs.core.truth_(vargs_QMARK__45412)?((cljs.core.map_QMARK_(varg_45413))?cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.vec(cljs.core.butlast(value)),cljs.core.flatten(cljs.core.seq(varg_45413))):cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.vec(cljs.core.butlast(value)),cljs.core.seq(varg_45413))):value);
var valid_exception_45415 = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
try{if(cljs.core.truth_((validate_fn.cljs$core$IFn$_invoke$arity$2 ? validate_fn.cljs$core$IFn$_invoke$arity$2(spec,specable_args_45414) : validate_fn.call(null, spec,specable_args_45414)))){
} else {
var _STAR_out_STAR__orig_val__45291_45416 = cljs.core._STAR_out_STAR_;
var _STAR_out_STAR__temp_val__45292_45417 = (cljs.core.truth_(use_stderr_QMARK_)?cljs.core._STAR_out_STAR_:cljs.core._STAR_out_STAR_);
(cljs.core._STAR_out_STAR_ = _STAR_out_STAR__temp_val__45292_45417);

try{var explain_data_45418 = (explain_fn.cljs$core$IFn$_invoke$arity$2 ? explain_fn.cljs$core$IFn$_invoke$arity$2(spec,specable_args_45414) : explain_fn.call(null, spec,specable_args_45414));
var explain_human_45419 = (function (){var G__45294 = explain_data_45418;
var G__45295 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(humanize_opts,new cljs.core.Keyword("guardrails","compact?","guardrails/compact?",-1855665962),compact_QMARK_,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword("guardrails","fqnm","guardrails/fqnm",1331545691),fqnm,new cljs.core.Keyword("guardrails","args?","guardrails/args?",-768537344),args_QMARK_], 0));
return (humanize_fn.cljs$core$IFn$_invoke$arity$2 ? humanize_fn.cljs$core$IFn$_invoke$arity$2(G__45294,G__45295) : humanize_fn.call(null, G__45294,G__45295));
})();
var e_45420 = cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("",cljs.core.PersistentArrayMap.EMPTY);
var description_45421 = com.fulcrologic.guardrails.utils.problem_description(["\nGuardrails:\n",cljs.core.str.cljs$core$IFn$_invoke$arity$1(explain_human_45419)].join(''),e_45420,options);
var context_45422 = com.fulcrologic.guardrails.core.get_global_context();
com.fulcrologic.guardrails.utils.record_failure(fqnm,e_45420);

if(cljs.core.truth_((function (){var and__5000__auto__ = com.fulcrologic.guardrails.core.tap;
if(cljs.core.truth_(and__5000__auto__)){
return tap_GT__QMARK_;
} else {
return and__5000__auto__;
}
})())){
var G__45297_45423 = new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword("com.fulcrologic.guardrails","fn-name","com.fulcrologic.guardrails/fn-name",-762819408),fqnm,new cljs.core.Keyword("com.fulcrologic.guardrails","failure-point","com.fulcrologic.guardrails/failure-point",340797326),(cljs.core.truth_(args_QMARK_)?new cljs.core.Keyword(null,"args","args",1315556576):new cljs.core.Keyword(null,"ret","ret",-468222814)),new cljs.core.Keyword("com.fulcrologic.guardrails","spec","com.fulcrologic.guardrails/spec",343160061),spec,new cljs.core.Keyword("com.fulcrologic.guardrails","explain-data","com.fulcrologic.guardrails/explain-data",-1120944464),explain_data_45418,new cljs.core.Keyword("com.fulcrologic.guardrails","explain-human","com.fulcrologic.guardrails/explain-human",-1126653153),com.fulcrologic.guardrails.utils.strip_colors(explain_human_45419)], null);
(com.fulcrologic.guardrails.core.tap.cljs$core$IFn$_invoke$arity$1 ? com.fulcrologic.guardrails.core.tap.cljs$core$IFn$_invoke$arity$1(G__45297_45423) : com.fulcrologic.guardrails.core.tap.call(null, G__45297_45423));
} else {
}

if(cljs.core.truth_(throw_QMARK_)){
cljs.core.reset_BANG_(valid_exception_45415,cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2((function (){var G__45298 = description_45421;
if(cljs.core.truth_(context_45422)){
return ["\nContext: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(context_45422),G__45298].join('');
} else {
return G__45298;
}
})(),cljs.core.with_meta(new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("com.fulcrologic.guardrails","validation-error","com.fulcrologic.guardrails/validation-error",776351266),new cljs.core.Keyword("com.fulcrologic.guardrails","fn-name","com.fulcrologic.guardrails/fn-name",-762819408),fn_name,new cljs.core.Keyword("com.fulcrologic.guardrails","failure-point","com.fulcrologic.guardrails/failure-point",340797326),(cljs.core.truth_(args_QMARK_)?new cljs.core.Keyword(null,"args","args",1315556576):new cljs.core.Keyword(null,"ret","ret",-468222814)),new cljs.core.Keyword("com.fulcrologic.guardrails","spec","com.fulcrologic.guardrails/spec",343160061),spec,new cljs.core.Keyword("com.fulcrologic.guardrails","context","com.fulcrologic.guardrails/context",-834538901),context_45422], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("com.fulcrologic.guardrails","val","com.fulcrologic.guardrails/val",132345656),specable_args_45414], null))));
} else {
com.fulcrologic.guardrails.utils.report_problem.cljs$core$IFn$_invoke$arity$1(description_45421);
}
}finally {(cljs.core._STAR_out_STAR_ = _STAR_out_STAR__orig_val__45291_45416);
}}
}catch (e45287){var e_45431 = e45287;
var error_msg_45432 = cljs.core.ex_message(e_45431);
var is_schema_error_QMARK__45433 = (function (){var and__5000__auto__ = error_msg_45432;
if(cljs.core.truth_(and__5000__auto__)){
var or__5002__auto__ = cljs.core.re_find(/Unable to resolve spec/,error_msg_45432);
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var or__5002__auto____$1 = cljs.core.re_find(/no method/,error_msg_45432);
if(cljs.core.truth_(or__5002__auto____$1)){
return or__5002__auto____$1;
} else {
var or__5002__auto____$2 = cljs.core.re_find(/Unknown schema/,error_msg_45432);
if(cljs.core.truth_(or__5002__auto____$2)){
return or__5002__auto____$2;
} else {
return cljs.core.re_find(/Invalid schema/,error_msg_45432);
}
}
}
} else {
return and__5000__auto__;
}
})();
var user_friendly_msg_45434 = (cljs.core.truth_(is_schema_error_QMARK__45433)?["Schema/spec error in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fqnm),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(error_msg_45432),"\nThis typically means a referenced schema doesn't exist or wasn't loaded."].join(''):["BUG: Internal error validating ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fqnm),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(error_msg_45432)].join(''));
if(cljs.core.truth_(throw_QMARK_)){
cljs.core.reset_BANG_(valid_exception_45415,cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2(user_friendly_msg_45434,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword("com.fulcrologic.guardrails","schema-error","com.fulcrologic.guardrails/schema-error",1218859081),new cljs.core.Keyword("com.fulcrologic.guardrails","fn-name","com.fulcrologic.guardrails/fn-name",-762819408),fn_name,new cljs.core.Keyword("com.fulcrologic.guardrails","failure-point","com.fulcrologic.guardrails/failure-point",340797326),(cljs.core.truth_(args_QMARK_)?new cljs.core.Keyword(null,"args","args",1315556576):new cljs.core.Keyword(null,"ret","ret",-468222814)),new cljs.core.Keyword("com.fulcrologic.guardrails","original-error","com.fulcrologic.guardrails/original-error",1200935340),e_45431], null)));
} else {
com.fulcrologic.guardrails.utils.report_problem.cljs$core$IFn$_invoke$arity$1(user_friendly_msg_45434);
}
}finally {var duration_45437 = (com.fulcrologic.guardrails.core.now_ms() - start_45411);
if((duration_45437 > (100))){
com.fulcrologic.guardrails.utils.report_problem.cljs$core$IFn$_invoke$arity$3(["WARNING: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_name)," ",(cljs.core.truth_(args_QMARK_)?"argument specs":"return spec")," took ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(duration_45437),"ms to run."].join(''),null,options);
} else {
}
}
if(cljs.core.truth_(cljs.core.deref(valid_exception_45415))){
throw cljs.core.deref(valid_exception_45415);
} else {
}

return null;
});
com.fulcrologic.guardrails.core.js__QMARK_window = (((typeof window !== 'undefined'))?window:null);
/**
 * Like `get` for JS objects.
 */
com.fulcrologic.guardrails.core.oget = (function com$fulcrologic$guardrails$core$oget(var_args){
var G__45338 = arguments.length;
switch (G__45338) {
case 1:
return com.fulcrologic.guardrails.core.oget.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return com.fulcrologic.guardrails.core.oget.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return com.fulcrologic.guardrails.core.oget.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(com.fulcrologic.guardrails.core.oget.cljs$core$IFn$_invoke$arity$1 = (function (k){
return com.fulcrologic.guardrails.core.goog$module$goog$object.get(com.fulcrologic.guardrails.core.js__QMARK_window,cljs.core.name(k));
}));

(com.fulcrologic.guardrails.core.oget.cljs$core$IFn$_invoke$arity$2 = (function (o,k){
return com.fulcrologic.guardrails.core.goog$module$goog$object.get(o,cljs.core.name(k),null);
}));

(com.fulcrologic.guardrails.core.oget.cljs$core$IFn$_invoke$arity$3 = (function (o,k,not_found){
return com.fulcrologic.guardrails.core.goog$module$goog$object.get(o,cljs.core.name(k),not_found);
}));

(com.fulcrologic.guardrails.core.oget.cljs$lang$maxFixedArity = 3);

/**
 * Returns current value of best-resolution time source as nanoseconds.
 */
com.fulcrologic.guardrails.core.now_nano = (function (){var perf = com.fulcrologic.guardrails.core.oget.cljs$core$IFn$_invoke$arity$2(com.fulcrologic.guardrails.core.js__QMARK_window,"performance");
var pf = (cljs.core.truth_(perf)?(function (){var or__5002__auto__ = com.fulcrologic.guardrails.core.oget.cljs$core$IFn$_invoke$arity$2(perf,"now");
if(cljs.core.truth_(or__5002__auto__)){
return or__5002__auto__;
} else {
var or__5002__auto____$1 = com.fulcrologic.guardrails.core.oget.cljs$core$IFn$_invoke$arity$2(perf,"mozNow");
if(cljs.core.truth_(or__5002__auto____$1)){
return or__5002__auto____$1;
} else {
var or__5002__auto____$2 = com.fulcrologic.guardrails.core.oget.cljs$core$IFn$_invoke$arity$2(perf,"webkitNow");
if(cljs.core.truth_(or__5002__auto____$2)){
return or__5002__auto____$2;
} else {
var or__5002__auto____$3 = com.fulcrologic.guardrails.core.oget.cljs$core$IFn$_invoke$arity$2(perf,"msNow");
if(cljs.core.truth_(or__5002__auto____$3)){
return or__5002__auto____$3;
} else {
return com.fulcrologic.guardrails.core.oget.cljs$core$IFn$_invoke$arity$2(perf,"oNow");
}
}
}
}
})():null);
if(cljs.core.truth_((function (){var and__5000__auto__ = perf;
if(cljs.core.truth_(and__5000__auto__)){
return pf;
} else {
return and__5000__auto__;
}
})())){
return (function (){
return Math.floor((1000000.0 * pf.call(perf)));
});
} else {
return (function (){
return (1000000.0 * Date.now());
});
}
})();

//# sourceMappingURL=com.fulcrologic.guardrails.core.js.map
